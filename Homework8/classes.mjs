import { DATABASE_FILENAME } from "./constants.mjs";
import { appendBook, removeBook, appendUser, removeUser } from "./database.mjs";

class Book {
  constructor(title, author, isbn, price, availability) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.price = price;
    this.availability = availability;
  }
}

class ScienceBook extends Book {
  constructor(title, author, isbn, price, availability) {
    super(title, author, isbn, price, availability);
    this.genre = "Science";
  }
}

class FantasyBook extends Book {
  constructor(title, author, isbn, price, availability) {
    super(title, author, isbn, price, availability);
    this.genre = "Fantasy";
  }
}

class User {
  constructor(name, email, id) {
    this.name = name;
    this.email = email;
    this.userId = id;
  }

  placeOrder(cart) {
    return new Order(this, cart);
  }
}

class Cart {
  constructor() {
    let books = [];
    this.addBook = function (book) {
      if (!book.availability) return;
      books.push(book);
    };

    this.removeBook = function (book) {
      books = books.filter((b) => b.isbn !== book.isbn);
    };

    this.getTotalPrice = function () {
      return books.reduce((acc, book) => acc + book.price, 0);
    };

    this.getBooks = function () {
      return books;
    };
  }
}

class Order {
  constructor(user, books) {
    this.user = user;
    this.books = [];
    books.forEach((book) => {
      if (book.availability) {
        this.books.push(book);
        book.availability = false;
      }
    });
    this.totalPrice = this.getTotalPrice();
  }

  getTotalPrice() {
    return this.books.reduce((acc, book) => acc + book.price, 0);
  }

  applyDiscount(discountPercentage) {
    const discountAmount = (this.totalPrice * discountPercentage) / 100;
    this.totalPrice -= discountAmount;
  }

  processPayment(amountPaid) {
    if (amountPaid < this.totalPrice) {
      console.log(
        `Payment of $${amountPaid.toFixed(2)} is not enough for ${
          this.user.name
        }'s order`
      );
      return;
    }
    console.log(
      `Payment of $${this.totalPrice.toFixed(2)} processed successfully for ${
        this.user.name
      }`
    );
  }

  printDetails() {
    console.log(`Order details for ${this.user.name}:`);
    this.books.forEach((book) => {
      console.log(
        `Title: ${book.title}, Author: ${
          book.author
        }, Price: $${book.price.toFixed(2)}`
      );
    });
    console.log(`Total price: $${this.totalPrice.toFixed(2)}`);
  }
}

class BookStore {
  constructor() {
    let books = [];
    let users = [];
    this.addBook = function (book) {
      books.push(book);
      appendBook(book, DATABASE_FILENAME);
    };

    this.removeBook = function (book) {
      books = books.filter((b) => b.isbn !== book.isbn);
      removeBook(book, DATABASE_FILENAME);
    };

    this.addUser = function (user) {
      users.push(user);
      appendUser(user, DATABASE_FILENAME);
    };

    this.removeUser = function (user) {
      users = users.filter((u) => u.userId !== user.userId);
      removeUser(user, DATABASE_FILENAME);
    };

    this.searchBookByProperty = function (value, propertyName) {
      return books.filter((book) => book[propertyName] === value);
    };

    this.getBooks = function () {
      return books;
    };

    this.setBooks = function (newBooks) {
      books = newBooks;
    };

    this.getUsers = function () {
      return users;
    };

    this.setUsers = function (newUsers) {
      users = newUsers;
    };
  }
}

export { BookStore, Book, User, Cart, Order, ScienceBook, FantasyBook };
