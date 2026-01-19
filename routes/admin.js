const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

router.post("/user/addCategory", adminController.addCategory);
router.get("/user/getCategory", adminController.getCatgeoryById);
router.get("/user/allCategories", adminController.getAllCategories);
router.post("/user/updateCategory", adminController.updateCategory);
router.post("/user/deleteCategory", adminController.deleteCategory);

module.exports = router;