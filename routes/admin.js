import express from "express";
import * as z from "zod";
const adminRouter = express.Router();
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import admins from "../schemas/adminschema.js";
import adminMiddleware from "../middlewares/admin.js";
import courses from "../schemas/courseschema.js";

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
    const newAdmin = new admins({
      email: req.body.email,
      password: hashedPassword,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });

    const savedAdmin = await newAdmin.save();
    res.status(200).json({
      status: 200,
      message: "User created successfully",
    });
  }
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  const adminId = req.admin_id;
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;

  const course = new courses({
    title,
    description,
    price,
    imageUrl,
    creatorId: adminId,
  });

  const savedCourse = await course.save();
  res.status(200).json({
    status: 200,
    message: "Course created successfully",
    course_id: savedCourse._id,
  });
});

adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
  const adminId = req.admin_id;
  const allCourses = await courses.find();
  res.status(200).json({
    status: 200,
    courses: allCourses,
  });
});

adminRouter.put("/course", adminMiddleware, async (req, res) => {
  const adminId = req.admin_id;
  const courseId = req.body.courseId;
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;

  const course = await courses.findById(courseId);
  if (!course) {
    res.status(400).json({
      status: 400,
      message: "Course not found",
    });
    return;
  }

  if (course.creatorId.toString() !== adminId) {
    res.status(400).json({
      status: 400,
      message: "You are not authorized to update this course",
    });
    return;
  }

  const updatedCourse = await courses.findByIdAndUpdate(courseId, { title, description, price, imageUrl }, { new: true });

  res.status(200).json({
    status: 200,
    message: "Course updated successfully",
    course_id: updatedCourse._id,
  });
});


export default adminRouter;
