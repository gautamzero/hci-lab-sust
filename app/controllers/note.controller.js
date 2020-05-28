const Note = require('../models/note.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    if(!req.body.title || !req.body.organization|| !req.body.organiser|| !req.body.deadline|| !req.body.description) {
        return res.status(400).send({
            message: "notes can not be empty"
        })
    }

    const note = new Note({
        title: req.body.title || 'untitled note',
        organization: req.body.organization,
        organiser: req.body.organiser,
        deadline: req.body.deadline,
        description: req.body.description,
        noteFile: req.file.path || ""
    })

    note.save()
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
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {

};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    let noteObj;
    Note.findById(req.params.noteId)
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message:"note not found for id"+req.params.noteId
                });
            }
            noteObj = note;

            Note.findByIdAndUpdate(req.params.noteId, {
                title: req.body.title || noteObj.title,
                organization: req.body.organization || noteObj.organization,
                organiser: req.body.organiser || noteObj.organiser,
                deadline: req.body.deadline || noteObj.deadline,
                description: req.body.description || noteObj.description
            }, {new: true})
                .then(note => {
                    if(!note) {
                        return res.status(404).send({
                            message: "note not found with id " + req.params.noteId
                        });
                    }
                    res.send(project)
                }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "note not found with id " + req.params.noteId
                    });
                }
                return res.status(500).send({
                    message: "Error updating note with id " + req.params.noteId
                });
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Note Not found with Id : "+req.params.noteId
                });
            }
            res.send({message: "note deleted successfully"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};

