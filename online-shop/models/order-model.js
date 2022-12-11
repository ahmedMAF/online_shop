const mongoose = require("mongoose");
const cartDB = require("./cart-model");

const schemaOrder = mongoose.Schema({
    name: String,
    amount: Number,
    cost:Number,
    adress: String,
    status: String,
    time: String,
    userId: String,
    emailUser: String
});
const modelOrder = mongoose.model("order" , schemaOrder);

exports.getAllOrders = function(){
    return new Promise(function(resolve , reject){
        mongoose.connect("mongodb+srv://ahmed:aaa@cluster0.llh1tpm.mongodb.net/?retryWrites=true&w=majority" , () => {
            modelOrder.find().then((data) => {
                mongoose.disconnect();
                resolve(data);
            });
        });
    });
}

exports.getSomeAllOrders = function(custemOrders){
    return new Promise(function(resolve , reject){
        mongoose.connect("mongodb+srv://ahmed:aaa@cluster0.llh1tpm.mongodb.net/?retryWrites=true&w=majority" , () => {
            modelOrder.find({status: custemOrders}).then((data) => {
                mongoose.disconnect();
                resolve(data);
            });
        });
    });
}

exports.addOrder = function(orderId , address , email){

    return new Promise(function(resolve , reject){

        cartDB.getOneItemByID(orderId).then((data) => {
            cartDB.deleteItem(orderId).then((x) =>{
                mongoose.connect("mongodb+srv://ahmed:aaa@cluster0.llh1tpm.mongodb.net/?retryWrites=true&w=majority" , () => {
                    let newOrder = new modelOrder({
                        name: data.name,
                        amount: data.amount,
                        cost: data.price,
                        adress: address,
                        status: "قيد المعالجة",
                        time: new Date().getTime(),
                        userId: data.userId,
                        emailUser: email
                    });
                    newOrder.save().then((x) => {
                        mongoose.disconnect();
                        resolve("ok");
                    });
                });
            });
        });

    });

}


exports.getOrder = function(idUder){
    return new Promise(function(resolve , reject){
        mongoose.connect("mongodb+srv://ahmed:aaa@cluster0.llh1tpm.mongodb.net/?retryWrites=true&w=majority" , () => {
            modelOrder.find({userId: idUder}).then((data) => {
                mongoose.disconnect();
                resolve(data);
            });
        });
    });
}


exports.deleteOrder = function(idOrder){
    return new Promise(function(resolve , reject){
        mongoose.connect("mongodb+srv://ahmed:aaa@cluster0.llh1tpm.mongodb.net/?retryWrites=true&w=majority" , () => {
            modelOrder.deleteOne({_id: idOrder}).then((x) => {
                resolve("ok");
            });
        });
    });
}

exports.searchOrder = function(email){
    return new Promise(function(resolve , reject){
        mongoose.connect("mongodb+srv://ahmed:aaa@cluster0.llh1tpm.mongodb.net/?retryWrites=true&w=majority" , () => {
            modelOrder.find({emailUser: email}).then((data) => {
                mongoose.disconnect();
                resolve(data);
            });
        });
    });
}

exports.updateOrder = function(id , statusValue){
    return new Promise(function(resolve , reject){
        mongoose.connect("mongodb+srv://ahmed:aaa@cluster0.llh1tpm.mongodb.net/?retryWrites=true&w=majority" , () => {
            modelOrder.updateOne({_id: id} , {status: statusValue}).then((x) => {
                mongoose.disconnect();
                resolve(x);
            });
        });
    });
}