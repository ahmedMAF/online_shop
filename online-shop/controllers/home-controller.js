const productFromDB = require("../models/product-model");

exports.mWHome = function (req , res , next){
    // get data from data base
    // render file ==> render index.ejs
    if(req.query.catogary === undefined || req.query.catogary === "all"){
        productFromDB.products().then(function(data){
            res.render("index" , {
                products: data,
                userOrNot: req.cookies.idd,
                isAdmin: req.cookies.isAdmin,
                pageTitel: "Home",
                catogary: "all"
            })
        });
    }

    else{
        productFromDB.productsWithFilter(req.query.catogary).then(function(data){
            res.render("index" , {
                products: data,
                userOrNot: req.cookies.idd,
                isAdmin: req.cookies.isAdmin,
                pageTitel: "Home",
                catogary: req.query.catogary
            })
        });
    }

}