import express from "express";
import authMiddleware  from '../middleware/authMiddleware.js'
import { registerUser ,loignUser} from "../controllers/userController.js";

const Router=express.Router()


Router.route('/register').post(registerUser);
Router.route('/login').get(loignUser);



export default Router