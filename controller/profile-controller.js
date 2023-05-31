var User=require("../model/users")
const {ObjectId}=require("mongodb")
exports.getUserProfile=(req,res)=>{
    User.findOne({_id:new ObjectId(req.body.userid)}).then((user)=>{
        if(user)
        return res.status(201).json(user)
        else
        return res.status(404).json({msg:"User not found"})
    })
}

exports.updatePhone=(req,res)=>{
    User.updateOne({_id:new ObjectId(req.body.userid)},{
        $set:{
            phone:req.body.phone
        }
    }).exec().then((user)=>{
        if(user)
        return res.status(201).json({msg:"Phone number updated"})
        else
        return res.status(404).json({msg:"User not found"})
    })
}

exports.updatePassword=(req,res)=>{
    User.findOne({email:req.body.email,password:req.body.password}).then((usr)=>{
        if(!usr){
            return res.status(404).json({msg:"Email or password not matching"})
        }
        else{
            User.updateOne({_id:new ObjectId(usr._id)},{
                $set:{
                    password:req.body.newpassword
                }
            }).exec().then((user)=>{
                if(user)
                return res.status(201).json({msg:"Password updated"})
                else
                return res.status(404).json({msg:"User not found"})
            })  
        }
    })
   
}
exports.updateSecurityQuestion=(req,res)=>{
    User.findOne({email:req.body.email,password:req.body.password}).then((usr)=>{
        if(!usr){
            return res.status(404).json({msg:"Email or password not matching"})
        }
        else{
            User.updateOne({_id:new ObjectId(usr._id)},{
                $set:{
                    security_question:req.body.security_question,
                    security_answer:req.body.security_answer
                }
            }).exec().then((user)=>{
                if(user)
                return res.status(201).json({msg:"Question updated"})
                else
                return res.status(404).json({msg:"User not found"})
            })  
        }
    })
}
exports.forgotPassword=(req,res)=>{
    User.findOne({email:req.body.email,security_question:req.boy.security_question,security_answer:req.body.security_answer}).then((user)=>{
        if(!user){
            return res.status(404).json({msg:"Credentilas not matching"})
        }
        else{
            User.updateOne({_id:new ObjectId(user._id)},{
                $set:{
                    password:req.body.newpassword
                }
            }).exec().then((userupd)=>{
                if(userupd)
                return res.status(201).json({msg:"Password updated"})
                else
                return res.status(404).json({msg:"User not found"})
            })  
        }
    })
}