var express = require('express'),
routes = express.Router()
var profileController=require('../controller/profile-controller')
routes.post('/getuserprofile',profileController.getUserProfile)
routes.post('/updatephone',profileController.updatePhone)
routes.post('/updatepassword',profileController.updatePassword)
routes.post('/updatesecurity',profileController.updateSecurityQuestion)
routes.post('/forgotpassword',profileController.forgotPassword)
routes.post('/getuserbyemail',profileController.getUserByEmail)
routes.post('/updatenewpassword',profileController.updateNewPassword)

module.exports = routes