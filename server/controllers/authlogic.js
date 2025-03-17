import { createError } from "../utils/error.js";
import { connecttoDB } from "../utils/connect.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export async function register(req, res, next) {
    const data = req.body;
    console.log(data);

    if (!data?.email || !data?.password || !data?.username) {
        return next(createError(400, "All fields are required"));
    }
    // Connect to DB
    await connecttoDB();
    // Check if user already exists
    const user = await User.exists({ email: data.email });
    if (user) {
        return next(createError(400, "User already exists"));
    }

    // Create new user
    const newUser = new User(data);
    await newUser.save();

    return res.status(201).json("User created successfully");
}

export async function login(req, res, next) {
    const data = req.body;

    if (!data?.email || !data?.password) {
        return next(createError(400, "All fields are required"));
    }

    // Connect to DB
    await connecttoDB();

    // Check if user exists
    const user = await User.findOne({ email: data.email });
    if (!user) {
        return next(createError(400, "User not found"));
    }

    // Verify password
    if (user.password !== data.password) {
        return next(createError(400, "Incorrect password"));
    }

  //generate token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  // This return will eventually log in the user
  return res.status(200).json({
    success: true,
    message: "Login successful  ",
    token: token,
  });
}

export async function logout(req, res, next) {
  return res.status(200).json("Logout successful");
}
