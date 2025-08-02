import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.USER_SECRET_KEY;

const userMiddleware = (req, res, next) => {
  const token = req.headers.token;
  const decoded = jwt.verify(token, secretKey);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }else{
    req.user_id = decoded.id;
    next();
  }
};

export default userMiddleware;