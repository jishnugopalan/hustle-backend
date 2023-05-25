var express = require('express'),
routes = express.Router()
var categoryController=require('../controller/category-controller')
routes.post('/addcategory',categoryController.addCategory)
routes.post('/addsubcategory',categoryController.addSubcategory)
routes.get('/getallcategory',categoryController.getAllCategory)
routes.post('/getsubcategorybyid',categoryController.getSubCategoryById)



module.exports = routes