import express from "express";
import {
  getRegisterPage,
  registerUser,
  getLoginPage,
  checkUserValidate,
  logoutUser,
} from "../controllers/authController.js";
import { uploadImgHandler } from "../middleware/auth.js";
const router = express.Router();

// register page
router.get("/register", getRegisterPage);

// post register form
router.post("/register", uploadImgHandler, registerUser);

// login page
router.get("/login", getLoginPage);

// post login form using passport
router.post("/login", checkUserValidate);

// logout
router.get("/logout", logoutUser);

export default router;
