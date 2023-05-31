var express = require('express'),
routes = express.Router()
var shipperController=require('../controller/shipper-controller')
routes.post('/vieworderbyshipper',shipperController.viewOrder)
routes.post('/setorder',shipperController.setOrder)
routes.post('/viewall',shipperController.viewallorder)
routes.post('/updateorder',shipperController.updateOrderStatus)
routes.post('/viewshipperordeerbyid',shipperController.viewOrderById)
routes.post('/findbyorderid',shipperController.viewShippingsByOrderId)


module.exports = routes