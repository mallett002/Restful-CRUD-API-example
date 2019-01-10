const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse requests
app.use(bodyParser.urlencoded({ extended: false })); // to use the queryString library
app.use(bodyParser.json()); // to only parse json

// Enable CORS for all HTTP methods
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Configure the database
const config = require('./config.js');
const mongoose = require('mongoose');

// call product.routes, passing it the app
require('./product.routes.js')(app);

// used to plugin own promise library
mongoose.Promise = global.Promise;

// connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
})

// default route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to this example app"});
});

// listen on port 3000
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});