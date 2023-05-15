// /*Remove after Testing */
// /*Database connection*/
// //lines 10 to 23 are configs to .env + database connections
// const mongoose = require('mongoose');
// const { Users, Projectteam, Messages } = require('../models/dataSchema');
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
//       generateMockMessages();
//   })
//   .catch((err) => console.error('Database connection error', err));


// const userIDs = [
//   '645327bd38a1fae459caa95c',
//   '645327bd38a1fae459caa95e',
//   '645327bd38a1fae459caa95f',
//   '645327bd38a1fae459caa960',
//   '645327bd38a1fae459caa95d',
//   '645327bd38a1fae459caa961',
//   "645f28ef06e0af2df3213053"
// ];

// const teamID = '645327bd38a1fae459caa962';

// const generateMockMessages = async () => {
//   try {
//     // Retrieve the team and user documents from the database
//     const team = await Projectteam.findOne({ _id: teamID });
//     const users = await Users.find({ _id: { $in: userIDs } });

//     const messages = [];

//     // Generate at least 10 messages
//     for (let i = 0; i < 10; i++) {
//       // Randomly select a user from the users array
//       const randomUser = users[Math.floor(Math.random() * users.length)];

//       const message = new Messages({
//         _id: new mongoose.Types.ObjectId(),
//         team: teamID,
//         sender: randomUser._id,
//         message: `Message ${i + 1}`,
//         createdAt: new Date(),
//       });

//       messages.push(message);
//     }

//     // Save the messages to the database
//     await Messages.insertMany(messages);

//     console.log('Mock messages created successfully');
//   } catch (err) {
//     console.error('Error generating mock messages:', err);
//   }
// };