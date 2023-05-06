//create a function to get an announcement
//create a function to post an announcement
//create a function to delete an announcement
//create function to toggle announcements(?), possibly goes to Announcements.jsx...
//...to toggle the component on or off; hold off for now.

const { Announcement } = require("@material-ui/icons");

// //import announcement, team schema
// const mongoose = require('mongoose');
// const {Announcements,Projectteam} = require('../models/dataSchema');
// //lines 11 to 16 are configs to .env
// const path = require('path');
// const dotenv = require('dotenv');
// const envPath = path.join(__dirname, '..', '.env');
// dotenv.config({ path: envPath });

// mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//       console.log('Database connection established');
//       //testRegister();
//       testAnnouncement();
//   })
//   .catch((err) => console.error('Database connection error', err));

const createAnnouncement = async(req, res) => {
    //always maintain a user check to ensure uses are logged in.

    //uncomment below
    // if(!req.session.user_id){
    //     res.status(401).send('Authentication required, please login');
    //     return;
    //   }
    let {a_id, type_id, title,owner,dueDate,description} = req.body;
    if(!title){
        res.status(400).send('Announcements must have a title');
        return;
    }
    else{
        //get team ID --uncomment after
        //const teamid = req.session.teamid;
        try {
            const announcement = await Announcements.create({
              a_id,
              type_id,
              title,
              owner,
              dueDate,
              description,
            });
            res.status(200).send('A new announcement has been created.');
          } catch (err) {
            res.status(400).send('Unable to create an announcement');
          }
        //push announcements to projTeam
        //If user is in team 'x', they will inherit team's announcement list
    }

}

const getAnnouncements = async(req, res) => {
    if (!req.session.user_id) {
      res.status(401).send('Authentication required, please login');
      return;
    }
  try {
    // Retrieve announcements from the database
    const announcements = await Announcements.find({ teamid:req.session.teamid  });
    res.status(200).send(announcements);
  } catch (err) {
    res.status(500).send('Failed to get announcements');
  }
};

const deleteAnnouncements = async(req, res) => {
    if (!req.session.user_id) {
      res.status(401).send('Authentication required, please login');
      return;
    }
  try {
    // Delete one announcements from the database
    await Announcements.deleteOne({ teamid:req.session.teamid });
    res.status(200).send('announcement deleted');
  } catch (err) {
    res.status(500).send('Failed to delete announcements');
  }
    
}

//test code
// const testAnnouncement = async() => {
//     const req = {body:
//         {
//             a_id: 4,
//             type_id: 1,
//             title: 'Title For Announcements.js',
//             owner: 'Test Owner',
//             dueDate: '2023-01-21',
//             description: 'Test for Announcements.js'
//         }
//     }

//     const res = {
//       status: (statusCode) => ({ send: (message) => console.log(statusCode, message) }),
//     };
//     await createAnnouncement(req, res);
// }
