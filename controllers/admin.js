const adminFunction = require("../functions/admin");

const addCategory = async (req, res) => {
    try {
        const category = await adminFunction.addCategory(req);
        return res.status(200).json({
            success: true,
            msg: "Category Added!",
            data: category
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

const getCatgeoryById = async (req, res) => {
    try {
        const category = await adminFunction.getCategory(req);
        if(!category){
            return res.status(200).json({
            success: true,
            msg: "Category Not Found!"
        })
        } else {
            return res.status(200).json({
            success: true,
            msg: "Category Details By Id!",
            data: category
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

const getAllCategories = async (req, res) => {
    try {
        const categories = await adminFunction.getAllCategories(req);
        if(categories.length === 0){
            return res.status(200).json({
                success: true,
                msg: "No Categories Found!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "All Categories!",
                data: categories
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

const updateCategory = async (req, res) => {
    try {
        const category = await adminFunction.updateCategory(req);
        if(!category){
            return res.status(200).json({
                success: true,
                msg: "No Catgeory Found!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "Category Updated!",
                data: category
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

const deleteCategory = async (req, res) => {
    try {
        const category = await adminFunction.deleteCategory(req);
        return res.status(200).json({
            success: true,
            msg: "Category Deleted!"
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
    addCategory,
    getCatgeoryById,
    getAllCategories,
    updateCategory,
    deleteCategory
};