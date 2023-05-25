var Product=require("../model/product")
var Shop=require("../model/shop")
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
    Product.find({category:ObjectId(req.body.categoryid)}).populate("category").populate("subcategory").exec().then((product)=>{
        if(!product)
        return res.status(404).json({msg:"Error in fetching products"})
        else if(product)
        return res.status(201).json(product)
    })
}
exports.getProductBySubCategory=(req,res)=>{
    Product.find({subcategory:ObjectId(req.body.subcategoryid)}).populate("category").populate("subcategory").exec().then((product)=>{
        if(!product)
        return res.status(404).json({msg:"Error in fetching products"})
        else if(product)
        return res.status(201).json(product)
    })
}
exports.getProductById=(req,res)=>{
    Product.findOne({_id:req.body.productid}).populate("category").populate("subcategory").then((product)=>{
      if(product)
        return res.status(201).json(product)
      else
        return res.status(404).json({msg:"Error in fetching products"})


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
exports.updateProductStock=(req,res)=>{
    Product.updateOne({_id:ObjectId(req.body.productid)},{
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
    Cart.deleteOne({_id:ObjectId(req.body.cartid)}).then((delcart)=>{
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