const mongoose = require('mongoose');

const achievmentSchema = mongoose.Schema({
    title:String,
    description: String,
    image: String
}, {
    timestamps : true
    }

);

module.exports = mongoose.model('achievment', achievmentSchema);
