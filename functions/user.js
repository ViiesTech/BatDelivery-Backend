const userModel = require("../models/user");
const bcrypt = require("bcrypt");

const signup = async (req) => {
    const newUser = new userModel(req.body);
    const hash = await bcrypt.hash(req.body.password, 10);
    newUser.password = hash;
    const result = await newUser.save();
    return result;
};

const getUser = async (req) => {
    const user = await userModel.findOne({email: req.body.email});
    return user
};

const getUserById = async (userId) => {
    const user = await userModel.findById(userId).select("-password");
    if(user.type === "driver"){
        return user
    } else {
        const cleanUser = user.toObject();
        delete cleanUser.driverLicense;
        delete cleanUser.document;
        return cleanUser;
    }
};

const getProfile = async (req) => {
    const { userId } = req.query;
    const user = await userModel.findById({_id: userId}).select("-password");
    
    // console.log("User", user);
    // return
    if(user.type === "driver"){
        return user
    } else {
        const cleanUser = user.toObject();
        delete cleanUser.driverLicense;
        delete cleanUser.document;
        return cleanUser;
    }
    
};

const updateUser = async (req) => {
    const { userId } = req.body;
    const updatedData = req.body;

    if(req.files.profileImage && req.files.profileImage[0].filename){
        updatedData.profileImage = req.files.profileImage[0].filename
    }

     if(req.files.license && req.files.license[0].filename){
        updatedData.driverLicense = req.files.license.map(files => req.files.license[0].filename);
    };

    if(req.files.documents && req.files.documents[0].filename){
        updatedData.document = req.files.documents.map(files => req.files.documents[0].filename)
    }

    if(req.body.longitude && req.body.latitude){
        const longitude = req.body.longitude;
        const latitude = req.body.latitude;
        updatedData.location = {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
            locationName: req.body.locationName || null
        }
    }

    const result = await userModel.findByIdAndUpdate({_id: userId},
        { $set: updatedData },
        { new: true }
    ).select("-password");
    return result
};

const updateLocation = async (locationData) => {
    const { userId } = locationData;
    let longitude = locationData.location.coordinates[0];
    let latitude = locationData.location.coordinates[1];
    let locationName = locationData.location.locationName;
    const location = {
        type: "Point",
        coordinates: [ parseFloat(longitude), parseFloat(latitude) ],
        locationName: locationName || null
    };
    const user = await userModel.findByIdAndUpdate(userId, 
        { $set: { location: location, longitude: longitude, latitude: latitude, locationName: locationName || null } },
        { new: true }
    ).select("-password");
    return user
};

const resetPassword = async (req) => {
    const { userId, newPassword } = req.body;
    const hash = await bcrypt.hash(newPassword, 10);
    const result = await userModel.findByIdAndUpdate({_id: userId},
        { $set: { password: hash } },
        { new: true }
    );
    return result
};

const getAllUsers = async (req) => {
    const { type } = req.query;
    if(type === "User" || type === "Vendor"){
        const users = await userModel.find({type: type}).select("-password -driverLicense -document");
        return users
    } else {
        const users = await userModel.find({type: type}).select("-password");
        return users
    }
};

const deleteUser = async (req) => {
    const { userId } = req.query;
    const result = await userModel.findByIdAndDelete({_id: userId});
    return result
};

module.exports = {
    signup,
    getUser,
    getUserById,
    getProfile,
    updateUser,
    updateLocation,
    resetPassword,
    getAllUsers,
    deleteUser
};