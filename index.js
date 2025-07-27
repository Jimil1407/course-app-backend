import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import courseRouter from "./routes/course.js";
import adminRouter from "./routes/admin.js";
import { insertSampleData } from "./schemas/insert.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    
    insertSampleData();
  })
  .catch(err => console.error("MongoDB connection error:", err));

app.use('/user', userRouter);
app.use('/course', courseRouter);
app.use('/admin', adminRouter);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});



