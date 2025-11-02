# 📚 Book Notes Project

A full-stack Node.js project that lets you record the books you've read, rate them, write notes, and display them beautifully — inspired by [Derek Sivers' book notes site](https://sive.rs/book).

---

## 🧠 Overview

After finishing a book, we often forget the key takeaways.
This project helps you store all the books you've read, including your personal ratings, reading dates, and summaries.
Covers are fetched dynamically using the **Open Library Covers API**, and all book data is persisted in a **PostgreSQL** database.
Book entries can also be seeded automatically from a `.txt` file using `seedBooks.js`.

---

## 🏗️ Features

* ✅ Add, update, and delete book records (Full CRUD)
* 🗂️ Automatically sync data from local `.txt` file
* 🖼️ Fetch book covers via the **OpenLibrary Covers API**
* 🔍 Sort books by **rating**, **recency**, or **title**
* 📅 Track when each book was read (`created_at` timestamps)
* 🎨 Responsive and minimal UI built with **EJS + CSS**
* ⚙️ Modular MVC structure (Models, Controllers, Routes)
* 🪄 Organized database utilities inside `/db` folder

---

## 🗂️ Project Structure

```
project-root/
│
├── config/
│   └── dbConfig.js          # PostgreSQL connection setup
│
├── controllers/
│   └── mainPageController.js  # Main logic for rendering pages
│
├── models/
│   ├── db.js                 # Query wrapper around pg.Pool
│   └── userModel.js          # Database methods (CRUD + sort)
│
├── public/
│   ├── styles.css            # Frontend styling
│   └── images/               # (Optional) local images
│
├── routes/
│   └── indexRoutes.js        # Express routes
│
├── views/
│   ├── index.ejs             # Main page
│   ├── layout.ejs            # Shared layout (if used)
│   └── notes.ejs             # Detailed book notes page
│
├── db/
│   ├── schema.sql            # Database schema definition
│   ├── seedBooks.js          # Script to insert/update books
│   └── schema-diagram.png    # Visual diagram of table structure
│
├── .env                      # Environment variables (used in dbConfig)
├── README.md                 # You are here :)
└── index.js                  # Entry point (Express server)
```

---

## 🧩 Database Schema

Your PostgreSQL database should be named **`notebook`**, with one main table: `books`

| Column       | Type                                   | Description                    |
| ------------ | -------------------------------------- | ------------------------------ |
| `id`         | SERIAL PRIMARY KEY                     | Unique ID for each book        |
| `title`      | VARCHAR(255)                           | Title of the book              |
| `author`     | VARCHAR(255)                           | Author name                    |
| `rating`     | INTEGER                                | User rating (1–10)             |
| `created_at` | TIMESTAMP WITH TIME ZONE DEFAULT NOW() | When it was added/read         |
| `data_read`  | TEXT                                   | Short notes or takeaways       |
| `isbn_code`  | TEXT   UNIQUE                          | UNIQUE Book ISBN code (for API)|

---

## 🧰 Installation

### 1️⃣ Clone this repository

```bash
git clone https://github.com/truthlifes/book-notes.git
cd book-notes
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure your environment

Make sure your `.env` file exists in the project root and contains:

```
PGUSER=your_postgres_username
PGHOST=localhost
PGDATABASE=notebook
PGPASSWORD=your_postgres_password
PGPORT=5432
```

### 4️⃣ Create the database

Open your PostgreSQL terminal or pgAdmin and run:

```sql
CREATE DATABASE notebook;
\c notebook
\i db/schema.sql
```

### 5️⃣ Seed the data (optional)

If you have `/db/books.txt` prepared with book data:

```bash
node db/seedBooks.js
```

### 6️⃣ Run the server

```bash
nodemon index.js
```

or

```bash
node index.js
```

The app runs on:
👉 [http://localhost:3000](http://localhost:3000)

---

## 🧭 Sorting

| Query Parameter   | Sorts By            |
| ---------------   | ------------------- |
| `?sort=title`     | Book title (A–Z)    |
| `?sort=rating`    | Rating (High → Low) |
| `?sort=created_at`| Most recent first   |

Example:

```
http://localhost:3000/?sort=rating
```

---

## 🚀 API Integration

This project uses **[OpenLibrary Covers API](https://openlibrary.org/dev/docs/api/covers)** to fetch book covers dynamically:

Example endpoint:

```
https://covers.openlibrary.org/b/isbn/9780140328721-L.jpg
```

> Note: Only the **Covers API** is used, not the full metadata API.

---

## 🧱 Tech Stack

* **Node.js** + **Express.js**
* **PostgreSQL** (with `pg`)
* **EJS** templating
* **Axios** for API calls
* **CSS / Flexbox** for responsive UI

---

## 🧪 Testing

* Run manual checks using `/db/seedBooks.js`
* Verify CRUD functionality via browser or Postman
* All queries and error handling are logged in the console

---

## 🤝 Contributing

Feel free to fork this repo, open issues, or submit pull requests.
Suggestions and improvements are always welcome!

---

## 🧑‍💻 Author

Developed by **Nima**
📍 Student of full-stack web development & cybersecurity
📬 [GitHub Profile](https://github.com/truthlifes)

---

## 📝 License

This project is open-source under the [MIT License](LICENSE).
