var mongoose = require("mongoose");
const {ObjectId}=mongoose.Schema
var customerSchema=mongoose.Schema({

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
    city:{
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
   
    
})
module.exports=mongoose.model("Customer",customerSchema);