module.exports = (app, multer) => {
    const members = require('../controllers/member.controller.js');
    const auth = require('../../middleware/auth.js');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + '-' + file.originalname )
        }
      })
    const upload = multer({ storage: storage })



    app.post('/members', auth.checkToken, upload.single('memberImage'), members.create);

    app.get('/members', members.findAll);

    app.get('/members/:memberId', members.findOne);

    app.put('/members/:memberId', auth.checkToken, members.update);

    app.delete('/members/:memberId', auth.checkToken, members.delete);
};
