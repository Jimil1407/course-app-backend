import express from "express";
import * as z from "zod";
const adminRouter = express.Router();
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import admin from "../schemas/adminschema.js";

dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

const schema = z.object({
  email: z.email(),
  password: z.string().min(8),
  firstname: z.string().min(1),
  lastname: z.string().min(1),
}); 


adminRouter.post("/signin", async (req, res) => {

  const user = await admin.findOne({ email: req.body.email });
  if (!user) {
    res.send("User not found");
    return;
  }

  const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordValid) {
    res.send("Invalid password");
    return;
  }

  const result = schema.safeParse(req.body);
  if (result.success) {
    const token = jwt.sign({ id: user._id, email: result.data.email}, secretKey);
    res.send(token);

  } else {
    res.send(result.error.errors);
  }
});

adminRouter.post("/signup", async (req, res) => {

  const result = schema.safeParse(req.body);
  const user = await admin.findOne({ email: req.body.email });
  if (user) {
    res.send("User already exists");
    return;
  }else{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new admin({
      email: req.body.email,
      password: hashedPassword,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    const savedUser = await admin.create(newUser);

    if (result.success) {
      const token = jwt.sign({ id: savedUser._id, email: result.data.email}, secretKey);
      res.send(token);
    } else {
      res.send(result.error.errors);
    }
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
