//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const PORT = process.env.PORT || 8080
const mongoose = require('mongoose')

//Database connection
const url = "mongodb://localhost/food";
mongoose.connect(url,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true});
const connection = mongoose.connection;
connection.once("open", function(){
  console.log("Database connected...");
}).catch(function (err) {
  console.log("Connection failed...");
});


const app = express();
//Assets
app.use(express.static('public'));


//set Template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

// here we created a instance app
require('./routes/web')(app)

app.listen(8080, function() {
  console.log("Server started on port ${PORT}");
});
