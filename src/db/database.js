const mongoose =require('mongoose')
const DB_connect=()=>{
    console.log(process.env.MONGOO_URL)
    mongoose.connect(process.env.MONGOO_URL).then(res=>{
        if(!res){
console.log("databse not connected")
        }
        console.log("databse  connected") 
    })
}
module.exports= DB_connect