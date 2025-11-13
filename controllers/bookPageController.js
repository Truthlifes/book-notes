// these to function does(1.get all the books table 2.get specific by its id)
import { Book } from "../models/book.js";
import { Intrested } from "../models/userBooks.js";

export const BookControl = {
  //get all the book info for home page except notes
  async getBook(req, res) {
    try {
      let sortBy = req.query.sort || "id";
      const result = await Book.getData(sortBy);
      const books = result.map((book) => ({
        ...book,
        isbn_code: `https://covers.openlibrary.org/b/isbn/${book.isbn_code}-L.jpg`,
      }));
      res.render("index.ejs", { books });
    } catch (err) {
      console.error("Error fecting books:", err);
      res.status(500).send("Intenal Server Error");
    }
  },

  //get specific book page by id in url
  async renderBookNotes(req, res) {
    try {
      const { id } = req.params;
      const book = await Book.getBookById(id);
      book.isbn_code = `https://covers.openlibrary.org/b/isbn/${book.isbn_code}-L.jpg`;

      if (!book) {
        return res.status(404).send("Book not found");
      }

      res.render("bookNotes.ejs", { book });
    } catch (err) {
      console.error("Error fetching book:", err);
      res.status(500).send("Internal Server Error");
    }
  },

  async userBooks(req, res) {
    try {
      const { id } = req.params;

      const user = await Intrested.getUserById(id);
      const userBook = await Intrested.getBooksById(id);

      res.render("users/userBooks", {
        user: user,
        books: userBook,
      });
    } catch (err) {
      console.error("Error fetching book:", err);
      res.status(500).send("Internal Server Error");
    }
  },

  async userLibrary(req, res) {
    try {
      const { id } = req.params;

      const user = await Intrested.getUserById(id);
      const userHighlight = await Intrested.userAndBooks(id);

      res.render("users/userHighlights", {
        user: user,
        highlights: userHighlight,
      });
    } catch (err) {
      console.error("Error fetching book:", err);
      res.status(500).send("Internal Server Error");
    }
  },

  // نمایش فرم افزودن کتاب
  async showAddBookForm(req, res) {
    if (!req.user) {
      return res.redirect("/login");
    }
    res.render("users/addBook", { user: req.user });
  },

  async addBook(req, res) {
    try {
      const { title, author, isbn, rating, date_read, review  , quote , note } = req.body;
      const userId = req.user.id; // چون کاربر لاگین کرده

      await Intrested.writeUserData(
        userId,
        title,
        author,
        isbn,
        rating,
        date_read,
        review,
        quote,
        note
      );

      res.redirect(`/profile/${userId}/books`);
    } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong while adding the book");
    }
  },
};
