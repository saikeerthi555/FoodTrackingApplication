//Relative path to get the Menu model
const Menu = require("../../models/menu");

function homeController() {

  return {
//index is an function
    index(req,res)
    {
      Menu.find().then(function(foods){
        //console.log(foods);
        return res.render("home", {foodItems: foods});
      });

    }

  }
}

module.exports = homeController
