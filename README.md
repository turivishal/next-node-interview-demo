# Task Management System
- [Definition](#definition)
- [Technology Stack](#technology-stack)
- [Database Modeling](#database-modeling)
  - [User Schema](#user-schema)
    - [Index Strategy](#index-strategy)
  - [Task Schema](#task-schema)
    - [Index Strategy](#index-strategy-1)
- [Project's File Structure](#projects-file-structure)
- [How to Run?](#how-to-run)
  - [1. (optional) Configuration / Environment Setup](#1-optional-configuration--environment-setup)
  - [2. (required) Install Dependencies](#2-required-install-dependencies)
  - [3. (required) Run the project](#3-required-run-the-project)
  - [4. Swagger: Open in the browser](#4-swagger-open-in-the-browser)
  - [5. Task Board UI real-time socket updates](#5-task-board-ui-real-time-socket-updates)
- [Missing](#missing)
- [Final Thoughts](#final-thoughts)

## Definition

- A user can register via details (Full Name, User ID - for login, and Password)
- A user can login via (User ID and Password)
- The successful login will generate an Auth Token (JWT), encrypted sign key, and payload (User Unique _id, and Full Name)
- User can perform the below operations after login means needs to pass JWT Auth Token in headers:
  - User can see own profile details
  - User can create a task via details:
    - Title
    - Description
    - Stage - (Pending, Active, Completed, Hold)
    - Assign to a Member/User
  - User can modify a task
    - A Task owner/creator can modify the task!
  - User can delete a task
    - A Task owner/creator can modify the task!
  - User can change the status/stage of a task
    - A Task owner/creator can change the status/stage of the task!
    - An assigned member / Associated user can change the status/stage of the task!
  - User can assign the task to the team member
    - A Task owner/creator can assign the task to another member or can change the assignment!
  - User can show a list of tasks
    - Everyone can see the tasks list
  - Notify or update the listed tasks on the client side when any action occurs related to the task (Via socket)
    - Whenever a user/member opens the task board page, it will automatically connect with the socket (JWT Auth Required), They will get task updates in real-time via the connected socket.

## Technology Stack
- Node - v20.11.1
- NPM - v8.3.0 
- Express - v4.18.2
- Mongo - v5.5+
- Socket.io - v4.7

## Development Time:
- Start Date - 26 Feb 2024, 02:24:00PM (IST)
- End Date - 26 Feb 2024, 12:30AM (IST)
- Total Time - Approx 6 Hours

## Database Modeling:
Currently, we have to design 2 entities (User and Task).

  ### User Schema 
  As described in the Definition section, User requires these details (Full Name, User ID - for login, and Password).
  ```
  {
    "_id": { "$oid": "<User's unique id>" },
    "fullName": "<User's full name>",
    "userName": "<Unique User Name for Login>",
    "password": "<password hash>",
    "status": <User's active status, 0 = Inactive, 1 = Active, 2 = Soft Deleted>,
    "createdAt": { "$date": "<created date and time in ISO format>" },
    "updatedAt": { "$date": "<updated date and time in ISO format>" }
  }
  ```
  #### Index Strategy
  We can put the MongoDB index on the below fields as per the usage:
  - Unique index on `userName` property.

  ### Task Schema
  As described in the Definition section, Task requires these details (Title, Description, Stage - (Pending, Active, Completed, Hold), Assigned to a Member/User).
  ```
  {
    "_id": { "$oid": "<Task's unique id>" },
    "title": "Task Title",
    "description": "Task Description",
    "stage": {
      "status": <Task stage/status: 1 = Pending, 2 = Active, 3 = Completed, 4 = Hold>,
      "updatedAt": { "$date": "<updated date and time in ISO format>" },
      "updatedBy": {
        "_id": { "$oid": "<User's unique id from auth User Schema>" },
        "fullName": "<User's full name from User Schema>"
      }
    },
    "assignedTo": {
      "_id": { "$oid": "<User's unique id from auth User Schema>" },
      "fullName": "<User's full name from User Schema>",
      "updatedAt": { "$date": "<updated date and time in ISO format>" }
    },
    "createdBy": {
      "_id": { "$oid": "<User's unique id from auth User Schema>" },
      "fullName": "<User's full name from User Schema>"
    },
    "status": <Task's active status, 0 = Inactive, 1 = Active, 2 = Soft Deleted>,,
    "createdAt": { "$date": "<created date and time in ISO format>" },
    "updatedAt": { "$date": "<updated date and time in ISO format>" }
  }
  ```
  #### Index Strategy
  We can put the MongoDB index on the below fields as per the usage:
  - A compound index in the sequence of the ESR rule (status 1, createdBy._id 1, assignedTo._id, createdAt -1).

## Project's File Structure
```bash
package.json               # Package file
app.js                     # Main file to run
swagger.json               # Swagger default configurations
.env                       # Expose environment file
.gitignore                 # Git ignore
LICENSE                    # License
README.md                  # Readme
config                         # Config files as per the environment, can be created as needed
   |-- dev.yml                 # Development environment
   |-- local-dev.yml           # Local development environment
   |-- staging.yml             # Staging development environment
initializer                             # Initializers, this will initialize the default settings runtime
   |-- index.js                         # This will execute all initializers
   |-- db.initializer.js                # Initialize and connect the MongoDB
   |-- global.initializer.js            # Setup global variables
   |-- logging.initializer.js           # Log settings
   |-- route.initializer.js             # Route setup
   |-- server.initializer.js            # Server connection
   |-- socket.initializer.js            # Socket connection
   |-- swagger.initializer.js           # Swagger setup and initialize
   |-- validation.initializer.js        # Validation setup
app                                        # Main directory, includes all modules API logics
   |-- app.route.js                        # This will initialize all modules' route
   |-- auth                                # Auth / User Module
   |   |-- auth.controller.js                # Auth Controller
   |   |-- auth.model.js                     # Auth Model
   |   |-- auth.route.js                     # Auth Route
   |   |-- auth.service.js                   # Auth Service
   |   |-- auth.validate.js                  # Auth Validation
   |-- task                                # Task Module
   |   |-- task.controller.js                # Task Controller
   |   |-- task.model.js                     # Task Model
   |   |-- task.route.js                     # Task Route
   |   |-- task.service.js                   # Task Service
   |   |-- task.validate.js                  # Task Validation
   |-- socket                              # Socket Module
   |   |-- socket.js                         # Socket File
   |-- taskBoard                           # Task Board UI Module - EJS
   |   |-- taskBoard.controller.js           # Task Controller
   |   |-- taskBoard.route.js                # Task Route
   |-- noRoute                             # No Route Module - Redirect unknown calls
   |   |-- noRoute.controller.js             # No Route Controller
   |   |-- noRoute.route.js                  # No Route Route
language                               # Language - Response Messages
   |-- response-message.yaml           # Response Messages
middleware                          # Middlewares
   |-- auth.middleware.js           # Auth Middleware
   |-- cors.middleware.js           # CORS Middleware
   |-- error.middleware.js          # Error Middleware
   |-- security.middleware.js       # Security Middleware
   |-- swagger-auth.middleware.js   # Swagger Authentication Middleware
   |-- validation.middleware.js     # Validation Middleware
util                                  # Utilities
   |-- general.helper.js              # Geleral Helper
   |-- joi.helper.js                  # Joi Validation Helper
   |-- message.helper.js              # Message Helper
   |-- mongo.repository.helper.js     # Mongo Helper
   |-- response.helper.js             # Response Helper
   |-- yaml.helper.js                 # yaml config files helper
public                          # EJS to run task board UI
   |-- taskBoard                # Task Board Module
   |   |-- index.html           # Main file
   |   |-- polyfill.min.js      # Support Browers
   |   |-- script.js            # Script
   |   |-- style.css            # CSS
docs                         # Docs for references
   |-- Backend Task.docx     # Task definition file
```

## How to Run?
We have used express.js with javascript, so it will be easy to execute and run quickly with no time in just a few steps.
For quick settings, you can just focus on (required) marked things only, and ignore (optional) ones.
### 1. (optional) Configuration / Environment Setup
  - We will run `dev` environment, and make sure the `.env` file has:
    ```bash
    NODE_ENV=dev
    PROFILE=dev
    ```
  - So the above environment will load `config/dev.yaml` file settings.
  - Change the required settings if you want to otherwise no need to change:
    - `server.port: 3015`: you can change the port if you want.
    - `mongodb.uris`: There is already my MongoDB connection URL, you can change it as you want with the database name `TMS`.
    - `log`: Logging settings for info, error or exceptions.
    - `routes`: Routes settings with payload and request size, and cors settings, you can add your domains.
    - `gateway_auth`: Can change the secret that will generate the JWT, expiration time (24 hours).
    - `swagger`: Swagger authentication details
    - `socket`: Socket path, you can change as you want by default is `/tms`
### 2. (required) Install Dependencies
Install dependencies using the below command in your terminal:
```bash
npm install
```
### 3. (required) Run the project
- Run the project by executing the below command in your terminal:
  ```bash
  node app.js
  ```
- The successful run command will show the below information logs in the terminal:
  ```bash
  $ node app.js
  info: We are working on DEV environment and Listening on port 3015... {"timestamp":"2024-02-27 10:02:11:960"}
  info: MDB connection succeeded! {"timestamp":"2024-02-27 10:02:12:128"}
  ```
### 4. Swagger: Open in the browser
- Now we have integrated swagger as well to manage our API with authentication, 
  ```
  http://localhost:3015/api-docs/<swagger username>/<swagger password>/
  ```
- We have default swagger's user name and password, You need to open the below URL in the browser: <br>
  [http://localhost:3015/api-docs/DemoUser/DemoPass/](http://localhost:3015/api-docs/DemoUser/DemoPass/)
- It will open the swagger as per the below screenshot:

  ![image](https://github.com/turivishal/next-node-interview-demo/assets/10988772/34499e6d-b6ed-4c7a-90d6-7df0635d6b59)

- Auth / User API Section:
  
  ![image](https://github.com/turivishal/next-node-interview-demo/assets/10988772/5e520190-86a4-45ff-9b64-b2f15b3a162b)

- Task API Section

  ![image](https://github.com/turivishal/next-node-interview-demo/assets/10988772/daf3d94b-02d0-4527-b23f-cd0f2301da5f)

- To use Task API, you need to register and login first, the successful login response will provide an Auth Token.
- To set the Auth Token you need to copy the Auth Token and paste it into this input:

  ![image](https://github.com/turivishal/next-node-interview-demo/assets/10988772/b96b89d8-9f48-4eb1-9d8c-194a212453e6)

  ![image](https://github.com/turivishal/next-node-interview-demo/assets/10988772/f59e933d-1061-4f89-a67f-1804ae6dd52a)

### 5. Task Board UI real-time socket updates
- I have developed a socket client using HTML, CSS, and javascript using the express ejs HTML engine.
- Before running you need to set a few things in that `public/taskBoard/script.js` file:
  ```
  // INITIALIZE
  const host = 'http://localhost:3015', // Connection URL, Make sure if you have changed the port then you have to change it here.
        socketPath = '/tms', // This is the default one, if you have already changed the socket path in the config file then you have to change it here for the connection
        authToken = 'Bearer <Auth Token>'; // Put the auth token after successful login
  ```
- After the above configuration, you need to open the below URL in your browser: <br>
  [http://localhost:3015/taskBoard/](http://localhost:3015/taskBoard/)

- It will look like this:

  ![image](https://github.com/turivishal/next-node-interview-demo/assets/10988772/78e74625-7ff6-4f32-9fba-3636241d7ce1)

- Now whenever the tasks API executes it pushes the actions on Actions sections in real-time:

  ![image](https://github.com/turivishal/next-node-interview-demo/assets/10988772/e087dfa3-1f98-4817-98e1-74e57bd72b27)

## Missing
- **rate-limiting mechanism**: Well I tried my best to cover everything, but I missed the "rate-limiting mechanism" because of a lack of time, it is easy to implement through `express-rate-limit` middleware and we can configure our settings.
- **Task Board UI Design**: The UI is not good because of a lack of time, i tried to cover the functionality.

# Final Thoughts
I hope I have understood the definition properly, as I tried my best to complete everything. Please let me know if you need any explanation or if anything looks hard to understand.
