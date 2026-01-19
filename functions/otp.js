const OTPModel = require("../models/OTPModel");

const generateOTP = async (req) => {
    const { email } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const newOTP = new OTPModel({
        email: email,
        OTP: otp
    });
    const result = await newOTP.save();
    return result
};

const verifyOTP = async (req) => {
    const { email, OTP } = req.body;
    const otp = await OTPModel.findOne({ email: email, OTP: OTP });
    return otp
};

module.exports = {
    generateOTP,
    verifyOTP
};