const express = require('express')
const { loginController, registerController, generateOTP, verifyOTP, resetPassword, updatePassword } = require('../controller/userController')

// creating router
const userRouter = express.Router()

// post
// logging user
userRouter.post('/', loginController)
// registering user
userRouter.post('/signUp', registerController)

// get 
// generating OTP
userRouter.get('/generateOTP', generateOTP)
userRouter.get('/retrievePassword', verifyOTP)
userRouter.get('/reset', resetPassword)

// put
// updating password
userRouter.get('/reset', updatePassword)



module.exports = userRouter 