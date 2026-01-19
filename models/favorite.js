const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        requried: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true 
    }
});

const favoriteModel = mongoose.model("Favorite", favoriteSchema);
module.exports = favoriteModel;

