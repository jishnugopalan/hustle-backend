var User=require("../model/users")
var Shipper=require("../model/shipper")
const {ObjectId}=require("mongodb")
var Shop=require("../model/shop")
exports.addShipper=(req,res)=>{
    User.findOne({email:req.body.email}).then((user)=>{
        if(user){
          return res.status(404).json({msg:"User already exist"})
        }
        else{
            if(req.body.usertype=="shipper"){
                let newUser=User(req.body)
                newUser.save().then((customer)=>{
                    if(customer){
                       let newShipper=Shipper(req.body)
                       newShipper.user=customer._id
                       newShipper.save().then((shipper)=>{
                        if(shipper){
                            return res.status(201).json(shipper)
                        }else{
                            return res.status(404).json({msg:"User already exist"})
                        }
                       })
                    }
                    else{
                        return res.status(404).json({msg:"Error in adding customer"})
                    }
                })
    
            }
        }
    })
}

exports.getAllShop=(req,res)=>{
 Shop.find().populate("user").exec().then((shops)=>{
    if(shops){
        return res.status(201).json(shops)
    }
    else{
        return res.status(404).json({msg:"not found"})   
    }
 })   
}
exports.updateShop=(req,res)=>{
    Shop.updateOne({_id:new ObjectId(req.body.shopid)},{
        $set:{
            admin_status:req.body.status
        }
    }).exec().then((upd)=>{
        if(upd){
            return res.status(201).json({msg:"Status updated"})
        }
        else{
            return res.status(404).json({msg:"updation error"})   
        }
    })
}