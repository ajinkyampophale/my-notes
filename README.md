Curd Operations MongoDb along with authentication and authorization.

This app includes curd operation's create(post), read(get), update(put) and delete(delete) built with Node.js and Mongodb Databases using component based architecture. 
It also includes authentication and authorization of user using JWT token.
There is no frontend for this app only api call's (Use Postman to test).

Requirement:

  1. Node js
  2. MongoDB
  3. Postman (Optional to test)

Steps To Run:

  1. Download the project
  2. Change Directory (cd) to the folder where you have downloaded the project.
  3. Run following command (npm install) to install the dependencies.
  4. Database connection along with other configuration can be found in "config/default.json" file.
  5. Make sure to start mongo demon (mongod). That's it now run "npm run dev" in your terminal and test using postman.

Folder Structure: 

  0. index.js => Entry Point (Contains all the basic app settings).
  1. config => Contains project configurations.
  2. db => Contains database connection.
  3. helpers => Contains common files and functions.
  4. keys => Contains private and public keys for creating token using JWT (RSA algorithm).
  5. logs => Contains log files which are created on daily bases using Winston and Winston-Daily-Rotate-File.
  6. middlewares => Contains all the custom middlewares example authentication (auth), response middleware etc.
  7. models => Contains mongoose schemas and models.
  8. routes => Contains all the routing files.
  9. validation => Contains all the validation files uses Joi for validation.

Modules Used:
  
  1. app-rrot-path => For getting root path of app.
  2. config => For configuration setting of the app.
  3. crypto-js => For encryption, decryption and hashing purposes.
  4. express => Used as a framework.
  5. joi => For validating incoming data.
  6. jsonwebtoken => For authetication by creating tokens.
  7. moment => For date format conversion.
  8. mongoose => As an ODM for mongodb.
  9. winston => For creating log files.
  10. winston-daily-rotate-file => For creating log files on daily basis.

Flow of the Project => 

  1. /users/register => Register a new user.
  2. /users/login => Login with the registered users credentials. (Gives back a token in response header "X-Auth-Token")
  3. All the below routes are protected using tokens so you will require token to access the below routes.
  4. How to send token? => In the headers give key name as "Authorization" and value as token value which you get after login "X-Auth-Token" value.
  5. /notes/get => Get all the notes of the logged in user.
  6. /notes/create => Create new notes.
  7. /notes/createMultiple => Create multiple notes at a time.
  8. /notes/update => Update existing notes.
  9. /notes/updateMultiple => Update multiple notes.
  10. /notes/delete => Delete notes.
  11. /notes/deleteMultiple => Delete multiple notes.
  
Build With:

  1. Node.js
  2. Express.js
  3. Mongodb

PS: Have kept public.pem, private.pem and default.json files without excluding for ease of understanding.
