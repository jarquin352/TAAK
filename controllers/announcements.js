//import announcement, team schema
const mongoose = require('mongoose');
const {Announcements, Users} = require('../models/dataSchema');

  const createAnnouncement = async (req, res) => {
    if (!req.session.user) {
      res.status(401).send('Authentication required, please login');
      return;
    }
  
    const {title, dueDate, description } = req.body;
    const authid = req.session.user._id;
  
    if (!title) {
      res.status(400).send('Announcements must have a title');
      return;
    }
  
    try {
      const userInfo = await Users.findOne({authid:authid})
      const announcement = await Announcements.create({
        _id: new mongoose.Types.ObjectId(),
        teamid: userInfo.teamid,
        title: title,
        owner: userInfo.name,
        announcementDate: dueDate,
        description: description,
      });
      res.status(200).send('A new announcement has been created.');
    } catch (err) {
      console.log(err);
      res.status(400).send('Unable to create an announcement');
    }
  };

const getAnnouncements = async(req, res) => {
    if (!req.session.user) {
      res.status(401).send('Authentication required, please login');
      return;
    }

  try {
    // Retrieve announcements from the database
    //first get the user ID from sessionID to get teamid
    // const {auth_id} = req.body;
    const auth_id = req.session.user._id;
    const user = await Users.findOne({authid: auth_id});
    const announcements = await Announcements.find({teamid:user.teamid});
    res.status(200).send(announcements);
  } catch (err) {
    res.status(500).send('Failed to get announcements');
  }
};

const deleteAnnouncements = async(req, res) => {
  //get the announcement_id from the req.body....
  const {_id} = req.body;
  console.log(_id)
    if (!req.session.user) {
      res.status(401).send('Authentication required, please login');
      return;
    }

  //find the announcement by usuing deleteOne and comparing it to req.body._id
  try {
    console.log(_id)
    // Delete one announcements from the database
    const announcement = await Announcements.deleteOne({_id});
    res.status(200).send('announcement deleted');
  } catch (err) {
    res.status(500).send('Failed to delete the announcement');
  }
    
}
module.exports = {createAnnouncement,getAnnouncements,deleteAnnouncements};
