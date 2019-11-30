const User = require('../models/user.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    if(!req.body.fullName || !req.body.userName || !req.body.email || !req.body.passWord) {
        return res.status(400).send({
            message: "user's details can not be empty"
        })
    }

    const user = new User({
        fullName: req.body.fullName,
        userName: req.body.userName,
        email: req.body.email,
        passWord: req.body.passWord
    })

    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "some error occurred"
        })
    })
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    // User.find()
    // .then(users => {
    //     res.send(users);
    // }).catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Some error occurred while retrieving notes."
    //     });
    // });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};