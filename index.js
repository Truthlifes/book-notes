import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import router from "./routes/indexRoutes.js";
dotenv.config();
const app = express();
const port = process.env.PORT;

app.set("view engine" , "ejs");
app.set("views" , "views");
app.use(bodyParser.urlencoded({ extended : true}));
app.use(express.static("public"));
app.use(express.json());

app.use("/" , router);




app.listen(port , () => {
    console.log(`Server running on port ${port}`);
})