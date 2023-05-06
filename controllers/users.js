const mongoose = require('mongoose');
const { Auth, Users, Projectteam } = require('../models/dataSchema');

/*Remove after Testing */
mongoose.connect('mongodb+srv://taakdb:taakdb@taak.d7e4se5.mongodb.net/taakdata?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
      console.log('Database connection established');
      //testRegister();
      testRegister();
  })
  .catch((err) => console.error('Database connection error', err));

//second attp at login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await Auth.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check the password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create a session
    const foundUser = await Users.findOne({ authid: user.authid }).populate('authid');
    req.session.user = foundUser;
    
    req.session.save(); // Save the session
    
    // Add a cookie to the response
    console.log('loginFunction')
    res.status(200).json({ message: 'Login successful' });
    console.log(req.session);

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await Auth.findOne({ email: email });
//     if (!user) {
//       console.log(`No email: ${email} was found.`);
//       res.status(400).send('Email not recognized');
//       return;
//     }
//     const passwordCheck = await user.comparePassword(password);
//     if (!passwordCheck) {
//       res.status(400).send('Wrong Password!');
//       return;
//     }

//     // Create a new session
//     const foundUser = await Users.findOne({authid: user.authid}).populate('authid');
//     req.session.regenerate(function (err) {
//       if (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//         return;
//       }
//       // req.session.user_id = foundUser._id;
//       // req.session.user = foundUser.name;
//       req.session.user = foundUser;
//       req.session.cookie.originalMaxAge = 3600000; // 1 hour
//       req.session.cookie.reSave = true;
//       req.session.save(function (err) {
//         if (err) {
//           console.error(err);
//           res.status(500).send('Internal Server Error');
//           return;
//         }
//         console.log(req.session)
//         res.status(200).send('Login successful');
//       });
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   }
// };



const checkLogin = async (req, res) => {
  const user = req.session.user;
  if (user) {
    res.json({ user });
  } else {
    res.status(401).json({ message: 'You are not logged in' });
  }
}


//make a function that checks the login of a user, checks session cookies
// const checkLogin = async (req, res) => {
//   //checks if session has a user id in browser storage
//   if(!req.session.user_id){
//     res.status(401).send('Authentication required, please login');
//     return;
//   }
//   //session found
//   res.status(200).send(req.session.user);
// };


//register function
const register = async (req, res) => {
    let { name, email, password, skills, teamCode, isAdmin } = req.body;
  
    if (!email) {
      res.status(400).send("An email is required.");
      return;
    }
  
    if (!password) {
      res.status(400).send("A password is required.");
      return;
    } 
    else {
        try {
          const existingAuth = await Auth.findOne({ email });
          if (existingAuth) {
            res.status(400).send("Email is already taken");
            return;
          }
          //create an authentication model
          const auth = await Auth.create({
            email: email,
            password: password
          });

          //check for a valid team.
          const existingTeam = await Projectteam.findOne({ teamCode });
          //team found
          if(existingTeam){
            const user = await Users.create({
              name: name,
              authid: auth._id,
              isAdmin: isAdmin,
              skills: skills,
              tasks_assigned: [],
              teamid: existingTeam._id
            })

            existingTeam.teamMembers.push(user._id);
            await existingTeam.save();
          }

          else if(!existingTeam){
            const newTeam = await Projectteam.create({
              teamName: "New Team",
              teamMembers:[],
              teamCode: generateRandomNumber()
            })

            const user = await Users.create({
              name: name,
              authid: auth._id,
              isAdmin: isAdmin,
              skills: skills,
              tasks_assigned: [],
              teamid: newTeam._id
            })
            newTeam.teamMembers.push(user._id);
            await newTeam.save();
          }
          
          else{
            res.status(500).send("Internal Server Error")
          }

          res.status(200).send("Registration successful");
        } 
        
        catch (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        }
      }
  };


  //creat a logout function that logs a users out by destroying a session
  const logout = async(res, req) => {
    req.session.destroy(function(err){
      if(err){
        res.status(400).send('Unable to log out.');
        return;
      }
      res.status(200).send();
    });
  };

  function generateRandomNumber() {
    const min = 1000000;
    const max = 9999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  module.exports = {logout, checkLogin, register, login};












/*TEST FUNCTIONS*/
// const testLogin = async () => {
//     const req = { body: { email: 'adamadmin@taak.com', password: 'password1' } };
//     const res = {
//       status: (statusCode) => ({ send: (message) => console.log(statusCode, message) }),
//     };
//     await login(req, res);
// };

const testRegister = async() => {
    const req = {body: 
    {name: 'Node Testing', 
    email:'hapsdpy@taak.com', 
    password:'password2', 
    skills:['Node','Express'],
    teamCode: 1231231 }}
    const res = {
      status: (statusCode) => ({ send: (message) => console.log(statusCode, message) }),
    };
    await register(req, res);
}
