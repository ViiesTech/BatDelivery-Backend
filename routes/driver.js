const express = require("express");
const router = express.Router();

const Auth = require("../middleware/auth");
const vehicleController = require("../controllers/vehicle");
const orderController = require("../controllers/order");

// Vehicle Profile Routes
router.post("/user/addVehicle", Auth.uploadDriver.array("images", 3), vehicleController.addVehicle);
router.get("/user/getVehicleProfile", vehicleController.getVehicleById);
router.get("/user/getVehicleByDriver", vehicleController.getAllVehicles);
router.post("/user/updateVehicle", Auth.uploadDriver.array("images", 3), vehicleController.updateVehicle);
router.post("/user/deleteVehicle", vehicleController.deleteVehicle);

// Order Routes 
router.get("/user/nearbyOrders", orderController.getNearbyOrders);

module.exports = router;