//client side code
import axios from "axios";
import Noty from "noty";

let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelector("#cartCounter");

function updateCart(food)  //food indicates the itemsAddToCart
{
   axios.post("/update-cart",food).then(function(res)   //food indicates the itemsAddToCart
   {
     cartCounter.innerText = res.data.totalQty;
     new Noty ({
       type: "success",
       timeout: 1000,
       text: "Item added to cart",
       progressBar: false,
       layout: "topRight"
     }).show();
   }).catch(function(err){
     new Noty ({
       type: "error",
       timeout: 1000,
       text: "Something went wrong",
       progressBar: false,
       layout: "topRight"
   }).show();
 });
}

addToCart.forEach(function(btn)
 {
  btn.addEventListener("click", function(e)
   {
    let food = JSON.parse(btn.dataset.food);   //food indicates from home.ejs data-food i.e; cartList
    updateCart(food); //food indicates the itemsAddToCart
    console.log(food); //food indicates the itemsAddToCart
  });
});
