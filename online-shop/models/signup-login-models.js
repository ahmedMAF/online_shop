const mongoose = require("mongoose");
const sechma = mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});
const model = mongoose.model("user" , sechma);

exports.creatAcount = function(userName , email , password){
    return new Promise(function(resolve , reject){

        mongoose.connect("mongodb+srv://ahmed:aaa@cluster0.llh1tpm.mongodb.net/?retryWrites=true&w=majority" , () => {
            model.findOne({email: email}).then(function(data){
                if(data === null){
                    let newUser = new model({
                        userName: userName,
                        email: email,
                        password: password
                    });
                    newUser.save().then((x) => {
                        mongoose.disconnect();
                        resolve("ok");
                    });
                } else{
                    mongoose.disconnect();
                    reject("no");
                }
            });
        });

    });
}


exports.login = function(email , password){
    return new Promise(function(resolve , reject){

        mongoose.connect("mongodb+srv://ahmed:aaa@cluster0.llh1tpm.mongodb.net/?retryWrites=true&w=majority" , () => {
            model.findOne({email: email}).then((data) =>{
            if(data === null){
                mongoose.disconnect();
                reject("الايميل غير موجود");
            }
            else{
                if(password === data.password){
                    mongoose.disconnect();
                    resolve(data);
                }else{
                    mongoose.disconnect();
                    reject("كلمة السر خطأ");
                }
            }
            });
        });

    });
}