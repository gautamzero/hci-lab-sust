const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title:String,
    description: String,
    duration: String,
    coordinators: String,
}, {
    timestamps : true
    }

);

module.exports = mongoose.model('project', projectSchema);
