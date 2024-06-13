# Airport Travel Advisor

## Content

1. Description
2. Technical requirements
3. Base URL
4. Endpoints
5. Search algorithm
6. Installation
7. Usage

## Description

This project is a airport travel advisor that helps you to find the best flight for your trip. It provides you with the list of flights available for your trip.

## Technical requirements

- Programming language - Javascript
- Database - PostgreSQL
- Docker

## Base URLs

- Base URL - http://localhost:3000
- API Base URL - http://localhost:3000/api

## Endpoints

### 1. /api/register

- Method - POST
- Description - This endpoint is used to register a new user.
- Request Body -

```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "password"
}
```

- Response Body -

```json
{
  "message": "User registered successfully"
}
```

### 2. /api/login

- Method - GET
- Description - This endpoint is used to login a user.
- Request Body -

```json
{
  "email": "john@gmail.com",
  "password": "password"
}
```

- Response Body -

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjoiMTY3OTMzMTQ1MDI0aCJ9.4d2cdf71-78e57a475bed0bd4414526df-196a8ed6"
}
```

### 3. /api/users

All the endpoints in this section require a valid token in the request header.

- /api/users
  - Method - GET
  - Description - Get list of all users.
  - Response Body -

```json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@gmail.com"
    }
  ]
}
```

- /api/users/{id}
  - Method - GET
  - Description - Get an single user by id.

* Response Body -

```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@gmail.com"
  }
}
```

- /api/users/{id}
  - Method - PUT
  - Description - Update an user by id.

* Request Body -

```json
{
  "name": "John Change",
  "email": "john@gmail.com",
  "password": "password"
}
```

- Response Body -

```json
{
  "message": "User updated successfully"
}
```

- /api/users/{id}
  - Method - DELETE
  - Description - Delete an user by id.

* Response Body -

```json
{
  "message": "User deleted successfully"
}
```

### 4. /api/flights

- /api/flights
  - Method - GET
  - Description - Get list of all flights.
  - Response Body -

```json
{
  "flights": [
    {
      "id": 1,
      "from": "New York",
      "to": "London",
      "departure": "2022-11-11T00:00:00.000Z",
      "arrival": "2022-11-11T12:00:00.000Z",
      "price": 500
    }
  ]
}
```

- /api/flights/{id}
  - Method - GET
  - Description - Get an single flight by id.

* Response Body -

```json
{
  "flight": {
    "id": 1,
    "from": "New York",
    "to": "London",
    "departure": "2022-11-11T00:00:00.000Z",
    "arrival": "2022-11-11T12:00:00.000Z",
    "price": 500
  }
}
```

- /api/flights
  - Method - POST
  - Description - Add a new flight.

* Request Body -

```json
{
  "from": "New York",
  "to": "London",
  "departure": "2022-11-11T00:00:00.000Z",
  "arrival": "2022-11-11T12:00:00.000Z",
  "price": 500
}
```

- Response Body -

```json
{
  "message": "Flight added successfully"
}
```

- /api/flights/{id}
  - Method - PUT
  - Description - Update a flight by id.

* Request Body -

```json
{
  "from": "New York",
  "to": "London",
  "departure": "2022-11-11T00:00:00.000Z",
  "arrival": "2022-11-11T12:00:00.000Z",
  "price": 500
}
```

- Response Body -

```json
{
  "message": "Flight updated successfully"
}
```

- /api/flights/{id}
  - Method - DELETE
  - Description - Delete a flight by id.

* Response Body -

```json
{
  "message": "Flight deleted successfully"
}
```

- /api/flights/search
  - Method - POST
  - Description - Search for flights.

* Request Body -

```json
{
  "from": "New York",
  "to": "London",
  "departure": "2022-11-11T00:00:00.000Z"
}
```

- Response Body -

```json
{
    "flights": [
        {
            "id": 1,
            "from": "New York",
            "to": "London",
            "departure": "2022-11-11T00:00:00.000Z",
            "arrival": "2022-11-11T12:00:00.000Z",
            "price": 500
        },
        [1: {
            "id": 2,
            "from": "New York",
            "to": "Amsterdam",
            "departure": "2022-11-11T00:00:00.000Z",
            "arrival": "2022-11-11T12:00:00.000Z",
            "price": 500
        },
        2: {
            "id": 3,
            "from": "Amstedam",
            "to": "London",
            "departure": "2022-11-11T00:00:00.000Z",
            "arrival": "2022-11-11T12:00:00.000Z",
            "price": 500
        }
        ]
    ]
}
```

## Search algorithm
Algorithm uses Dijkstra's algorithm to find the shortest path between two airports. It returns 5 shortest paths between two airports.


## Installation

Clone the repository and install the dependencies.

```bash
git clone https://github.com/ZZZdreamm/NodeJsCourse.git
cd /Project1
npm install
```

## Usage

Run application in Docker container.

```bash
docker compose up
```

Stop the application.

```bash
docker compose down
```
