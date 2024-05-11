import { BookDTO, ScienceBook, FantasyBook, User } from "./models.mjs";
import { exampleBooksData } from "./testSetup.mjs";
import { DEFAULT_POOL } from "./constants.mjs";

const DATABASE_MESSAGE_PREFIX = "\x1b[32mDATABASE:";
const DATABASE_MESSAGE_SUFFIX = "\x1b[0m";

class Database {
  constructor() {
    this.pool = DEFAULT_POOL;
    this.client = null;
  }

  async connectDatabase() {
    try {
      this.client = await this.pool.connect();

      // Create books table
      await this.client.query(`
        CREATE TABLE IF NOT EXISTS books (
          title TEXT,
          author TEXT,
          isbn TEXT PRIMARY KEY,
          price DECIMAL,
          availability BOOLEAN,
          genre TEXT
        )`);

      this.logMessage("Books table created successfully");

      // Create users table
      await this.client.query(`
        CREATE TABLE IF NOT EXISTS users (
          name TEXT,
          email TEXT,
          userId INT PRIMARY KEY
        )`);

      this.logMessage("Users table created successfully");
    } catch (err) {
      console.error(`Error creating tables: ${err}`);
    }
  }

  async searchBookByProperty(value, property) {
    try {
      const queryText = `SELECT * FROM books WHERE ${property} = $1`;
      const result = await this.client.query(queryText, [value]);
      const books = [];
      result.rows.forEach((row) => {
        if (row.genre === "Science")
          books.push(
            new ScienceBook(
              row.title,
              row.author,
              row.isbn,
              row.price,
              row.availability,
            )
          );
        else if (row.genre === "Fantasy")
          books.push(
            new FantasyBook(
              row.title,
              row.author,
              row.isbn,
              row.price,
              row.availability,
            )
          );
        else
          books.push(
            new BookDTO(
              row.title,
              row.author,
              row.isbn,
              row.price,
              row.availability,
            )
          );
      });
      return books;
    } catch (err) {
      console.error(`Error searching book: ${err}`);
    }
  }

  async addUser(newUser) {
    try {
      const result = await this.client.query(
        "INSERT INTO users(name, email, userId) VALUES($1, $2, $3)",
        [newUser.name, newUser.email, newUser.userId]
      );
      this.logMessage("User added successfully");
    } catch (err) {
      console.error(`Error inserting user: ${err}`);
    }
  }

  async addBook(newBook) {
    try {
      const result = await this.client.query(
        "INSERT INTO books(title, author, isbn, price, availability, genre) VALUES($1, $2, $3, $4, $5, $6)",
        [
          newBook.title,
          newBook.author,
          newBook.isbn,
          newBook.price,
          newBook.availability,
          newBook.genre,
        ]
      );
      this.logMessage("Book added successfully");
    } catch (err) {
      console.error(`Error inserting book: ${err}`);
    }
  }

  async updateUser(user) {
    try {
      const result = await this.client.query(
        "UPDATE users SET name = $1, email = $2 WHERE userId = $3",
        [user.name, user.email, user.userId]
      );
      this.logMessage("User updated successfully");
    } catch (err) {
      console.error(`Error updating user: ${err}`);
    }
  }

  async updateBook(book) {
    try {
      const result = await this.client.query(
        "UPDATE books SET title = $1, author = $2, price = $3, availability = $4, genre = $5 WHERE isbn = $6",
        [
          book.title,
          book.author,
          book.price,
          book.availability,
          book.genre,
          book.isbn,
        ]
      );
      this.logMessage("Book updated successfully");
    } catch (err) {
      console.error(`Error updating book: ${err}`);
    }
  }

  async removeUser(user) {
    try {
      const result = await this.client.query(
        "DELETE FROM users WHERE userId = $1",
        [user.userId]
      );
      this.logMessage("User removed successfully");
    } catch (err) {
      console.error(`Error removing user: ${err}`);
    }
  }

  async removeBook(book) {
    try {
      const result = await this.client.query(
        "DELETE FROM books WHERE isbn = $1",
        [book.isbn]
      );
      this.logMessage("Book removed successfully");
    } catch (err) {
      console.error(`Error removing book: ${err}`);
    }
  }

  async populateDatabase() {
    try {
      let counter = 0;
      for (const book of exampleBooksData) {
        await this.addBook(book);
        counter++;
      }
    } catch (err) {
      console.error(`Error populating database: ${err}`);
    }
  }

  async clearDatabase() {
    try {
      const resultBooks = await this.client.query("DROP TABLE IF EXISTS books");
      const resultUsers = await this.client.query("DROP TABLE IF EXISTS users");
      this.logMessage("Tables dropped successfully");
      this.client.release();
    } catch (err) {
      console.error(`Error dropping tables: ${err}`);
    }
  }


  logMessage(message) {
    console.log(
      `${DATABASE_MESSAGE_PREFIX} ${message} ${DATABASE_MESSAGE_SUFFIX}`
    );
  }
}

export { Database };
