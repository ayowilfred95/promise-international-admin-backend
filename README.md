# School Admin Portal - Backend

Welcome to the backend part of the School Admin Portal located in Onitsha, Nigeria. This portal is designed to streamline administrative tasks such as registering teachers and students, assigning courses, and managing student results.

## Features

### Admin Dashboard
- Allows administrators to register teachers and students.
- Facilitates assigning courses to teachers.

### Teacher Dashboard
- Teachers can view their assigned subjects.
- Enables teachers to register marks for students.

### Students' Portal
- Provides students access to their results.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js
- **Database**: PostgreSQL
- **Deployment**: True-host

## Usage

To run this project locally, follow these steps:

1. Ensure you have Node.js installed on your machine.
2. Clone this repository.
3. Navigate to the project directory.
4. Run `npm install` or `yarn install` to install dependencies.
5. Start the development server using `npm start` or `yarn start`.

### Database Setup

- This project uses MySQL database.
- Ensure you have Docker installed.
- To spin up the Database server, run `docker-compose up -d`.
- To close the database, run `docker-compose down`.
- Connect the database and grant access to all users before starting the server.

> Note: Postgres database is used for testing purposes. You can use any database of your choice, such as MySQL.


