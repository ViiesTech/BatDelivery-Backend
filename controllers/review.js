const reviewFunction = require("../functions/review");
const productFunction = require("../functions/product");

const addReview = async (req, res) => {
    try {
        const review = await reviewFunction.addReview(req);
        if(review){
            const rating = await reviewFunction.averageproductRatings(req);
            const { productId } = req.body;
            const data = {
                productId,
                avgRating: rating.avgRating,
                totalCount: rating.totalCount
            };
            const update = await productFunction.updateRatingInProduct(data);
                return res.status(200).json({
                    success: true,
                    msg: "Review Added Successfully!",
                    data: review
                });            
        } else {
            return res.status(200).json({
                success: true,
                msg: "Review is Not Added!"
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

const getReviewById = async (req, res) => {
    try {
        const review = await reviewFunction.getReview(req);
        if(!review){
            return res.status(200).json({
                success: true,
                msg: "No Review Found!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "Review Details By ID!",
                data: review
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

const getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewFunction.getAllReviews(req);
        if( reviews.length === 0 ){
            return res.status(200).json({
                success: true,
                msg: "No Reviews Found!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "All Reviews!",
                data: reviews
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

const updateReview = async (req, res) => {
    try {
        const review = await reviewFunction.updateReview(req);
        if(!review){
            return res.status(200).json({
                success:true,
                msg: "No Review Found to update!",
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "Review Updated Successfully!",
                data: review
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

const deleteReview = async (req, res) => {
    try {
        const review = await reviewFunction.deleteReview(req);
        return res.status(200).json({
            success: true,
            msg: "Review Deleted!"
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

const totalVendorReviews = async (req, res) => {
    try {
        const total = await reviewFunction.totalReviews(req);
        return res.status(200).json({
            success: true,
            msg: "Over All Reviews And Ratings!",
            data: total
        })
    } catch (error) {
        console.log("Having Errors :", error);
        return res.status(400).json({
            success: false,
            msg: "Something Went Wrong!",
            error: error.message
        })        
    }
}

module.exports = {
    addReview,
    getReviewById,
    getAllReviews,
    updateReview,
    totalVendorReviews,
    deleteReview
};

