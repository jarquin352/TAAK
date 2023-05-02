// var mongoose = require('mongoose');
// const config = require('dotenv').config();
// //calling schema
// const {Users, Task, Projectteam, Sprint,Announcements, Auth} = require('./models/dataSchema.js');
// //calling data
// const {taakmodels} = require('./models/tasksTestData.js');
// tasks = taakmodels.tasksModel();
// users = taakmodels.usersModel();
// projTeam = taakmodels.projTeamModel()
// sprints = taakmodels.sprintsModel();
// announcements = taakmodels.announcementsModel();
// authentication = taakmodels.authenticationModel();
// // taskTypes = taakmodels.taskTypesModel();

// // make a connection 
// // mongoose.connect('red',{useNewUrlParser: true, useUnifiedTopology: true})
// mongoose.connect('removed',{useNewUrlParser: true, useUnifiedTopology: true});

// // get reference to database
// var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));

// db.once('open', function() {
//     console.log("Connection Successful!\n");
    
//      // import tasks
//      for (let i = 0; i < tasks.length; i++) {
//         const task = new Task(tasks[i]);
//         task.save()
//             .then((task) => {
//                 console.log(`Task ${task._id} saved to task collection.`);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }

//     // import users
//     for (let i = 0; i < users.length; i++) {
//         const user = new Users(users[i]);
//         user.save()
//             .then((user) => {
//                 console.log(`User ${user.uid} saved to user collection.`);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }

//     //import projTeam
//     for (let i = 0; i < projTeam.length; i++) {
//         const pt = new Projectteam(projTeam[i]);
//         pt.save()
//             .then((pt) => {
//                 console.log(`ProjTeam ${pt.teamid} saved to user collection.`);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }

//     //import sprints 
//     for (let i = 0; i < sprints.length; i++) {
//         const sprint = new Sprint(sprints[i]);
//         sprint.save()
//             .then((sprint) => {
//                 console.log(`Sprint ${sprint.sprintid} saved to user collection.`);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }

//     //import announcements 
//     for (let i = 0; i < announcements.length; i++) {
//         const announcement = new Announcements(announcements[i]);
//         announcement.save()
//             .then((announcement) => {
//                 console.log(`Announcement ${announcement.a_id} saved to user collection.`);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }

//     //import authentication 
//     for (let i = 0; i < authentication.length; i++) {
//         const auth = new Auth(authentication[i]);
//         auth.save()
//             .then((auth) => {
//                 console.log(`Auth ${auth.authid} saved to user collection.`);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }
// });
