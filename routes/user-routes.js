var express = require('express'),
routes = express.Router()
var userController=require("../controller/user-controller")
routes.post('/register',userController.addUser)
routes.post('/login',userController.login)

module.exports = routes