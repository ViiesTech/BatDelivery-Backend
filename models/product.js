const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    vendorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productimage: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    brand: {
        type: String
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    },
    description: {
        type: String
    },
    variants: [{
        type: Schema.Types.ObjectId,
        ref: "Product" 
    }],
    favoriteBy: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    totalReviews: {
        type: String
    },
    avgRating: {
        type: String
    } 
});

const prodcuctModel = mongoose.model("Product", productSchema);
module.exports = prodcuctModel;