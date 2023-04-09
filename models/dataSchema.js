const mongoose = require('mongoose');
const Schema = mongoose.Schema


//schema for tasks
var tasksSchema = new Schema({
    _id: Number,
    type_id: Number,
    sprintId: Number,
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
    teamId: Number,
    name: String,
    skills: Array,
    tasks_assigned: Array
});

var projTeamSchema =  new Schema({
    teamId: Number,
    teamName: String,
    teamMembers: Array
});

var sprintSchema =  new Schema({
    sprintId: Number,
    teamId: Number,
    tasksInSprint: Array,
    startDate: Date,
    endDate: Date
});
var annoucementsSchema =  new Schema({
    a_id: Number,
    type_id: Number,
    anTitle: String,
    uid: mongoose.Schema.Types.ObjectId,
    dueDate: Date,
    a_description: String
});


var Task = mongoose.model('tasks', tasksSchema);
var Users = mongoose.model('users', usersSchema);
var Projectteam = mongoose.model('projectteam', projTeamSchema);
var Sprint = mongoose.model('sprints', sprintSchema);
var Announcements = mongoose.model('announcements', annoucementsSchema)

module.exports = {Task, Users, Projectteam, Sprint, Announcements};