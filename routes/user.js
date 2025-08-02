import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import users from "../schemas/userschema.js";
import dotenv from "dotenv";  
import userMiddleware from "../middlewares/user.js";
import purchases from "../schemas/purchaseschema.js";
import courses from "../schemas/courseschema.js"; 
dotenv.config();
const userRouter = express.Router();
const secretKey = process.env.USER_SECRET_KEY;

userRouter.post("/signin", async (req, res) => {
  const schema = z.object({
    email: z.email(),
    password: z.string().min(8),
  }); 
  
    const user = await users.findOne({ email: req.body.email });
    if (!user) { 
      res.status(400).json({
        status: 400,
        message: "User not found",
      });
      return;
    }
  
    const isPasswordValid = bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({
        status: 400,
        message: "Invalid password",
      });
      return;
    }
  
    const result = schema.safeParse(req.body);
  
    if ( isPasswordValid && result.success) {
      const token = jwt.sign({ id: user._id, email: result.data.email}, secretKey);
      res.status(200).json({
        message: "User signed in successfully",
        token: token,
      });
  
    } else {
      res.status(400).json({
        status: 400,
        message: "Invalid password or email",
      });
    }
  });
  
  userRouter.post("/signup", async (req, res) => {
  
  const schema = z.object({
    email: z.email(),
    password: z.string().min(8),
    firstname: z.string().min(1),
    lastname: z.string().min(1),
  }); 
  
    const result = schema.safeParse(req.body);
    const user = await users.findOne({ email: req.body.email });
  
    if (user) {
      res.status(400).json({
        status: 400,
        message: "User already exists",
      });
      return;
    }else{
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new users({
        email: req.body.email,
        password: hashedPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      });
  
      const savedUser = newUser.save();
      res.status(200).json({
        status: 200,
        message: "User created successfully",
      });
    }
  });
  
userRouter.get("/purchases", userMiddleware, async (req, res) => {
  const user = req.user_id;
  const purchased = await purchases.find({ userId: user });
  const courseIds = purchased.map((purchase) => purchase.courseId);
  const purchasedCourses = await courses.find({ _id: { $in: courseIds } });
  res.status(200).json({
    status: 200,
    courses: purchasedCourses,
  });
});

export default userRouter;
