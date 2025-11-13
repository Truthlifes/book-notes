import express from "express";
import { ensureAuthenticated } from "../middleware/auth.js";
import { getComments, postComment } from "../controllers/commentController.js";

const router = express.Router();

router.get("/books/:id/comments", getComments);
// for post comment we most sure user is login so we use ensureAuthenticated function
router.post("/books/:id/comments", ensureAuthenticated, postComment);

export default router;
