const mongoose = require('mongoose');

var tasksTypes = new mongoose.Schema({
    name: String,
    class: String,
    color: String
});

