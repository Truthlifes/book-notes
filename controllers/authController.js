// build this page for get login and register user and manage the registration and authentication for login users
import passport from "passport";
import { User } from "../models/user.js";
// we use fs/promises because unlike the previous version of fs it is async and better fo web
import fs from "fs/promises";

//we pass all information that we get from deserialize user about them to register page
export function getRegisterPage(req , res) {
    res.render("auth/register", { user: req.user });
};



export async function registerUser(req, res) {
  const { username, email, password, bio } = req.body;
  //this if when return true get us the route of image file that we build with multer using "upload" in route page
  const profileImage = req.file ? `/uploads/${req.file.filename}` : null; 

  // checking if email is exist or not
  try {
    const existingUser = await User.findByEmail(email);

    // if email exist the file that user uploaded should be delete
    if (existingUser) {

      if (req.file) {
        await fs.unlink(`public${profileImage}`);
      }
      return res.status(400).send("Email already registered.");
    }

    // create new user
    await User.create(username, email, password, profileImage, bio);

    res.redirect("/login");

  } catch (err) {
    console.error("Error during register:", err);

    // in catch error we should delete any file uploaded so here we say if any file uploaded delete it
    if (req.file) {
      try {
        await fs.unlink(`public${profileImage}`);
      } catch (unlinkErr) {
        console.warn("Failed to delete uploaded file:", unlinkErr);
      }
    }

    res.status(500).send("Error registering user");
  }
}


export function getLoginPage(req , res) {
    res.render("auth/login", { user: req.user });
}


// this authenticate use its strategy name in its Parentheses so if strategy cb user and pass is correct it say success and And vice versa
export const checkUserValidate = passport.authenticate("local", {
  successRedirect: "/",       
  failureRedirect: "/login",  
});


export function logoutUser(req , res , next) {
    req.logout(err => {
    if (err) return next(err);
    res.redirect("/");
  });
}