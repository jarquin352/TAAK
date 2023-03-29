'use strict';


var express = require('express');
var portno = 3000;   // Port number to use

var app = express();

//database connection required libraries
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('dotenv').config();

//middleware definitions
//defines static files in taak static directory
app.use(express.static(__dirname));

//defines body-parser when json
app.use(bodyParser.json());

//middleware access
app.use(session({
  secret: '',
  resave: false,
  saveUninitialized: false
}));

//connects to db using .env DB, useNewUrlParser, useUnifiedTopology are warning removers when connection is made
mongoose.connect(config.parsed.DB,{useNewUrlParser: true, useUnifiedTopology: true});

//checks DB connection, and outputs DB 
mongoose.connection.on('connected', function () {
  console.log("DB Sucessfully Connected")
});

//node webserver instance
var server = app.listen(portno, function () {
  var port = server.address().port;
  console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});
