const userSchema = require("../model/userSchema");
const bcrypt = require("bcrypt");
const TokenGenerate = require("../utils/TokenGenerate");

module.exports = {
  create_Admin: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      let fileName=req.file.filename
// console.log(req.files,"ppppp")
      // Check if required fields are provided
      if (!name || !email || !password) {
        return res.status(400).json({ status: false, message: "All fields are required" });
      }

    //   // Hash the password
      const hashData = await bcrypt.hash(password, 10);
      if (!hashData) {
        return res.status(500).json({ status: false, message: "Failed to hash password" });
      }

      // Create admin user
      const createdAdmin = await userSchema.create({
        name,
        email,
        password: hashData,
        profile_pic:fileName
      });

      // Return success response
      return res.status(200).json({
        status: true,
        message: "Admin created successfully",
        data: createdAdmin,
      });
    } catch (error) {
    next(error)
    }
  },
  admin_login: async (req, res, next) => {
    try {
      const { email, password } = req.body
      if (!email) return res.send({ success: true, message: "user not found" })
      const details = await userSchema.findOne({ email: email,role:1 });
   
    if(!details) return res.status(400).json({status:false,message:"invaild user"})
      const matchPassword = await bcrypt.compare(password, details?.password)
      if (!matchPassword) return res.status(400).json({ status: false, success: false, message: "invaild password" })
      let Token = await TokenGenerate(details)
      return res.status(200).json({ status: true, success: true, message: "admin logged successfully", data: { token: Token, name: details?.name, role: details?.role, email: details?.email } })


    } catch (error) {
      
      console.log(error)
      return res.status(500).json({status:false,error:error})
    }
  }
};
