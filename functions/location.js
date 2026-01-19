const locationModel = require("../models/location");

const addLocation = async (req) => {
    const location = {
        type: "Point",
        coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)],
        locationName: req.body.locationName || null
    }
    if(req.body.userId){
        const newLocation = new locationModel({
            userId: req.body.userId,
            location: location
        });
        const result = await newLocation.save();
        return result
    } else {
        const newLocation = new locationModel({
            driverId: req.body.driverId,
            location: location
        });
        const result = await newLocation.save();
        return result
    }
};

const getAllLocations = async (req) => {
    const { userId, driverId } = req.query;
    const filter = {};
    if(userId){
        filter.userId = userId
    }
    if(driverId){
        filter.driverId = driverId
    }

    const locations = await locationModel.find(filter);
    return locations
};

const getLocation = async (req) => {
    const { locationId } = req.query;
    console.log("first", locationId);
    const location = await locationModel.findById({ _id: locationId });
    return location
}

const updateLocation = async (req) => {
    const { locationId, longitude, latitude, locationName } = req.body;
    const filter = {};
    const updatedLocation = {
        type: "Point",
        coordinates: [ parseFloat(longitude), parseFloat(latitude) ],
        locationName: locationName || null 
    }
    const location = await locationModel.findById({ _id: locationId }, 
        { $set: { location: updateLocation } },
        { new: true }
    );
    return location 
};

const selectLocation = async (req) => {
    const { userId, driverId, locationId } = req.body;
    const filter = {};
    if(userId){
        filter.userId = userId
    }
    if(driverId){
        filter.driverId = driverId
    };

    const location = locationModel.findByIdAndUpdate({_id: locationId},
        { $set: { isSelected: true } },
        { new: true }
    );

    const otherLocations = await locationModel.updateMany(filter, 
        { $set: { isSelected: false } },
        { new: true }
    );
    return location 
};

const deleteLocation = async (req) => {
    const { locationId } = req.query;
    const location = await locationModel.findByIdAndDelete({_id: locationId});
    return location
};

module.exports = {
    addLocation,
    getAllLocations,
    getLocation,
    updateLocation,
    selectLocation,
    deleteLocation
};