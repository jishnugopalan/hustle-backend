var express = require('express'),
routes = express.Router()
var productController=require("../controller/product-controller")
routes.post('/product',productController.addProduct)
routes.post('/getallproducts',productController.getAllProducts)
routes.post('/getproductbycategory',productController.getProductByCategory)
routes.post('/getproductbysubcategory',productController.getProductBySubCategory)
routes.post('/getproductbyshopid',productController.getProductByShopId)
routes.post('/getproductbyid',productController.getProductById)
routes.post('/deleteproductbyid',productController.deleteProductById)

//updations
routes.post('/updateproductprice',productController.updateProductPrice)
routes.post('/updateproductstock',productController.updateProductStock)
routes.post('/updateproductsdiscount',productController.updateProductDiscount)
routes.post('/updateproductsavailability',productController.updateProductAvailability)

//shipping
routes.post('/addshipping',productController.addShippingDetails)
routes.post('/getallshipping',productController.getAllShippingAddress)



//cart
routes.post('/addtocart',productController.addToCart)
routes.post('/getcartbyuserid',productController.getCartByUserid)
routes.post('/getcartbycartid',productController.getCartByCartid)
routes.post('/deletecart',productController.deleteCartItem)

routes.post('/getshopid',productController.getShopByUserid)

module.exports = routes