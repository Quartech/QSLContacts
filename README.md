# Code Challenge Notice, Instructions & Rules
Re: Competition "The Sprint with Us Code Challenge" (the Mock Sprint with Us Code Challenge)

Quartech Contact: brad.head@gmail.com 

This notice is dated July 11, 2018 (the “Notice Date”).

Congratulations - you are a Shortlisted Proponent eligible to participate in the Code Challenge (Step 4 of the evaluation process described on the Evaluation tab of the RFP).
## Rules and Instructions
Please be advised of the following rules and instructions:
1. These code challenge rules and instructions apply only to Shortlisted Proponents and are part of the RFP.
2. Shortlisted Proponents will have no less than five (5) Business Days from the Notice Date to complete the code challenge. The deadline to complete the code challenge in accordance with these rules is 4:00 p.m. Pacific Time on Friday, June 15, 2018 (the “Deadline”).
3. The Shortlisted Proponent’s code challenge submission Deliverable (defined below) must be received by the Province (as provided for by these instructions) and be deposited and located in the applicable Repository before the Deadline, failing which such submission will not be eligible for evaluation and the associated Shortlisted Proponent Proposal will receive no further consideration and such Shortlisted Proponent will be eliminated from the RFP competition.
4. Only the Proponent Resources that were put forward in a Shortlisted Proponent’s RFP Proposal are eligible to participate in the Code Challenge.
5. The Shortlisted Proponent Resources will be sent invites via GitHub to join this private repository (https://github.com/BCDevExchange-CodeChallenge/challenge-repo-1). Please forward to the Government Contact the GitHub handles of those Proponent Resources who will be taking part in the Code Challenge.
6. As of the Notice Date, the code challenge issue has been created in this private repository (https://github.com/BCDevExchange-CodeChallenge/challenge-repo-1), under the "BCDevExchange-CodeChallenge" organization.
7. Shortlisted Proponents may direct clarifying questions to the Government
Contact. Any such questions must be received by the Government Contact
before 4:00 p.m. Pacific time on Wednesday, June 13, 2018 (the “Code Challenge Questions
Deadline”).
8. The Province reserves the right to amend this notice before or after the Closing
Time, including changing the Deadline or the Code Challenge Questions
Deadline upon notice to all Shortlisted Proponents.
9. The Shortlisted Proponent must complete all of the following tasks and
Deliverable and as such they must be deposited and received in the applicable
Repository by the Province in the form specified by this notice before the
Deadline:
* Complete all code changes required to complete the code challenge (the "Deliverable"); and
* Attach an Apache License 2.0 to the Deliverable.
10. The rules and instructions set forth in this notice are in addition to any rules,
terms and conditions set forth elsewhere in the RFP.

# Code Challenge (QSL - BC GovDirectory)

## Description

Included are scripts for building and running two Docker containers: 
* A MongoDB database loaded with the sample Northwind data

The scripts handle retrieval of the appropriate images, loading of the sample data, and setting of default user credentials.

## Requirements

* Docker
* Node.JS

## Getting Started

* Run the included ```start.sh``` script to launch the containers.
* The MongoDB container exposes port 27017 and can be connected to with either the admin account (mongoadmin/1234) or the read-only user account (mongouser/mongouser)
* The Postgres container exposes port 5432 and can be connected to with either the admin account (postgres/postgresadmin) or the read-only user account (pguser/pguser)
* Feel free to change the default admin and user account credentials, but changes will not persist between starting/stopping each container
* You can verify the containers are running using the command ```docker container ls | grep code-challenge``` or by connecting to each one using your favourite client tool (e.g. MongoDB Compass or Postico)

## Code Challenge Instructions

### Introduction

This code challenge asks you to build an application that fetch the BC Government Directory XML document from DataBC.  The application must be able to convert the XML to display on screen and to export any contact information as a VCard 3.0 file.

The application must allow a user to find a contact by name or partial name.  The user must be able to filter contacts by organization. 
The application must sort the contacts by surname, by default.

The url to the xml file, which the government updates daily is:

 http://dir.gov.bc.ca/downloads/BCGOV_directory.xml

### Technical Requirements

Participating teams are not limited to a certain stack or any specific technologies.  We do encourage everyone to use a stack that is commonly used in developing modern web applications.  For instance, a good choice of framework would be Angular or React. 

### User Stories

All of the following user stories must be completed.  They may be completed in any order.

#### User Story #1 – View the BC Government directory as a contact list

As a user, I want to be able to view the BC government directory as a listing, ordered by surname ascending, and then each list item, I can navigate to the details of the user. 

#### User Story #2 – Search by government employee attribute

As a user, I want a single search field that I can use to filter the list of government employee contacts. This may be by name, partial name or other inofmration, i.e. phone number, etc. Ideally, the results are shown as I type.


#### User Story #3 – Email a contact from the contact details view 

As a user, I want to conveniently click on the contact's email address and have it attempt to invoke my system's default email application.

#### User Story #4 – Phone a contact from the contact details view

As a user, I want to be able to phone a contact by clicking or tapping on the phone number. This need only function when I am using a smartphone.
 
#### User Story #5 – Save as VCard 3.0 

As a user, I want to have the option to save a contact details as a VCARD 3.0 format and ideally, have it available to import into my default contacts application whether on a phone, tablet or desktop. 

#### User Story #6 – Service is available when the xml file is not.
As a user, I want to be able to browse the contact list even when access to the government's BCGOV_Directory.xml file is offline.


### REST API Requirements

The fetch and search query operations must be implemented by making a server-side REST API call to an endpoint.

The operation to select an individual item from the query results list must be implemented by making a server-side REST API call to an endpoint with the signature “/fetchItemDetails”.

### Submission Requirements

1.	  Please refer to item #9 in the "Rules and Instructions" section above.
2.	  In addition, you must update the repository’s README file to include any instructions required for the code challenge evaluators to build and run your team’s application.


## Vendor Notes

### Install

Download from github.

```bash
git clone git@github.com:BCDevExchange-CodeChallenge/challenge-repo-1.git
```

The developed application resides on two docker instances. One for the web application and the other for the API. This is in addition to the two database instances. The build and start of the application images have been worked into the overall *docker-compose* workflow.

Make sure the following ports are free:
1. 3000
1. 4200
1. 5432
1. 27027

**Important** - Before running the install it is important to setup the credential file, *backend/.env*.

There is an example credential file in the repository, *backend/.env.example*. It should look like this:

```
# the environment the API is currently running in ('development', 'staging', 'production', etc.)
NODE_ENV=development
APP_NAME=query-builder-api
APP_PORT=3000
LOG_PATH=./logs/query-builder-api.log
# whether to log to the console. Disable in production!
LOG_ENABLE_CONSOLE=true
# the database driver that will used ('mongo' or 'pgsql')
DB_DRIVER=mongo
# mongo connection details
MONGO_DB_PORT=27017
MONGO_DB_HOST=localhost
MONGO_DB_NAME=your_database
MONGO_DB_USER=your_user
MONGO_DB_PASSWORD=your_secret
# postgres connection details
PG_DB_PORT=5432
PG_DB_HOST=localhost
PG_DB_NAME=your_database
PG_DB_USER=your_user
PG_DB_PASSWORD=your_secret
```

You can copy this to *backend/.env* and enter the database credentials. Here you can also toggle  the database being used on startup. The *DB_DRIVE* variable accepts the following values; `mongo` or `pgsql`.

The *.env* file has an entry in *.gitignore*, so it will not be stored in the repository or GitHub.

> Note: The postgresql read only account appears to not have access to the tables. Make sure to use the admin account.


If *docker* and *docker-compose* are installed you can run the shell script *start.sh*.

```bash
sh start.sh
```

The application interface resides on port *4200*. So point your browser to *http://localhost:4200* to see the application.


If you have trouble with *docker-compose* you can run the containers with just *docker*. The following commands should work in separate terminals.

For the frontend

```bash
cd frontend
docker build -t frontend .
docker run -p 4200:4200 -d frontend
```

And backend

```bash
cd backend
docker build -t backend .
docker run -p 3000:3000 -d backend
```

If you chose not to run the frontend and backend containers you can start the services with node. The following commands should work in separate terminals.

```bash
cd frontend
npm start
```

```bash
cd backend
npm start
```


### Install Before Project Initiation

The following is focused on accessing the postgres database.
- Make sure any local Postgres has been stopped `sudo /etc/init.d/postgresql stop`
- The Postgres table is called *code_challenge*
- Connect to the DB like this `psql -h localhost -U postgres code_challenge`
- Login like this `sudo docker exec -it c16725e60f19 /bin/bash`. I don't think this is necessary as the image doesn't not contain database client software.
