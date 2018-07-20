# Angular frontend for QSLContacts app

## Overview
QSLContacts is an Angular frontend that displays a searchable address book of employees of the Government of British Columbia.

## Requirements

- Docker
- Git
- TypeScript (for local development)

## Getting Started

## How To Use

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/...

# Go into the repository
$ cd frontend

# Install dependencies
$ npm install
$ npm install -g @angular/cli@6.0.8

# Build from source
$ npm run build

# Run the app
$ npm start
```

## Development

1. Run ```docker-compose up --build``` to build and run **frontend** container.
It will serve the application on port 4200. Any changes to the code will trigger the livereload functionality to reflect the changes in the browser.
3. (Optional) Open an interactive shell to poke around in the container
4. You can verify the container is running using the command ```docker container ls | grep frontend-qsl-contacts```

### Linting

From your command line:

```bash
$ npm run lint
```

## Testing

### Running the tests

From your command line:

```bash
$ npm test
```

### Writing tests

Place your test files next to the tested modules using some kind of naming convention, like `<module_name>.spec.ts`. Your tests should live together with the tested modules, keeping them in sync. It would be really hard to find and maintain the tests and the corresponding functionality when the test files are completely separated from the business logic.

## Project Structure

## Docker

### Executing an interactive shell on the container

```bash
docker exec -it frontend-qsl-contacts bash
```
## Technology Stack Used

* [Angular](https://angular.io/) - Frontend framework used
* [Angular CLI](https://cli.angular.io/) - Tool to initialize, develop, scaffold and maintain Angular applications
* [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript that compiles to plain JavaScript
* [Jasmine](https://jasmine.github.io/), [Karma](https://karma-runner.github.io/2.0/index.html), [Protractor](http://www.protractortest.org/) - Unit Tests
* [Docker](https://www.docker.com/) - Containers

## Contributing

## License

## Acknowledgments


