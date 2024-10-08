import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const existingEmail = await User.findOne({ email });

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "An account with this email already exists." });
    }

    const existingUserName = await User.findOne({ username });

    if (existingUserName) {
      return res
        .status(400)
        .json({ message: "An account with this username already exists." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.cookie("jwt-linkedin", token, {
      httpOnly: true, // protext XSS attacks
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production", // prevents man-in-the-middle attacks
    });

    res.status(201).json({
      message: "User registered successfully",
    });

    //todo: send welcome email
  } catch (error) {
    console.log("Error in signup:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = (req, res) => {
  res.send("login");
};

export const logout = (req, res) => {
  res.send("logout");
};
