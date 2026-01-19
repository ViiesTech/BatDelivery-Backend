const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    type: {
        type: String,
        enum: ["user", "vendor", "driver", "admin"]
    },
    fullName: {
        type: String,
        requried: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone:{
        type: Number
    },
    age: {
        type: Number
    },
    DOB: {
        type: String,
    },
    profileImage: {
        type: String
    },
    longitude: {
        type: Number,
    },
    latitude: {
        type: Number
    },
    locationName: {
        type: String
    },
    location: {
        type: {
            type: String,
            enum: ["Point"]
        },
        coordinates:{
            type: [Number]
        },
                locationName: {
            type: String
        }
    },
        driverLicense: {
        type: [String]
    },
    document: {
        type: [String]
    },
    path: {
        type: String,
    },
    isCreated: {
        type: Boolean,
        default: false
    }
});

userSchema.index({ location: "2dsphere"});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;