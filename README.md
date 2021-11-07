# CloudGenetics webapp

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](https://raw.githubusercontent.com/cityscapelabs/cityscape/develop/LICENSE)
[![CircleCI](https://circleci.com/gh/cloudgenetics/webapp.svg?style=svg)](https://circleci.com/gh/cloudgenetics/webapp)
[![Project management](https://img.shields.io/badge/projects-view-ff69b4.svg)](https://github.com/orgs/cloudgenetics/projects/1)
[![Known Vulnerabilities](https://snyk.io/test/github/cloudgenetics/webapp/badge.svg?targetFile=package.json)](https://snyk.io/test/github/cloudgenetics/webapp?targetFile=package.json)
[![CodeQL](https://github.com/cloudgenetics/webapp/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/cloudgenetics/webapp/actions/workflows/codeql-analysis.yml)


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

## Customization
### Environment variables

Edit `.env` file to update the app title, app url and app upload URL (AWS Endpoint) for file uploads.

To edit the theme modify `plugins/vuetify.js`.

### Authentication
Set-up an [Auth0 API](https://auth0.com/docs/get-started/set-up-apis). Update the `auth_config.json` file:
```json
{
  "domain": "kks32.us.auth0.com",
  "clientId": "30wvMJ3q1F1BvmmBCHyUb6as18LLsE52",
  "audience": "https://api.cloudgenetics.com",
  "serverUrl": "http://localhost:4000"
}
```
