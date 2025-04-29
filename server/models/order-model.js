const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    orderId: {
        type: String,
        required: [true, "Please Provide the order id!"],
        unique: true,
    },
    products:[ 
        {
            productId:{
                type: mongoose.Schema.ObjectId,
                ref: "Product",
            },
            product_details: {
                name: String,
                image: Array,
                price: Number,
                discount:Number,
                unit: String,
            },
            quantity: {
                type: Number,
                required: true,
            }
        }
    ],
    paymentId: {
        type: String,
        default: "",
    },
    payment_status: {
        type: String,
        default: ""
    },
    order_status: {
        type: String,
        default: "",
    },
    delivery_address: {
        type: mongoose.Schema.ObjectId,
        ref: "address"
    },
    subTotalAmount: {
        type: Number,
        default:0,
    },
    totalAmount: {
        type:Number,
        default: 0,
    },
    invoice_receipt: {
        type: String,
        default: ""
    }
}, {timestamps: true});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;