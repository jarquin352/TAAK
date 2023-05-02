const express = require('express');
const router = express.Router();


const {logout, checkLogin, register, login} = require('../controllers/users.js')

router.post('/login', login);
router.post('/logout', logout);
router.get('/currentUser',checkLogin);
router.post('/user', register);

module.exports = router;