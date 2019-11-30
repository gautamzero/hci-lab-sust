const Member = require('../models/member.model.js');

exports.create = (req, res) => {
    if(!req.body.firstName || !req.body.lastName || !req.body.email) {
        return res.status(400).send({
            message: "Member's details can not be empty"
        })
    }

    const member = new Member({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        researchInterest: req.body.researchInterest || "",
        designation: req.body.designation || "",
        currentWork: req.body.currentWork || ""
    })

    member.save()
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
    Member.find()
    .then(members => {
        res.send(members);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving members."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {

};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    let memberObj;
    Member.findById(req.params.memberId)
    .then(member => {
        if(!member) {
            return res.status(404).send({
                message: "Member not found with id " + req.params.memberId
            });
        }
        memberObj = member;

        Member.findByIdAndUpdate(req.params.memberId, {
            firstName: req.body.firstName || memberObj.firstName,
            lastName: req.body.lastName || memberObj.lastName,
            email: req.body.email || memberObj.email,
            researchInterest: req.body.researchInterest || memberObj.researchInterest,
            designation: req.body.designation || memberObj.designation,
            currentWork: req.body.currentWork || memberObj.currentWork
        }, {new: true})
        .then(member => {
            if(!member) {
                return res.status(404).send({
                    message: "member not found with id " + req.params.memberId
                });
            }
            res.send(member);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "member not found with id " + req.params.memberId
                });                
            }
            return res.status(500).send({
                message: "Error updating member with id " + req.params.memberId
            });
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "member not found with id " + req.params.memberId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.memberId
        });
    });
};

exports.delete = (req, res) => {
    Member.findByIdAndRemove(req.params.memberId)
    .then(member => {
        if(!member) {
            return res.status(404).send({
                message: "Member not found with id " + req.params.memberId
            });
        }
        res.send({message: "member deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "member not found with id " + req.params.memberId
            });                
        }
        return res.status(500).send({
            message: "Could not delete member with id " + req.params.memberId
        });
    });
};