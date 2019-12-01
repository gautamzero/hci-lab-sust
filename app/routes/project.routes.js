module.exports = (app) => {
    const projects = require('../controllers/project.contorller.js');
    const  auth = require('../../middleware/auth.js');

    app.post('/projects', auth.checkToken, projects.create);

    app.get('/projects', projects.findAll);

    app.put('/projects/:projectId', auth.checkToken, projects.update);

    app.delete('/projects/:projectId', auth.checkToken, projects.delete);
};
