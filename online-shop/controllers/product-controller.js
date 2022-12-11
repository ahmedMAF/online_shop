const product = require("../models/product-model");

exports.productMW = function(req , res , next){
    //get id
    let id = req.params.id;
    //get product
    product.getProductById(id).then(function(data){
        res.render("product" , {
            product: data,
            userOrNot: req.cookies.idd,
            erorrAomunt: req.flash("erorrAomunt")[0],
            isAdmin: req.cookies.isAdmin,
            pageTitel: "Product"
        })
    });
    //display product
}