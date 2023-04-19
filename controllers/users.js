const mongoose = require('mongoose');
const { Auth, Users } = require('../models/dataSchema');


/*Remove after Testing */
mongoose.connect('removed',{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
      console.log('Database connection established');
      //testRegister();
      testLogin();
  })
  .catch((err) => console.error('Database connection error', err));

//login function, unsalted access for now....
const login = async (req, res) =>{
    const {email, password} = req.body
    try {
        //check if an error occurs, or user was not found via email first.
        const user = await Auth.findOne({email: email});
        //if an error occurs, or if the email is wrong
        if(!user){
            console.log('No email:', email, ' was found.')
            res.status(400).send('Email not recognized')
            return;
        }
        //checks if password was correct
        const passwordCheck = await user.comparePassword(password);
        //password is not correct, 400 code is outputted
        if(!passwordCheck){
            res.status(400).send("Wrong Password!");
            return;
        }
        //both email and password is found, create a new session.
        const loggedInUser = await Users.findOne({authid: user.authid}).populate('authid');
        if (!loggedInUser) {
            console.log(`No user found with authid: ${auth.authid}`);
            res.status(400).send("User not found");
            return;
        };
        console.log(`User ${loggedInUser.name} logged in`);
        console.log(loggedInUser)
        res.status(200).send("Login successful");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

//register function
const register = async (req, res) => {
    let { name, email, password, skills } = req.body;
  
    if (!email) {
      res.status(400).send("An email is required.");
      return;
    }
  
    if (!password) {
      res.status(400).send("A password is required.");
      return;
    } else {
        try {
          const existingAuth = await Auth.findOne({ email });
          if (existingAuth) {
            res.status(400).send("Email is already taken");
            return;
          }
          const auth = await Auth.create({
            email: email,
            password: password
          });
    
          const user = await Users.create({
            authid: auth.authid,
            name: name,
            skills: skills
          });
    
          res.status(200).send("Registration successful");
        } catch (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        }
      }
  };

  //make a function that checks the login of a user, checks session cookies
  const checkLogin = async (req, res) => {
    //checks if session has a user id in browser storage
    if(!req.session.user_id){
      res.status(401).send('Authentication required, please login');
      return;
    }
    //session found
    res.status(200).send(req.session.user);
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
  
  module.exports = {logout, checkLogin, register, login};














/*TEST FUNCTIONS*/
// const testLogin = async () => {
//     const req = { body: { email: 'adamadmin@taak.com', password: 'password1' } };
//     const res = {
//       status: (statusCode) => ({ send: (message) => console.log(statusCode, message) }),
//     };
//     await login(req, res);
// };

// const testRegister = async() => {
//     const req = {body: {name: 'Node Testing', email:'adamadmin@taak.com', password:'password2', skills:['Node','Express'] }}
//     const res = {
//       status: (statusCode) => ({ send: (message) => console.log(statusCode, message) }),
//     };
//     await register(req, res);
// }
