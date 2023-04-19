//create a function to get an announcement
//create a function to post an announcement
//create a function to delete an announcement
//create function to toggle announcements(?), possibly goes to Announcements.jsx...
//...to toggle the component on or off; hold off for now.

//import announcement, team schema
const mongoose = require('mongoose');
const {Announcements,Projectteam} = require('../models/dataSchema');

mongoose.connect('mongodb+srv://taakdb:taakdb@taak.d7e4se5.mongodb.net/taakdata?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
      console.log('Database connection established');
      //testRegister();
      testAnnouncement();
  })
  .catch((err) => console.error('Database connection error', err));

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

        //push announcements to projTeam
      const announcement = await Announcements.create({a_id, type_id, title,owner,dueDate,description},
            function (err, announcement){
                if (err) {
                    res.status(400).send('Unable to create an announcement');
                    return;
                }
                res.status(200).send('A new announcement has been created.')
            });
        //If user is in team 'x', they will inherit team's announcement list
    }

}

const getAnnouncements = async(req, res) => {
    if(!req.session.user_id){
        res.status(401).send('Authentication required, please login');
        return;
      }
    
}

const deleteAnnouncements = async(req, res) => {
    if(!req.session.user_id){
        res.status(401).send('Authentication required, please login');
        return;
      }
    
}

//test code
const testAnnouncement = async() => {
    const req = {body:
        {
            a_id: 4,
            type_id: 1,
            title: 'Title For Announcements.js',
            owner: 'Test Owner',
            dueDate: '2023-01-21',
            description: 'Test for Announcements.js'
        }
    }

    const res = {
      status: (statusCode) => ({ send: (message) => console.log(statusCode, message) }),
    };
    await createAnnouncement(req, res);
}