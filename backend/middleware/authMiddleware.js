import asyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const JWTSecretKey = process.env.JWT_SECRET;

      const decoded = jwt.verify(token, JWTSecretKey);
      const id = decoded.id;

      const user = await userModel.findOne({ _id: id });

      req.user = user;
    } catch (error) {
      throw new Error("invalid token present !");
    }
  } else {
    throw new Error("no token present");
  }

  next();
});

export default authMiddleware;
