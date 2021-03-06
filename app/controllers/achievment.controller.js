const Achievment = require('../models/achievment.model');

exports.create = (req, res) => {
    if(!req.body.title || !req.body.description) {
        return res.status(400).send({
            message: "Achievement details cannot be empty"
        });
    }

    const achievment = new Achievment ({
        title: req.body.title,
        description: req.body.description,
        image: req.file.path || ""
    })

    achievment.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send( {
                message: err.message || "some error occured"
            })
    })
};

exports.findAll = (req, res) => {
    Achievment.find()
        .then(projects => {
            res.send(projects);
        }).catch(err => {
            res.status(500).send( {
                message: err.message || "some error occured"
            });
    });
};

exports.update = (req, res) => {
    let achievmentObj;
    Achievment.findById(req.params.achievmentId)
        .then(achievment => {
            if(!achievment) {
                return res.status(404).send({
                    message:"Achievement not found for id"+req.params.achievmentId
                });
            }
            achievmentObj = achievment;

            Achievment.findByIdAndUpdate(req.params.achievmentId, {
                title: req.body.title || achievmentObj.title,
                description: req.body.description || achievmentObj.description,
            }, {new: true})
                .then(achievment => {
                    if(!achievment) {
                        return res.status(404).send({
                            message: "achievment not found with id " + req.params.achievmentId
                        });
                    }
                    res.send(achievment)
                }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "achievment not found with id " + req.params.achievmentId
                    });
                }
                return res.status(500).send({
                    message: "Error updating achievment with id " + req.params.achievmentId
                });
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "achievment not found with id " + req.params.achievmentId
            });
        }
        return res.status(500).send({
            message: "Error updating achievment with id " + req.params.achievmentId
        });
    });
};
exports.delete = (req, res) => {
    Achievment.findByIdAndRemove(req.params.achievmentId)
        .then(achievment => {
            if(!achievment) {
                return res.status(404).send({
                    message: "achievment Not found with Id : "+req.params.achievmentId
                });
            }
            res.send({message: "achievment deleted successfully"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "achievment not found with id " + req.params.achievmentId
            });
        }
        return res.status(500).send({
            message: "Could not delete achievment with id " + req.params.achievmentId
        });
    });
};
