import { Uri } from 'vscode'
import { BASE_AWS_URL, REGION, STAGE } from './config'

export const getLambdaUri = (apiName: string, lambda: string) => {
  const functionName = `${apiName}-${STAGE}-${lambda}`

  return Uri.from({
    scheme: 'https',
    authority: BASE_AWS_URL,
    path: '/lambda/home',
    query: `region=${REGION}`,
    fragment: `/functions/${functionName}`,
  })
}

export const getCloudwatchUri = (apiName: string, lambda: string) => {
  const functionName = encodeURIComponent(`/aws/lambda/${apiName}-${STAGE}-${lambda}`)

  return Uri.from({
    scheme: 'https',
    authority: BASE_AWS_URL,
    path: '/cloudwatch/home',
    query: `region=${REGION}`,
    fragment: `logsV2:log-groups/log-group/${functionName}`,
  })
}

export const getLambdaName = (text: string): string | null => {
  if (!text?.length) return null
  if (text.at(-1) !== ':') return null

  return text.slice(0, -1).trim()
}

export const getFileName = (filePath: string): string => {
  const split = filePath.split('/')
  return split.at(-1) ?? filePath
}

export const getClosestServerless = (filePath: string, serverlessPaths: string[]) => {
  serverlessPaths = serverlessPaths.map(path => path.replace('/serverless.yml', ''))

  const closest = serverlessPaths.find(path => filePath.includes(path))
  return closest ? `${closest}/serverless.yml` : null
}

export const getRelativeFilePath = (filePath: string, workspacePath?: string) => {
  const relativePath = workspacePath ? filePath.replace(workspacePath, '') : filePath
  const workspaceName = workspacePath?.split('/').at(-1) ?? ''

  return {
    simple: '**' + relativePath,
    withWorkspace: '/' + workspaceName + relativePath,
  }
}
