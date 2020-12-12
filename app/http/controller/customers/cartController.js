function cartController() {

  return {
//index is an function
    index(req,res)
    {
       res.render("customers/cart");
    }

  }
}

module.exports = cartController
