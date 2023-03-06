'use strict';


var express = require('express');

var portno = 3000;   // Port number to use

var app = express();

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
