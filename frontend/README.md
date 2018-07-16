# Angular frontend for QSLContacts app

## Overview
QSLContacts is an Angular frontend that displays a searchable address book of employees of the Governement of British Columbia.

## Development mode
`docker-compose up --build` will start the container and serve on port 4200. The console will display the server logs, as if serving using `ng serve`.

Livereload doesn't currently work, so to see changes it is necessary to run the above command again. It is not necessary to kill the existing container before re-running docker-compose.
