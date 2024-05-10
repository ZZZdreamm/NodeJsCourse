import { DATABASE_FILENAME } from "./constants.mjs";
import { setupDatabase, clearDatabase } from "./testSetup.mjs";
import {
  BookStore,
  Book,
  User,
  Cart,
  Order,
  ScienceBook,
  FantasyBook,
} from "./classes.mjs";

import {
  getDataFromDatabase,
  readJSONFile,
  writeJSONFile,
} from "./database.mjs";

setupDatabase(() => {
  const bookStore = new BookStore();
  getDataFromDatabase(DATABASE_FILENAME, async (books, users) => {
    bookStore.setBooks(books);
    bookStore.setUsers(users);

    const user1 = new User("John Doe", "john@gmail.com", 4);
    const user2 = new User("Jane Doe", "Janet@gmail.com", 5);
    const user3 = new User("Alice Smith", "alice@gmail.com", 6);

    bookStore.addUser(user1);
    bookStore.addUser(user2);
    bookStore.addUser(user3);

    const cart1 = new Cart();

    cart1.addBook(bookStore.searchBookByProperty("9780743273565", "isbn")[0]);
    cart1.addBook(
      bookStore.searchBookByProperty("Pride and Prejudice", "title")[0]
    );
    cart1.addBook(bookStore.searchBookByProperty("J.D. Salinger", "author")[0]);

    const order1 = user1.placeOrder(cart1.getBooks());

    order1.printDetails();
    order1.applyDiscount(10);
    order1.processPayment(20);



    setTimeout(() => {
      clearDatabase();
    }, 1000);
  });

  /// Discount dodany
  /// Search dodany
  /// Payments ?
  /// Baza danych
});
