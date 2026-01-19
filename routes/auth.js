const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const locationController = require("../controllers/location");

router.post("/user/signup", authController.signup);
router.post("/user/login", authController.login);
router.post("/user/forgetPassword", authController.forgetPassword);
router.post("/user/verifyOTP", authController.verifyOTP);
router.post("/user/resetPassword", authController.resetPassword);
router.post("/user/changePassword", authController.changePassword);

router.post("/user/addLocation", locationController.addLocation);
router.get("/user/getLocation", locationController.getLocationById);
router.get("/user/allLocations", locationController.getAllLocations);
router.post("/user/selectLocation", locationController.selectLocation);
router.post("/user/updateLocation", locationController.updateLocation);
router.post("/user/deleteLocation", locationController.deleteLocation);

module.exports = router;