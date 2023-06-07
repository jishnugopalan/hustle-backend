var mongoose = require("mongoose");
const {ObjectId}=mongoose.Schema
var cartSchema=mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"product"
    },
    user:{
        type:ObjectId,
        ref:"User"
    },
    qty:{
        type:Number
    },
    price:{
        type:Number
    }
})
module.exports=mongoose.model("Cart",cartSchema)