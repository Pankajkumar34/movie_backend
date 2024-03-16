const express =require('express')
const Adminrouter=express.Router()
const adminContoller=require('../controller/adminController')
const {handleFileUpload} =require('../utils/fileUploader')

Adminrouter.post('/create_admin',handleFileUpload("profile_pic"),adminContoller.create_Admin)
Adminrouter.post('/admin_login',adminContoller.admin_login)
module.exports =Adminrouter