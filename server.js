const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse requests
app.use(bodyParser.urlencoded({ extended: false })); // to use the queryString library
app.use(bodyParser.json()); // to only parse json

// Configure the database
const config = require('./config.js');
const mongoose = require('mongoose');

// used to plugin own promise library
mongoose.Promise = global.Promise;

// connecting to the database


// default route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to this example app"});
});

// listen on port 3000
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});