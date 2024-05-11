class Book {
  constructor(title, author, isbn, price, availability) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.price = price;
    this.availability = availability;
  }
}

class BookDTO {
  constructor(title, author, isbn, price, availability) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.price = price;
    this.availability = availability;
    this.discountPercentage = 0;
  }

  setDiscount(discountPercentage) {
    this.discountPercentage = discountPercentage;
  }

  priceWithDiscount() {
    return this.price * (1 - this.discountPercentage / 100);
  }
}

class ScienceBook extends BookDTO {
  constructor(title, author, isbn, price, availability) {
    super(title, author, isbn, price, availability);
    this.genre = "Science";
  }
}

class FantasyBook extends BookDTO {
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
      if (!book.availability) {
        console.log(`${book.title} is not available`);
        return;
      }
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
  constructor(orderingUser, orderedBooks) {
    let user = orderingUser;
    let books = [];
    // Add books to the order and mark them as unavailable
    orderedBooks.forEach((book) => {
      if (book.availability) {
        books.push(book);
        book.availability = false;
      }
    });
    // Calculate the total price of the order with discounts
    this.getTotalPrice = function () {
      return books.reduce((acc, book) => acc + book.priceWithDiscount(), 0);
    };

    let totalPrice = this.getTotalPrice();

    this.processPayment = function (amountPaid) {
      if (amountPaid < totalPrice) {
        console.log(
          `Payment of $${amountPaid.toFixed(2)} is not enough for ${
            user.name
          }'s order`
        );
        return;
      }
      console.log(
        `Payment of $${totalPrice.toFixed(2)} processed successfully for ${
          user.name
        }`
      );
    };

    this.printDetails = function () {
      console.log(`\nOrder details for ${user.name}:`);
      books.forEach((book) => {
        console.log(
          `Title: ${book.title}, Author: ${book.author}, Price: $${
            book.price
          } ${
            book.discountPercentage
              ? `Discount: ${book.discountPercentage}%`
              : ""
          }`
        );
      });
      console.log(`Total price: $${totalPrice.toFixed(2)}`);
    };

    this.getBooks = function () {
      return books;
    };
  }
}

export { Book, User, Cart, Order, ScienceBook, FantasyBook, BookDTO };
