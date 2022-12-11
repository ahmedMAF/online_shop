const router = require("express").Router(); 
const admin = require("../controllers/admin-controller");
const guardAdmin = require("../controllers/guard/guard-for-admin");
const multer = require("multer");
const validation = require("../controllers/validation-controller");
const bodyParses = require("body-parser");
const bodyParsesMW = bodyParses.urlencoded({
    extended: true
}); 
const multerMW = multer({
    storage: multer.diskStorage({
        destination: function(req , file , cb){
            cb(null , "images"); // مسار الفولدر الي بدك تحفظ فيه الملف
        },
        filename: function(req , file , cb){
            cb(null , new Date().getTime() + "-" + file.originalname);
            // اسم الصورة الي بدك تحفظها
        }
    })
}).single("photo");


router.get("/admin/add" , guardAdmin.guardAdminMW , admin.addProductViewMW);

router.post("/admin/add" , multerMW , validation.validationProductoAddMW , admin.addProductToDBMW);

router.get("/admin/manage/orders" , guardAdmin.guardAdminMW , admin.manageOrdersMW);

router.post("/admin/manage/orders" , bodyParsesMW , admin.manageSomeOrdersMW);

router.post("/admin/manage/order/searsh" , bodyParsesMW , admin.seachOrderMW);

router.post("/admin/orders/save" , bodyParsesMW , admin.updateStatusMW);

module.exports = router;