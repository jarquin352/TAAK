const mongoose = require('mongoose');
const { Auth, Users, Projectteam } = require('../models/dataSchema');

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
    // const foundUser = await Users.findOne({ authid: user._id });
    req.session.user = user;
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



// const checkLogin = async (req, res) => {
//   const user = req.session.user;
//   if (user) {
//     res.json({ user });
//   } else {
//     res.status(401).json({ message: 'You are not logged in' });
//   }
// }

// const checkLogin = async (req, res) => {
//   const user = req.session.user;
//   if (user) {
//     res.json({ user });
//   } else {
//     res.status(401).json({ message: 'You are not logged in' });
//   }
// }


//make a function that checks the login of a user, checks session cookies
const checkLogin = async (req, res) => {
  //checks if session has a user id in browser storage
  if(!req.session.user){
    res.status(401).send('Authentication required, please login');
    return;
  }
  //session found
  res.status(200).send(req.session.user);
};


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
            _id: new mongoose.Types.ObjectId(),
            email: email,
            password: password
          });

          //check for a valid team.
          const existingTeam = await Projectteam.findOne({ teamCode });
          //team found
          if(existingTeam){
            const user = await Users.create({
              _id: new mongoose.Types.ObjectId(),
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
              _id: new mongoose.Types.ObjectId(),
              teamName: "New Team",
              teamMembers:[],
              teamCode: generateRandomNumber()
            })

            const user = await Users.create({
              _id: new mongoose.Types.ObjectId(),
              name: name,
              authid: auth._id,
              isAdmin: isAdmin,
              skills: skills,
              tasks_assigned: [],
              teamid: newTeam._id
            });
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
  const logout = async (req, res) => {
    req.session.destroy(function (err) {
      if (err) {
        res.status(400).send('Unable to log out.');
        return;
      }
      res.status(200).send();
    });
  };
  
  

  const getUsers = async (req, res) =>{
    if (!req.session.user) {
      res.status(401).send("Not logged in");
      return;
    }
    const userAdmin = await Users.findOne({authid:req.session.user._id})
    if (!userAdmin.isAdmin) {
      res.status(401).send("You must be an admin to execute this.");
      return;
    }
    try{
      const listUsers = await Users.find({})
      res.status(200).send(listUsers)
    } catch (err) {
      console.log(err);
      res.status(400).send('Unable to list of users');
    };
  }

const getSpecificUser = async (req, res) =>{
  if (!req.session.user) {
    res.status(401).send("Not logged in");
    return;
  }
  const user = await Users.findOne({authid:req.session.user._id}).populate({path:'authid', model:Auth});
  try{
    res.status(200).send(user)
  } catch (err) {
    console.log(err);
    res.status(400).send('Unable to list of users');
  };
}

const getTeamMembers = async(req, res)=>{
  if (!req.session.user) {
    res.status(401).send("Not logged in");
    return;
  }
  const user = await Users.findOne({authid:req.session.user._id});
  try{
    const teamMembers = await Projectteam.findOne({_id:user.teamid}).populate({
      path: "teamMembers",
      model: Users
    });
    res.status(200).send(teamMembers);
  } catch (err) {
    console.log(err);
    res.status(400).send('Unable to list of users');
  };
}

const editUser = async (req, res) => {
  if (!req.session.user) {
    res.status(401).send("Not logged in");
    return;
  }
  const {name, email, password, skills} = req.body;
  console.log(name, email, password, skills);
  //get the user + authentication first.
  const userInfo = await Users.findOne({authid:req.session.user._id});
  const userAuth = await Auth.findOne({_id:userInfo.authid});
  try{
    //change the name if the if statement is true (this works)
    if (name !== '' && name !== null && name !== userInfo.name) {
      userInfo.name = name;
      console.log('namechanged')
    }
    //doesn't work.
    if (skills && skills !== userInfo.skills) {
      skills.forEach(item => {
        if (!userInfo.skills.includes(item)) {
          userInfo.skills.push(item);
        }
        console.log('skills changed')
      });
    }
    //works
    if(email!== '' && email !== null && email != userAuth.email){
      userAuth.email = email;
      console.log('email changed')
    }
    //works
    if(password!== '' && password !== null && password != userAuth.password){
      userAuth.password = password;
      console.log('password changed')
    }
    await userAuth.save();
    await userInfo.save();
    res.status(200).send('Successfully changed user settings.')
  } catch (err) {
    console.log(err);
    res.status(400).send('Unable to change user settings');
  };

}


  function generateRandomNumber() {
    const min = 1000000;
    const max = 9999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  

  module.exports = {logout, checkLogin, register, login,getUsers, editUser,getSpecificUser, getTeamMembers};


/*TEST FUNCTIONS*/
// const testLogin = async () => {
//     const req = { body: { email: 'adamadmin@taak.com', password: 'password1' } };
//     const res = {
//       status: (statusCode) => ({ send: (message) => console.log(statusCode, message) }),
//     };
//     await login(req, res);
// };

// const testRegister = async() => {
//     const req = {body: 
//     {name: 'Node Testing', 
//     email:'hapsdpy@taak.com', 
//     password:'password2', 
//     skills:['Node','Express'],
//     teamCode: 1231231 }}
//     const res = {
//       status: (statusCode) => ({ send: (message) => console.log(statusCode, message) }),
//     };
//     await register(req, res);
// }

//test code for getUserzs
// const testCode = async() => {
//     const req = {session:{user:{_id:'645327bd38a1fae459caa96c'}}}
//     // const req = {session:{user:{_id:'645327bd38a1fae459caa96b'}}}
//     const res = {
//     status: (statusCode) => ({ send: (message) => console.log(statusCode, message) }),
//   };
//     await getUsers(req, res);

// }

// //test code for editUser
// const testCode = async() => {
//     const req = {session:{user:{_id:'645327bd38a1fae459caa96c'}},
//                  body: { email: 'admin@taak.com', password: 'password',name:'Admin AdminNamechange', skills: ['TestSkills1'] }}
//     // const req = {session:{user:{_id:'645327bd38a1fae459caa96b'}}}
//     const res = {
//     status: (statusCode) => ({ send: (message) => console.log(statusCode, message) }),
//   };
//     await editUser(req, res);

// }

//test code for editUser
// const testCode = async() => {
//     const req = {session:{user:{_id:'645327bd38a1fae459caa96b'}}}
//     const res = {
//     status: (statusCode) => ({ send: (message) => console.log(statusCode, message) }),
//   };
//     await getSpecificUser(req, res);

// }


//test code for editUser (works)
// const testCode = async() => {
//     //adam admin req.session.user._id
//     const req = {session:{user:{_id:'645327bd38a1fae459caa96c'}}}
//     const res = {
//     status: (statusCode) => ({ send: (message) => console.log(statusCode, message) }),
//   };
//     await getTeamMembers(req, res);
// }

