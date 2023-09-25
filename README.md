# server-DB-template-1
Basic template for Server connecting to localhost and MongoDB--Node.js, Mongoose, Express, CRUD beginning

INSTALLS for Server Side:

npm init -y

npm install --save express mongoose dotenv nodemon

npm install --save cors

Password Encryption, WebToken and Cookie Parser:
npm install --save bcryptjs

bcryptjs npmjs link for docs:  https://www.npmjs.com/package/bcryptjs

npm install --save jsonwebtoken

json web token link for docs: https://www.npmjs.com/package/jsonwebtoken

npm install --save cookie-parser

cookie parser link for docs: https://www.npmjs.com/package/cookie-parser
#######
.env file Example not seen:
PORT=3000

DB_URL=mongodb+srv://your-url-here

SECRET=example!random!string!equals!D3LFJ54557LVR55667ERECUSSU

.gitignore file Example not seen:

add .env file to .gitignore
.env 

.DS_Store

node_modules



