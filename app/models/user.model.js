const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: String,
    userName: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    passWord: String
}, {
    timestamps: true
});

module.exports = mongoose.model('user', userSchema);