const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema
// const autoIncrement = require('mongoose-auto-increment');


//schema for tasks
var tasksSchema = new Schema({
    _id: Schema.Types.ObjectId,
    //_id: Number,
    type_id: {type: Schema.Types.ObjectId, ref:'taskTypesSchema'},
    sprintid: {type: Schema.Types.ObjectId, ref:'sprintSchema'},
    isAssigned: Boolean,
    title: String,
    description: String,
    progt: Number,
    taskSkills: Array,
    priority: String,
    assignee: {type: Schema.Types.ObjectId, ref:'usersSchema'}
});

var taskTypesSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    class: String,
    color: String
});

//done
var usersSchema =  new Schema({
    _id: Schema.Types.ObjectId,
    authid: {type: Schema.Types.ObjectId, ref:'authenticationSchema'},
    isAdmin: Boolean,
    teamid: {type: Schema.Types.ObjectId, ref:'projTeamSchema'},
    name: String,
    skills: Array,
    tasks_assigned: [{type: Schema.Types.ObjectId, ref:'tasksSchema'}],
});

//done
var projTeamSchema =  new Schema({
    _id: Schema.Types.ObjectId,
    teamName: String,
    teamMembers: [{type: Schema.Types.ObjectId, ref:'usersSchema'}],
    teamCode: Number
});

var sprintSchema =  new Schema({
    _id: Schema.Types.ObjectId,
    teamid: {type: Schema.Types.ObjectId, ref:'projTeamSchema'},
    tasksInSprint: [{type: Schema.Types.ObjectId, ref:'tasksSchema'}],
    startDate: Date,
    endDate: Date
});

//done
var annoucementsSchema =  new Schema({
    _id: Schema.Types.ObjectId,
    teamid: {type: Schema.Types.ObjectId, ref:'projTeamSchema'},
    title: String,
    owner: String,
    announcementDate: Date,
    description: String
});

//done
var authenticationSchema = new Schema({
    _id: Schema.Types.ObjectId,
    email: String,
    password: String
})

//done
var messegesSchema = new Schema({
    _id: Schema.Types.ObjectId,
    team: {type: Schema.Types.ObjectId, ref: 'projTeamSchema',},
    sender: {type: Schema.Types.ObjectId,ref: 'usersSchema',},
    message: String,
    createdAt: {type: Date, default: Date.now},
  });

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
var TaskType = mongoose.model('tasktypes', taskTypesSchema);
var Users = mongoose.model('users', usersSchema);
var Projectteam = mongoose.model('projectteam', projTeamSchema);
var Sprint = mongoose.model('sprints', sprintSchema);
var Announcements = mongoose.model('announcements', annoucementsSchema);
var Auth = mongoose.model('authentication', authenticationSchema);
var Messages = mongoose.model('messeges', messegesSchema);

module.exports = {Task, Users, Projectteam, Sprint, Announcements, Auth, TaskType,Messages};

/*var tasksSchema = new Schema({
    //_id: Number,
    type_id: {type: Schema.Types.ObjectId, ref:'taskTypesSchema'},
    sprintid: {type: Schema.Types.ObjectId, ref:'sprintSchema'},
    isAssigned: Boolean,
    title: String,
    description: String,
    progt: Number,
    taskSkills: Array,
    priority: String,
    assignee: {type: Schema.Types.ObjectId, ref:'usersSchema'}
});

var taskTypesSchema = new Schema({
    //_id: Number,
    name: String,
    class: String,
    color: String
});

var usersSchema =  new Schema({
    //uid: Number,
    authid: {type: Schema.Types.ObjectId, ref:'authenticationSchema'},
    isAdmin: Boolean,
    teamid: {type: Schema.Types.ObjectId, ref:'projTeamSchema'},
    name: String,
    skills: Array,
    tasks_assigned: [{type: Schema.Types.ObjectId, ref:'tasksSchema'}],
});

var projTeamSchema =  new Schema({
    ///teamid: Number,
    teamName: String,
    teamMembers: [{type: Schema.Types.ObjectId, ref:'usersSchema'}],
    teamCode: Number
});

var sprintSchema =  new Schema({
    //sprintid: Number,
    teamid: {type: Schema.Types.ObjectId, ref:'projTeamSchema'},
    tasksInSprint: [{type: Schema.Types.ObjectId, ref:'tasksSchema'}],
    startDate: Date,
    endDate: Date
});
var annoucementsSchema =  new Schema({
    //a_id: Number,
    //type_id: Number,
    teamid: {type: Schema.Types.ObjectId, ref:'projTeamSchema'},
    title: String,
    owner: String,
    announcementDate: Date,
    description: String
});

var authenticationSchema = new Schema({
    //authid: Number,
    email: String,
    password: String
    
})
 */