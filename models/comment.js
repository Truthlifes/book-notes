import db from "./db.js"


export class Comment {
  static async findByBook(bookId) {
    const result = await db.query(
      `SELECT comments.*, users.username, users.profile_image
       FROM comments
       JOIN users ON comments.user_id = users.id
       WHERE comments.book_id = $1
       ORDER BY comments.created_at DESC`,
      [bookId]
    );
    return result.rows;
  }

  static async create(userId, bookId, text) {
    await db.query(
      "INSERT INTO comments (user_id, book_id, content) VALUES ($1, $2, $3)",
      [userId, bookId, text]
    );
  }
}
