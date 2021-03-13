# CloudGenetics webapp

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](https://raw.githubusercontent.com/cityscapelabs/cityscape/develop/LICENSE)
[![CircleCI](https://circleci.com/gh/cloudgenetics/webapp.svg?style=svg)](https://circleci.com/gh/cloudgenetics/webapp)
[![Project management](https://img.shields.io/badge/projects-view-ff69b4.svg)](https://github.com/cloudgenetics/webapp/projects/)
[![Known Vulnerabilities](https://snyk.io/test/github/cloudgenetics/webapp/badge.svg?targetFile=package.json)](https://snyk.io/test/github/cloudgenetics/webapp?targetFile=package.json)


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

Edit `.env` file to update the app title and url.

To edit the theme modify `plugins/vuetify.js`.

### Authentication
Set-up an [Auth0 API](https://auth0.com/docs/get-started/set-up-apis). Update the `auth_config.json` file:
```json
{
  "domain": "kks32.us.auth0.com",
  "clientId": "5DtiTEV0juj2VxGMVsyzERHbJ4TTNuMl",
  "audience": "https://localhost:4000"
}
```