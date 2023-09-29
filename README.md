# Tasks API Server
## Description

Tasks API Server with basic CURD Operations and Report API built in Node.js using Nest.js as the server-side framework written in TypeScript.

- Github Repo: [https://github.com/sivarajng/tasks-api](https://github.com/sivarajng/tasks-api)
- API URL: [http://localhost:3000/api/v1/task?pageSize=5&currentPage=1](http://localhost:3000/api/v1/task?pageSize=5&currentPage=1)
- Swagger API Doc: [http://localhost:3000/api](http://localhost:3000/api)

## Requirements, Goal, Code Quality
- API to create a task.
- API to update a task
- API to get all tasks, make API paginated.
- API to get task metrics like counts tasks on basis of status and timeline Example:
- To create Node APIs and use Database
- To write clean and testable code.
- Check for best practices.
- Write organized and maintainable code.
- Do handle errors, param validations and edge cases.
- To have Testing covered

Tasks API Server with basic CURD Operations and Report API built in Node.js using Nest.js as the server-side framework written in TypeScript.

 ## Tech Stack
 - `Typescript, JavaScript (Language)`
 - `Node.js`
 - `Nest.js (Server Side Framework)`
 - `Prisma (Database ORM)`
 - `Jest (Testing)`
 - `Prettier`, `ESLint`
 - `Swagger API Doc`

## Project Structure
The Project structure consists of below core components:
- Module (Feature Module) [AppModule, TaskModule]
- Controller (API Endpoints) [AppController, TaskController]
- Service (Business Logic) [AppService, TaskService, DatabaseService]

## Installation
You can use `npm` or `yarn` interchangeably.

## Environment Setup
- Install the Node Module dependencies.
```bash
$ npm install
```
- Install the PostgreSQL in the target Environment (can be a local setup or any cloud hosted) and start the DB.
- Update the `.env` file in the root directory accordingly to your local setup for configuring the PostgreSQL connection string. Example:
```bash
DATABASE_URL="postgresql://postgres@localhost:5432/postgres?schema=public"
```

- For simplicity, create the database, table and sample records by copying the SQL COMMANDS from file `data/db.sql` in the root directory and run on the PostgreSQL.

- Run the prisma-generate to create the local ORM bindings from the `schema.prisma` file.
```bash
$ npm run prisma-generate
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# build app
$ npm run build

# production mode
$ npm run start:prod
# Sample service log:
> tasks-api@1.0.0 start:prod
> node dist/main

[Nest] 12212  - 29/09/2023, 4:25:49 pm     LOG [NestFactory] Starting Nest application...
[Nest] 12212  - 29/09/2023, 4:25:49 pm     LOG [InstanceLoader] AppModule dependencies initialized +19ms
[Nest] 12212  - 29/09/2023, 4:25:49 pm     LOG [InstanceLoader] TaskModule dependencies initialized +3ms
[Nest] 12212  - 29/09/2023, 4:25:49 pm     LOG [RoutesResolver] AppController {/}: +98ms
[Nest] 12212  - 29/09/2023, 4:25:49 pm     LOG [RouterExplorer] Mapped {/, GET} route +3ms
[Nest] 12212  - 29/09/2023, 4:25:49 pm     LOG [RoutesResolver] TaskController {/api/v1/task}: +1ms
[Nest] 12212  - 29/09/2023, 4:25:49 pm     LOG [RouterExplorer] Mapped {/api/v1/task/report, GET} route +1ms
[Nest] 12212  - 29/09/2023, 4:25:49 pm     LOG [RouterExplorer] Mapped {/api/v1/task, GET} route +0ms
[Nest] 12212  - 29/09/2023, 4:25:49 pm     LOG [RouterExplorer] Mapped {/api/v1/task/:id, GET} route +1ms
[Nest] 12212  - 29/09/2023, 4:25:49 pm     LOG [RouterExplorer] Mapped {/api/v1/task, POST} route +1ms
[Nest] 12212  - 29/09/2023, 4:25:49 pm     LOG [RouterExplorer] Mapped {/api/v1/task/:id, PUT} route +1ms
[Nest] 12212  - 29/09/2023, 4:25:49 pm     LOG [RouterExplorer] Mapped {/api/v1/task/:id, DELETE} route +0ms
[Nest] 12212  - 29/09/2023, 4:25:50 pm     LOG [NestApplication] Nest application successfully started +219ms
```

## Running Tests

```bash
# =========================================================
# unit tests
# =========================================================
$ npm run test
# sample unit test report
> tasks-api@1.0.0 test
> jest

 PASS  src/task/service/task.service.spec.ts (5.382 s)
 PASS  src/app.controller.spec.ts (5.971 s)       
 PASS  src/task/controller/task.controller.spec.ts (6.424 s)

Test Suites: 3 passed, 3 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        7.311 s
Ran all test suites.

# =========================================================
# e2e tests
# =========================================================
$ npm run test:e2e
# sample e2e test report
> tasks-api@1.0.0 test:e2e
> jest --config ./test/jest-e2e.json

 PASS  test/app.e2e-spec.ts (6.356 s)
  AppController (e2e)
    √ / (GET) -> 200 (68 ms)
    √ Get All Tasks -> 200 (54 ms)
    √ Get non-existent Task id -> 404 (not found) (20 ms)
    √ Get All Tasks Paginated Check (without page params)-> 400 (13 ms)
    √ Get All Tasks Paginated Check -> 200 (19 ms)
    √ Create and Delete Task -> 200, 201 (85 ms)
    √ Delete non-existent Task id -> 404 (not found) (25 ms)
    √ Update non-existent Task id -> 404 (not found) (21 ms)
    √ get invalid task id -> 400 (6 ms)
    √ delete invalid task id -> 400 (12 ms)
    √ update invalid task id -> 400 (10 ms)
    √ update task with invalid status -> 400 (7 ms)
    √ get task report with invalid date param (1) -> 400 (11 ms)
    √ get task report with invalid date param (2) -> 400 (7 ms)
    √ Get All Tasks with out of range Pagination -> 200, return empty (10 ms)
    √ Create Task with Invalid Status -> 400 (14 ms)
    √ Update Task with Invalid Status -> 400 (6 ms)

Test Suites: 1 passed, 1 total
Tests:       17 passed, 17 total
Snapshots:   0 total
Time:        6.639 s, estimated 7 s
Ran all test suites.

# =========================================================
# test coverage
# =========================================================
$ npm run test:cov
# sample test coverage report
> tasks-api@1.0.0 test:cov
> jest --coverage

 PASS  src/task/service/task.service.spec.ts (13.103 s)
 PASS  src/app.controller.spec.ts (14.093 s)      
 PASS  src/task/controller/task.controller.spec.ts (14.296 s)
---------------------|---------|----------|---------|---------|-------------------
File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------------|---------|----------|---------|---------|-------------------
All files            |   64.44 |    30.76 |   63.88 |    64.8 |                   
 src                 |   41.37 |      100 |      75 |   38.46 |                   
  app.controller.ts  |     100 |      100 |     100 |     100 |                   
  app.module.ts      |       0 |      100 |     100 |       0 | 1-11              
  app.service.ts     |     100 |      100 |     100 |     100 | 
  main.ts            |       0 |      100 |       0 |       0 | 1-19
 src/config          |   89.47 |      100 |   66.66 |   89.47 | 
  index.ts           |     100 |      100 |     100 |     100 | 
  validation.ts      |   88.23 |      100 |   66.66 |   88.23 | 22-23
 src/database        |   66.66 |      100 |       0 |      60 | 
  database.ts        |   66.66 |      100 |       0 |      60 | 10-14
 src/task            |     100 |      100 |     100 |     100 | 
  task.module.ts     |     100 |      100 |     100 |     100 | 
 src/task/controller |   78.04 |       25 |   76.47 |   83.78 | 
  task.controller.ts |   78.04 |       25 |   76.47 |   83.78 | 43,87-89,101-102 
 src/task/service    |   47.05 |       40 |      50 |   45.45 | 
  task.service.ts    |   47.05 |       40 |      50 |   45.45 | 15-71,103        
---------------------|---------|----------|---------|---------|-------------------

Test Suites: 3 passed, 3 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        22.298 s
Ran all test suites.
```

## Linting (eslint) and Formatting (prettier)
- Whenever you modify the code, please run the below commands to format and lint the code.
```bash
# format code
$ npm run format

# lint
$ npm run lint
```

## Swagger: API Documentation
- Tasks API Documentation - [http://localhost:3000/api](http://localhost:3000/api)


## Sample API Requests and Responses
- You can find all example API requests in the `api.http` file as well as below.
- This document provides information about the available API endpoints and their usage for the Tasks API Service.
- All API requests should be made to the following base URL: http://localhost:3000/api/v1

```http
@url = http://localhost:3000/api/v1

### Get All Tasks with pagination
GET {{url}}/task?pageSize=2&currentPage=1 HTTP/1.1
content-type: application/json

# Sample Response:
[
  {
    "id": 1,
    "task": "Get All Tasks with pagination",
    "status": "OPEN",
    "created_on": "2023-09-29T00:00:00.000Z",
    "modified_on": "2023-09-29T00:00:00.000Z"
  },
  {
    "id": 2,
    "task": "Create API Documentation", 
    "status": "OPEN",
    "created_on": "2023-09-29T00:00:00.000Z",
    "modified_on": "2023-09-29T00:00:00.000Z"
  }
]


### Get Task by Id
GET {{url}}/task/1 HTTP/1.1
content-type: application/json

### Create Task
POST {{url}}/task HTTP/1.1
content-type: application/json

{
    "task": "Create Example APIs"
}

### Update Task by Id
PUT {{url}}/task/3 HTTP/1.1
content-type: application/json

{
    "task": "This is updated task",
    "status": "IN_PROGRESS"
}

### Delete Task by Id
DELETE  {{url}}/task/3 HTTP/1.1
content-type: application/json

### Get Task Report which will return the task count for each month
GET {{url}}/task/report?startMonth=2023-01&endMonth=2023-09 HTTP/1.1
content-type: application/json

### Delete Task by Id (Invalid Task Id)
DELETE  {{url}}/task/50 HTTP/1.1
content-type: application/json

Response:
{
  "message": "Not Found",
  "statusCode": 404
}

### Update Task by Id (Invalid Status)
PUT {{url}}/task/1 HTTP/1.1
content-type: application/json

{
    "task": "This is updated Task",
    "status": "ABC"
}

Response:
{
  "message": [
    "status shoule be one of 'OPEN', 'IN_PROGRESS', 'COMPLETED'"
  ],
  "error": "Bad Request",
  "statusCode": 400
}

### Get Task Report which will return the task count for each month
GET {{url}}/task/report?startMonth=2023-07&endMonth=2023-09 HTTP/1.1
content-type: application/json

Sample Response:
[
  {
    "date": "July 2023",
    "metrics": {
      "open_tasks": 3,
      "inprogress_tasks": 0,
      "completed_tasks": 1
    }
  },
  {
    "date": "August 2023",
    "metrics": {
      "open_tasks": 1,
      "inprogress_tasks": 2,
      "completed_tasks": 2
    }
  },
  {
    "date": "September 2023",
    "metrics": {
      "open_tasks": 6,
      "inprogress_tasks": 3,
      "completed_tasks": 2
    }
  }
]

```

## Stay in touch or for any queries

- Author - [Sivaraj Nagaraj](https://sivarajng.github.io/resume)