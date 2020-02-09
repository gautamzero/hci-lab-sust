module.exports = (app, multer) => {
    const achievments = require('../controllers/achievment.controller.js');
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

    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*"); 
      // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.post('/achievments', auth.checkToken, upload.single('achievmentImage'), achievments.create);

    app.get('/achievments', achievments.findAll);

    app.put('/achievments/:achivementId', auth.checkToken, achievments.update);

    app.delete('/achievments/:achivementId', auth.checkToken, achievments.delete);
};
