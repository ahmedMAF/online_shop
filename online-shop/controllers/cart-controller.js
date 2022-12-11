const addItemToCart = require("../models/cart-model");

exports.addItemToCartMW = function(req , res , next){
    addItemToCart.addProductToCart({
        name: req.body.name,
        price: req.body.price,
        amount: req.body.amount,
        userId: req.cookies.idd,
        productId: req.body.idd,
        timeAddToCatr: new Date().getTime()
    }).then((x) =>{
        res.redirect("/cart");
    });
} 
exports.cartMW = function(req , res , next){
    addItemToCart.getItems(req.cookies.idd).then((data) => {
        res.render("cart-user-iems" , {
            userOrNot: req.cookies.idd,
            data: data,
            erorrAomuntWhenUpdate: req.flash("erorrAomuntWhenUpdate"),
            isAdmin: req.cookies.isAdmin,
            pageTitel: "Cart"
        });
    });
}


exports.SaveApdutesMW = function(req , res , next){
    addItemToCart.saveAmount(req.body.aomunt , req.body.idd).then((x) =>{
        res.redirect("/cart");
    });
}

exports.deleteCartItemMW = function(req , res , next){
    addItemToCart.deleteItem(req.body.idd).then((x) => {
        res.redirect("/cart");
    });
}