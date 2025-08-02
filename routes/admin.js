import express from "express";
import * as z from "zod";
const adminRouter = express.Router();
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import admins from "../schemas/adminschema.js";

dotenv.config();
const secretKey = process.env.SECRET_KEY;

adminRouter.post("/signin", async (req, res) => {
const schema = z.object({
  email: z.email(),
  password: z.string().min(8),
}); 

  const user = await admins.findOne({ email: req.body.email });
  if (!user) { 
    res.send("User not found");
    return;
  }

  const isPasswordValid = bcrypt.compare(req.body.password, user.password);
  if (!isPasswordValid) {
    res.send("Invalid password");
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

adminRouter.post("/signup", async (req, res) => {

const schema = z.object({
  email: z.email(),
  password: z.string().min(8),
  firstname: z.string().min(1),
  lastname: z.string().min(1),
}); 

  const result = schema.safeParse(req.body);
  const user = await admins.findOne({ email: req.body.email });

  if (user) {
    res.status(400).json({
      status: 400,
      message: "User already exists",
    });
    return;
  }else{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new admins({
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

adminRouter.get("/", (req, res) => {
  res.send("Admin dashboard");
});

adminRouter.get("/course", (req, res) => {
  res.send(`Purchase`);
});

adminRouter.post("/course", (req, res) => {
  res.send(`Purchase`);
});

adminRouter.put("/course/bulk", (req, res) => {
  res.send(`Purchase`);
});

export default adminRouter;
