import fs from "fs";
import path from "path";
import db from "../models/db.js";

const storiesDir = path.join(process.cwd(), "stories");//get full path of stories folder on any system

// this function making CRUD operation on database and help read file whitout error
async function seedBooks() {
  try {
    const collectedIsbns =[];
    const folders = fs.readdirSync(storiesDir); // list all of book folder in stories folder
    //loop for upsert on every book or folder of stories
    for (const folder of folders) {
      const bookDir = path.join(storiesDir, folder);

      const readFileSafe = (filename) => {
        const filePath = path.join(bookDir, filename);//get exact text file
        return fs.existsSync(filePath)
          ? fs.readFileSync(filePath, "utf-8").trim()
          : null;
      };

      // read every file of foder
      const title = readFileSafe("title.txt");
      const author = readFileSafe("author.txt");
      const isbn = readFileSafe("isbn.txt");
      const rating = readFileSafe("rating.txt");
      const review = readFileSafe("review.txt");
      const notes = readFileSafe("notes.txt");
      collectedIsbns.push(isbn);//use this array becuase if some isbn doesn't in it delete them

      //do upsert on database
      await db.query(
        `INSERT INTO books (isbn_code, title, author, rating, review, data_read)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (isbn_code) DO UPDATE
        SET title = EXCLUDED.title,
        author = EXCLUDED.author,
        rating = EXCLUDED.rating,
        review = EXCLUDED.review,
        data_read = EXCLUDED.data_read`,
        [isbn, title, author, rating, review, notes]
      );

      console.log(`✅ Inserted book: ${title}`);
    }

    //deleting operation
    if (collectedIsbns.length > 0) {
        const placeholders = collectedIsbns.map((_, i) => `$${i + 1}`).join(", ");
        const deleteQuery = `DELETE FROM books WHERE isbn NOT IN (${placeholders})`;
        await db.query(deleteQuery, collectedIsbns);
        console.log("🗑️ Removed books that no longer exist in stories/");
    }
    console.log("🌱 All books seeded successfully!");
  } catch (err) {
    console.error("❌ Error during seeding:", err);
  }
}

seedBooks();
