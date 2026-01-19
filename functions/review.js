const mongoose  = require("mongoose");
const reviewModel = require("../models/review");

const addReview = async (req) => {
    const newReview = new reviewModel(req.body);
    const result = await newReview.save();
    return result
};

const getReview = async (req) => {
    const { reviewId } = req.query;
    const review = await reviewModel.findById({ _id: reviewId }).populate({
        path: "userId",
        select: "fullName profileImage"
    }).populate("productId");
    return review
};

const getAllReviews = async (req) => {
    const { productId, userId, stars } = req.query;
    const filter = {};
    if(productId){
        filter.productId = productId
    };
    if(userId){
        filter.userId = userId
    };
    if(stars){
        filter.stars = stars
    }   

    const reviews = await reviewModel.find(filter);
    return reviews
};

const averageproductRatings = async (req) => {
    const { productId } = req.body;
    const totalCount = await reviewModel.find({productId: productId}).countDocuments();
    const result = await reviewModel.aggregate([
        { $match: {productId: new mongoose.Types.ObjectId(productId)}},
        {
            $group: {
                _id: "$productId",
                averageRating: {$avg: "$stars"}
            }
        }
    ]);

    const avgRating = result.length > 0 ? result[0].averageRating.toFixed(1) : null;
    const data = {
        avgRating,
        totalCount
    };
    console.log("first", data);

    return data;
};

const totalReviews = async (req) => {
    const { vendorId } = req.query;
    const totalCount = await reviewModel.find({vendorId: vendorId}).countDocuments();
    const result = await reviewModel.aggregate([
        { $match: { vendorId: new mongoose.Types.ObjectId(vendorId)}},
        {
            $group: {
                _id: "$vendorId",
                averageRating: {$avg: "$stars"}
            }
        }
    ]);
    const avgRating = result.length > 0 ? result[0].averageRating.toFixed(1): null;
    const reviews = await reviewModel.find({vendorId: vendorId}).populate({
        path: "userId",
        select: "fullName profileImage"
    }).populate("productId");
    const data = {
        reviews,
        avgRating,
        totalCount
    };

    return data;
}

const updateReview = async (req) => {
    const { reviewId } = req.body;
    const updatedData = req.body;
    const result = await reviewModel.findByIdAndUpdate({ _id: reviewId }, 
        { $set: updatedData },
        { new: true }
    );
    return result
};

const deleteReview = async (req) => {
    const { reviewId } = req.query;
    const review = await reviewModel.findByIdAndDelete({ _id: reviewId });
    return review
};

module.exports = {
    addReview,
    getReview,
    getAllReviews,
    averageproductRatings,
    totalReviews,
    updateReview,
    deleteReview
};