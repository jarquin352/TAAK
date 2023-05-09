//create a function to get an announcement
//create a function to post an announcement
//create a function to delete an announcement
//create function to toggle announcements(?), possibly goes to Announcements.jsx...
//...to toggle the component on or off; hold off for now.

//import announcement, team schema
const mongoose = require('mongoose');
const {Announcements, Users} = require('../models/dataSchema');
//lines 10 to 23 are configs to .env + database connections
// const path = require('path');
// const dotenv = require('dotenv');
// const envPath = path.join(__dirname, '..', '.env');
// dotenv.config({ path: envPath });

//remove db connection after testing functions
// mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//       console.log('Database connection established');
//       //testRegister();
//       testAnnouncement();
//   })
//   .catch((err) => console.error('Database connection error', err));

  const createAnnouncement = async (req, res) => {
    // if (!req.session.user_id) {
    //   res.status(401).send('Authentication required, please login');
    //   return;
    // }
  
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
    // if (!req.session.user_id) {
    //   res.status(401).send('Authentication required, please login');
    //   return;
    // }

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
    // if (!req.session.user_id) {
    //   res.status(401).send('Authentication required, please login');
    //   return;
    // }

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




/*The code below is for testing purposes.*/

//test code for createAnnouncement(works)
// const testAnnouncement = async() => {
//     const req = {body:
//         {
//           teamid: '645327bd38a1fae459caa962',
//           title: 'Test announcement',
//           owner: 'Test owner',
//           announcementDate: new Date('2023-05-06'),
//           description: 'This is a test announcement'
//         }
        
//     }
//     const res = {
//       status: (statusCode) => ({ send: (message) => console.log(statusCode, message) }),
//     };
//     await createAnnouncement(req, res);
// }

//testcode for getAnnouncements (works)
// const testAnnouncement = async() => {
//   const req = {body:
//       {
//         auth_id: '645327bd38a1fae459caa96c',
//       }
//   }

//   const res = {
//     status: (statusCode) => ({ send: (message) => console.log(statusCode, message) }),
//   };
//   await getAnnouncements(req, res);
// }

//testcode for deleteAnnouncement (works)
// const testAnnouncement = async() => {
//   const req = {body:
//       {
//         _id: '645736b3acc15ccb09d42934',
//       }
//   }

//   const res = {
//     status: (statusCode) => ({ send: (message) => console.log(statusCode, message) }),
//   };
//   await deleteAnnouncements(req, res);
// }
