const router = require("express").Router();
const sinupLoginMWS = require("../controllers/sinup-login-controller");
const bodyParses = require("body-parser");
const validation = require("../controllers/validation-controller");
const bodyParsesMW = bodyParses.urlencoded({
    extended: true
}); 

router.get("/signup" , sinupLoginMWS.sinupMW);

router.post("/signup" , bodyParsesMW ,
validation.validationUserName , validation.validationEmail ,validation.validationPassword ,
validation.validationConform,
sinupLoginMWS.creatAcountMW);

router.get("/login" , sinupLoginMWS.loginMW);

router.post("/login" , bodyParsesMW , sinupLoginMWS.loginWithEmailAndPassworMW);

router.get("/logout" , sinupLoginMWS.logout);

module.exports = router;