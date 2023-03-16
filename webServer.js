'use strict';


var express = require('express');
var portno = 3000;   // Port number to use

var app = express();

//database connection required libraries
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const session = require('express-session');
// const config = require('dotenv').config();

//middleware definitions
//defines static files in taak static directory
app.use(express.static(__dirname));

//defines body-parser when json
app.use(bodyParser.json());

//middleware access
app.use(session({
  secret: 'PASSWORD',
  resave: false,
  saveUninitialized: false
}));

//connects to db using .env DB, useNewUrlParser, useUnifiedTopology are warning removers when connection is made
mongoose.connect('mongodb://localhost:27017/',{useNewUrlParser: true, useUnifiedTopology: true});

//checks DB connection, and outputs DB 
mongoose.connection.on('connected', function () {
  console.log("DB Sucessfully Connected")
});




var taskModels = require('./modelData/kanbanApp.js').taskModels;

app.use(express.static(__dirname));

app.get('/api/tasks', function (request, response) {
  response.status(200).send(taskModels.taskListModel());
  return;
});

app.get('/api/task-types', function (request, response) {
  response.status(200).send(taskModels.taskTypeListModel());
  return;
});

var server = app.listen(portno, function () {
  var port = server.address().port;
  console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});
