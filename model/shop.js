var mongoose = require("mongoose");
const {ObjectId}=require("mongodb")
var shopSchema=mongoose.Schema({
    user:{
        type: ObjectId,
        required: true,
        ref:"User"
    },
    owner_housename:{
        type:String,
        required:true
    },
    owner_street:{
        type:String,
        required:true
    },
    owner_city:{
        type:String,
        required:true
    },
    owner_district:{
        type:String,
        required:true
    },
    owner_pincode:{
        type:String,
        required:true
    },
    owner_adhaar:{
        type:String,
        required:true
    },
    shop_city:{
        type:String,
        required:true
    },
    shop_district:{
        type:String,
        required:true
    }, 
    shop_pincode:{
        type:String,
        required:true
    }, 
    shop_phone:{
        type:Number,
        required:true
    }, 
    shop_email:{
        type:String,
        required:true
    }, 
    shop_license:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("Shop",shopSchema);