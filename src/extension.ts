import * as vscode from 'vscode'
import type { ExtensionContext } from 'vscode'
import { getClosestServerless, getCloudwatchUri, getFileName, getLambdaName, getLambdaUri, getRelativeFilePath } from './utils'

export function activate(context: ExtensionContext) {
  console.log('Extension "dd360-handler-shortcuts" is now active! 🚀')

  const goToLambda = vscode.commands.registerCommand('dd360-handler-shortcuts.goToLambda', async () => {
    const activeEditor = vscode.window.activeTextEditor
    if (!activeEditor) return null

    const workspace = vscode.workspace.workspaceFolders?.[0]
    const workspacePath = workspace?.uri.path

    const filePath = activeEditor.document.fileName
    const fileName = getFileName(filePath)
    const line = activeEditor.selection.active.line
    const text = activeEditor.document.lineAt(line).text

    const lambdaName = getLambdaName(text)
    if (!lambdaName) return vscode.window.showErrorMessage('No lambda name found')

    let serverlessPath = null
    if (fileName === 'serverless.yml') serverlessPath = filePath
    else {
      const allServerless = await vscode.workspace.findFiles('**/serverless.yml', '**/node_modules/**')
      const allServerlessPaths = allServerless.map(file => file.path)
      serverlessPath = getClosestServerless(filePath, allServerlessPaths)
    }

    if (!serverlessPath) return vscode.window.showErrorMessage('No serverless file found')

    const relativeServelessPath = getRelativeFilePath(serverlessPath, workspacePath)

    const posibleServerless = await Promise.all([
      vscode.workspace.findFiles(relativeServelessPath.withWorkspace, '**/node_modules/**', 1),
      vscode.workspace.findFiles(relativeServelessPath.simple, '**/node_modules/**', 1),
    ])

    const serverlessFile = posibleServerless.flat()[0]
    if (!serverlessFile) return vscode.window.showErrorMessage('No serverless file found')

    const serverless = await vscode.workspace.openTextDocument(serverlessFile)
    const [, apiName] = serverless?.getText().match(/service: (.*)/) ?? []

    if (!apiName) return vscode.window.showErrorMessage('No api name found in serverless.yml')

    const lambdaUri = getLambdaUri(apiName, lambdaName)
    const cloudWatchUri = getCloudwatchUri(apiName, lambdaName)

    await vscode.env.openExternal(lambdaUri)
    await vscode.env.openExternal(cloudWatchUri)
  })

  context.subscriptions.push(goToLambda)
}

export function deactivate() {}
