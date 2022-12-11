const router = require("express").Router();
const bodyParses = require("body-parser");
const order = require("../controllers/order-controller");
const gurdForLogin = require("../controllers/guard/guard-for-login");
const valaditionAddress = require("../controllers/validation-controller");
const bodyParsesMW = bodyParses.urlencoded({
    extended: true
}); 

router.get("/orders" , gurdForLogin.gurdForLoginMW , order.viewOrderMW);

router.post("/order/adress" , bodyParsesMW , order.orederAdressMW);

router.post("/order/add" , bodyParsesMW , order.addOrderMW);

router.post("/order/delete" , bodyParsesMW , order.deleteOrderMW);

module.exports = router;