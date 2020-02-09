module.exports = (app, multer) => {
    const projects = require('../controllers/project.controller.js');
    const  auth = require('../../middleware/auth.js');
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

    app.post('/projects', auth.checkToken, upload.single('projectImage'), projects.create);

    app.get('/projects', projects.findAll);

    app.put('/projects/:projectId', auth.checkToken, projects.update);

    app.delete('/projects/:projectId', auth.checkToken, projects.delete);
};