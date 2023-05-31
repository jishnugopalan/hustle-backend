var Shipperorder=require("../model/shipperorder")
var Order=require("../model/order")
const {ObjectId}=require("mongodb")

exports.setOrder=(req,res)=>{
    console.log("in")
    Shipperorder.find({order:new ObjectId(req.body.order)}).then((order)=>{
        // if(order){
        //     console.log("in order")
        //     return res.status(404).json({msg:"Order already picked"})
        // }else{
        //     console.log("in else order")
        //     let newShipperorder=Shipperorder(req.body)
        //     newShipperorder.save().then((shipperorder)=>{
        //         if(shipperorder)
        //         return res.status(201).json(shipperorder)
        //         else
        //         return res.status(404).json({msg:"Error in set order"})
        //     })
        // }
        if(order.length==0){
            console.log("in else order")
            let newShipperorder=Shipperorder(req.body)
            newShipperorder.save().then((shipperorder)=>{
                if(shipperorder)
                return res.status(201).json(shipperorder)
                else
                return res.status(404).json({msg:"Error in set order"})
            })
        }
        else{
            return res.status(404).json({msg:"Order already picked"})
        }
    })
    
}

exports.viewOrder=(req,res)=>{
 Shipperorder.find({shipper:new ObjectId(req.body.userid)}).populate('shipping').populate('user').populate('vendorid').populate('product').populate('order').exec().then((shipperorder)=>{
    if(shipperorder){
        return res.status(201).json(shipperorder)
    }
    else{
        return res.status(404).json({msg:"Error in view order"})
    }
 })   
}

exports.updateOrderStatus=(req,res)=>{
    Order.updateOne({_id:new ObjectId(req.body.order)},{
        $set:{
            order_status:req.body.status
        }
    }).exec().then((upd)=>{
        if(!upd)
        return res.status(404).json({msg:"Error update order"})
        else if(upd)
        return res.status(201).json({msg:"Order updated"})
    })
}

exports.viewallorder=(req,res)=>{

    Order.find().populate("product").populate("user").populate("vendorid").populate("shipping").exec().then((orders)=>{
        if(orders){
            return res.status(201).json(orders)
        }
        else
        return res.status(404).json({msg:"error in fetching orders"})

    })
}
exports.viewOrderById=(req,res)=>{
    Shipperorder.findOne({_id:new ObjectId(req.body.id)}).populate("order").populate("product").populate("shipping").populate("user").populate("vendorid").populate("shipper").exec().then((order)=>{
        if(order){
            return res.status(201).json(order)
        }
        else
        return res.status(404).json({msg:"error in fetching orders"})
    })
}
exports.viewShippingsByOrderId=(req,res)=>{
    Shipperorder.findOne({order:new ObjectId(req.body.id)}).populate("order").populate("product").populate("shipping").populate("user").populate("vendorid").populate("shipper").exec().then((order)=>{
        if(order){
            return res.status(201).json(order)
        }
        else
        return res.status(404).json({msg:"error in fetching orders"})
    })
}