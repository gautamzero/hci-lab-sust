const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    researchInterest: String,
    designation: String,
    currentWork: String,
    image: String
}, {
    timestamps: true
});

module.exports = mongoose.model('member', memberSchema);