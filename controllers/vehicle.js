const vehicleFunction = require("../functions/vehicle");

const addVehicle = async (req, res) => {
    try {
        const vehicle = await vehicleFunction.addVehicle(req);
        return res.status(200).json({
            success: true,
            msg: "Vehicle Added Successfully!",
            data: vehicle
        }) 
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(400).json({
            success: false,
            msg: "Something Went Wrong!",
            error: error.message
        })        
    }
};

const getVehicleById = async (req, res) => {
    try {
        const vehicle = await vehicleFunction.getVehicleById(req);
        if(!vehicle){
            return res.status(200).json({
                success: true,
                msg: "No Vehicle Profile Found!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "Vehicle Profile By ID!",
                data: vehicle
            })
        }
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(400).json({
            success: false,
            msg: "Something Went Wrong!",
            error: error.message
        })        
    }
};

const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await vehicleFunction.getAllVehicles(req);
        if (vehicles.length === 0) {
            return res.status(200).json({
                success: true,
                msg: "No Vehilce Found!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "All Vehicles!",
                data: vehicles
            })
        }
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(400).json({
            success: false,
            msg: "Something Went Wrong!",
            error: error.message
        })        
    }    
};

const updateVehicle = async (req, res) => {
    try {
        const vehicle = await vehicleFunction.updateVehicle(req);
        if(!vehicle){
            return res.status(200).json({
                success: true,
                msg: "No Vehicle Found to Update!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "Vehicle Profile Updated!",
                data: vehicle
            })
        }
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(400).json({
            success: false,
            msg: "Something Went Wrong!",
            error: error.message
        })        
    }    
};

const deleteVehicle = async (req, res) =>  {
    try {
        const vehicle = await vehicleFunction.deleteVehicle(req);
        return res.status(200).json({
            success: true,
            msg: "Vehilce Profile Deleted!"
        })
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(400).json({
            success: false,
            msg: "Something Went Wrong!",
            error: error.message
        })        
    }    
};

module.exports = {
    addVehicle,
    getVehicleById,
    getAllVehicles,
    updateVehicle,
    deleteVehicle
};
