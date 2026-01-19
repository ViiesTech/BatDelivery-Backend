const rideFunction = require("../functions/ride");

const getRideById = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(400).json({
            success: false,
            msg: "Something Went Wrong!",
            error: error.message
        })
    }
};

const getAllRides = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(400).json({
            success: false,
            msg: "Something Went Wrong!",
            error: error.message
        })
    }    
};

const updateRide = async (req, res) => {
    try {
        
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(400).json({
            success: false,
            msg: "Something Went Wrong!",
            error: error.message
        })
    }    
};

const deleteRide = async (req, res) => {
    try {
        
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
    getRideById,
    getAllRides,
    updateRide,
    deleteRide
};