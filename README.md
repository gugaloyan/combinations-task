# Combinations Task

## Project Description
This project is a Node.js application that generates item combinations and stores them in a MySQL database using transactions. It provides an API to generate combinations and retrieve stored responses.

## Features
- Generates combinations from provided items.
- Uses MySQL for data storage.
- Handles transactions when inserting data.
- Provides API endpoints for interaction.
- Runs in a Dockerized MySQL environment.

## Technologies Used
- Node.js
- Express.js
- TypeScript
- MySQL (using `mysql2` package)
- Docker
- dotenv (for environment variables)

## Installation

### Prerequisites
- Node.js & npm installed
- Docker installed

### Clone the repository
```sh
git clone git@github.com:gugaloyan/combinations-task.git
cd combinations-task
```

### Install dependencies
```sh
npm install
```

## Running the Project

### Start MySQL in Docker
Run the following command to start a MySQL container:
```sh
docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=123 -e MYSQL_DATABASE=combinations_db -p 3306:3306 -d mysql:latest
```

### Set Up Environment Variables
Create a `.env` file in the root directory with the following content:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123
DB_NAME=combinations_db
DB_PORT=3306
PORT=4000
```

### Start the Server
Run the development server with:
```sh
npm run dev
```

The server will start on `http://localhost:4000`.


## API Routes

### Generate Combinations
**Endpoint:**
```
POST /api/generate
```

**Request Body:**
```json
{
  "items": ["A", "B", "C"],
  "length": 2
}
```

**Response:**
```json
{
  "items": ["A", "B", "C"],
  "combinations": [["A", "B"], ["A", "C"], ["B", "C"]],
  "totalCombinations": 3,
  "createdAt": "2025-02-07T12:00:00.000Z"
}
```

## Author
Gurgen Aloyan

