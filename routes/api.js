const express = require('express');
const router = express.Router();


const {logout, checkLogin, register, login, getUsers,getSpecificUser, editUser, getTeamMembers} = require('../controllers/users.js')
const {createAnnouncement,getAnnouncements,deleteAnnouncements} = require('../controllers/announcements.js')
const {getTasks,createTask,assignTask,deleteTask, getUserTasks, getTaskTypes, updateTask} = require('../controllers/tasks.js')
const {getMessages, sendMessage} = require('../controllers/groupchat.js')
//login + setting routes
router.post('/login', login);
router.post('/logout', logout);
router.post('/user', register);
router.get('/currentUser',checkLogin);
router.get('/allUsers',getUsers);
router.get('/getTeam', getTeamMembers);
router.post('/editUser', editUser);
router.get('/selfUser', getSpecificUser)


//announcement routes
router.get('/announcements', getAnnouncements);
router.post('/newAnnouncement',createAnnouncement);
router.delete('/delAnnouncement', deleteAnnouncements);

//task routes
router.get('/getTasks', getTasks);
router.get('/getUserTasks', getUserTasks);
router.get('/getTaskTypes', getTaskTypes);
router.post('/updateKanban', updateTask);
router.post('/createTask', createTask);
router.delete('/deleteTask', deleteTask);
router.post('/assignTask', assignTask);

//messages routes
router.get('/groupMessages', getMessages);
router.post('/sendMessage', sendMessage)

module.exports = router;