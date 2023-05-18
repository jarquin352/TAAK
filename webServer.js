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


