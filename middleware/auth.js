const jwt = require("jsonwebtoken");
const multer = require("multer");
require("dotenv").config();

const userModel = require("../models/user");

const verifyUser = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if( typeof bearerHeader !== "undefined"){
        const bearer = bearerHeader.split(" ")[1];
        req.token = bearer;
        jwt.sign(bearer, process.env.SECRET_KEY, async (error, authData) =>{
            if(error){
                console.log("Inavlid Token!", error)
                return res.status(400).json({
                    msg: "Invalid Token!"
                })
            } else {
                let id = authData.id
                let userData = await userModel.findById({ _id: id });
                req.user = userData;
                next();
            }
        })
    } else {
        return res.status(403).json({
            msg: "Token Not Found!"
        })
    }
};

const userStorage = multer.diskStorage({
    destination: ( req, file, cb ) => {
        cb(null, 'public/user')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
});

const uploadUser = multer({ storage: userStorage });

const vendorStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/vendor");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
});

const uploadVendor = multer({ storage: vendorStorage });

const driverStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/driver")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
});

const uploadDriver = multer({ storage: driverStorage });

const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/product");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
});

const uploadProduct = multer({ storage: productStorage });

module.exports = {
    verifyUser,
    uploadUser,
    uploadVendor,
    uploadDriver,
    uploadProduct
};