const userFunction = require("../functions/user");
const favoriteFunction = require("../functions/favorite");
require("dotenv").config();
const crypto = require("crypto");

const getProfile = async (req, res) => {
    try {
        const user = await userFunction.getProfile(req);
        if(!user){
            return res.status(200).json({
                success: true,
                msg: "No Profile Found!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "User Profile by ID!",
                data: user
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

const updateUser = async (req, res) => {
    try {
        const user = await userFunction.updateUser(req);
        if(!user){
            return res.status(200).json({
                success: true,
                msg: "No Profile Found to Update!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "Profile Details Updated!",
                data: user
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

const deleteUser = async (req, res) => {
    try {
        const user = await userFunction.deleteUser(req);
        return res.status(200).json({
            success: true,
            msg: "User Deleted!"
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

const addToFavorite = async (req, res) => {
    try {
        const favorite = await favoriteFunction.addToFavorite(req);
        if(!favorite){
            return res.status(200).json({
                success: true,
                msg: "Removed From Favorites!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "Added to Favorites!",
                data: favorite
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

const getAllFavorites = async (req, res) => {
    try {
        const favorites = await favoriteFunction.getAllFavorites(req);
        if( favorites.length === 0 ){
            return res.status(200).json({
                success: true,
                msg: "No Favorites Found!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "All Favorites By User!",
                data: favorites
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

const getAllUsers = async (req, res) => {
    try {
        const users = await userFunction.getAllUsers(req);
        if( users.length === 0){
            return res.status(200).json({
                success: false,
                msg: "No User Found!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "All Users!",
                data: users
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

const ebaytestGet = async (req, res) => {
    const verificationToken = "bf6b9d9e49b142c7b77cf6a621b782ff385e760ad7cb9da59b024c8b7743c64d";
    const endpointUrl = "https://predemo.site/BatDelivery/api/ebay/account-deletion"
    const challengeCode = req.query.challenge_code;
    if(!challengeCode){
        return res.status(400).send('Missing challenge_code');
    };

    const hash = crypto.createHash("sha256");
    hash.update(challengeCode);
    hash.update(verificationToken);
    hash.update(endpointUrl);
    const responseHash = hash.digest("hex");
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        challengeResponse: responseHash
    })
};

const ebayTestPost = async (req, res) => {
    console.log("Headers", req.headers);
    console.log("Body", req.body);

    res.status(204).send();
}

module.exports = {
    getProfile,
    updateUser,
    deleteUser,
    addToFavorite,
    getAllFavorites,
    getAllUsers,
    ebaytestGet,
    ebayTestPost
};