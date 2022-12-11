const router = require("express").Router();
const productMW = require("../controllers/product-controller");
// اذا كان نوع الطلب قيت وكان اليو ار ال عبارة عن برودكت وسلاش وبعدها قيمة متغيرة
// يمكن تخزين هذه القيمة المتغيرة في متغير وهذا المتغير هو ==> :id
// حتي نصل الي هذه القيمة نستخدم ==> req.params.id
// اذا كان نوع الطلب قيت وكان اليو ار ال عبارة عن برودكت وسلاش وبعدها أي قيمة  فيتم تنفيذ هذه الموديل وير
router.get("/product/:id" , productMW.productMW);

module.exports = router;