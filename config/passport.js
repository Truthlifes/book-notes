// use this page for config passport strategies and serialize , deserialize users
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
//User is an object that contains many function
export default function initialize(passport) {

  // definition of local strategy
  passport.use(
    "local",
    new LocalStrategy(
      { usernameField: "email" }, // because we use email instead of username , usernameField of passport using username by default
      async (email, password, done) => {
        try {
          // finding user from database
          const user = await User.findByEmail(email);
          if (!user) {
            return done(null, false, { message: "No user with that email" });
          }

          // passport deserialize the user it include password , now we compare it with password type right now  to check
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: "Incorrect password" });
          }

          // everything is OK — authenticated user
          return done(null, user);

        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // saving user.id in session
  passport.serializeUser((user, done) => done(null, user.id));

  // Retrieve user information from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}
