var Product=require("../model/product")
var Shop=require("../model/shop")
var Shipping=require("../model/shipping")
const {ObjectId} =require ('mongodb');

exports.addProduct=(req,res)=>{
    console.log(req.body)
    
    let Newproduct=Product(req.body)
    Newproduct.save().then((newuser)=>{
        if(newuser){
            return res.status(201).json(newuser)

        }
        else{
        
            return res.status(404).json({error:"Error in inserting data"})

        }
    })
}
exports.getProductByShopId=(req,res)=>{
    Product.find({shopid:req.body.shopid}).populate("category").populate("subcategory").exec().then((product)=>{
        if(!product)
        return res.status(404).json({msg:"Error in fetching products"})
        else if(product)
        return res.status(201).json(product)
    })
}
exports.getProductByCategory=(req,res)=>{
    Product.find({category:new ObjectId(req.body.categoryid)}).populate("category").populate("subcategory").exec().then((product)=>{
        if(!product)
        return res.status(404).json({msg:"Error in fetching products"})
        else if(product)
        return res.status(201).json(product)
    })
}
exports.getProductBySubCategory=(req,res)=>{
    Product.find({subcategory:new ObjectId(req.body.subcategoryid)}).populate("category").populate("subcategory").exec().then((product)=>{
        if(!product)
        return res.status(404).json({msg:"Error in fetching products"})
        else if(product)
        return res.status(201).json(product)
    })
}
exports.getProductById=(req,res)=>{
    Product.findOne({_id:req.body.productid}).populate("category").populate("subcategory").populate("shop").then((product)=>{
      if(product)
        return res.status(201).json(product)
      else
        return res.status(404).json({msg:"Error in fetching products"})


    })
}
exports.getProductByCity=(req,res)=>{
    // var p=[]
     console.log(req.body)
    // Product.find({subcategory:new ObjectId(req.body.subcategoryid)}).populate("category").populate("subcategory").populate("shop").exec().then((product)=>{
    //     if(!product)
    //     return res.status(404).json({msg:"Error in fetching products"})
    //     else {
            
    //         console.log(typeof(req.body.city))
    //         for(let i=0;i<product.length;i++){
    //            console.log(typeof(product[i].shop.shop_city))
    //             console.log(String(product[i].shop.shop_city)===String(req.body.city))
              
    //         }
            
    //         return res.status(201).json(p)
    //     }
    // })

    Product.aggregate([
        {
            $lookup: {
              from: "shops",
              localField: "shop",
              foreignField: "_id",
              as: "shopdetails"
            }
        },
        {
            $unwind: "$shopdetails"
        },
        {
            $match: {
              "shopdetails.shop_city": req.body.city,
              subcategory:new ObjectId(req.body.subcategoryid)
            }
        }
    ]).exec().then((product)=>{
        if(product)
        return res.status(201).json(product)
        else
        return res.status(404).json({msg:"not found"})
    })
}
exports.deleteProductById=(req,res)=>{
    Product.deleteOne({_id:ObjectId(req.body.productid)}).then((delproduct)=>{
        if(!delproduct)
        return res.status(404).json({msg:"Error in getting cart data"})
        else if(delproduct)
        return res.status(201).json({msg:"Product removed"})
    })

}
exports.getAllProducts=(req,res)=>{
    Product.find().populate("category").populate("subcategory").populate("shop").then((products)=>{
     if(products){
        return res.status(201).json(products)

     }
     else{
        return res.status(404).json({msg:"Error in getting products"})

     }
    })
}
//update stock
exports.updateProductStock=(req,res)=>{
    Product.updateOne({_id:new ObjectId(req.body.productid)},{
        $set:{
            stock:req.body.stock
        }
    }).then((updated)=>{
        if(!updated)
        return res.status(404).json({msg:"Error in updating data"})
        else if(updated)
        return res.status(201).json({msg:"Product price updated"})
    })
}

//update price

exports.updateProductPrice=(req,res)=>{
    Product.updateOne({_id:new ObjectId(req.body.productid)},{
        $set:{
            price:req.body.price
        }
    }).then((updated)=>{
        if(!updated)
        return res.status(404).json({msg:"Error in updating data"})
        else if(updated)
        return res.status(201).json({msg:"Product price updated"})
    })
}

//update discount

exports.updateProductDiscount=(req,res)=>{
    Product.updateOne({_id:new ObjectId(req.body.productid)},{
        $set:{
            discount_percentage:req.body.discount_percentage
        }
    }).then((updated)=>{
        if(!updated)
        return res.status(404).json({msg:"Error in updating data"})
        else if(updated)
        return res.status(201).json({msg:"Product price updated"})
    })
}

//update availability

exports.updateProductAvailability=(req,res)=>{
    console.log(req.body)
    Product.updateOne({_id:new ObjectId(req.body.productid)},{
        $set:{
            availability:req.body.availability
        }
    }).then((updated)=>{
        if(!updated)
        return res.status(404).json({msg:"Error in updating data"})
        else if(updated)
        return res.status(201).json({msg:"Product availabilty updated"})
    })
}

exports.addToCart=(req,res)=>{
    let newCart=Cart(req.body)
    newCart.save().then((cart)=>{
        if(!cart)
        return res.status(404).json({msg:"Error in inserting data"})
        else if(cart)
        return res.status(201).json(cart)
    })    
}

exports.getCartByUserid=(req,res)=>{
    console.log(req.body)
    Cart.find({user:ObjectId(req.body.userid)}).populate("product").populate("user").exec().then((cart)=>{
        if(!cart)
        return res.status(404).json({msg:"Error in getting cart data"})
        else if(cart)
        return res.status(201).json(cart)
    })
}
exports.getCartByCartid=(req,res)=>{
    Cart.find({_id:ObjectId(req.body.cartid)}).populate("product").populate("user").exec().then((cart)=>{
        if(!cart)
        return res.status(404).json({msg:"Error in getting cart data"})
        else if(cart)
        return res.status(201).json(cart)
    })
}

exports.deleteCartItem=(req,res)=>{
    Cart.deleteOne({_id:new ObjectId(req.body.cartid)}).then((delcart)=>{
        if(!delcart)
        return res.status(404).json({msg:"Error in getting cart data"})
        else if(delcart)
        return res.status(201).json({msg:"Item removed from cart"})

    })
}
exports.getShopByUserid=(req,res)=>{
    Shop.findOne({user:new ObjectId(req.body.userid)}).exec().then((shop)=>{
        if(!shop){
            return res.status(404).json({error:err})
            }
            else{
                return res.status(201).json(shop)
            }
    })
}
exports.getAllShippingAddress=(req,res)=>{
    Shipping.find({user:new ObjectId(req.body.user)}).then((shipping)=>{
        if(shipping)
        return res.status(201).json(shipping)
        else
        return res.status(404).json({"msg":"error"})


    })
}
exports.addShippingDetails=(req,res)=>{
    let newAddr=Shipping(req.body)
    newAddr.save().then((saved)=>{
        if(saved)
        return res.status(201).json(saved)
        else
        return res.status(404).json({error:"error"})
    })
}