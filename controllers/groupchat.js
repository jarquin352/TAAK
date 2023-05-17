const mongoose = require('mongoose');
const { Auth, Users, Projectteam, Messages } = require('../models/dataSchema');

// /*Remove after Testing */
// /*Database connection*/
// //lines 10 to 23 are configs to .env + database connections
// const path = require('path');
// const dotenv = require('dotenv');
// const e = require('express');
// const envPath = path.join(__dirname, '..', '.env');
// dotenv.config({ path: envPath });

// //remove db connection after testing functions
// mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//       console.log('Database connection established');
//       //testRegister();
//       testCode();
//   })
//   .catch((err) => console.error('Database connection error', err));

const getMessages = async (req, res) => {
    if (!req.session.user) {
      res.status(401).send("Not logged in");
      return;
    }
    const userInfo = await Users.findOne({authid: req.session.user._id});
    const teamInfo = await Projectteam.findOne({_id:userInfo.teamid});
    try {
      const messageList = await Messages.find({team: teamInfo._id})
        .populate({
          path: 'team',
          model: Projectteam,
        })
        .populate({
          path: 'sender',
          model: Users,
        })
        .sort({ date: 'asc' });
  
      res.status(200).send(messageList);
    } catch (err) {
      console.log(err);
      res.status(400).send('Unable to get messages');
    }
  };
  

  const sendMessage = async(req, res)=>{
    if (!req.session.user) {
      res.status(401).send("Not logged in");
      return;
    }
    const {message} = req.body
    const userInfo = await Users.findOne({authid:req.session.user._id});
     try{
      const newMessage = await Messages.create({
        _id: new mongoose.Types.ObjectId(),
        team: userInfo.teamid,
        sender: userInfo._id,
        message: message,
        createdAt: Date.now(),
      });
      await newMessage.save();
      res.status(200).send({ message: 'Message successfully created', newMessage });
    } catch (err) {
      console.log(err);
      res.status(400).send('Unable to send messasge');
    };
  }

module.exports = {getMessages,sendMessage};




// //test code for getMessages
// const testCode = async() => {
//     const req = {session:{user:{_id:'645327bd38a1fae459caa96c'}}}
//     // const req = {session:{user:{_id:'645327bd38a1fae459caa96b'}}}
//     const res = {
//     status: (statusCode) => ({ send: (message) => console.log(statusCode, message) }),
//   };
//     await getMessages(req, res);

// }

// //test code for sendMessage
// const testCode = async() => {
//   const req = {
//     session: {user: {_id: '645327bd38a1fae459caa96c'}},body:{message:'Hello world.'} 
//   };
  
//     // const req = {session:{user:{_id:'645327bd38a1fae459caa96b'}}}
//     const res = {
//     status: (statusCode) => ({ send: (message) => console.log(statusCode, message) }),
//   };
//     await sendMessage(req, res);

// }