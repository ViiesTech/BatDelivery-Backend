const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OTPSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    OTP: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expiresIn: "600"  
    }
});

const OTPModel = mongoose.model("OTP", OTPSchema);
module.exports = OTPModel;