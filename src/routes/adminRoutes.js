const express =require('express')
const router=express.Router()
const adminContoller=require('../controller/adminController')
const {handleFileUpload} =require('../utils/fileUploader')

router.post('/create_admin',handleFileUpload("profile_pic"),adminContoller.create_Admin)
module.exports =router