module.exports = (app,multer) => {
    const notes = require('../controllers/note.controller.js');
    const auth = require('../../middleware/auth.js');

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null,'./uploads')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-'+ file.originalname)
        }
    });
    const upload = multer({storage: storage});

    // Create a new Note
    app.post('/notes', auth.checkToken, upload.single('noteImage'), notes.create);

    // Retrieve all Notes
    app.get('/notes', auth.checkToken, notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);
}
