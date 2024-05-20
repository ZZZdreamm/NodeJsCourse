import { Cart } from "./models.mjs";
import { Database } from "./database.mjs";
import { RunManager } from "./runManager.mjs";

// Create a new Database instance and a RunManager instance
const database = new Database();
const runManager = new RunManager(database);

// Setup the database by establishing a connection and populating it with example data
await runManager.setup();

// Create three users and store them in the database
const user1 = await runManager.createUser("John Doe", "john@gmail.com", 4);
const user2 = await runManager.createUser("Jane Doe", "Janet@gmail.com", 5);
const user3 = await runManager.createUser("Alice Smith", "alice@gmail.com", 6);

// Create two carts
const cart1 = new Cart();
const cart2 = new Cart();
// Search for three books in database and add them to the first cart
const book1 = (await database.searchBookByProperty("9780743273565", "isbn"))[0];
const book2 = (await database.searchBookByProperty("Pride and Prejudice", "title"))[0];
const book3 = (await database.searchBookByProperty("J.D. Salinger", "author"))[0];
const book4 = (await database.searchBookByProperty("9780061120084", "isbn"))[0];
const book5 = (await database.searchBookByProperty("9780451524935", "isbn"))[0];
cart1.addBook(book1);
cart1.addBook(book2);
cart1.addBook(book3);

// Set a discount of 50% on the first book
book1.setDiscount(50);

// Place an order for the first user with the first cart
const order1 = runManager.placeOrder(user1, cart1);
order1.printDetails();
order1.processPayment(20);
console.log("\n");

// Try to add the first book to the second cart (it should not be added because it is not available anymore)
cart2.addBook(book1);
cart2.addBook(book4);
cart2.addBook(book5);

const order2 = runManager.placeOrder(user2, cart2);
order2.printDetails();
order2.processPayment(20);
console.log("\n");


// Clear the database and close the connection
await runManager.clearDatabase();

