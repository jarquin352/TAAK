const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

// Set up the schemas
const playerSchema = new mongoose.Schema({
  name: String,
  email: String,
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

const gameSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Create the models
const Player = mongoose.model('Player', playerSchema);
const Game = mongoose.model('Game', gameSchema);

// Connect to the database
mongoose.connect('removed',{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Database connection established');

    // Test data
    const player = new Player({ name: 'John Doe', email: 'john@example.com' });
    const game = new Game({ title: 'Task 1', description: 'Description 1', assignedTo: player });

    // Save the data
    player.save()
        .then((player) =>{
            console.log(`Player ${player._id} saved to collection.`)
        })
        .catch((error) => {
            console.error(error)
        })

    game.save()
        .then((game) =>{
            console.log(`game ${game._id} saved to collection.`)
        })
        .catch((error) => {
            console.error(error)
        })
  })
  .catch((err) => console.error('Database connection error:', err));


