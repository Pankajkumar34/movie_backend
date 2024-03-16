const express =require('express')
const userRouter=express.Router()
const userController=require('../controller/userController')
const {handleFileUpload} =require('../utils/fileUploader')

userRouter.post('/create_user',handleFileUpload("profile_pic"),userController.create_user)
userRouter.post('/user_login',userController.user_login)
module.exports =userRouter