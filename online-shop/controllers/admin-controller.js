const addProductModel = require("../models/product-model");
const orderModel = require("../models/order-model");

exports.addProductViewMW = function(req , res , nex){
    res.render("add-product" , {
        userOrNot: req.cookies.idd,
        isAdmin: "true",
        addErorr: req.flash("erorr")[0],
        pageTitel: "Add Product"
    });
}


exports.addProductToDBMW = function(req , res , next){
    let data = {
        name: req.body.nameProduct,
        price: req.body.price,
        category: req.body.catogary,
        description: req.body.description,
        image: req.file.filename
    };
    addProductModel.addProduct(data).then((x) => {
        res.redirect("/");
    });
}


exports.manageOrdersMW = function(req , res , next){
    orderModel.getAllOrders().then((data) => {
        res.render("manage-order" , {
            userOrNot: req.cookies.idd,
            isAdmin: "true",
            data: data,
            pageTitel: "Manage order"
        });
    });
}

exports.manageSomeOrdersMW = function(req , res , next){
    orderModel.getSomeAllOrders(req.body.filter).then((data) => {
        res.render("manage-order" , {
            userOrNot: req.cookies.idd,
            isAdmin: "true",
            data: data,
            pageTitel: "Manage order"
        });
    });
}

exports.seachOrderMW = function(req , res , next){
    orderModel.searchOrder(req.body.email).then((data) => {
        res.render("manage-order" , {
            userOrNot: req.cookies.idd,
            isAdmin: "true",
            data: data,
            pageTitel: "Manage order"
        });
    });
}

exports.updateStatusMW = function(req , res , next){
    orderModel.updateOrder(req.body.orderId , req.body.status).then((x) => {
        res.redirect("/admin/manage/orders");
    });
}