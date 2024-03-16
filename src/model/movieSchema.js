const { type } = require('express/lib/response')
const mongoose =require('mongoose')
 
const postSchema=new mongoose.Schema({

  title:{type:String , require:true},
  descripation:{type:String , require:true},
  userId:{type:mongoose.Types.ObjectId , require:true,ref:"user"},
  thumbnail:{type:String , require:true},
  file:{type:String , require:true},
 likes:[
  {
        userId:{type:mongoose.Types.ObjectId , require:true,ref:"user"},
        is_liked:{type:String,default:false}
  }
 ],
 comments:[
    {
      comment:{
       userId:{type:mongoose.Types.ObjectId , require:true,ref:"user"},
          content:{type:String}
      },
      reply:[
        {
            userId:{type:mongoose.Types.ObjectId , require:true,ref:"user"},
            content:{type:String}
        }
      ]
    }
   ]
},
{
    timeseries:true
}

)

module.exports=mongoose.model('post',postSchema)