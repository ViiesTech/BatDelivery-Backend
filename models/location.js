const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    driverId:{
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    location: {
        type: {
            type: String,
            enum: ["Point"]
        },
        coordinates: {
            type: [Number]
        },
        locationName: {
            type: String
        }
    },
    isSelected: {
        type: Boolean,
        default: false
    }
});

const locationModel = mongoose.model("Location", locationSchema);
module.exports = locationModel; 

