import express from "express";
import { addItem, getItems,removeItem,updateItem } from "../controllers/itemController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const Router=express.Router()

Router.route('/additem').post(authMiddleware,addItem)
Router.route('/').get(authMiddleware,getItems)
Router.route('/update/:id').put(authMiddleware,updateItem)
Router.route('/remove/:id').delete(authMiddleware,removeItem)


export default Router