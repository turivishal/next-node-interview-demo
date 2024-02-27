# README #

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

