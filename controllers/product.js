const productFunction = require("../functions/product");
const prodcuctModel = require("../models/product");

const addProduct = async (req, res) => {
    try {
        const product = await productFunction.addProduct(req);
        return res.status(200).json({
            success: true,
            msg: "Product Added Successfully!",
            data: product
        })
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(400).json({
            success: false,
            msg: "Something Went Wrong!",
            error: error.message
        })        
    }    
};

const getProductById = async (req, res) => {
    try {
        const product = await productFunction.getProduct(req);
        if(!product){
            return res.status(200).json({
                success: true,
                msg: "No product Found By ID!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "Product Details By Id!",
                data: product
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

const getAllProducts = async (req, res) => {
    try {
        const products = await productFunction.getAllProducts(req);
        if( products.length === 0 ){
            return res.status(200).json({
                success: true,
                msg: "No products Found!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "All Products!",
                data: products
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

const updateProduct = async (req, res) => {
    try {
        const product = await productFunction.updateProduct(req);
        if(!product){
            return res.status(200).json({
                success: true,
                msg: "No Product Found To Update"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "Product is Upadted!",
                data: product
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

const addToVariants = async (req, res) => {
    try {
        const product = await productFunction.addProduct(req);
        if(!product){
            return res.status(200).json({
                success: true,
                msg: "Variant is not Added!"
            })
        } else {
            const { productId } = req.body;
            const varianId = product._id;
            const variant = await productFunction.addVariant(productId, varianId);
            return res.status(200).json({
                success: true,
                msg: "Variant Added Successfully!",
                data: variant
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

const deleteProduct = async (req, res) => {
    try {
        const product = await productFunction.deleteProduct(req);
        return res.status(200).json({
            success: true,
            msg: "Product is Deleted!"
        })
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(400).json({
            success: false,
            msg: "Something Went Wrong!",
            error: error.message
        })        
    }    
};

module.exports = {
    addProduct,
    getProductById,
    getAllProducts,
    updateProduct,
    addToVariants,
    deleteProduct   
};