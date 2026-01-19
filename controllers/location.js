const locationFunction = require("../functions/location");
const userFunction = require("../functions/user");

const addLocation = async (req, res) => {
    try {
        const location = await locationFunction.addLocation(req);
        return res.status(200).json({
            success: true,
            msg: "Location Added!",
            data: location
        })
    } catch (error) {
        console.log("Having Errors :", error)
        return res.status(400).json({
            success: false,
            msg: "Something Went Wrong!",
            error: error.message
        })
    }
};

const getAllLocations = async (req, res) => {
    try {
        const locations = await locationFunction.getAllLocations(req);
        if(locations.length === 0){
            return res.status(200).json({
                success: true,
                msg: "No Location Found!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "All Locations!",
                data: locations
            })
        }
    } catch (error) {
        console.log("Having Errors :", error)
        return res.status(400).json({
            success: false,
            msg: "Something Went Wrong!",
            error: error.message
        })
    }    
};

const getLocationById = async (req, res) => {
    try {
        const location = await locationFunction.getLocation(req);
        return res.status(200).json({
            success: true,
            msg: "Location Details!",
            data: location
        })
    } catch (error) {
        console.log("Having Errors :", error)
        return res.status(400).json({
            success: false,
            msg: "Something Went Wrong!",
            error: error.message
        })
    }    
};

const selectLocation = async (req, res) => {
    try {
        const locationData = await locationFunction.selectLocation(req);
        console.log("Controller :", locationData);
       if(!locationData){
            return res.status(200).json({
                success: false,
                msg: "No location Found to Select!"
            })
       } else {
            return res.status(200).json({
                success: true,
                msg: "Location Selected!",
                data: locationData
            })
       }
    } catch (error) {
        console.log("Having Errors :", error)
        return res.status(400).json({
            success: false,
            msg: "Something Went Wrong!",
            error: error.message
        })
    }    
};

const updateLocation = async (req, res) => {
    try {
        const location = await locationFunction.updateLocation(req);
        return res.status(200).json({
            success: true,
            msg: "Location Is Updated!",
            msg: location
        })
    } catch (error) {
        console.log("Having Errors :", error)
        return res.status(400).json({
            success: false,
            msg: "Something Went Wrong!",
            error: error.message
        })
    }    
};

const deleteLocation = async (req, res) => {
    try {
        const lcoation = await locationFunction.deleteLocation(req);
        return res.status(200).json({
            success: true,
            msg: "Location is Deleted!"
        })
    } catch (error) {
        console.log("Having Errors :", error)
        return res.status(400).json({
            success: false,
            msg: "Something Went Wrong!",
            error: error.message
        })
    }    
};

module.exports = {
    addLocation,
    getAllLocations,
    getLocationById,
    selectLocation,
    updateLocation,
    deleteLocation
};