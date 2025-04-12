The group will develop a User Management System with the following features:

Backend (Node.js + MySQL):
    Email sign-up and verification.
    JWT authentication with refresh tokens.
    Role-based authorization (Admin and User roles).
    Forgot password and reset password functionality.
    CRUD operations for managing accounts (restricted to Admin users).
Frontend (Angular 10/17):
    Email sign-up and verification.
    JWT authentication with refresh tokens.
    Role-based authorization (Admin and User roles).
    Forgot password and reset password functionality.
    Profile management (view and update profile).
    Admin dashboard for managing all accounts (restricted to Admin role).
    Fake backend implementation for backend-less development and testing.

    Create a New Repository on GitHub:

Go to GitHub and create a new repository named user-management-system.
Initialize it with a README.md file and a .gitignore file for Node.js.
Clone the Repository Locally:

Each team member should clone the repository:
git clone https://github.com/Areoneos/user-management-system to an external site.
Set Up Individual Branches:

Each member creates their own branch:
git checkout -b <your-branch-name>
Example branch names:


backend-signup-auth -                       MOLDEZ
backend-authorization-crud -                LUGAY
frontend-signup-auth -                      CABALLES
frontend-profile-admin-fake-backend -       SARMIENTO
tester-functional-testing -                 to be decided
tester-security-testing -                   to be decided



Use the following command to confirm your active branch:
 git branch

 After setting up the project structure.
 We are going to start with the Helpers folder (code snippets that are essential but dont need a folder of their own)

 The db.js works as follows, once the api starts it activates initial code functions like creating a databse if haven't already, connect to database orm, initializes account and tokens, connects to sequelize
 
 ![alt text](dbjs.png)

 Next is role.js this serves as a more clean way of setting up the role function with Admin and User

 ![alt text](role.png)

 next is the send-email.js
 it is used by account service to send account verifications

 ![alt text](send-email.png)
 
 next is the swagger.js
 it is a route handler and is bound to the /api-docs path in the main server.js file 

 ![alt text](swagger.png)

 Now I'm going to start populating the middleware files
 the middleware folder containt files that can be used by different/features within the Node.js boilerplate api.

 I'll start with the authorize.js

 It manages the the validity of authorization requests of the accounts 

 ![alt text](authorize.png)

 Next is the error handler middleware 
 this is used for errorhandling that can be used through the multiple files and to reduce redundant error handling snippets.

 ![alt text](error-handler.png)

 Next is the Validate Request middleware
 this is used by authentication schema in the accounts controller to validate request against schema for a specific route

 Next is the accounts folder wher the main code starts and handles the many functions of the node.js + mysql boilerplate api.
 Lets start with the sequelize account model

 account model uses sequelize to handle CRUD operations 

 ![alt text](account_model.png)
 
 Refresh-Token to define schema for mysql database

 ![alt text](refreshtoken.png)

 Next is the account service where the business logic and functionality can be found 
 CRUD logic in handling accounts
 

