import { DATABASE_FILENAME, BOOKSTORE_STRUCTURE } from "./constants.mjs";
import { writeJSONFile, readJSONFile } from "./database.mjs";

const exampleBooksData = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "9780743273565",
    price: 9.99,
    availability: true,
    genre: "Science",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "9780061120084",
    price: 7.99,
    availability: true,
    genre: "Fantasy",
  },
  {
    title: "1984",
    author: "George Orwell",
    isbn: "9780451524935",
    price: 8.99,
    availability: true,
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "9780679783268",
    price: 6.99,
    availability: true,
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "9780316769488",
    price: 5.99,
    availability: true,
  },
];

const exampleUsersData = [
  {
    name: "John Doe",
    email: "pol@gmail.com",
    userId: 1,
  },
  {
    name: "Jane Doe",
    email: "Janet@gmail.com",
    userId: 2,
  },
  {
    name: "Alice Smith",
    email: "Alice@gmail.com",
    userId: 3,
  },
];

function setupDatabase(callback) {
  writeJSONFile(DATABASE_FILENAME, BOOKSTORE_STRUCTURE, async (writeErr) => {
    if (writeErr) {
      // Handle write error
    }
    readJSONFile(DATABASE_FILENAME, async (err, jsonData) => {
      if (err) {
        // Handle error
      } else {
        jsonData.books = exampleBooksData;
        jsonData.users = exampleUsersData;
        writeJSONFile(DATABASE_FILENAME, jsonData, (writeErr) => {
          if (writeErr) {
            console.error(writeErr);
          } else {
            callback();
          }
        });
      }
    });
  });
}

function clearDatabase() {
  writeJSONFile(DATABASE_FILENAME, BOOKSTORE_STRUCTURE, (writeErr) => {
    if (writeErr) {
      // Handle write error
    } else {
    }
  });
}

export { setupDatabase, clearDatabase };
