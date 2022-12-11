const { post } = require("../routes/home-routs");

exports.validationUserName = function(req , res , next){
    if(req.body.userName !== ""){
        next();
    }else{
        req.flash("erorr" , "اسم المستخدم فارغ");
        res.redirect("/signup");
    }
}


exports.validationEmail = function(req , res , next){
    if(req.body.email !== "" && /\w+@gmail.\w+/.test(req.body.email) ){
        next();
    }else{
        req.flash("erorr" , "الايميل خطأ");
        res.redirect("/signup");
    }
}


exports.validationPassword = function(req , res , next){
    if(req.body.password !== "" && req.body.password.length > 6){
        next();
    }else{
        req.flash("erorr" , "كلمة السر يجب أن تكون أكبر من 6 حروف");
        res.redirect("/signup");
    }
}


exports.validationConform = function(req , res , next){
    if(req.body.passwordConfirmation !== "" && req.body.password === req.body.passwordConfirmation){
        next();
    }else{
        req.flash("erorr" , "كلمة السر ليس متطابقة مع الذي كتبتها سابقا");
        res.redirect("/signup");
    }
}

exports.validationAomunt = function(req , res , next){
    if(req.body.amount !== "" && +req.body.amount > 0){
        next();
    }else{
        req.flash("erorrAomunt" , "الكمية يجب أن تكون أكبر من صفر");
        res.redirect("/product/"+ req.body.idd);
    }
}

exports.validationAomuntWhenUpdate = function(req , res , next){
    if(req.body.aomunt !== "" && +req.body.aomunt > 0){
        next();
    }else{
        req.flash("erorrAomuntWhenUpdate" , "الكمية يجب أن تكون أكبر من صفر");
        res.redirect("/cart");
    }
}

exports.validationProductoAddMW = function(req , res , next){
    if(req.body.nameProduct !== "" && req.body.price !== "" && req.file !== undefined){
        next();
    }else{
        req.flash("erorr" , "أسم المنتج والسعر والصورة يجب أن تكون موجودة لإظافة المنتج");
        res.redirect("/admin/add");
    }
}