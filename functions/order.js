const orderModel = require("../models/order");

const addOrder = async (req) => {
    req.body.pickupLocation = {
        type: "Point",
        coordinates: [ parseFloat(req.body.pickupLongitude), parseFloat(req.body.pickupLatitude)],
        locationName: req.body.pickupLocationName || null
    };
    req.body.deliveryLocation = {
        type: "Point",
        coordinates: [ parseFloat(req.body.deliveryLongitude), parseFloat(req.body.deliveryLatitude)],
        locationName: req.body.deliveryLocationName || null
    }

    const newOrder = new orderModel(req.body);
    const result = await newOrder.save();
    return result
};

const getOrder = async (req) => {
    const { orderId } = req.query;
    const order = await orderModel.findById({ _id: orderId }).populate({
        path: "userId",
        select: "fullName profileImage"
    }).populate({
        path: "vendorId",
        select: "fullName profileImage"
    }).populate({
        path: "products.productId",
        select: "name productimage price"
    });
    return order
};

const getAllOrders = async (req) => {
    const { userId, vendorId, driverId, status, trackOrder, trackRider } = req.query;
    const filter = {};
    if(userId){
        filter.userId = userId
    };
    if(vendorId){
        filter.vendorId = vendorId
    };
    if(driverId){
        filter.acceptedBy = driverId
    }
    if(status){
        filter.status = status
    };
    if(trackOrder){
        filter.trackOrder = trackOrder
    };
    if(trackRider){
        filter.trackRider = trackRider
    };

    const orders = await orderModel.find(filter).populate({
        path: "userId",
        select: "fullName profileImage"
    }).populate({
        path: "vendorId",
        select: "fullName profileImage"
    }).populate("products.productId");
    return orders
};

const getNearbyOrders = async (req) => {
    const { longitude, latitude, driverId } = req.query;

    const location = {
        type: "Point",
        coordinates: [
            parseFloat(req.query.longitude),
            parseFloat(req.query.latitude)
        ]
    };
    console.log("first :", location);
    // return 
    const nearByOrders = await orderModel.find({
        trackOrder: "Order Packed",
        trackRider: "Pending", 
        rejectedBy: {$nin: [driverId]},
        deliveryLocation:{
            $near: {
                $geometry:{
                    type: "Point",
                    coordinates: location.coordinates
                },
                $maxDistance: 10000
            }
        }
    }).populate({
        path: "products.productId",
        select: "name productimage"
    });
    return nearByOrders

};

const updateOrder = async (req) => {
    const { orderId } = req.body;
    const updatedData = req.body;

    if(updatedData.trackOrder === "Order Placed"){
        updatedData.status = "Accepted"
    }

    if(updatedData.trackOrder === "Rejected"){
        updatedData.status = "Rejected"
    }

    if(updatedData.trackRider === "Accepted"){
        updatedData.acceptedBy = updatedData.driverId
        updatedData.riderLocation = {
            type: "Point",
            coordinates: [ parseFloat(updatedData.riderLongitude), parseFloat(updatedData.riderLatitude)],
            locationName: updatedData.riderLocationName || null
        };
    }

    if(updatedData.trackRider === "Route to Customer" ){
        updatedData.trackOrder = "On The Way"
    }

    if(updatedData.trackRider === "Delivery Confirmed" ){
        updatedData.trackOrder = "Order Delivered"
    }

    if(updatedData.trackRider === "Completed"){
        updatedData.status = "Completed"
    }

    // console.log("first :", updatedData);
    // return
    const order = await orderModel.findByIdAndUpdate({ _id: orderId }, 
        { $set: updatedData },
        { new: true }
    );
    return order

};

const orderRejectedByDriver = async (req) => {
    const { orderId, driverId } = req.body;

    const order = await orderModel.findByIdAndUpdate(orderId, 
        { $push: {rejectedBy: driverId } },
        { new: true }
    );
    return order;
}

const deleteOrder = async (req) => {
    const { orderId } = req.query;
    const order = await orderModel.findByIdAndDelete({ _id: orderId });
    return order
};

module.exports = {
    addOrder,
    getOrder,
    getAllOrders,
    updateOrder,
    getNearbyOrders,
    orderRejectedByDriver,
    deleteOrder
};