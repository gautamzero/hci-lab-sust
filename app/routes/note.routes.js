module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');
    const auth = require('../../middleware/auth.js');

    // Create a new Note
    app.post('/notes', auth.checkToken, notes.create);

    // Retrieve all Notes
    app.get('/notes', auth.checkToken, notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);
}