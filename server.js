const express = require('express')
const app =express()
const cors = require('cors')
const databse= require('./src/db/database')

const adminRoute = require('./src/routes/adminRoutes')
const postroute=require('./src/routes/postroutes')
const userRoutes=require('./src/routes/userRouter')
const customError = require('./src/error/globalError')
require('dotenv').config()
databse()
const port=4325
app.use(cors())
app.use(express.json())


app.use('/admin',adminRoute)
app.use('/post',postroute)
app.use('/user',userRoutes)
app.get('*',async (req,res,next)=>{
try {
    res.send({message:"user online",status:200,success:true})
} catch (error) {
    next(error)
}
})


app.use(customError);

app.listen(port,()=>console.log("server running on "+`${port}`))