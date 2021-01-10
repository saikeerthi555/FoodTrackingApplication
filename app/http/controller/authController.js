const User = require("../../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

function authController() {

  return {
//login is an function
    login(req,res)
    {
       res.render("auth/login");
    },

    postLogin(req, res, next){
    passport.authenticate("local", function(err, user, info){
      if(err) {
        req.flash("error", info.message)
        return next(err);
      }
      if(!user) {
        req.flash("error", info.message);
        return res.render("auth/login");
      }
      req.logIn(user, function(err) {
        if(err){
          req.flash("error", info.message);
          return next(err);
        }
        return res.redirect("/");
      })
    }) (req,res,next)
    },
    register(req,res)
    {
      res.render("auth/register");
    },
    async postRegister(req,res)
    {
      const { name, email, password } = req.body;

      //validate request
      if(!name || !email || !password)
      {
        req.flash("error" , "All fields are required");
        req.flash("name", name);
        req.flash("email", email);
        return res.redirect("/register");
      }

      //check if email exists
      User.exists({email: email} , function(err, result){

        if(result)
        {
          req.flash("error" , "Email already taken");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/register");
        }
      })
      //Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Create a user
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword
      });


     user.save().then(function(user) {
    //Login
    return res.redirect("/");

  }).catch(function(err){
    req.flash("error", "Something went wrong")
    return res.redirect("/register")
  });



      console.log(req.body);
    },

    logout(req, res) {
      req.logout()
      return res.redirect("/login")
    }

  }
}

module.exports = authController
