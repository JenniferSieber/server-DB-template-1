// Load env variables
if (process.env.NODE_ENV != 'production') {
  require("dotenv").config();
}

// Import dependencies
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const connectToDb = require('./config/connectToDb');
const examplesController = require('./controllers/routeController');
const usersController = require('./controllers/usersController');
const requireAuth = require('./middleware/requireAuth');

// Create an express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Connect to Database
connectToDb();

//Routing
// User 
app.post('/signup', usersController.signup);
app.post('/login', usersController.login);
app.get('/logout', usersController.logout);
app.get("/check-auth", requireAuth, usersController.checkAuth);


// Example route
app.get('/example', examplesController.fetchExamples);
app.get('/examples/:id', examplesController.fetchExample);
app.post('/examples', examplesController.createExample);
app.put('/examples/:id', examplesController.updateExample);
app.delete('/examples/:id', examplesController.deleteExample);

// Start our Server
app.listen(process.env.PORT);
