const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema
// const autoIncrement = require('mongoose-auto-increment');


//schema for tasks
var tasksSchema = new Schema({
    _id: Number,
    type_id: Number,
    sprintid: Number,
    isAssigned: Boolean,
    title: String,
    description: String,
    progt: Number,
    taskSkills: Array,
    priority: String,
    assignee: Number
});

var usersSchema =  new Schema({
    uid: Number,
    authid: Number,
    teamid: Number,
    name: String,
    skills: Array,
    tasks_assigned: Array
});

var projTeamSchema =  new Schema({
    teamid: Number,
    teamName: String,
    teamMembers: Array
});

var sprintSchema =  new Schema({
    sprintid: Number,
    teamid: Number,
    tasksInSprint: Array,
    startDate: Date,
    endDate: Date
});
var annoucementsSchema =  new Schema({
    a_id: Number,
    type_id: Number,
    title: String,
    owner: String,
    dueDate: Date,
    description: String
});

var authenticationSchema = new Schema({
    authid: Number,
    email: String,
    password: String
    
})


//methods
//checks password, implmenet bcrypt after....
// authenticationSchema.methods.comparePassword = async function(password){
//     return await compare(password, this.password)
// }

//this is just for testing....
authenticationSchema.methods.comparePassword = function(password){
    return password === this.password;
};

// authenticationSchema.plugin(autoIncrement.plugin, {
//   model: 'Auth',
//   field: 'authid',
// });
// usersSchema.plugin(autoIncrement.plugin, {
//   model: 'Users',
//   field: 'uid',
// });

//exports
var Task = mongoose.model('tasks', tasksSchema);
var Users = mongoose.model('users', usersSchema);
var Projectteam = mongoose.model('projectteam', projTeamSchema);
var Sprint = mongoose.model('sprints', sprintSchema);
var Announcements = mongoose.model('announcements', annoucementsSchema);
var Auth = mongoose.model('authentication', authenticationSchema);

module.exports = {Task, Users, Projectteam, Sprint, Announcements, Auth};