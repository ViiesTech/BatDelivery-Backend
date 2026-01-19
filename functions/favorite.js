const favoriteModel = require("../models/favorite");
const productModel = require("../models/product");  

const addToFavorite = async (req) => {
    const { userId, productId } = req.body;
    const product = await productModel.findById({ _id: productId });
    if(product.favoriteBy.includes(userId)){
        const favoriteProduct = await productModel.findByIdAndUpdate(productId, 
            { $pull: {favoriteBy: userId}},
            { new: true }
        );
        const favorite = await favoriteModel.findOneAndDelete({ userId, productId });
        console.log("Deleted!");
    } else {
        const favoriteProduct = await productModel.findByIdAndUpdate(productId, 
            { $push: {favoriteBy: userId } },
            { new: true }
        );
        const newFavorite = new favoriteModel({
            userId,
            productId
        });
        const result = await newFavorite.save();
        console.log("Added!");
        return result
    }
};

const getAllFavorites = async (req) => {
    const { userId } = req.query;
    const favorites = await favoriteModel.find({userId}).populate("productId");
    return favorites
};

module.exports = {
    addToFavorite,
    getAllFavorites
};