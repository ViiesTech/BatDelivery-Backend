const adminModel = require("../models/admin");
const categoryModel = require("../models/category");
const bcrypt = require("bcrypt");

// Auth Routes
const signup = async (req) => {
    
};

const getAdmin = async (req) => {

};

const adminProfile = async (req) => {

};

const resetPassword = async (req) => {

};

// Category Routes

const addCategory = async (req) => {
    const newCategory = new categoryModel(req.body);
    const result = await newCategory.save();
    return result 
};

const getCategory = async (req) => {
    const { categoryId } = req.query;
    const category = await categoryModel.findById(categoryId);
    return category;
};

const getAllCategories = async (req) => {
    const categories = await categoryModel.find();
    return categories
};

const updateCategory = async (req) => {
    const { categoryId, categoryName } = req.body;
    const category = await categoryModel.findByIdAndUpdate(categoryId, 
        { $set: { categoryName: categoryName } },
        { new: true }
    );
    return category
};

const deleteCategory = async (req) => {
    const { categoryId } = req.query;
    const category = await categoryModel.findByIdAndDelete({ _id: categoryId });
    return category
};

module.exports = {
    signup,
    getAdmin,
    adminProfile,
    resetPassword,
    addCategory,
    getCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
};