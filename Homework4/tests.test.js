const {
  person,
  product,
  getTotalPrice,
  deleteNonConfigurable,
  bankAccount,
  otherAccount,
  testObject,
  createImmutableObject,
  observeObject,
  observedPerson,
  deepCloneObject,
  obj1,
  obj2,
  validateObject,
  schema,
  obj,
  personCopy,
} = require("./functions.js");

describe("Testing functions", () => {
  describe("Task 1", () => {
    it("should return an object with updated info", () => {
      expect(person.firstName).toBe("John");
      person.updateInfo({ age: 40, email: "new.email@gmail.com" });
      expect(person.age).toBe(40);
      expect(person.email).toBe("new.email@gmail.com");
    });
  });
  describe("Task 2", () => {
    it("should return the total price of the product", () => {
      expect(product.name).toBe("Laptop");
      product.name = "Phone";
      expect(product.name).toBe("Phone");
      expect(getTotalPrice(product)).toBe(5000);
      deleteNonConfigurable(product, "name");
      expect(product.name).toBeUndefined();
    });
  });
  describe("Task 3", () => {
    it("should return the total balance of the bank account", () => {
      expect(bankAccount.formattedPrice).toBe("$1000");
      bankAccount.balance = 500;
      expect(bankAccount.formattedPrice).toBe("$500");
      bankAccount.balance = 1000;
      expect(bankAccount.balance).toBe(1000);
      expect(otherAccount.balance).toBe(2000);
      bankAccount.transfer(otherAccount, 500);
      expect(bankAccount.balance).toBe(500);
      expect(otherAccount.balance).toBe(2500);
    });
  });
  describe("Task 4", () => {
    it("Create immutable object", () => {
      const immutableObject = createImmutableObject(testObject);
      immutableObject.name = "Alice";
      immutableObject.address.city = "Gyumri";
      immutableObject.friends[0].name = "Bob";
      expect(immutableObject.name).toBe("John");
      expect(immutableObject.address.city).toBe("Yerevan");
      expect(immutableObject.friends[0].name).toBe("Alice");
    });
    it("Immutable person object", () => {
      const immutablePerson = createImmutableObject(personCopy);
      immutablePerson.firstName = "Alice";
      immutablePerson.lastName = "Smith";
      immutablePerson.age = 40;
      expect(immutablePerson.firstName).toBe("John");
      expect(immutablePerson.lastName).toBe("Doe");
      expect(immutablePerson.age).toBe(30);
    });
  });
  describe("Task 5", () => {
    it("Observe object", () => {
      const consoleSpy = jest.spyOn(console, "log");
      observedPerson.firstName;
      observedPerson.firstName = "Alice";
      expect(consoleSpy).toHaveBeenCalledWith(
        `Property "firstName" was get on the object.`
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        `Property "firstName" was set on the object.`
      );
    });
  });
  describe("Task 6", () => {
    it("Deep cloned object", () => {
      const deepClone = deepCloneObject(obj1);
      deepClone.b.c = 5;
      deepClone.e[0].f.h = 7;
      expect(deepClone).not.toBe(obj1);
      expect(deepClone.b.c).toBe(5);
      expect(deepClone.e[0].f.h).toBe(7);
      expect(obj1.b.c).toBe(2);
      expect(obj1.e[0].f.h).toBe(5);
    });
  });
  describe("Task 7", () => {
    it("Validate object - wrong type", () => {
      const obj = {
        name: 100,
        age: 30,
        email: "gamer@gmail.com",
      };
      expect(validateObject(obj, schema)).toBe(false);
    });
    it("Validate object - missing property", () => {
      const obj = {
        name: "John",
        age: 30,
      };
      expect(validateObject(obj, schema)).toBe(false);
    });
    it("Validate object - additional validation rule", () => {
      const obj = {
        name: "John",
        age: 30,
        email: "game.gmail.com",
      };
      expect(validateObject(obj, schema)).toBe(false);
    });
    it("Validate object - correct object", () => {
      const obj = {
        name: "John",
        age: 30,
        email: "gamer@gmail.com",
      };
      expect(validateObject(obj, schema)).toBe(true);
    });
  });
});
