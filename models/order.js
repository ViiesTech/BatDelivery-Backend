const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    vendorId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    products:[{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number
        }
    }],
    shippingMethod: {
        type: String
    },
    cardDetails: {
        type: String
    },
    totalQuantity: {
        type: Number
    },
    grandTotal: {
        type: Number
    },
    date: {
        type: String
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected", "Completed"],
        default: "Pending"
    },
    trackOrder: {
        type: String,
        enum: ["Pending", "Order Placed", "Order Packed", "On The Way", "Order Delivered", "Rejected"],
        default: "Pending" 
    },
    trackRider: {
        type: String,
        enum: ["Pending", "Accepted", "Route to Store", "Arrived at Store", "Pickup", "Route to Customer", "Arrived at Customer", "Delivery Confirmed", "Completed"],
        default: "Pending"
    },
    rejectedBy: [{   
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    riderLongitude:{
        type: Number
    },
    riderLatitude:{
        type: Number
    },
    riderLocation: {
        type: {
            type: String,
            enum: ["Point"]
        },
        coordinates: {
            type: [Number]
        },
        locationName: {
            type: String
        }
    },
    pickupLongitude:{
        type: Number
    },
    pickupLatitude:{
        type: Number
    },
    pickupLocationName: {
        type: String
    },
    pickupLocation: {
        type: {
            type: String,
            enum: ["Point"]
        },
        coordinates: {
            type: [Number]
        },
        locationName: {
            type: String
        }
    },
    deliveryLongitude:{
        type: Number
    },    
    deliveryLatitude:{
        type: Number
    },
    deliveryLocationName: {
        type: String
    },
    deliveryLocation: {
        type: {
            type: String,
            enum: ["Point"]
        },
        coordinates: {
            type: [Number]
        },
        locationName: {
            type: String
        }
    },
    acceptedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

orderSchema.index({ riderLocation: "2dsphere"});
orderSchema.index({ pickupLocation: "2dsphere"});
orderSchema.index({ deliveryLocation: "2dsphere"});

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel; 