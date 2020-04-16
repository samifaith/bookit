// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
<<<<<<< HEAD
var port     = process.env.PORT || 7070;
=======
var port     = process.env.PORT || 8080;
>>>>>>> f0d2bb74fce955e301d6415c111117868cb0e9b6
const MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
<<<<<<< HEAD
=======

>>>>>>> f0d2bb74fce955e301d6415c111117868cb0e9b6
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
<<<<<<< HEAD
const ObjectId = require('mongodb').ObjectID;
const multer = require('multer');
var configDB = require('./config/database.js');
var db

// configuration ===============================================================
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(configDB.url, (err, database) => {
  if (err) return console.log(err)
  db = database
  require('./app/routes.js')(app, passport, db, multer, ObjectId);
=======

var configDB = require('./config/database.js');

var db

// configuration ===============================================================
mongoose.connect(configDB.url, (err, database) => {
  if (err) return console.log(err)
  db = database
  require('./app/routes.js')(app, passport, db);
>>>>>>> f0d2bb74fce955e301d6415c111117868cb0e9b6
}); // connect to our database

//app.listen(port, () => {
    // MongoClient.connect(configDB.url, { useNewUrlParser: true }, (error, client) => {
    //     if(error) {
    //         throw error;
    //     }
    //     db = client.db(configDB.dbName);
    //     console.log("Connected to `" + configDB.dbName + "`!");
    //     require('./app/routes.js')(app, passport, db);
    // });
//});

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'bookit', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
//require('./app/routes.js')(app, passport, db); // load our routes and pass in our app and fully configured passport

<<<<<<< HEAD



=======
>>>>>>> f0d2bb74fce955e301d6415c111117868cb0e9b6
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
