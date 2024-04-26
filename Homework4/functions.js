console.log("Task 1");

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  email: "john.doe@example.com",
};

Object.defineProperties(person, {
  firstName: {
    writable: false,
  },
  lastName: {
    writable: false,
  },
  age: {
    writable: false,
  },
  email: {
    writable: false,
  },
});

person.updateInfo = function (newInfo) {
  for (let key in newInfo) {
    if (this.hasOwnProperty(key)) {
      Object.defineProperty(this, key, {
        value: newInfo[key],
        writable: false,
      });
    }
  }
};

Object.defineProperty(person, "address", {
  value: {},
  enumerable: false,
  configurable: false,
});

// console.log(person);
// person.updateInfo({ age: 40, email: "new.email@gmail.com" });
// console.log(person);

// Task 2
console.log("\nTask 2");

const product = {
  name: "Laptop",
};

Object.defineProperties(product, {
  price: {
    value: 1000,
    writable: false,
    enumerable: false,
  },
  quantity: {
    value: 5,
    writable: false,
    enumerable: false,
  },
});

function getTotalPrice(product) {
  const price = Object.getOwnPropertyDescriptor(product, "price");
  const quantity = Object.getOwnPropertyDescriptor(product, "quantity");
  return price.value * quantity.value;
}

function deleteNonConfigurable(product, propertyName) {
  if (Object.getOwnPropertyDescriptor(product, propertyName).configurable) {
    delete product[propertyName];
  } else {
    throw new Error("Property is not configurable");
  }
}

// console.log(product);
// product.name = "Desktop";
// console.log(product);
// console.log(getTotalPrice(product));
// deleteNonConfigurable(product, "name");
// console.log(product);

/// Task 3
console.log("\nTask 3");

// I don't know if using classes was allowed in this task
// class BankAccount {
//     constructor(balance = 1000) {
//         this.balance = balance;
//     }
//     get formattedPrice() {
//         return `$${this.balance}`;
//     }

//     set formattedPrice(value) {
//         this.balance = value;
//     }

//     transfer(otherAccount, amount) {
//         if (this.balance >= amount) {
//             this.balance -= amount;
//             otherAccount.balance += amount;
//         } else {
//             throw new Error("Not enough balance");
//         }
//     }
// }

// const bankAccount = new BankAccount(1000);

const bankAccount = {
  balance: 1000,

  get formattedPrice() {
    return `$${this.balance}`;
  },

  set formattedPrice(value) {
    this.balance = value;
  },

  transfer: function (otherAccount, amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      otherAccount.balance += amount;
    } else {
      throw new Error("Not enough balance");
    }
  },
};

const otherAccount = {
  balance: 2000,
};

otherAccount.__proto__ = bankAccount;

// console.log(bankAccount.formattedPrice);
// bankAccount.formattedPrice = 2000;
// console.log(bankAccount.formattedPrice);
// bankAccount.transfer(otherAccount, 500);

// console.log(bankAccount.balance);
// console.log(otherAccount.balance);
// console.log(bankAccount.formattedPrice);
// console.log(otherAccount.formattedPrice);

/// Task 4
console.log("\nTask 4");

const testObject = {
  name: "John",
  age: 30,
  address: {
    city: "Yerevan",
    street: "Teryan",
  },
  friends: [
    {
      name: "Alice",
      age: 25,
    },
    {
      name: "Bob",
      age: 27,
    },
  ],
};

function createImmutableObject(obj) {
  function createImmutable(obj) {
    if (Array.isArray(obj)) {
      return obj.map((item) => createImmutable(item));
    }

    if (obj && typeof obj === "object") {
      const immutableObj = {};

      Object.keys(obj).forEach((key) => {
        immutableObj[key] = createImmutable(obj[key]);
        Object.defineProperty(immutableObj, key, {
          value: immutableObj[key],
          writable: false,
        });
      });

      return immutableObj;
    }

    return obj;
  }

  return createImmutable(obj);
}

const personCopy = { ...person };
// const immutablePerson = createImmutableObject(person);

// createImmutableObject(testObject);
// testObject.name = "Alice";
// console.log(testObject.name);
// testObject.address.city = "Gyumri";
// console.log(testObject.address.city);
// testObject.friends[0].name = "Bob";
// console.log(testObject.friends[0].name);

/// Task 5
console.log("\nTask 5");

function observeObject(obj, callback) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      callback(property, "get");
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      callback(property, "set");
      return Reflect.set(target, property, value, receiver);
    },
  });
}

const observedPerson = observeObject(person, (property, action) => {
  console.log(`Property "${property}" was ${action} on the object.`);
});

// observedPerson.firstName;
// observedPerson.firstName = "Alice";

// Task 6
console.log("\nTask 6");

// I am not sure if usage of sctructuredClone built-in function is allowed
function deepCloneObject(object) {
  const clone = {};
  for (let key in object) {
    if (typeof object[key] === "object" && object[key] !== null) {
      clone[key] = deepCloneObject(object[key]);
    } else {
      clone[key] = object[key];
    }
  }
  return clone;
}

const obj1 = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
  e: [
    {
      f: {
        h: 5,
      },
    },
    {
      g: 5,
    },
  ],
};

// const deepClone = deepCloneObject(obj1);
// deepClone.b.c = 5;
// deepClone.e[0].f.h = 7;
// console.log(obj1);
// console.log(deepClone);

// Task 7
console.log("\nTask 7");

function validateObject(obj, schema) {
  for (let key in schema) {
    // Check if all required properties are present
    if (schema[key].required && !(key in obj)) {
      return false;
    }
    // Check if the type of the property is correct
    if (typeof obj[key] !== schema[key].type) {
      return false;
    }
    // Check for additonal validation rules
    if (schema[key].validate && !schema[key].validate(obj[key])) {
      return false;
    }
  }
  return true;
}

const schema = {
  name: {
    type: "string",
    required: true,
  },
  age: {
    type: "number",
    required: true,
  },
  email: {
    type: "string",
    required: true,
    validate: (value) => value.includes("@"),
  },
};

// console.log(validateObject(obj, schema));
// obj.email = "gamer@gmail.com";
// console.log(validateObject(obj, schema));

module.exports = {
  person,
  product,
  getTotalPrice,
  deleteNonConfigurable,
  bankAccount,
  otherAccount,
  testObject,
  createImmutableObject,
  personCopy,
  observeObject,
  observedPerson,
  deepCloneObject,
  obj1,
  validateObject,
  schema,
};
