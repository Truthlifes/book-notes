import express from "express";
import { BookControl } from "../controllers/bookPageController.js";
const router = express.Router();

router.get("/", BookControl.getBook);
router.get("/book/:id", BookControl.renderBookNotes);
router.get("/book", BookControl.getBook);
router.get("/profile/:id/books", BookControl.userBooks);
router.get("/profile/:id/highlights", BookControl.userLibrary);
// نمایش فرم افزودن کتاب جدید
router.get("/add", BookControl.showAddBookForm);

// دریافت داده‌ها از فرم و ذخیره در دیتابیس
router.post("/add", BookControl.addBook);

export default router;
