const orderFunction = require("../functions/order");

const createOrder = async (req, res) => {
    try {
        const order = await orderFunction.addOrder(req);
        return res.status(200).json({
            success: true,
            msg: "Order is Created!",
            data: order
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

const getOrderId = async (req, res) => {
    try {
        const order = await orderFunction.getOrder(req);
        if(!order){
            return res.status(200).json({
                success: true,
                msg: "No Order Found!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "Order Details by ID!",
                data: order
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

const getAllorders = async (req, res) => {
    try {
        const orders = await orderFunction.getAllOrders(req);
        if( orders.length === 0){
            return res.status(200).json({
                success: true,
                msg: "No Orders Found!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "All Orders!",
                data: orders
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

const updateOrder = async (req, res) => {
    try {
        if(req.body.trackRider === "Rejected"){
            const order = await orderFunction.orderRejectedByDriver(req);
            return res.status(200).json({
                success: true,
                msg: "Order Is Rejected By Rider!"
            })
        } else {
            const order = await orderFunction.updateOrder(req);
            if(!order){
                return res.status(200).json({
                    success: true,
                    msg: "No Order Found to Update!"
                })
            } else {
                return res.status(200).json({
                    success: true,
                    msg: "Order is Updated!",
                    data: order
                })
            }
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

const getNearbyOrders = async (req, res) => {
    try {
        const orders = await orderFunction.getNearbyOrders(req);
        if(orders.length === 0){
            return res.status(200).json({
                success: true,
                msg: "No Nearby Orders Found!"
            })
        } else {
            return res.status(200).json({
                success: true,
                msg: "Orders Nearby Your Location!",
                data: orders
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
 
const deleteOrder = async (req, res) => {
    try {
        const order = await  orderFunction.deleteOrder(req);
        return res.status(200).json({
            success: true,
            msg: "Order Deleted!"
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
    createOrder,
    getOrderId,
    getAllorders,
    updateOrder,
    getNearbyOrders,
    deleteOrder
};