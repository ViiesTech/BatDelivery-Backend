const express = require("express");
const router = express.Router();

const Auth = require("../middleware/auth");
const productController = require("../controllers/product");

//Product Routes 
router.post("/user/addProduct", Auth.uploadProduct.single("productImage"), productController.addProduct);
router.get("/user/getProduct", productController.getProductById);
router.get("/user/getAllProducts", productController.getAllProducts);
router.post("/user/updateProduct", Auth.uploadProduct.single("productImage"), productController.updateProduct);
router.post("/user/addVariant", Auth.uploadProduct.single("productImage"), productController.addToVariants);
router.post("/user/deleteProduct", productController.deleteProduct);

module.exports = router;