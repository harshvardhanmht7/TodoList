import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

//POST api/users/registerUser

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if ((name, email, password, confirmPassword)) {
    const exist = await userModel.find({ email });

    if (exist.length === 0) {
      if (password === confirmPassword) {
        const salt = await bcrypt.genSalt(10);
        const pword = await bcrypt.hash(password, salt);
        const user = await userModel.create({
          name,
          email,
          password: pword,
        });
        res.json({
          name,
          email,
          token: generateToken(user._id),
        });
      } else {
        throw new Error("password does not match with confirm password !");
      }
    } else {
      res.status(400);
      throw new Error("User already  exist ! ");
    }
  } else {
    throw new Error("all fields are mandatory to register !");
  }
});

//POST api/users/login

export const loignUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ((email, password)) {
    const [user] = await userModel.find({ email: email });

    if (user) {
      const userPassword = await bcrypt.compare(password, user.password);

      if (userPassword) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(401);
        throw new Error("Password is incorrect !");
      }
    } else {
      throw new Error("user does not exist with this email !");
    }
  } else {
    throw new Error("Please fill all fields !");
  }
});
