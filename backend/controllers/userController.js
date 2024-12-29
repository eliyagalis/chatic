import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(404).json({ error: "users not found" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "email is in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY, {
        expiresIn: "1h",
        issuer: "http://localhost:8080",
      });
  
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour
        secure: false, // Set to true in production if using HTTPS
        path: "/",
        sameSite: "lax",
      });  

    res.status(201).json({ message: "User was created successfully" , newUser});
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: "username is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "wrong password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
        expiresIn: "1d",
        issuer: "http://localhost:8080",
      });
  
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: false,
        maxAge: 86400000, // 1 day
        path: "/",
        sameSite: "lax",
      });

    res.status(200).json({ message: "user logged-in successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const editUser = async (req, res) => {
  try {
    const userId = req.params;

    if (!userId) {
      return res.status(400).json({ error: "invalid user id" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const verifyToken = (req, res) => {
    const token = req.cookies.jwt;
  
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY, {
        issuer: "http://localhost:8080",
      });
      res.status(200).json({ message: "Token is valid", userId: decoded.id });
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };