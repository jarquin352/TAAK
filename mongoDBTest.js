// const mongoose = require('mongoose');
// const Users = require('./models/dataSchema.js');
// const config = require('dotenv').config();

// const connect = mongoose.connect('mongodb+srv://taakdb:taakdb@taak.d7e4se5.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})

// // Create a new blog post object
// const person = new Users({
//     uid: 1,
//     teamId: 1,
//     name: "Test Tester",
//     skills: ['C++', 'C', 'Python'],
//     tasks_assigned: [1,2,5]
// });

// // Insert the article in our MongoDB database
// person.save(function(err, result) {
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(result);
//     }
// })

var mongoose = require('mongoose');
const config = require('dotenv').config();
const Schema = mongoose.Schema
// make a connection 
mongoose.connect('mongodb+srv://taakdb:taakdb@taak.d7e4se5.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})

// get reference to database
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("Connection Successful!");
    var usersSchema =  new Schema({
        uid: Number,
        teamId: Number,
        name: String,
        skills: Array,
        tasks_assigned: Array
    });
    // compile schema to model
    var User = mongoose.model('User', usersSchema, 'user');

    // a document instance
    var user1 = new User(
        {
            uid: 1,
            teamId: 1,
            name: "Test Tester",
            skills: ['C++', 'C', 'Python'],
            tasks_assigned: [1,2,5]
        });

    // save model to database
    user1.save()
        .then((user) => {
            console.log(user.name + " saved to user collection.");
        })
        .catch((error) => {
            console.error(error);
        });
});
