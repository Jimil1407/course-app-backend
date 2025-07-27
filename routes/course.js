import express from 'express';
const courseRouter = express.Router();

courseRouter.get("/purchase", (req, res) => {
  res.send("All Courses");
});

courseRouter.get("/preview", (req, res) => {
  res.send("Purchased Course");
});

export default courseRouter;
