const express =require('express')
const postrouter=express.Router()
const postContoller=require('../controller/postController')
const {handleFileUpload} =require('../utils/fileUploader')

postrouter.post('/create_post',handleFileUpload("file"),postContoller.create_post)
postrouter.post('/likepost/:id',postContoller.like_post)
module.exports =postrouter