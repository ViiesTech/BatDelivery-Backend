const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    driverId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    images: {
        type: [String]
    },
    vehicleName: {
        type: String
    },
    vehiclebrand: {
        type: String
    },
    vehicleModel: {
        type: String
    },
    socialSecurityNo: {
        type: Number
    },
    vehicleColor: {
        type: String
    }
});

const vehicleProfileModel = mongoose.model("Vehicle", vehicleSchema);
module.exports = vehicleProfileModel;