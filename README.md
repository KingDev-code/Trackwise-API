# Trackwise Node.js API

## Overview

This repository contains the Trackwise API developed in Node.js, responsible for project and article management.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Installation and Running Locally

1. Clone the repository:

    ```bash
    git clone https://github.com/KingDev-code/Trackwise-API.git
    cd Trackwise-API
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    npm run start
    ```

4. Access the API at `http://localhost:3000`.

## Running with Docker

1. Clone the repository:
    https://github.com/KingDev-code/Trackwise-API-PHP.git
    ```bash
    git clone https://github.com/KingDev-code/Trackwise-API.git
    git clone https://github.com/KingDev-code/Trackwise-API-PHP.git
    cd Trackwise-API-PHP
    ```

2. Build and start the containers:

    ```bash
    docker-compose up --build
    ```
3. Access the API at `http://localhost:3000` and `http://localhost:8000`. --- reset the node container before testing

## Configuration

### Node.js Configuration

The `config/database.js` file should be configured as follows:

```javascript
const { Sequelize } = require('sequelize');

// Replace 'localhost' with the MySQL service name defined in docker-compose.yml
const sequelize = new Sequelize('user_project_management', 'user', 'password', {
  host: 'db', // MySQL service name in docker-compose.yml
  dialect: 'mysql',
});

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
}

testConnection();

module.exports = sequelize;
