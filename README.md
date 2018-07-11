# Code Challenge Notice, Instructions & Rules

Re: Competition "The Sprint with Us Code Challenge" (the Mock Sprint with Us Code Challenge)

Quartech Contact/Product Owner: brad.head@gmail.com 

This notice is dated July 11, 2018 (the “Notice Date”).

Congratulations - you are eligible to participate in this Mock Code Challenge.

## Rules and Instructions

Please be advised of the following rules and instructions:

1. These code challenge rules and instructions apply only to selected participants.
2. The participants will have no less than five (5) Business Days from the Notice Date to complete the code challenge. The deadline to complete the code challenge in accordance with these rules is 2:00 p.m. Pacific Time on Thursday, July 19, 2018 (the “Deadline”).
3. The participants code challenge submission Deliverable (defined below) must be received by QSL (as provided for by these instructions) and be deposited and located in the applicable Repository before the Deadline.
4. Only the invited Participants are eligible to participate in the Code Challenge.
5. The Participants will be sent invites via GitHub to join this private repository (https://github.com/Quartech/QSLContacts). 
6. As of the Notice Date, the code challenge issue has been created in this private repository (https://github.com/Quartech/QSLContacts), under the "Quartech" organization.
7. Participants may direct clarifying questions to QSL Contact - Brad Head at any time.

# Code Challenge (QSL Contacts App)

## Description

The task is to provide useful access to the Open Data BC Government Directory that is available in XML form. Useful access includes web access on both desktop and mobile platforms.

## Requirements

* Docker
* Node.JS

## Code Challenge Instructions

### Introduction

This code challenge asks you to build an application that fetches the BC Government Directory XML document from DataBC.  The application must be able to convert the XML, enable search and display on screen (big and little) and to all the exporting of contact information as a VCard 3.0 file.

The application must allow a user to find a contact by at least name or partial name.  The user must also be able to filter contacts by organization.
The application must support sorting contacts by surname, by default.

The url to the xml file, which the government updates daily is: http://dir.gov.bc.ca/downloads/BCGOV_directory.xml

### Technical Requirements

Participating teams are not limited to a certain stack or any specific technologies.  We do encourage everyone to use a stack that is commonly used in developing modern web applications.

### User Stories

The initial backlog consists of the following user stories.  The stories are in the current priority order of the Product Owner.

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

### Submission Requirements

1. The submission must be capable of running on any docker-enabled platform
2. Users must be able to run the application on modern browsers, including Microsoft Internet Explorer 11.0 and up.
3. You must update the repository’s README file to include any instructions required for the code challenge evaluators to build and run your team’s application.
