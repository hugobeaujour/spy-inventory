# Marketplace

The marketplace part of the service. For spectators mainly. Where you buy tickets

[![Terraform](https://github.com/monar-io/marketplace/actions/workflows/terraform.yml/badge.svg?branch=master)](https://github.com/monar-io/marketplace/actions/workflows/terraform.yml)[![Packages](https://github.com/monar-io/marketplace/actions/workflows/packages.yml/badge.svg?branch=master)](https://github.com/monar-io/marketplace/actions/workflows/packages.yml)[![Frontend](https://github.com/monar-io/marketplace/actions/workflows/frontend.yml/badge.svg?branch=master)](https://github.com/monar-io/marketplace/actions/workflows/frontend.yml)[![iFrame](https://github.com/monar-io/marketplace/actions/workflows/iframe.yml/badge.svg?branch=master)](https://github.com/monar-io/marketplace/actions/workflows/iframe.yml)

## Deployment

Be sure to have your AWS credentials in your terminal for any action you do

Be sure to have applied the terraform of `infra` repository

Be sure to have your `GITHUB_TOKEN` in your env vars, to pull the typescript package from npm

### Deploy from scratch

At the root of the repository do `npm ci first` then `sh script.sh upload` or `sh script.sh upload:prod`

Apply the terraform of the repository

And finally deploy the API Gateway in AWS

### Lambdas

For Typescript lambdas you have 3 commands ( be sure to have done `npm ci` before ) :

-   `nx run packageName:job` for single lambda, with `deploy` or `pdeploy` for prod

For RUST lambdas you have 3 commands ( be sure to have `cargo` installed, and `cargo lambda` installed too ) :

-   `sh script.sh build`
-   `sh script.sh upload` or `sh script.sh upload prod`
-   `sh script.sh deploy` or `sh script.sh deploy prod`

### Terraform

For development go in the `terraform/dev` folder

For production go in the `terraform/prod` folder

-   `terraform init`
-   `terraform apply`

### Frontend

You have 3 commands ( be sure to have done `npm ci` before ) :

-   `npm run start`
-   `npm run build`
-   `npm run deploy` or `npm run deploy:prod`

## Other actions

-   `sh script.sh wipe all` clear everything build / node_modules data in all folders
