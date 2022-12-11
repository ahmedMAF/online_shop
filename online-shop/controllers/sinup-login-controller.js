const createacount = require("../models/signup-login-models");


exports.sinupMW = function(req , res , next){
    res.render("sinup-form" , {
        erorr: req.flash("erorr")[0],
        userOrNot: req.cookies.idd,
        isAdmin: "false",
        pageTitel: "Signup"
    });
}

exports.creatAcountMW = function(req , res , next){
    //get data from form
    //chek on email if exist or not
    //if email not exist ==> create acount and store data in dataBase
    createacount.creatAcount(req.body.userName , req.body.email , req.body.password).then( function(dataResove){
        res.redirect("/login");
    } , function(dataRegect){
        res.redirect("/signup");
    });
} 

exports.loginMW = function(req , res , next){
    res.render("login" , {
        erorr: req.flash("loginErorr")[0],
        userOrNot: req.cookies.idd,
        isAdmin: "false",
        pageTitel: "Login"
    });
}

exports.loginWithEmailAndPassworMW = function(req , res , next){
    createacount.login(req.body.email , req.body.password).then(function(data){
        res.cookie("idd" , data._id); // هذه الميثود لا تنهي الرد ، زي ==> res.write();
        res.cookie("isAdmin" , data.isAdmin);
        res.cookie("email" , data.email);
        res.redirect("/");
    } , function(data){
        req.flash("loginErorr" , data);
        // req.flash(key , value); ==> نستخدمها عندما أعمل مشاركة للبيانت في أي ريكوست وفي أي موديل وير
        // بمجرد أستخدام هذه البيانات يتم مسحها مباشرة

        // هنا أنا خزنت ==> key , value ==> يمكن أستخدم هذه القيمة في أي موديل وير
        //                               ==> بمجرد أستخدامهم سوف يتم مسحها مباشرة
        res.redirect("/login");
    });
};

exports.logout = function(req , res , next){
    res.clearCookie("idd");
    res.clearCookie("isAdmin");
    res.redirect("/");
}