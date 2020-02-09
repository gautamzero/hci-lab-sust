const mongoose = require('mongoose');

const achievmentSchema = mongoose.Schema({
    title:String,
    description: String,
    duration: String,
    coordinators: String,
    image: String
}, {
    timestamps : true
    }

);

module.exports = mongoose.model('project', achievmentSchema);
