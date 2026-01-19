const productModel = require("../models/product");

const addProduct = async (req) => {
    const newProduct = new productModel(req.body);
    const image = req.file.filename;
    newProduct.productimage = image;
    const result = await newProduct.save();
    return result
};

const getProduct = async (req) => {
    const { productId } = req.query;
    const product = await productModel.findById({ _id: productId }).populate({
        path: "vendorId",
        select: "fullName profileImage"
    }).populate("variants");
    return product
};

const getAllProducts = async (req) => {
    const { vendorId, category, name, brand } = req.query;
    const filter = {};

    if(vendorId){
        filter.vendorId = vendorId
    };
    if(category){
        filter.category = category;
    };
    if(name){
        filter.name = { $regex: name, $options: 'i' }
    };
    if(brand){
        filter.brand = { $regex: brand, $options: 'i' }
    }
    const products = await productModel.find(filter).populate({
        path: "vendorId",
        select: "fullName email phone latitude longitude location"
    });
    return products
};

const updateProduct = async (req) => {
    const { productId } = req.body;
    const updatedData = req.body;

    if(req.file && req.file.filename){
        updatedData.productimage = req.file.filename
    };

    const result = await productModel.findByIdAndUpdate({ _id: productId }, 
        { $set: updatedData },
        { new: true }
    ).populate("variants");
    return result
};

const updateRatingInProduct = async (data) => {
    const { productId, avgRating, totalCount } = data;

    const product = await productModel.findByIdAndUpdate({ _id: productId }, 
        { $set: { avgRating: avgRating, totalReviews: totalCount } },
        { new: true }
    );
    return product
};

const addVariant = async (productId, variantId) => {
    const product = await productModel.findByIdAndUpdate(productId, 
        { $push: { variants: variantId } },
        { new: true }
    ).populate("variants");
    return product
};

const deleteProduct = async (req) => {
    const { productId } = req.query;
    const product = await productModel.findByIdAndDelete({ _id: productId });
    return product
};

module.exports = {
    addProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    updateRatingInProduct, 
    addVariant,
    deleteProduct
};