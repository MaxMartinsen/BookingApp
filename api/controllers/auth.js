import { createError } from "./../utils/error.js";
import User from "./../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      isAdmin: req.body.isAdmin,
    });
    await newUser.save();
    res.status(200).json("User created successfully");
  } catch (error) {
    next(createError(404, "User not created"));
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      next(createError(404, "User not found"));
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      next(createError(400, "Wrong password or email"));
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,
      { expiresIn: "24h" }
    );

    const { password, isAdmin, ...others } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...others });
  } catch (error) {
    next(createError(500, "Login process failed"));
  }
};
