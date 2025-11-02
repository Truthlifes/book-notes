// use for database command and function like get query or set someting,....

import db from "./db.js";


//fetching all rows of books table insted of paginating because dataset is still small
export async function getData(sortField = 'id') {
    const validField = ['title' , 'rating' , 'created_at'];
    if(!validField.includes(sortField))sortField = 'id';
    const bookInfo = (await db.query(`SELECT * FROM books ORDER BY ${sortField} DESC`)).rows;
    return bookInfo;
}

//get specific row by user in url
export async function getBookById(id) {
    const bookInfo = (await db.query("SELECT * FROM books WHERE id = $1" , [id]));
    return bookInfo.rows[0];
}

 