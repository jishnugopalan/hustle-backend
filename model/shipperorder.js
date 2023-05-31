var mongoose = require("mongoose");
const {ObjectId}=require("mongodb")
var shipperOrder=mongoose.Schema({

    order:{
        type:ObjectId,
        ref:'Order'
    },
    product:{
        type:ObjectId,
        ref:'product'
    },
    shipping:{
        type:ObjectId,
        ref:'Shipping'
    },
    user:{
        type:ObjectId,
        ref:'User'   
    },
    vendorid:{
        type:ObjectId,
        ref:'User'   
    },
    shipper:{
        type:ObjectId,
        ref:'User'
    },
    timestamp:{
        type:String,
        defauls:Date.now()
    }
})
module.exports=mongoose.model("ShipperOrder",shipperOrder)