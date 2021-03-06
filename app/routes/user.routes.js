module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    const auth = require('../../middleware/auth');

    // Create a new Note
    app.post('/users', auth.checkToken, users.create);

    // Retrieve all Notes
    app.get('/users', auth.checkToken, users.findAll);

    // Retrieve a single Note with noteId
    // app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    // app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    // app.delete('/notes/:noteId', notes.delete);
}