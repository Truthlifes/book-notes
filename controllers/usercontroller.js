// this file mange the user info and them request
import fs from "fs/promises";
import path from "path";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";

export async function updateUserProfile(req, res) {
  try {
    const user = req.user; // get user info from session and session get it from passport's deserialized them
    const { username, email, newPassword } = req.body;
    const newImage = req.file
      ? `/uploads/${req.file.filename}`
      : user.profile_image; // if user upload new image or not

    // if previous photo does exist and new photo uploaded , delete previos photo
    if (req.file && user.profile_image) {
      const oldPath = path.join("public", user.profile_image);
      try {
        await fs.unlink(oldPath);
      } catch (err) {
        console.warn("⚠️ couldn't delete old image:", err.message);
      }
    }

    // if user make new password hash it
    let hashedPassword = user.password;
    if (newPassword && newPassword.trim() !== "") {
      hashedPassword = await bcrypt.hash(newPassword, 10);
    }

    // updating database
    await User.updateUserData(user.id, {
      username,
      email,
      password: hashedPassword,
      profile_image: newImage,
    });

    // because explorer uses session to show data we should update req.user to session been updated too , and user see immediately resault
    user.username = username;
    user.email = email;
    user.profile_image = newImage;
    user.password = hashedPassword;

    res.redirect("/users/profile");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating profile.");
  }
}

export function getProfile(req, res) {
  const user = req.user;
  res.render("users/show", { 
    user: req.user, // کاربر فعلی لاگین‌شده (ممکنه null باشه)
    profileUser: user, // کاربری که پروفایلش رو داریم نمایش می‌دیم
   });
}

export async function getUserProfile(req, res) {
  try {
    const { username } = req.params;
    const user = await User.findByUsername(username);
    if (!user) return res.status(404).send("User not found");

    res.render("users/profile", {
      user: req.user, // کاربر فعلی لاگین‌شده (ممکنه null باشه)
      profileUser: user, // کاربری که پروفایلش رو داریم نمایش می‌دیم
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading profile");
  }
}
