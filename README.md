# Task Management System

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
1. Configuration / Environment Setup

2. Install Dependencies
3. Run the project
4. Swagger: Open in the browser
5. Task Board UI real-time socket updates

