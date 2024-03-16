const userSchema = require("../model/userSchema");
const bcrypt = require("bcrypt");

module.exports = {
  create_user: async (req, res, next) => {
    try {
      const {
        name,
        email,
        password,
        location,
        countryCode,
        phonenumber,
        gender,
        DOB,
      } = req.body;
      let fileName = req.file.filename;
      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ status: false, message: "All fields are required" });
      }
      const is_exist_user = await userSchema.findOne({ email: email });
      if (is_exist_user)
        return res.send({
          success: "false",
          status: 200,
          message: "user Already exist",
        });
      //   // Hash the password
      const hashData = await bcrypt.hash(password, 10);
      if (!hashData) {
        return res
          .status(500)
          .json({ status: false, message: "Failed to hash password" });
      }

      // Create admin user
      const createdAdmin = await userSchema.create({
        name,
        location,
        countryCode,
        gender,
        email,
        phonenumber,
        DOB,
        password: hashData,
        profile_pic: fileName,
      });

      // Return success response
      return res.status(200).json({
        status: true,
        message: "user created successfully",
        data: createdAdmin,
      });
    } catch (error) {
      next(error);
    }
  },
};
