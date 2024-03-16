const { type } = require('express/lib/response')
const mongoose =require('mongoose')
 
const userSchema=new mongoose.Schema({
  role:{type:Number,default:0},  // 1 admin 0 user
  name:{type:String , require:true},
  email:{type:String , require:true},
  password:{type:String , require:true},
  loction:{type:String , require:true},
  countryCode:{type:String , require:true},
  profile_pic:{type:String , require:true},
  profile_banner:{type:String , require:true},
  phonenumber:{type:String },
  DOB:{type:String , require:true},
  gender:{type:String , require:true},
  status:{type:String , require:true,enum:['active','inactive'],default:"active"},
},
{
  timeseries:true
}
)

module.exports=mongoose.model('user',userSchema)