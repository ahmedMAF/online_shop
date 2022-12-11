const router = require("express").Router(); //local router
const homeMW = require("../controllers/home-controller");

router.get("/" , homeMW.mWHome);

module.exports = router;