import User from "../models/User.js";
import { createError } from "./../utils/error.js";

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(createError(404, "User not updated"));
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (error) {
    next(createError(404, "User not delete"));
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(createError(404, "User not found"));
  }
};

export const getAllUsers = async (req, res, next) => {
  const qNew = req.query.new;
  const qCity = req.query.city;

  try {
    let users;
    if (qNew) {
      users = await User.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCity) {
      users = await User.find({ city: qCity });
    } else {
      users = await User.find();
    }
    res.status(200).json(hotels);
  } catch (error) {
    next(createError(404, "User not found"));
  }
};
