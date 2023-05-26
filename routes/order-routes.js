var express = require('express'),
routes = express.Router()
var orderController=require("../controller/order-controller")
routes.post("/createorder",orderController.createOrder)
routes.post("/cancelorder",orderController.cancelOrder)
routes.post("/startpayment",orderController.startPayment)
routes.post("/vieworderbycustomerid",orderController.viewOrderByCustomerId)
routes.post("/vieworderbyvendorid",orderController.viewOrderByVendorId)
routes.post("/vieworderbyid",orderController.viewOrderById)
routes.post("/viewpaymentbycustomer",orderController.viewPaymentByCustomer)
routes.post("/viewpaymentbyvendor",orderController.viewPaymentByVendor)
routes.post("/viewpaymentbypaymentid",orderController.viewPaymentByPaymentid)
routes.post("/getcustomerdetails",orderController.getCustomerDetails)
module.exports = routes