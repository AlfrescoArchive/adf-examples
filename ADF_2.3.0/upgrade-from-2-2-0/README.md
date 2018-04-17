# ADF/APS/ACS Application with Angular CLI

Minimal ready-to-use Angular CLI project template pre-configured with ADF 2.0.0 components.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0

## Quick start

```sh
npm install
npm start
```

## Supported ADF component libraries

This project has all the existing ADF component libraries already pre-configured.

The main focus of the project is:

- ADF integration and setup
- Basic demonstration of working components

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Proxy settings

The template provides certain proxy settings to allow running web application locally without CORS setup.
You can find details in the `proxy.conf.json` file.

List of URLs being proxied:

- `/alfresco` -> `http://0.0.0.0:8080`
- `/activiti-app` -> `http://0.0.0.0:9999`

## Code scaffolding

Run `ng generate component component-name -m app.module` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Docker

You can create a Docker image to run your generated app in the container.

## Building from source code

You need to run the following commands to build the project from the source code:

```sh
npm run build
```

That produces a build in the "dist" folder that you can use with a Docker image.

<p class="tip">
Also, you may need to update the `dist/app.config.json` file with the settings relevant to your scenario.
</p>

## Creating an image

The generated app provides a "Dockerfile" file in the repository root.
You can build the image with the following command:

```sh
docker image build -t YOUR_NAME_APP .
```

## Running image in a container

To run the image locally, you can use the following command:

```sh
docker container run -p 80:80 --rm YOUR_NAME_APP
```

Navigate to "http://localhost" to access the running application.

<p class="tip">
(For more information about docker see also)[docker.md]
</p>
