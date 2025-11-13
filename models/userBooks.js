import db from "./db.js";

export class Intrested {
  static async getUserById(id) {
    const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return user.rows[0];
  }

  static async getBooksById(user_id) {
    const books = await db.query(
      "SELECT * FROM user_books WHERE user_id = $1",
      [user_id]
    );
    return books.rows;
  }

  static async userAndBooks(id) {
    await db.query(
      `SELECT h.*, b.title
     FROM highlights AS h
     JOIN user_books AS b ON h.book_id = b.id
     WHERE h.user_id = $1
     ORDER BY h.created_at DESC`,
      [id]
    );
  }

  static async writeUserData(
    userId,
    title,
    author,
    isbn,
    rating,
    date_read,
    review,
    quote,
    note
  ) {
    const bookIdDetail = await db.query(
      `INSERT INTO user_books (user_id, title, author, isbn, rating, date_read, review)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [userId, title, author, isbn, rating, date_read, review]
    );
    const bookId = Number(bookIdDetail.rows[0].id);
    await db.query(
      `INSERT INTO highlights (user_id, book_id, quote, note)
         VALUES ($1, $2, $3, $4)`,
      [userId, bookId, quote, note]
    );
  }
}
