# DD360 Handler shortcuts

Simple VS code extension to open AWS Console links of Lambda & Cloudwatch dashboards directly from lambda Yaml declarations.

## Features

This extension let you right click a lambda delcaration on Yaml file, then open the AWS dashboards in the default web browser:

##### 1. Right click on lambda name:

<img width="350" alt="Right click on lambda" src="media/right_click.png">

<br>
<br>

##### 2. Automatically opens both Lambda & Cloudwatch:

<img width="250" alt="Aws console Lambda dashboard" src="media/lambda_aws.png">

<img width="213" alt="Aws console Cloudwatch dashboard" src="media/cloudwatch_aws.png">

#### Considerations

This functionality supports search the `serverless.yml` config across:

- Simple project workspace
- Multiple workspaces
- Mono-repo arquitecture with simple or multiple workspaces

## Extension Settings

Coming soon 🚧 For now, we have static deafult `STAGE` & `REGION` config

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

### 0.0.1

Initial release with basic features.
