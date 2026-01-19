const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        requried: true
    },
    vendorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        requried: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        requried: true
    },
    stars:{
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },
    message: {
        type: String
    }
});

const reviewModel = mongoose.model("Review", reviewSchema);
module.exports = reviewModel;