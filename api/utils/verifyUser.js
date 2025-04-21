import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "You are not authenticated"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => { //user is the payload of the token
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }
    req.user = user; // Attach the user to the request object
    next(); // Call the next middleware 'updateUser'
  });
}