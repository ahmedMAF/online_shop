exports.guardAdminMW = function(req , res , next){
    if(req.cookies.isAdmin === "true"){
        next();
    }
    else{
        res.redirect("/");
    }
}