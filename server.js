const express = require('express');
const bodyParser = require('body-parser');
const multer  = require('multer');

const app = express();

app.use('/uploads', express.static('uploads') );

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

//configure database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(()=> {
    console.log("successfully connected to the database");
}).catch((err) => {
    console.log("could not connect to the database. exiting..", err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({
        "message": "surprise lab"
    });
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    next();
  });

// Require Notes routes
require('./app/routes/auth.routes.js')(app);
require('./app/routes/note.routes.js')(app, multer);
require('./app/routes/user.routes.js')(app);
require('./app/routes/member.routes.js')(app, multer);
require('./app/routes/project.routes.js')(app, multer);
require('./app/routes/achievment.routes.js')(app, multer);



app.listen(9001, () => {
    console.log("server is listening on port 9001");
})
