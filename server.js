const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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
        "message": "surprise madaf*cker"
    });
});

// Require Notes routes
require('./app/routes/auth.routes.js')(app);
require('./app/routes/note.routes.js')(app);
require('./app/routes/user.routes.js')(app);
require('./app/routes/member.routes.js')(app);


app.listen(9001, () => {
    console.log("server is listening on port 9001");
})