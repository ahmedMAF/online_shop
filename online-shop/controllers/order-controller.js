const orderModel = require("../models/order-model");

exports.orederAdressMW = function(req , res , next){
    req.flash("cartId" , req.body.idd);
    res.render("order-adress" , {
        userOrNot: req.cookies.idd,
        isAdmin: req.cookies.isAdmin,
        pageTitel: "Adress"
    });
}


exports.addOrderMW = function(req , res , next){
    orderModel.addOrder(req.flash("cartId")[0] , req.body.adress , req.cookies.email).then((data) =>{
        res.redirect("/orders");
    });
}

exports.viewOrderMW = function(req , res , next){
    orderModel.getOrder(req.cookies.idd).then((data) =>{
        res.render("view-order" , {
            data: data,
            userOrNot: req.cookies.idd,
            isAdmin: req.cookies.isAdmin,
            pageTitel: "Order"
        });
    });
}

exports.deleteOrderMW = function(req , res , next){
    orderModel.deleteOrder(req.body.idOrder).then((data) => {
        res.redirect("/orders");
    });
}