import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  signout,
  getUsers,
  getUser,
} from "../controllers/user.controller.js"; // Import the test function from the controller
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.get("/test", test); //(req, res) function may have many different logtics, so we need to add it to another folder "controllers" and import it here

router.put("/update/:userId", verifyToken, updateUser);

router.delete("/delete/:userId", verifyToken, deleteUser);

router.post("/signout", signout);

router.get("/getusers", verifyToken, getUsers);

router.get("/:userId", getUser);
export default router;
