import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY;

const adminMiddleware = (req, res, next) => {
  const token = req.headers.token;
  const decoded = jwt.verify(token, secretKey);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }else{
    req.user.id = decoded.id;
    next();
  }
};

export default adminMiddleware;