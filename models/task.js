const mongoose = require('mongoose');

var tasks = new mongoose.Schema({
    type_id: mongoose.Schema.Types.ObjectId,
    user_id: mongoose.Schema.Types.ObjectId,
    description: String
});

