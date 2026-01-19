const userModel = require("../models/user");
const bcrypt = require("bcrypt");

const validateUserEmail = async (req) => {
    const { email } = req.body;
    const exists = await userModel.findOne({ email: email });
    return exists
   
};

const verifyPassword = async (password, hash) => {
    const match = await bcrypt.compare(password, hash);
    console.log("Testing :", match);
    return match
};

module.exports = {
    validateUserEmail,
    verifyPassword
};