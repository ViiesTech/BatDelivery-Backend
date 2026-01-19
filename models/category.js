const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoryScehma = new Schema({
    categoryName: {
        type: String,
        requried: true
    }
});

const categoryModel = mongoose.model("Category", categoryScehma);
module.exports = categoryModel;