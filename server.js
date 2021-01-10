//jshint esversion:6
require("dotenv").config()
const express = require("express");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const PORT = process.env.PORT || 8080
const mongoose = require('mongoose');
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo")(session)
const passport = require("passport");

const app = express();
//Database connection
const url = "mongodb://localhost/food";
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true
});
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("Database connected...");
}).catch(function(err) {
  console.log("Connection failed...");
});


//to store require connect-mongo package
//session store
let mongoStore = new MongoDbStore({
  mongooseConnection: connection,
  collection: "sessions"
});

//Session config
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: mongoStore,
  saveUninitialized: false,
  //cookie life tym defined below which is equal to 24hours valid.
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }//24 hours
 //  {
 //   maxAge: 1000 * 15
 // }//15 seconds
}));

//passport config
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


//Assets
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//global middleware
app.use(function(req,res,next)
{
res.locals.session = req.session;
res.locals.user = req.user
next()
});


//set Template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

// here we created a instance app
require('./routes/web')(app)

app.listen(8080, function() {
  console.log("Server started on port ${PORT}");
});
