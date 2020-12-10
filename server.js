//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");


const app = express();
//Assets
app.use(express.static('public'));


//set Template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

app.get("/", function(req,res)
{
  res.render('home');
});

app.get("/cart",function(req,res){
  res.render('customers/cart');
});

app.get("/login",function(req,res){
  res.render('auth/login');
});

app.get("/register",function(req,res){
  res.render('auth/register');
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
