const mongoose = require('mongoose');
const { Auth, Users, Projectteam, Messages } = require('../models/dataSchema');

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
