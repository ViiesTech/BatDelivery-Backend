const userFunction = require("../functions/user");
const validations = require("../functions/validation");
const otpFunction = require("../functions/otp");
const sendMail = require("../functions/sendMail");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
require("dotenv").config();

const signup = async (req, res) => {
    try {
        const validate = await validations.validateUserEmail(req);
        if(validate){
            return res.status(400).json({
                success: false,
                msg: "User Already Exist!"
            })
        } else {
            const user = await userFunction.signup(req);
            let token = jwt.sign({
                _id: user._id,
                email: user.email,
                fullName: user.fullName,
                type: user.type
            }, process.env.SECRET_KEY, { expiresIn: "1y"});
            return res.status(200).json({
                success: true,
                msg: "User Signed-Up Successfully!",
                data: {
                    _id: user._id,
                    email: user.email,
                    fullName: user.fullName,
                    type: user.type
                }, token
            })
        }
    } catch (error) {
        console.log("having errors :", error)
        return res.status(400).json({
            success: false,
            msg: "Something Went Wrong!",
            error: error.message
        })
    }    
};

const login = async (req, res) => {
    try {
        // console.log("req",req.body)
        let validate = await validations.validateUserEmail(req);
        // console.log("email",validate)
        if(!validate){
            return res.status(200).json({
                success: false,
                msg: "No User Found!"
            })
        } else {
            const user = await userFunction.getUser(req);
            let hash = user.password;
            let password = req.body.password;
            let verify = await validations.verifyPassword(password, hash);
            if(!verify){
                return res.status(200).json({
                    success: false,
                    msg: "Invalid Password"
                })
            } else {
                const userId = user._id;
                const userData = await userFunction.getUserById(userId);
                let token = jwt.sign({
                    id: user._id,
                    email: user.email,
                    fullName: user.fullName,
                    type: user.type 
                }, process.env.SECRET_KEY, { expiresIn: "1y"});
                return res.status(200).json({
                    success: true,
                    msg: "User Logged In Successfully!",
                    data: userData,
                    token
                })
            }
        }
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(400).json({
            success: false,
            msg: "Something Went Wrong!",
            error: error.message
        })
    }
};

const forgetPassword = async (req, res) => {
    try {
        const user = await userFunction.getUser(req);
        if(!user){
            return res.status(200).json({
                success: false,
                msg: "No User Found!"
            })
        } else {
            const createOTP = await otpFunction.generateOTP(req);
            const userData = {
                email: req.body.email,
                OTP: createOTP.OTP,
                type: user.type,
                _id: user._id 
            };

            const sendOTP = await sendMail.sendOTP(userData);
            return res.status(200).json({
                success: true,
                msg: "OTP is Sent!",
                data: userData
            });
        }

    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(400).json({
            success: false,
            msg: "Something Went Wrong!",
            error: error.message
        })
    }
};

const verifyOTP = async (req, res) => {
    try {
        const verify = await otpFunction.verifyOTP(req);
        if(!verify){
            return res.status(200).json({
                success: false,
                msg: "Invalid OTP!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "OTP is Successfully Verified!"
            })
        }
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(400).json({
            success: false,
            msg: "Something Went Wrong!",
            error: error.message
        })
    }
};

const resetPassword = async (req, res) => {
    try {
        const user = await userFunction.resetPassword(req);
        if(!user){
            return res.status(200).json({
                success: false,
                msg: "No User Found!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "Password Updated!",
                data: user
            })
        }
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(400).json({
            success: false,
            msg: "Something Went Wrong!",
            error: error.message
        })
    }
};

const changePassword = async (req, res) => {
    try {
        const { userId, password } = req.body;
        const user = await userFunction.getUserById(userId);
        req.body.email = user.email;
        const userData = await userFunction.getUser(req);
        const hash = userData.password;
        const verify = await validations.verifyPassword(password, hash);
        if(!verify){
            return res.status(200).json({
                success: false,
                msg: "Incorrect Password!"
            })
        } else {
            const reset = await userFunction.resetPassword(req);
            return res.status(200).json({
                success: true,
                msg: "Password Successfully Changed!"
            })
        }
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(400).json({
            success: false,
            msg: "Something Went Wrong!",
            error: error.message
        })        
    }
}

module.exports = {
    signup,
    login,
    forgetPassword,
    verifyOTP,
    resetPassword,
    changePassword
};