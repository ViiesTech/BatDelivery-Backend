const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
      try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("DB Connected Sucessfully")
  } catch (error) {
    console.error("DB Connection Failed")
    console.error("Reasson :",error.message)
  }
};

module.exports = connectDB;
