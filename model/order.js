var mongoose = require("mongoose");
const {ObjectId}=require("mongodb")
var OrderSchema=mongoose.Schema({
    product:{
        type:ObjectId,
        ref:'product'
    },
    user:{
        type:ObjectId,
        ref:'User'
    },
    vendorid:{
        type:ObjectId,
        ref:'User'
    },
    qty:{
        type:Number
    },
    mrp:{
        type:Number
    },
    total_price:{
        type:Number
    },
    order_status:{
        type:String,
        default:"Payment Completed"
    },
    shipping:{
        type:ObjectId,
        ref:'Shipping'
    },
    timestamp:{
        type:String,
        default:Date.now
    }
})
module.exports=mongoose.model("Order",OrderSchema)