// use for database command and function like get query or set someting,....
import db from "./db.js";

import bcrypt from "bcrypt";          // for hashing password

export const User = {
  //finding user in order to them email (for login)
  async findByEmail(email) {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
  },

  // finding user in order to them id (for session)
  async findById(id) {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },

  // create new user (when registering)
  async create(username, email, password, profileImage,bio) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.query(
    "INSERT INTO users (username, email, password, profile_image, bio) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [username, email, hashedPassword, profileImage, bio]
  );
  return result.rows[0];
  },


  // for users who register with them google account
  async findOrCreateGoogleUser(googleId, username, email) {
    const existing = await db.query("SELECT * FROM users WHERE google_id = $1", [googleId]);
    if (existing.rows.length > 0) return existing.rows[0];

    const result = await db.query(
      "INSERT INTO users (google_id, username, email) VALUES ($1, $2, $3) RETURNING *",
      [googleId, username, email]
    );
    return result.rows[0];
  },

  async updateUserData(id, data) {
  const result = await db.query(
    `UPDATE users
     SET username = $1, email = $2, password = $3, profile_image = $4
     WHERE id = $5 RETURNING *`,
    [data.username, data.email, data.password, data.profile_image, id]
  );
  return result.rows[0];
  },

  async findByUsername(username) {
  const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
  return result.rows[0];
}




};
