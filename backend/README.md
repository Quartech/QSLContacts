# Node.js backend for QSL Contacts app

## Requirements

- Docker
- Git
- Node.js, TypeScript (for local development)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

1. Run the included `build.sh` script to build the **backend** container.
2. Run the included `run.sh` script to run it (in background mode)
3. (Optional) Open an interactive shell to poke around in the container
4. You can verify the container is running using the command `docker container ls | grep backend-qsl-contacts`

## How To Use

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/...

# Go into the repository
$ cd backend

# Install dependencies
$ npm install

# Build from source
$ npm run build

# Run the app
$ npm start
```

## Build the app

### Development build

From your command line:

```bash
$ npm run dev
```

### Production build

From your command line:

```bash
$ npm run prod
```

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
The most obvious difference in a TypeScript + Node project is the folder structure.
In a TypeScript project, it's best to have separate _source_  and _distributable_ files.
TypeScript (`.ts`) files live in your `src` folder and after compilation are output as JavaScript (`.js`) in the `dist` folder.

The full folder structure of this app is explained below:

> **Note!** Make sure you have already built the app using `npm run build`

```
├───dist                        - Distributable files (.js)
├───node_modules                - Where npm-installed modules end up going
├───src                         - Root of the backend app
│   ├───config                  - App configuration (secrets.ts), derived from ENV vars
│   └───lib                     - Utilities (e.g. logger, cache, error handler, etc.)
└───tests                       - Additional test files (setup.js, etc)
    ├───functional-tests        - Functional tests should go here
    └───mocks                   - Place your mocks here
```

## Deployment (Docker)
Docker containers are used

### Building the backend container

Run the included `./build.sh` script, or execute from your command line:

```bash
$ docker build -t backend-qsl-contacts .
```

### Running the container

Run the included `./run.sh` script, or execute from your command line:

```bash
$ docker run -it -p 3000:3000 -d --rm --name=backend-qsl-contacts backend-qsl-contacts
```

### Executing an interactive shell on the container

```bash
$ docker exec -it backend-qsl-contacts bash
```

## Technology Stack Used

* [Node.js](https://nodejs.org/en/) - Server
* [Restify](http://restify.com/) - The web framework used
* [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript that compiles to plain JavaScript
* [Mocha](https://mochajs.org/), [Chai](http://www.chaijs.com/), [SuperTest](https://www.npmjs.com/package/supertest) - Unit Tests
* [Docker](https://www.docker.com/) - Containers

## Contributing

## License

## Acknowledgments

