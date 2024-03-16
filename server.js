const express = require('express')
const app =express()
const cors = require('cors')
const databse= require('./src/db/database')
const coustomError= require('./src/error/globalError')
const adminRoute=require('./src/routes/adminRoutes')
require('dotenv').config()
databse()
const port=4325
app.use(cors())
app.use(express.json())


app.use('/',adminRoute)
app.get('*',async (req,res,next)=>{
try {
    res.send({message:"user online",status:200,success:true})
} catch (error) {
    next(error)
}
})


app.use((err, req, res, next) => {
    coustomError(req, res, err);
});

app.listen(port,()=>console.log("server running on "+`${port}`))