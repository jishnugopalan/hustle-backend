var mongoose = require("mongoose");
const {ObjectId}=mongoose.Schema
var shipperSchema=mongoose.Schema({

    user:{
        type: ObjectId,
        required: true,
        ref:"User"
    },
    housename:{
        type:String,
        required: true,
    },
    district:{
        type:String,
        required: true,
    },
    street:{
        type:String,
        required: true,
    },
    pincode:{
        type:Number,
        required: true,
    },
    adhaar:{
        type:Number,
        required: true,   
    },
    work_location:{
        type:String,
        required: true,
    }
   
    
})
module.exports=mongoose.model("Shipper",shipperSchema);