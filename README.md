# Code Challenge Notice, Instructions & Rules
Re: Competition "Year 1 - Data Driven Mine Oversight" (the “RFP”)

Government Contact: andrew.l.sutherland@gov.bc.ca 

This notice is dated June 8, 2018 (the “Notice Date”).

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

# Code Challenge (Mines)

## Description

Included are scripts for building and running two Docker containers: 
* A MongoDB database loaded with the sample Northwind data
* A Postgres database loaded with the sample Northwind data

The scripts handle retrieval of the appropriate images, loading of the sample data, and setting of default user credentials.

## Requirements

* Docker

## Getting Started

* Run the included ```start.sh``` script to launch the containers.
* The MongoDB container exposes port 27017 and can be connected to with either the admin account (mongoadmin/1234) or the read-only user account (mongouser/mongouser)
* The Postgres container exposes port 5432 and can be connected to with either the admin account (postgres/postgresadmin) or the read-only user account (pguser/pguser)
* Feel free to change the default admin and user account credentials, but changes will not persist between starting/stopping each container
* You can verify the containers are running using the command ```docker container ls | grep code-challenge``` or by connecting to each one using your favourite client tool (e.g. MongoDB Compass or Postico)

## Code Challenge Instructions

### Introduction

This code challenge asks you to build an application that can query a given database.  The application must be able to query both SQL and non-SQL databases.

The application must allow a user to create and execute a query.  The user must be able to create a query using either the AND (∧) or OR (∨) logical operator to link a series of operands.  Once a user has created a query, the user must be able to execute the query to return a list of items from the database.  The list may be empty. 

Each operand will consist of an attribute, operator and value.  For instance, the expression “Height >= 5” would form a valid operand.  In these instructions, the term “operand” will also be referred to as “query condition”.

The typical user will be someone who is not familiar with Boolean logic.  That is, assume the user does not know the formal meaning of the AND and OR logical operators.

### Query Builder UI Requirements

The application must allow the user to perform the following operations:

1.	Select a logical operator (either AND or OR)
2.	Conjoin any number of operands using the AND operator
3.	Disjoin any number of operands using the OR operator
4.	Perform query on chosen query terms
5.	Return a list of selected items
6.	Clicking on a selected item presents additional detailed item information
7.	Clear the query builder

The application must allow administrators to perform the following operations:

1.	Select a database (either SQL or non-SQL)

### Technical Requirements

Participating teams are not limited to a certain stack or any specific technologies.  We do encourage everyone to use a stack that is commonly used in developing modern web applications.  For instance, a good choice of framework would be Angular or React. 

### User Stories

All of the following user stories must be completed.  They may be completed in any order.

#### User Story #1 – Select a Logical Operator

As a user, I want to be able to create an extended query (that is, connect any number of operands together) by using either the AND or the OR logical operator.

Given that I am viewing the user interface
When I activated the logical operator control
Then the control is set to either “AND” or “OR”

#### User Story #2 – Complete a Query Condition

As a user, I want to be to complete a query condition using any database attribute.  I want the condition’s operators and values to be based on my chosen database attribute’s type.

Given that I have selected a database attribute
When I select an operator 
Then I am present with a list of operators based on the type of the chosen attribute
And When I select a value
Then I am present with a list of values based on the type of the chosen attribute

#### User Story #3 – Add a New Query Condition

As a user, I want to be able to join multiple operands together to form a query.

Given that I have entered one or more query conditions
When I activated the UI control that allows me to add a new query condition
Then I am presented with a UI control that allows me to compose a new query condition by selecting the attribute, operator and value

#### User Story #4 – Delete a Query Condition

As a user, I want to be able to delete a query condition.

Given that I have entered one or more query conditions
When I activated the UI control that allows me to delete a new query condition
Then that query condition is removed from the UI
 
#### User Story #5 – Execute a Query

As a user who has composed my query conditions, I want to be able to execute the query operation on the database.

Given that I have composed a query consisting of one or more query conditions
When I activated the UI control that allows me to execute a query against the database
Then the query is executed

#### User Story #6 – Return a List of Query Results

As a user who has executed a query, I want to be able to view the results returned by the query.

Given that I have executed a query
When the query generates results
Then the list of results is made visible in the UI
And When the query generates no results
Then the UI notifies me that the query did not return any results

#### User Story #7 – Display an Individual Query Result

As a user who has executed a query, I want to be able to view an individual result returned by the query.

Given that I have generated a list of query results
When I select one of the query results
Then I am presented with a view listing the result’s attribute/value pairs

#### User Story #8 – Close Individual Query Result View

As a user, I want to be able to close an individual query results view.

Given that I have opened an individual query results view
When I activate the button that closes the view
Then the view closes
 
#### User Story #9 – Reset Query Builder

As a user, I want to be reset the query builder to start a new query.

Given that I am using the query builder
When I activate the button that resets the query
Then the query builder is reset to its initial condition

#### User Story #10 – Support for Both  SQL and non-SQL Databases

As an administrator, I want to configure the query application to support either a SQL or non-SQL database 

Case #1:
Given that I have selected a SQL database
When the user creates a valid query
Then the application returns a valid result

Case #2:
Given that I have selected a non-SQL database
When the user creates a valid query
Then the application returns a valid result

### REST API Requirements

The query operation must be implemented by making a server-side REST API call to an endpoint with the signature “/query”.

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
