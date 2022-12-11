const router = require("express").Router();
const cartMW = require("../controllers/cart-controller");
const userOrNot = require("../controllers/guard/guard-for-login");
const bodyParses = require("body-parser");
const validationAomunt = require("../controllers/validation-controller");
const bodyParsesMW = bodyParses.urlencoded({
    extended: true
}); 

router.get("/cart" , userOrNot.gurdForLoginMW , cartMW.cartMW);

router.post("/cart" , userOrNot.gurdForLoginMW , bodyParsesMW , 
validationAomunt.validationAomunt , cartMW.addItemToCartMW);

router.post("/cart/save" , bodyParsesMW , validationAomunt.validationAomuntWhenUpdate
, cartMW.SaveApdutesMW);

router.post("/cart/delete" , bodyParsesMW , cartMW.deleteCartItemMW);

module.exports = router;