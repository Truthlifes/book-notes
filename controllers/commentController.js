// this file manage the comment specific to each user
import { Comment } from "../models/comment.js";
import { Book } from "../models/book.js";

export async function getComments(req, res) {
  const { id } = req.params;
  const book = await Book.getBookById(id);
  const comments = await Comment.findByBook(id);

  res.render("comments/show", {
    book,
    comments,
    user: req.user || null
  });
}

export async function postComment(req, res) {
  const { id } = req.params;
  const { text } = req.body;
  const user = req.user;

  if (!user) {
    return res.redirect("/login");
  }

  if (!text.trim()) {
    return res.redirect(`/books/${id}/comments`);
  }

  await Comment.create(user.id, id, text);
  res.redirect(`/books/${id}/comments`);
}
