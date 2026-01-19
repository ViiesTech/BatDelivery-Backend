const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const userController = require("../controllers/user");
const orderController = require("../controllers/order");
const reviewController = require("../controllers/review");

router.get("/user/getUserProfile", userController.getProfile);
router.post("/user/updateUser", auth.uploadUser.fields([
    {name: "profileImage", maxCount: 1},
    { name: "license", maxCount: 2},
    { name: "documents", maxCount: 3}
]), userController.updateUser);
router.get("/user/getAllUsers", userController.getAllUsers);
router.post("/user/deleteUser", userController.deleteUser);

// Favorite Routes
router.post("/user/addToFavorite", userController.addToFavorite);
router.get("/user/getAllFavorites", userController.getAllFavorites);

// Order Routes
router.post("/user/createOrder", orderController.createOrder);
router.get("/user/getAllOrders", orderController.getAllorders);
router.get("/user/getOrderById", orderController.getOrderId);
router.post("/user/updateOrder", orderController.updateOrder);
router.post("/user/deleteOrder", orderController.deleteOrder);

// Review Routes
router.post("/user/addReview", reviewController.addReview);
router.get("/user/getReviewById", reviewController.getReviewById);
router.post("/user/updateReview", reviewController.updateReview);
router.get("/user/getAllReviews", reviewController.getAllReviews);
router.get("/user/overAllRatings", reviewController.totalVendorReviews);
router.post("/user/deleteReview", reviewController.deleteReview);

router.get("/ebay/account-deletion", userController.ebaytestGet);
router.post("/ebay/account-deletion", userController.ebayTestPost);

module.exports = router;