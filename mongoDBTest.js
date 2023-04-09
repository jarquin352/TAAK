// const mongoose = require('mongoose');
// const {Users} = require('./models/dataSchema.js');
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
const {Users, Task, Projectteam, Sprint,Announcements} = require('./models/dataSchema.js');
const {users, tasks} = require('./components/task/tasksTestData.js');
// make a connection 
mongoose.connect('mongodb+srv://taakdb:taakdb@taak.d7e4se5.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})

// get reference to database
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("Connection Successful!");
   
    // a document instance
    // var user1 = new Users(
    //     {
    //         uid: 3,
    //         teamId: 1,
    //         name: "Test Tester 3",
    //         skills: ['C++', 'C', 'Python'],
    //         tasks_assigned: [1,2,5, 9,6]
    //     });

     // import tasks
     for (let i = 0; i < tasks.length; i++) {
        const task = new Task(tasks[i]);
        task.save()
            .then((task) => {
                console.log(`Task ${task._id} saved to task collection.`);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // import users
    for (let i = 0; i < users.length; i++) {
        const user = new Users(users[i]);
        user.save()
            .then((user) => {
                console.log(`User ${user.uid} saved to user collection.`);
            })
            .catch((error) => {
                console.error(error);
            });
    }
     // import Sprint
     var sprint1 = new Sprint(
        {
        sprintId: 1,
        teamId: 1,
        tasksInSprint: ["1", "2","3","4","5"],
        startDate: "01-01-2023",
        endDate: "01-14-2023"
        });
     // save model to database
     sprint1.save()
     .then((sprint1) => {
         console.log(sprint1.sprintId + " saved to sprint collection.");
     })
     .catch((error) => {
         console.error(error);
     });

    // import projTeam
    var projTeam = new Projectteam(
        {
        teamId: 1,
        teamName: 'CSE 4550',
        teamMembers: [1,2,3,4,5]
       });
    
    // save model to database
    projTeam.save()
        .then((projTeam) => {
            console.log(projTeam.teamName + " saved to projectteam collection.");
        })
        .catch((error) => {
            console.error(error);
        });



    // //save model to database
    // user1.save()
    //     .then((user) => {
    //         console.log(user.name + " saved to user collection.");
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });

});
