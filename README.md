# DD360 Handler shortcuts

Simple VS code extension to open AWS Console links of Lambda & Cloudwatch dashboards directly from lambda Yaml declarations of serverless framework.

## Features

This extension let you right click a lambda delcaration on Yaml file, then open the AWS dashboards in the default web browser:

##### 1. Right click on lambda name:

<img width="350" alt="Right click on lambda" src="media/right_click.png">

##### 2. Automatically opens both Lambda & Cloudwatch:

<p align="left">  
<img width="250" alt="Aws console Lambda dashboard" src="media/lambda_aws.png">

<img width="213" alt="Aws console Cloudwatch dashboard" src="media/cloudwatch_aws.png">
</p>

#### Considerations

This functionality supports search the `serverless.yml` config across:

- Simple project workspace
- Multiple workspaces
- Mono-repo arquitecture with simple or multiple workspaces

Only works on `Yaml` based serverless configuration. For now does not work with Typescript serverless declarations.

## Extension Settings

Coming soon 🚧 For now, we have static deafult `STAGE` & `REGION` config

## Release Notes

### 0.0.1

Initial release with basic features.
