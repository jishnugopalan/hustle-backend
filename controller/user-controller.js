var User=require("../model/users")
var Customer=require("../model/customer")
var Shop=require("../model/shop")
var Shipper=require("../model/shipper")
var jwt=require("jsonwebtoken");
const expressjwt=require("express-jwt");
const {ObjectId}=require("mongodb")

exports.addUser=(req,res)=>{
 User.findOne({email:req.body.email}).then((user)=>{
    if(user){
      return res.status(404).json({msg:"User already exist"})
    }
    else{
        if(req.body.usertype=="customer"){
            let newUser=User(req.body)
            newUser.save().then((customer)=>{
                if(customer){
                    return res.status(201).json(customer)
                }
                else{
                    return res.status(404).json({msg:"Error in adding customer"})
                }
            })

        }
        else if(req.body.usertype=="shop"){
            let newUser=User(req.body)
            let newShop=Shop(req.body)
            newUser.save().then((shop)=>{
                if(shop){
                   newShop.user=shop._id
                   newShop.save().then((shopdetails)=>{
                    if(shopdetails){
                        return res.status(201).json(shopdetails)
                    }
                    else{
                        return res.status(404).json({msg:"Error in adding shop details"})
                    }

                   })
                }
                else{
                    return res.status(404).json({msg:"Error in adding shop"})
                }
            })


        }

    }
 })
}
exports.login=(req,res)=>{
    console.log(req.body)
    User.findOne({email:req.body.email,password:req.body.password},{email:1,usertype:1,name:1}).then((user)=>{
     //return res.status(200).json(user)
        if(user){
            const token=jwt.sign({_id:user._id},process.env.SECRET);
            res.cookie("token",token,{expire:new Date()+9999});
            return res.status(200).json({token,user})
        }
        else{
            return res.status(404).json({msg:"Incorect email id or password"})
        }
    })
}

