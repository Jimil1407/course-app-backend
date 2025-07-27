import express from "express";
const userRouter = express.Router();

userRouter.get("/signin", (req, res) => {
  res.send("Signin")
});

userRouter.get("/signup", (req, res) => {
  res.send("Signup");
});

userRouter.get("/purchases", (req, res) => {
  res.send(`Purchase`);
});

export default userRouter;
