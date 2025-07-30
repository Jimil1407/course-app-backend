import express from "express";
import * as z from "zod";
const adminRouter = express.Router();
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import admins from "../schemas/adminschema.js";

dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;



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
    res.json({
      status: "success",
      message: "User signed in successfully",
      token: token,
    });

  } else {
    res.send(result.error.errors);
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
    res.send("User already exists");
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
    res.send("User created successfully");
  }
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
