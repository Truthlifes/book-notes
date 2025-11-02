import { getData , getBookById} from "../models/userModel.js";
import axios from "axios";

//get all the book info for home page except notes
export async function getBook(req , res) {
    try {
        let sortBy = req.query.sort || 'id';
        const result = await getData(sortBy);
        const books = result.map(book =>({
          ...book,
          isbn_code: `https://covers.openlibrary.org/b/isbn/${book.isbn_code}-L.jpg`
        }));
        res.render("index.ejs" , {books});
        
    } catch (err) {
        console.error("Error fecting books:" , err);
        res.status(500).send("Intenal Server Error");
    }
}


//get specific book page by id in url
export async function renderBookNotes(req, res) {
  try {
    const { id } = req.params;
    const book = await getBookById(id);
    book.isbn_code = `https://covers.openlibrary.org/b/isbn/${book.isbn_code}-L.jpg`

    if (!book) {
      return res.status(404).send("Book not found");
    }

    res.render("bookNotes.ejs", { book });
  } catch (err) {
    console.error("Error fetching book:", err);
    res.status(500).send("Internal Server Error");
  }
}


//test openlibrary api
async function testAPI() {
  const isbn = "9780544003415"; 
  const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;

  try {
    const res = await axios.get(url);
    const data = res.data[`ISBN:${isbn}`];
    console.log("Book title:", data.title);
    console.log("Author:", data.authors.map(a => a.name).join(", "));
    console.log("Cover URL:", data.cover.large);
  } catch (err) {
    console.error("Error fetching data from API:", err.message);
  }
}

testAPI();


//test data base
// async function testDB() {
//     const result = await getData(1);
//     console.log("Database connected successfuly");
//     console.log(result.rows)
// }
// testDB();