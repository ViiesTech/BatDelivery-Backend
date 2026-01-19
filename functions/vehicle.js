const vehicleModel = require("../models/vehicleProfile");

const addVehicle = async (req) => {
    const imagePaths = req.files.map(file => file.filename)
    const newVehicle = new vehicleModel({
        ...req.body,
        images: imagePaths
    });
    const result = await newVehicle.save();
    return result
};

const getVehicleById = async (req) => {
    const { vehicleId } = req.query;
    const vehicle = await vehicleModel.findById({_id: vehicleId });
    return vehicle
};

const getAllVehicles = async (req) => {
    const { driverId } = req.query;
    const filter = {};

    filter.driverId = driverId;

    const vehicles = await vehicleModel.find(filter).populate({
        path: "driverId",
        select: "-password"
    });
    return vehicles
};

const updateVehicle = async (req) => {
    const { vehicleId } = req.body;
    const updatedData = req.body;

    if(req.files && req.files[0].filename){
        updatedData.images = req.files.map(file => file.filename)
    }

    const vehicle = await vehicleModel.findByIdAndUpdate({ _id: vehicleId }, 
        { $set: updatedData },
        { new: true }
    );
    return vehicle
};

const deleteVehicle = async (req) => {
    const { vehicleId } = req.query;
    const vehicle = await vehicleModel.findByIdAndDelete({ _id: vehicleId });
    return vehicle
};

module.exports = {
    addVehicle,
    getVehicleById,
    getAllVehicles,
    updateVehicle,
    deleteVehicle
};