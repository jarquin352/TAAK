var express = require('express');
var portno = process.env.PORT || 3000;   // Port number to use
const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');
mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('dotenv').config();

const MongoDBStore = require("connect-mongodb-session")(session)


mongoose.connect(config.parsed.DB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("open", function () {
  console.log("DB connected successfully");
});


var app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());

// app.use(
//   session({ secret: config.parsed.SECRET_KEY, resave: false, saveUninitialized: false })
// );

app.use(
  session({
    name: 'cookie-name',
    secret: 'password',
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: false,
      maxAge: 3600000,
      secure: false
    },
    store: new MongoDBStore({
        uri: config.parsed.DB,
        collection: 'sessions'
    }),
    
  })
);

const apiRoutes = require('./routes/api.js');

app.use('/api', apiRoutes);


var server = app.listen(portno, function () {
  var port = server.address().port;
  console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});


//uncomment for DB connection

//middleware definitions front end (back end sim)
//defines static files in taak static directory
/*--------------------------------------------------------------------------- */
// var taakmodels = require('./models/tasksTestData').taakmodels

// app.use(express.static(__dirname));
// app.get('/api/tasks', function(req, res){
//   res.status(200).send(taakmodels.tasksModel())
// })
// app.get('/api/users', function(req, res){
//   res.status(200).send(taakmodels.usersModel())
// })
// app.get('/api/proj-team', function(req, res){
//   res.status(200).send(taakmodels.projTeamModel())
// })
// app.get('/api/sprints', function(req, res){
//   res.status(200).send(taakmodels.sprintsModel())
// })
// app.get('/api/authentication', function(req, res){
//   res.status(200).send(taakmodels.authenticationModel())
// })
// app.get('/api/announcements', function(req, res){
//   res.status(200).send(taakmodels.announcementsModel())
// })
// app.get('/api/task-types', function(req, res){
//   res.status(200).send(taakmodels.taskTypesModel())
// })
/*--------------------------------------------------------------------------- */
//defines body-parser when json
// app.use(bodyParser.json());

// //middleware access
// app.use(session({
//   secret: 'PASSWORD',
//   resave: false,
//   saveUninitialized: false
// }));

// //connects to db using .env DB, useNewUrlParser, useUnifiedTopology are warning removers when connection is made
// mongoose.connect(config.parsed.DB,{useNewUrlParser: true, useUnifiedTopology: true});

// //checks DB connection, and outputs DB 
// mongoose.connection.on('connected', function () {
//   console.log("DB Sucessfully Connected")
  

// });

// //node webserver instance
// var server = app.listen(portno, function () {
//   var port = server.address().port;
//   console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
// });