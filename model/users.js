var mongoose = require("mongoose");
var userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    usertype:{
        type:String,
        required:true,
        default:"customer"
    },
    security_question:{
        type:String,
        required:true
    },
    security_answer:{
        type:String,
        required:true
    },
    login_status:{
        type:Number,
        default:1
    }
})
module.exports=mongoose.model("User",userSchema);