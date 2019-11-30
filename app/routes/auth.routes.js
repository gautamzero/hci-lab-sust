module.exports = (app) => {
    const auth = require('../controllers/auth.controller.js');

    // Create a new Note
    app.post('/login', auth.login);

    app.post('/token', auth.getToken);

    // Retrieve all Notes
    // app.get('/users', users.findAll);

    // Retrieve a single Note with noteId
    // app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    // app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    // app.delete('/notes/:noteId', notes.delete);
}