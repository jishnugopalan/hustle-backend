var express = require('express'),
routes = express.Router()
var adminCintrolller=require('../controller/admin-controller')

routes.post('/addshipper',adminCintrolller.addShipper)
routes.post('/getallshop',adminCintrolller.getAllShop)
routes.post('/updateshopstatus',adminCintrolller.updateShop)


module.exports = routes