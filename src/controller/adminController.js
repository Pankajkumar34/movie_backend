const userSchema = require("../model/userSchema");
const bcrypt = require("bcrypt");

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
};
