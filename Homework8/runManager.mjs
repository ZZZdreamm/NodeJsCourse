import { User } from './models.mjs';

// RunManager class that combines the database and logic of the application
class RunManager {
  constructor(database) {
    this.database = database;
  }

  async setup() {
    try {
      await this.database.connectDatabase();
      await this.database.populateDatabase();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Place an order for a user with a cart and update books in the database
  placeOrder(user, cart) {
    const order = user.placeOrder(cart.getBooks());
    order.getBooks().forEach(book => {
      this.database.updateBook(book);
    });
    return order;
  }

  // Create a new user and store it in the database
  async createUser(name, email, id) {
    const user = new User(name, email, id);
    await this.database.addUser(user);
    return user;
  }

  async clearDatabase() {
    await this.database.clearDatabase();
  }
}

export { RunManager };