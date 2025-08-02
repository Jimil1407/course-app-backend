import express from 'express';
const courseRouter = express.Router();
import userMiddleware from '../middlewares/user.js';
import courses from '../schemas/courseschema.js';
import purchases from '../schemas/purchaseschema.js';

courseRouter.post("/purchase", userMiddleware, async (req, res) => {
  const userId = req.user_id;
  const courseId = req.body.courseId;
  const course = await courses.findById(courseId);
  if (!course) {
    res.status(400).json({
      status: 400,
      message: "Course not found",
    });
    return;
  }
  const purchase = await purchases.create({
    userId,
    courseId,
  });
  res.status(200).json({
    status: 200,
    message: "Course purchased successfully",
    purchase_id: purchase._id,
  });
});

courseRouter.get("/preview", async (req, res) => {
  const course = await courses.find();
  res.status(200).json({
    status: 200,
    courses: course,
  });
});

export default courseRouter;
