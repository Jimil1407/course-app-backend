import express from "express";
const adminRouter = express.Router();

adminRouter.post("/signin", (req, res) => {
  res.send("Signin");
});

adminRouter.post("/signup", (req, res) => {
  res.send("Signup");
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
