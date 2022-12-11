const mongoose = require("mongoose");
const schema = mongoose.Schema({
        name: String,
        price: Number,
        category: String,
        description: String,
        image: String
});
const model = mongoose.model("product" , schema);

exports.addProduct = function(data){

    return new Promise(function(resolve , reject){
        mongoose.connect("mongodb+srv://ahmed:aaa@cluster0.llh1tpm.mongodb.net/?retryWrites=true&w=majority" , () => {
            let newProduct = new model(data);
            newProduct.save().then(() => {
                mongoose.disconnect();
                resolve("ok");
            });
        });
    });

}

exports.products = function(){
    return new Promise(function(resolve , reject){

        mongoose.connect("mongodb+srv://ahmed:aaa@cluster0.llh1tpm.mongodb.net/?retryWrites=true&w=majority" , () => {
            model.find({}).then(function(data){
                mongoose.disconnect();
                resolve(data);
            });
        });

    });
}

exports.productsWithFilter = function(catogary){
    return new Promise(function(resolve , reject){

        mongoose.connect("mongodb+srv://ahmed:aaa@cluster0.llh1tpm.mongodb.net/?retryWrites=true&w=majority" , () => {
            model.find({category: catogary}).then(function(data){
                mongoose.disconnect();
                resolve(data);
            });
        });

    });
}
// تم إنشاء وعد خاص بنا ، لان من الممكن تنفيذ ==> render file ==> قبل جلب البيانات كلها من قواعد البيانات
// لو تم تنفيذ ==> render file ==> وفنكشن جلب البيانت لسا مخلصتش هنا يحدث خطأ

// عندما تكون الفنكشن غير متزامنة ، ومحتاج أعرف أن هذه الفنكشن خلصت عشان أنفذ شئ أخر نستخدم الوعود

exports.getProductById = function(id){
    return new Promise(function(resolve , reject){

        mongoose.connect("mongodb+srv://ahmed:aaa@cluster0.llh1tpm.mongodb.net/?retryWrites=true&w=majority" , () => {
            model.findById(id).then(function(data){
                mongoose.disconnect();
                resolve(data);
            });
        });

    });
}