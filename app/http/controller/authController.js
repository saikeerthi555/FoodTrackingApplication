function authController() {

  return {
//login is an function
    login(req,res)
    {
       res.render("auth/login");
    },
    register(req,res)
    {
      res.render("auth/register");
    }

  }
}

module.exports = authController
