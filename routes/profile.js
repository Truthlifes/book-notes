import express from "express";
import upload from "../config/multer.js"; 
import { ensureAuthenticated } from "../middleware/auth.js";
import {updateUserProfile , getProfile  } from "../controllers/usercontroller.js";
import { getUserProfile } from "../controllers/usercontroller.js";

const router = express.Router();


router.get("/profile", ensureAuthenticated, getProfile);

router.get("/profile/edit", ensureAuthenticated, (req, res) => {
  res.render("profile/edit", { user: req.user });
});

// مشاهده‌ی پروفایل هر کاربر عمومی
router.get("/users/:username", getUserProfile);


// for edit user we must sure user is login now then upload new picture then update user entirly
router.post("/profile/edit", ensureAuthenticated, upload.single("newImage"), updateUserProfile);



export default router;
