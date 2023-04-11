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

//uncomment for DB connection

//middleware definitions front end (back end sim)
//defines static files in taak static directory
/*--------------------------------------------------------------------------- */
var taakmodels = require('./models/tasksTestData').taakmodels

app.use(express.static(__dirname));
app.get('/api/tasks', function(req, res){
  res.status(200).send(taakmodels.tasksModel())
})
app.get('/api/users', function(req, res){
  res.status(200).send(taakmodels.usersModel())
})
app.get('/api/proj-team', function(req, res){
  res.status(200).send(taakmodels.projTeamModel())
})
app.get('/api/sprints', function(req, res){
  res.status(200).send(taakmodels.sprintsModel())
})
app.get('/api/authentication', function(req, res){
  res.status(200).send(taakmodels.authenticationModel())
})
app.get('/api/announcements', function(req, res){
  res.status(200).send(taakmodels.announcementsModel())
})
app.get('/api/task-types', function(req, res){
  res.status(200).send(taakmodels.taskTypesModel())
})
/*--------------------------------------------------------------------------- */
//defines body-parser when json
app.use(bodyParser.json());

//middleware access
app.use(session({
  secret: 'PASSWORD',
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
