const mongoose = require('mongoose');
const Schema = mongoose.Schema


//schema for tasks
var tasksSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type_id: Number,
    sprintId: Number,
    isAssigned: Boolean,
    title: String,
    description: String,
    progt: Number,
    taskSkills: Array,
    priority: String,
    assignee: mongoose.Schema.Types.ObjectId
});

var usersSchema =  new Schema({
    uid: mongoose.Schema.Types.ObjectId,
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
    Description: String
});


var Task = mongoose.model('tasks', tasksSchema);
var Users = mongoose.model('users', usersSchema);
var Projectteam = mongoose.model('projectteam', projTeamSchema);
var Sprint = mongoose.model('sprints', sprintSchema);
var Announcements = mongoose.model('announcements', annoucementsSchema)

module.exports = {Task, Users, Projectteam, Sprint, Announcements};