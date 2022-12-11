const mongoose = require("mongoose");
const schema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timeAddToCatr: Number
});
const model = mongoose.model("cart" , schema);


exports.addProductToCart = function(data){

    return new Promise(function(resolve , reject){

        mongoose.connect("mongodb+srv://ahmed:aaa@cluster0.llh1tpm.mongodb.net/?retryWrites=true&w=majority" , () => {
            let itemCart = new model(data);
            itemCart.save().then((x) => {
                mongoose.disconnect();
                resolve("ok");
            });
        });

    });

}

exports.getItems = function(idUser){

    return new Promise(function(resolve , reject){

        mongoose.connect("mongodb+srv://ahmed:aaa@cluster0.llh1tpm.mongodb.net/?retryWrites=true&w=majority" , () => {
            model.find({userId: idUser}).then((data) => {
                mongoose.disconnect();
                resolve(data);
            });
        });

    });

}

exports.saveAmount = function(amount , idCartForUpdate){
    return new Promise(function(resolve , reject){

        mongoose.connect("mongodb+srv://ahmed:aaa@cluster0.llh1tpm.mongodb.net/?retryWrites=true&w=majority" , () => {
            model.updateOne({_id: idCartForUpdate} , {amount: amount}).then((x) => {
                mongoose.disconnect();
                resolve("ok");
            });
        });

    });
}


exports.deleteItem = function(idCartForDelete){

    return new Promise(function(resolve , reject){

        mongoose.connect("mongodb+srv://ahmed:aaa@cluster0.llh1tpm.mongodb.net/?retryWrites=true&w=majority" , () => {
            model.deleteOne({_id: idCartForDelete}).then((x) => {
                mongoose.disconnect();
                resolve("ok");
            });
        });

    });

}

exports.getOneItemByID = function(id){

    return new Promise(function(resolve , reject){

        mongoose.connect("mongodb+srv://ahmed:aaa@cluster0.llh1tpm.mongodb.net/?retryWrites=true&w=majority" , () => {
            model.findOne({_id: id}).then((data) => {
                mongoose.disconnect();
                resolve(data);
            });
        });

    });

}