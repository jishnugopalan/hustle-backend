const Order=require("../model/order")
const Payment=require("../model/payment")
const Product=require("../model/product")
const {ObjectId}=require("mongodb")
const Customer=require("../model/customer")

exports.createOrder=(req,res)=>{
   
    let newOrder=Order(req.body)
    newOrder.save().then((order)=>{
    if(!order)
    return res.status(404).json({msg:"Error in create order"})
    if(order)
    return res.status(201).json(order)

    })
  
  
}

exports.cancelOrder=(req,res)=>{
    Order.updateOne({_id:ObjectId(req.body.orderid)},{
        $set:{
            order_status:"Order Cancelled"
        }
    }).then((delorder)=>{
        if(!delorder)
        return res.status(404).json({msg:"Error in cancel order"})
        if(delorder)
        return res.status(201).json({msg:"Order cancelled successfully"})

    })
}

//productid,orderid,stock
exports.startPayment=(req,res)=>{
    console.log(req.body)
    req.body.order=new ObjectId(req.body.order)
    let newPayment=Payment(req.body)
    Product.updateOne({_id:new ObjectId(req.body.product)},{
        $inc: { stock: -(parseInt(req.body.qty))} 
    }).then((updated)=>{
        if(!updated)
        return res.status(404).json({msg:err})
        else if(updated){
            newPayment.save().then((payment)=>{
                if(!payment)
                return res.status(404).json({msg:err})
                if(payment){
                   // return res.status(201).json(payment)
                    Order.updateOne({_id:new ObjectId(req.body.order)},{
                        $set:{
                            order_status:"Payment Completed"
                        }
                    }).exec().then((upd)=>{
                        if(!upd)
                        return res.status(404).json({msg:"Error in payment"})
                        else if(upd)
                        return res.status(201).json({msg:"Payment completed"})
                    })
                }
                
            })

        }
       
    })
    
}

exports.viewOrderByCustomerId=(req,res)=>{
    Order.find({customerid:new ObjectId(req.body.userid)}).populate("product").exec().then((order)=>{
        if(!order)
        return res.status(404).json({msg:"Error in fetching order"})
        if(order){
            return res.status(201).json(order)
        }
    })
}
exports.viewOrderByVendorId=(req,res)=>{
    Order.find({vendorid:new ObjectId(req.body.userid)}).populate("product").populate("user").populate("shipping").exec().then((order)=>{
        if(!order)
        return res.status(404).json({msg:"Error in fetching order"})
        if(order){
            return res.status(201).json(order)
        }
    })
}
exports.viewOrderById=(req,res)=>{
    Order.findOne({_id:new ObjectId(req.body.orderid)}).populate("product").populate("user").populate("shipping").exec().then((order)=>{
        if(!order)
        return res.status(404).json({msg:"Error in fetching order"})
        if(order){
            return res.status(201).json(order)
        }
    })
}
exports.viewPaymentByCustomer=(req,res)=>{
    Payment.find({customerid:new ObjectId(req.body.userid)}).populate("product").populate("order").exec().then((pay)=>{
        if(!pay)
        return res.status(404).json({msg:"Error in fetching payment details"})
        if(pay){
            return res.status(201).json(pay)
        }
    })
}
exports.viewPaymentByVendor=(req,res)=>{
    Payment.find({user:new ObjectId(req.body.userid)}).populate("product").populate("order").exec().then((pay)=>{
        if(!pay)
        return res.status(404).json({msg:"Error in fetching payment details"})
        if(pay){
            return res.status(201).json(pay)
        }
    })
}
exports.viewPaymentByPaymentid=(req,res)=>{
    Payment.find({_id:new ObjectId(req.body.paymentid)}).populate("product").populate("order").exec().then((pay)=>{
        if(!pay)
        return res.status(404).json({msg:"Error in fetching payment details"})
        if(pay){
            return res.status(201).json(pay)
        }
    })
}
exports.getCustomerDetails=(req,res)=>{

    Customer.findOne({customerid:new ObjectId(req.body.customerid)}).exec().then((customer)=>{
        if(!customer)
        return res.status(404).json({msg:"Error in fetching customer details"})
        if(customer){
            return res.status(201).json(customer)
        }
    })
}
