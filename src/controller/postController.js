const  mongoose  = require('mongoose');
const postSchema=require('../model/movieSchema')

module.exports = {
  create_post: async (req, res, next) => {
    try {
        const {userId}=req.query
      const {
        title,
        descripation,
        thumbnail,
      } = req.body;
      let fileName = req.file.filename;
      if (!userId) {
        return res
          .status(400)
          .json({ status: false, message: "user not found" });
      }
   
      // Create admin user
      const createdAdmin = await postSchema.create({
        title,
        descripation,
        userId:userId,
        file:fileName,
      });

      // Return success response
      return res.status(200).json({
        status: true,
        message: "post created successfully",
        data: createdAdmin,
      });
    } catch (error) {
      next(error);
    }
  },

  like_post:async(req,res,next)=>{
    try {
        const {id}=req.params
        const {userId}=req.body
        if(!id) return res.status(400).json({status:false,message:"you can not like post"})
        const find_post = await postSchema.findById(id);
    console.log(find_post.likes[0].is_liked)
    let is_liked =find_post.likes[0].is_liked
        const isUserLiked = find_post.likes.some(like => like.userId.toString() === userId);//     let liked_user=find_post.likes.push({userId:userId,is_liked:true})
        console.log(isUserLiked)
        if(!isUserLiked){
return res.send("new liked")
        }else if(isUserLiked ){

        }
//   let respose=await find_post.save()

// return res.send({post:respose,message:"new like added"})
    } catch (error) {
        next(error)
      
    }
  }
};
