const Menu = require("../../models/menu");

function homeController() {

  return {
//index is an function
    index(req,res)
    {
      Menu.find().then(function(food){
        //console.log(food);
        return res.render("home", {foodItems: food});
      });

    }

  }
}

module.exports = homeController
