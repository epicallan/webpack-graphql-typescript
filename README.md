# Data hub graphql-server

[![Build Status](https://travis-ci.org/epicallan/datahub-api.svg?branch=master)](https://travis-ci.org/epicallan/datahub-api)
![Code Climate](https://codeclimate.com/github/epicallan/datahub-api.svg)
[![codecov](https://codecov.io/gh/epicallan/datahub-api/branch/master/graph/badge.svg)](https://codecov.io/gh/epicallan/datahub-api)
[![Dependency Status](https://gemnasium.com/badges/github.com/epicallan/datahub-api.svg)](https://gemnasium.com/github.com/epicallan/datahub-api)

Webpack typescript Graphql server start kit that grew out of a need for a project i am working on

Useful commands:
----
    npm run build       - build the library files (Required for start:watch)
    npm run build:watch - build the library files in watchmode (Useful for development)
    npm start           - Start the server
    npm run dev         - Start the server in watchmode (Useful for development)
    npm test            - run tests once
    npm run test:watch  - run tests in watchmode (Useful for development)
How to run it:
----
```bash
    yarn install --ignore-scripts
    ## development mode
    npm run dev
    ## production
    npm run build & npm start
```

Files explained:
----
    1. src                         - directory is used for typescript code that is part of the project
        1a. main.ts                - Main server file. (Starting Apollo server)
        1c. dw/schema              - Contains modules used to build dataware house schemas
            - modules/             - directory for modules
    3. package.json                - file is used to describe the library
    4. tsconfig.json               - configuration file for the library compilation
    6. tslint.json                 - configuration file for the linter
    8. webpack.config.js           - configuration file of the compilation automation process for the library
    10. Dockerfile                 - Dockerfile used to describe how to make a container out of apollo server


Output files explained:
----
    1. node_modules - directory npm creates with all the dependencies of the module (result of npm install)
    2. dist         - directory contains the compiled server (javascript)
    3. html-report  - output of npm test, code coverage html report.

Development GuideLines

Typescript requires types for external dependency. When you install a new run time dependency endevour to install types for it.
```
// eg
$ yarn add --dev @types/fs-extra
```

TODO

- [ ] add more guidlines
- [ ] publisht to yeoman and neutrino˜