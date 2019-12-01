module.exports = (app) => {
    const members = require('../controllers/member.controller.js');
    const auth = require('../../middleware/auth.js');

    app.post('/members', auth.checkToken, members.create);

    app.get('/members', members.findAll);

    app.get('/members/:memberId', members.findOne);

    app.put('/members/:memberId', auth.checkToken, members.update);

    app.delete('/members/:memberId', auth.checkToken, members.delete);
};
