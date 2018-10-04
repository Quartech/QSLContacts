# QSLContacts

## About

QSLContacts was born to address the need of easily accessing the the [BC Government Directory](http://dir.gov.bc.ca/downloads/BCGOV_directory.xml), which is exposed as XML by [DataBC](https://data.gov.bc.ca/).

The application is written in Javascript, and uses a [NodeJS](https://nodejs.org) backend and an [Angular](https://angular.io/) frontend.

## Functionality

QSLContacts will fetch the XML containing the BC Government Directory and display a searchable list of contacts. Similarly to a mobile phone adrress book, the search function will perform a lookup throughout all of the contact attributes (name, email, phone, etc.) and only display the results that match all of the search terms.

It is possible to initiate a phone call or compose an email just by clicking the relevant buttons on the desired contact. Similarly, a vCard containing all of the contact's information can be downloaded using the appropriate function.

The contact list is cached in case the xml directory it becomes unavailable. The cache timeout is set by default to 60 minutes, but it can be overridden by setting the encironment variable `CACHE_TTL` to the desired value (in seconds).

## Running the app

To run the application locally, execute the command ```start.sh``` in this directory. Once the docker containers are up and running, the application will serve at http://localhost:80 

To start the application in production mode, pass the -p argument to the start script: ```start.sh -p```. A production-ready instance of the application, using [Caddy](https://caddyserver.com/) to serve the frontend, will be started.
**Note:** ensure that the variables `domain_1, domain2` in `docker-compose-prod.yml` are updated with your domain name(s).

To run the frontend or backend independently, or run them in development mode, please refer to the instructions in the relevant readme file.

## Stopping the app

To stop the containers, run ```stop.sh``` in this directory.