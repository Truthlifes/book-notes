import dotenv from "dotenv"; //use this package to secure const that we don't want share it in public
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import initialize from "./config/passport.js"; //use this package to init passport method to req like req.authentication
import authRoutes from "./routes/auth.js";
import bookRoutes from "./routes/books.js";
import profileRoutes from "./routes/profile.js";
import commentRoutes from "./routes/comments.js";
import pgSession from "connect-pg-simple";
import db from "./models/db.js";

dotenv.config();
const app = express();
const port = process.env.PORT;
/*pgSession is a constructor function comes from "connect-pg-simple" pacakge , 
when we say pgSession(session) we tell pgSession to build a DB for save sessions in postgreSQL 
and it's resault is a class called "PgSession"
*/
const PgSession = pgSession(session);

app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

//this is a function that i build in config to say how passport should behave
initialize(passport);

//session config like DB place and password ....
app.use(
  session({
    //PgSession class is build afew code upper
    store: new PgSession({
      pool: db, // for connect to database to stores the sessions
      tableName: "session", // table name in PostgreSQL
    }),
    secret: process.env.SESSION_SECRET || "secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // credit: 7days
      secure: false, // this KEY says if true cookie just send via https , but because i'm in developing and use localhost make it false
    },
  })
);
//passport.initialize allows req form explorer get passport method like login , authenticate , ...
app.use(passport.initialize());
//passport.session need becausse if it doesn't exist every time user req logout this make a session and user id in cookie for every user
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use("/", bookRoutes);
app.use("/", authRoutes);
app.use("/", profileRoutes);
app.use("/", commentRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
