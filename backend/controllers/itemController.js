import userModel from "../models/userModel.js";
import itemModel from "../models/itemModel.js";
import asyncHandler from "express-async-handler";

//POST add item

export const addItem = asyncHandler(async (req, res) => {
  const user = req.user; //getting from auth middleware cotaining token validation

  const { description } = req.body;

  if (description) {
    const item = await itemModel.create({
      description,
      user: req.user._id,
    });

    res.status(201);
    res.send({ data: item });
  } else {
    res.status(400);
    throw new Error("no description available !");
  }
});

// get items for a user

//api/items/

export const getItems = asyncHandler(async (req, res) => {
  const user = req.user; //getting from auth middleware cotaining token validation

  if (user) {
    const items = await itemModel.find({ user: user._id });

    res.send({ data: items });
  } else {
    res.status(404);
    throw new Error(
      "no user data present please login or register a new account !"
    );
  }
});

// Remove items for a user

//api/items/remove/:id

export const removeItem = asyncHandler(async (req, res) => {
  const user = req.user; //getting from auth middleware cotaining token validation
  const id = req.params.id;

  if (id) {
    const exist = await itemModel.find({ _id: id });

    if (exist.length > 0) {
      const item = await itemModel.deleteOne({ _id: id });
      res.send({ data: item });
    } else {
      res.status(404);
      throw new Error("no item present with this id !");
    }
  } else {
    throw new Error("no id present");
  }
});

// @desc    update users item
// @route  put /api/items/update/:id

export const updateItem = asyncHandler(async (req, res) => {
  const itemId = req.params.id;

  if (itemId) {
    const item = await itemModel.find({ _id: itemId });

    if (req.body.description) {
      item[0].description = req.body.description;
    }

    item[0].save();

    res.json(item);
  } else {
    res.status(401);
    throw new Error("invalid  item id !");
  }
});
