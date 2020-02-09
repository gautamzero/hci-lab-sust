const Project = require('../models/project.model');

exports.create = (req, res) => {
    if(!req.body.title || !req.body.description) {
        return res.status(400).send({
            message: "Project details cannot be empty"
        });
    }

    const project = new Project ({
        title: req.body.title,
        coordinators: req.body.coordinators,
        description: req.body.description,
        duration: req.body.duration || "",
        image: req.file.path || ""
    })

    project.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send( {
                message: err.message || "some error occured"
            })
    })
};

exports.findAll = (req, res) => {
    Project.find()
        .then(projects => {
            res.send(projects);
        }).catch(err => {
            res.status(500).send( {
                message: err.message || "some error occured"
            });
    });
};

exports.update = (req, res) => {
    let projectObj;
    Project.findById(req.params.projectId)
        .then(project => {
            if(!project) {
                return res.status(404).send({
                    message:"Project not found for id"+req.params.projectId
                });
            }
            projectObj = project;

            Project.findByIdAndUpdate(req.params.projectId, {
                title: req.body.title || projectObj.title,
                description: req.body.description || projectObj.description,
                coordinators: req.body.coordinators || projectObj.coordinators,
                duration: req.body.duration || projectObj.duration
            }, {new: true})
                .then(project => {
                    if(!project) {
                        return res.status(404).send({
                            message: "project not found with id " + req.params.projectId
                        });
                    }
                    res.send(project)
                }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "project not found with id " + req.params.projectId
                    });
                }
                return res.status(500).send({
                    message: "Error updating project with id " + req.params.projectId
                });
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "project not found with id " + req.params.projectId
            });
        }
        return res.status(500).send({
            message: "Error updating project with id " + req.params.projectId
        });
    });
};
exports.delete = (req, res) => {
    Project.findByIdAndRemove(req.params.projectId)
        .then(project => {
            if(!project) {
                return res.status(404).send({
                    message: "Project Not found with Id : "+req.params.projectId
                });
            }
            res.send({message: "Project deleted successfully"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "project not found with id " + req.params.projectId
            });
        }
        return res.status(500).send({
            message: "Could not delete project with id " + req.params.projectId
        });
    });
};
