# Capstone Project 5 -- Personal Reading & Notes Management Platform

A full-stack Node.js application for tracking books you've read, storing
notes, managing user profiles, and allowing users to leave comments on
books.\
The platform supports user authentication, book management, personal
notes, and profile customization with image uploads.

## Features

- User registration & login (Passport Local)
- Session-based authentication
- Add books with title, author, rating, notes, quotes
- Detailed book notes page
- Comment system per book
- User profile with editable information
- Profile image upload (Multer)
- EJS server-side rendering
- PostgreSQL-backed models

## Project Structure

    Capstone_project_5/
    ├── config/ # Configuration for Passport, Multer, Database
    ├── controllers/ # Application logic for Authentication, Books, Comments, Users
    ├── db/ # Database query functions
    ├── middleware/ # Authentication checks, upload handlers
    ├── models/ # Data models (User, Book, Comment)
    ├── public/ # Static assets (CSS, images)
    ├── routes/ # Express routes for all major sections
    ├── stories/ # Seed data / sample book entries
    ├── views/ # EJS templates for rendering pages
    ├── index.js # Main server entry point
    └── .env # Environment configuration

## Technologies Used

- Node.js + Express
- PostgreSQL (pg)
- Passport.js (Local Strategy)
- express-session + connect-pg-simple
- Multer
- Bcrypt
- EJS

## Setup & Installation

### Install dependencies

npm install

### Create .env file

PORT=3000 SESSION_SECRET=your_secret_key DB_HOST=localhost DB_PORT=5432
DB_USER=postgres DB_PASSWORD=your_password DB_NAME=your_database_name

### Start the server

node index.js

## Authentication Flow

- Users register through /register

- Passwords are hashed with bcrypt

- Passport’s Local Strategy validates login credentials

- Sessions are stored in PostgreSQL through connect-pg-simple

- Logged-in users gain access to book management, comments, and profile pages

## Book Management

- Add new books with a form

- View all books on the homepage

- Open each book’s dedicated notes page

- Store rating, review, quotes, and personal notes

See all books associated with their profile

## Comments

- Each book has a comment section

- Only authenticated users can post comments

- Comments are stored in the database and displayed chronologically

## User Profiles

- Profile image upload
- Personal info
- User's books and highlights

## Improvements (Optional)

- Add validation (Zod/Yup)
- Add Helmet, CORS, rate-limit
- Add tests (Jest/Supertest)
