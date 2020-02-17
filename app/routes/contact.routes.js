module.exports = (app) => {
    const contact = require('../controllers/contact.controller.js');

    // Create a new Note
    app.post('/contact', contact.sendMail);
}