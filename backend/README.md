# Node.js backend for QSL Contacts app

## Requirements

- Docker

## Getting Started

1. Run the included ```build.sh``` script to build the **backend** container.
2. Run the included `run.sh` script to run it (in background mode)
3. (Optional) Open an interactive shell to poke around in the container
4. You can verify the container is running using the command ```docker container ls | grep backend-qsl-contacts```

## Local Development

### Development

```bash
npm run dev
```

### Production

```bash
npm run prod
```

### Running tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

## Docker

### Building the backend container

Run the included `./build.sh` script, or 

```bash
docker build -t backend-qsl-contacts .
```

### Running the container

Run the included `./run.sh` script, or 

```bash
docker run -it -p 3000:3000 -d --rm --name=backend-qsl-contacts backend-qsl-contacts
```

### Executing an interactive shell on the container

```bash
docker exec -it backend-qsl-contacts bash
```

