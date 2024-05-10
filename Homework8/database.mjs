import fs from "fs";
import { Book, ScienceBook, FantasyBook, User } from "./classes.mjs";

// Function to read data from a JSON file
function readJSONFile(filename, callback) {
  fs.readFile(filename, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading ${filename}: ${err}`);
      return callback(err);
    }
    try {
      const json = JSON.parse(data);
      callback(null, json);
    } catch (parseError) {
      console.error(`Error parsing JSON in ${filename}: ${parseError}`);
      callback(parseError);
    }
  });
}

// Function to write data to a JSON file
function writeJSONFile(filename, data, callback) {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFile(filename, jsonData, "utf8", (err) => {
    if (err) {
      console.error(`Error writing to ${filename}: ${err}`);
      return callback(err);
    }
    callback(null);
  });
}

// Append new user
function appendUser(newUser, filename) {
  readJSONFile(filename, (err, jsonData) => {
    if (err) {
      // Handle error
    } else {
      if (jsonData.users.find((user) => user.userId === newUser.userId)) {
        console.log("User already exists.");
        return;
      }
      jsonData.users.push(newUser);
      writeJSONFile(filename, jsonData, (writeErr) => {
        if (writeErr) {
          // Handle write error
        } else {
          console.log("User added successfully.");
        }
      });
    }
  });
}

// Append new book
function appendBook(newBook, filename) {
  readJSONFile(filename, (err, jsonData) => {
    if (err) {
      // Handle error
    } else {
      if (jsonData.books.find((book) => book.isbn === newBook.isbn)) {
        console.log("Book already exists.");
        return;
      }
      jsonData.books.push(newBook);
      writeJSONFile(filename, jsonData, (writeErr) => {
        if (writeErr) {
          // Handle write error
        } else {
          console.log("Book added successfully.");
        }
      });
    }
  });
}

function removeUser(user, filename) {
  readJSONFile(filename, (err, jsonData) => {
    if (err) {
      // Handle error
    } else {
      jsonData.users = jsonData.users.filter((u) => u.userId !== user.userId);
      writeJSONFile(filename, jsonData, (writeErr) => {
        if (writeErr) {
          // Handle write error
        } else {
          console.log("User removed successfully.");
        }
      });
    }
  });
}

function removeBook(book, filename) {
  readJSONFile(filename, (err, jsonData) => {
    if (err) {
      // Handle error
    } else {
      jsonData.books = jsonData.books.filter((b) => b.isbn !== book.isbn);
      writeJSONFile(filename, jsonData, (writeErr) => {
        if (writeErr) {
          // Handle write error
        } else {
          console.log("Book removed successfully.");
        }
      });
    }
  });
}

function getDataFromDatabase(databaseName, callback) {
  readJSONFile(databaseName, (err, jsonData) => {
    if (err) {
      // Handle error
    } else {
      const books = [];
      jsonData.books?.forEach((book) => {
        if (book.genre === "Science") {
          books.push(
            new ScienceBook(
              book.title,
              book.author,
              book.isbn,
              book.price,
              book.availability
            )
          );
        } else if (book.genre === "Fantasy") {
          books.push(
            new FantasyBook(
              book.title,
              book.author,
              book.isbn,
              book.price,
              book.availability
            )
          );
        } else {
          books.push(
            new Book(
              book.title,
              book.author,
              book.isbn,
              book.price,
              book.availability
            )
          );
        }
      });
      const users = [];
      jsonData.users?.forEach((user) => {
        users.push(new User(user.name, user.email, user.userId));
      });
      callback(books, users);
    }
  });
}

export { appendUser, appendBook, removeUser, removeBook, getDataFromDatabase, writeJSONFile, readJSONFile };
