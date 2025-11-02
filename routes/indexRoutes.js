import express from "express";
import axios from "axios";
import { getBook , renderBookNotes  } from "../controllers/mainPageController.js";
const router = express.Router();

router.get("/" , getBook);
router.get("/book/:id", renderBookNotes);
router.get("/book",getBook);

router.get("/api/book/:isbn", async (req, res) => {
  const { isbn } = req.params;
  try {
    const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;
    const response = await axios.get(url);
    const data = response.data[`ISBN:${isbn}`];
    res.json(data); // برمی‌گردونی برای تست یا Postman
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});




export default router;