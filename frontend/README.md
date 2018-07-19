# Angular frontend for QSLContacts app

## Overview
QSLContacts is an Angular frontend that displays a searchable address book of employees of the Governement of British Columbia.

## Requirements

- Docker

## Development

1. Run ```docker-compose up --build``` to build and run **frontend** container.
It will serve the application on port 4200. Any changes to the code will trigger the livereload functionality to reflect the changes in the browser.
3. (Optional) Open an interactive shell to poke around in the container
4. You can verify the container is running using the command ```docker container ls | grep frontend-qsl-contacts```

## Docker

### Executing an interactive shell on the container

```bash
docker exec -it frontend-container bash
```

