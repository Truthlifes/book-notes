//this file contain middleware which we build it
//upload is an object that used multer middleware to upload user "file" like ".png"
import upload from "../config/multer.js";
import multer from "multer";



//middleware for handle uploading image and error using upload in multer.js
export function uploadImgHandler(req , res , next) {
  upload.single("profileImage")(req, res, function (err) {
    if (err instanceof multer.MulterError) {//instanceof check the const to find which class or constructor make it
      return res.status(400).send("File too large (max 2MB)");
    }else if(err) {
      return res.status(400).send(err.message);
    }
    next();
  });
};


export function ensureAuthenticated(req, res, next) {
  // passport add a method to req called authenticated
  // in this if first condition check req.authenticated does exist or not we use it to prevent crash site
  if (req.isAuthenticated && req.isAuthenticated()) {
    // it means user is login
    return next(); // allow goes to next level (controller)
  }

  // if user doesn't login:
  res.redirect("/login");
}
