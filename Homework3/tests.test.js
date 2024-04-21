const {
  Product,
  calculateDiscountedPrice,
  calculateTotalPrice,
} = require("./PureFunctions.js");
const {
  Person,
  Student,
  getFullName,
  filterUniqueWords,
  getAverageGrade,
} = require("./FunctionCompositions.js");
const { createCounter, repeatFunction } = require("./HigherOrderComponents.js");
const { calculateFactorial, power } = require("./Recursion.js");
const { lazyMap, fibonacciGenerator } = require("./LazyEvaluation.js");

describe("Pure Functions", () => {
  describe("CalculateDiscountedPrice", () => {
    it("Normal case", () => {
      const productsArray = [
        new Product("apple", 100),
        new Product("banana", 200),
      ];
      const discount = 0.1;
      const value = calculateDiscountedPrice(productsArray, discount);
      expect(value).toEqual([
        { name: "apple", price: 90 },
        { name: "banana", price: 180 },
      ]);
      expect(value).not.toBe(productsArray);
      expect(productsArray).toEqual([
        new Product("apple", 100),
        new Product("banana", 200),
      ]);
      expect(discount).toEqual(0.1);
    });

    it("Empty array", () => {
      const value = calculateDiscountedPrice([], []);
      expect(value).toEqual([]);
    });

    it("One product", () => {
      const productsArray = [new Product("apple", 100)];
      const discount = 0.2;
      const value = calculateDiscountedPrice(productsArray, discount);
      expect(value).toEqual([{ name: "apple", price: 80 }]);
    });

    it("One product with 0 discount", () => {
      const productsArray = [new Product("apple", 100)];
      const discount = 0;
      const value = calculateDiscountedPrice(productsArray, discount);
      expect(value).toEqual([{ name: "apple", price: 100 }]);
      expect(value).not.toBe(productsArray);
    });
  });

  describe("CalculateTotalPrice", () => {
    it("Normal case", () => {
      const productsArray = [
        new Product("apple", 100),
        new Product("banana", 200),
      ];
      const value = calculateTotalPrice(productsArray);
      expect(value).toEqual(300);
      expect(productsArray).toEqual([
        new Product("apple", 100),
        new Product("banana", 200),
      ]);
    });

    it("Empty array", () => {
      const value = calculateTotalPrice([]);
      expect(value).toEqual(0);
    });

    it("One product", () => {
      const productsArray = [new Product("apple", 100)];
      const value = calculateTotalPrice(productsArray);
      expect(value).toEqual(100);
      expect(productsArray).toEqual([new Product("apple", 100)]);
    });
  });
});

describe("Function Compositions", () => {
  describe("GetFullName", () => {
    it("Normal case", () => {
      const person = new Person("John", "Doe");
      const value = getFullName(person);
      expect(value).toEqual("John Doe");
      expect(value).not.toBe(person);
      expect(person).toEqual(new Person("John", "Doe"));
    });

    it("Empty name", () => {
      const person = new Person("", "");
      expect(() => {
        getFullName(person);
      }).toThrow();
    });

    it("Empty first name", () => {
      const person = new Person("", "Doe");
      expect(() => {
        getFullName(person);
      }).toThrow();
    });

    it("Empty last name", () => {
      const person = new Person("John", "");
      expect(() => {
        getFullName(person);
      }).toThrow();
    });

    it("Invalid input", () => {
      const person = new Person("John", 123);
      expect(() => {
        getFullName(person);
      }).toThrow();

      expect(() => {
        getFullName(["Kacper", "Kowalski"]);
      }).toThrow();

      expect(() => {
        getFullName("Kacper Kowalski");
      }).toThrow();
    });
  });

  describe("FilterUniqueWords", () => {
    it("Normal case", () => {
      const value = filterUniqueWords("hello world hello");
      expect(value).toEqual(["hello", "world"]);
    });

    it("Empty string", () => {
      const value = filterUniqueWords("");
      expect(value).toEqual([]);
    });

    it("One word", () => {
      const value = filterUniqueWords("hello");
      expect(value).toEqual(["hello"]);
    });

    it("No unique words", () => {
      const value = filterUniqueWords("hello hello");
      expect(value).toEqual(["hello"]);
    });

    it("Special characters", () => {
      const value = filterUniqueWords("hello, world hello");
      expect(value).toEqual(["hello,", "world", "hello"]);
    });
  });

  describe("GetAverageGrade", () => {
    it("Normal case", () => {
      const student1 = new Student("John", "Doe", [5, 4, 3, 2, 1]);
      const student2 = new Student("Doe", "Joe", [1, 2, 3]);
      const students = [student1, student2];
      const value = getAverageGrade(students);
      expect(value).toEqual(2.5);
      expect(students).toEqual([student1, student2]);
    });

    it("Empty students", () => {
      const value = getAverageGrade([]);
      expect(value).toEqual(NaN);
    });

    it("One student", () => {
      const student = new Student("John", "Doe", [5, 4, 3]);
      const value = getAverageGrade([student]);
      expect(value).toEqual(4);
    });

    it("Empty grades", () => {
      const student = new Student("John", "Doe", []);
      const value = getAverageGrade([student]);
      expect(value).toEqual(NaN);
    });

    it("One grade", () => {
      const student = new Student("John", "Doe", [5]);
      const value = getAverageGrade([student]);
      expect(value).toEqual(5);
    });
  });
});

describe("Higher Order Components", () => {
  describe("CreateCounter", () => {
    it("Normal case", () => {
      const counter = createCounter();
      expect(counter()).toEqual(1);
      expect(counter()).toEqual(2);
      expect(counter()).toEqual(3);
    });

    it("Multiple counters", () => {
      const counter1 = createCounter();
      const counter2 = createCounter();
      expect(counter1()).toEqual(1);
      expect(counter2()).toEqual(1);
      expect(counter1()).toEqual(2);
      expect(counter2()).toEqual(2);
    });
  });

  describe("RepeatFunction", () => {
    it("Normal case", () => {
      let counter = 0;
      repeatFunction(() => {
        counter++;
      }, 5)();
      expect(counter).toEqual(5);
    });

    it("Zero repetitions", () => {
      let counter = 0;
      repeatFunction(() => {
        counter++;
      }, 0)();
      expect(counter).toEqual(0);
    });

    it("With CreateCounter usage", () => {
      const counter = createCounter();
      repeatFunction(counter, 3)();
      expect(counter()).toEqual(4);
    });

    it("Negative number", () => {
      let counter = 0;
      expect(() => {
        repeatFunction(() => {
          counter++;
        }, -1)();
      }).toThrowError(
        "numberOfRepetitions should be greater than or equal to 0"
      );
    });

    it("String", () => {
      let counter = 0;
      expect(() => {
        repeatFunction(() => {
          counter++;
        }, "3")();
      }).toThrowError(
        "numberOfRepetitions should be greater than or equal to 0"
      );
    });
  });
});

describe("Recursion", () => {
  describe("CalculateFactorial", () => {
    it("Normal case", () => {
      const value = calculateFactorial(5);
      expect(value).toEqual(120);
    });

    it("Zero", () => {
      const value = calculateFactorial(0);
      expect(value).toEqual(1);
    });

    it("One", () => {
      const value = calculateFactorial(1);
      expect(value).toEqual(1);
    });

    it("Large number", () => {
      const value = calculateFactorial(20);
      expect(value).toEqual(2432902008176640000);
    });

    it("Very large number", () => {
      const value = calculateFactorial(1000);
      expect(value).toEqual(Infinity);
    });
  });

  describe("Power", () => {
    it("Normal case", () => {
      const value = power(2, 3);
      expect(value).toEqual(8);
    });

    it("Zero power", () => {
      const value = power(2, 0);
      expect(value).toEqual(1);
    });

    it("Zero base", () => {
      const value = power(0, 3);
      expect(value).toEqual(0);
    });

    it("One power", () => {
      const value = power(2, 1);
      expect(value).toEqual(2);
    });
  });
});

describe("Lazy Evaluation", () => {
  describe("LazyMap", () => {
    it("Normal case", () => {
      const array = [1, 2, 3];
      const value = lazyMap(array, (x) => x * 2);
      expect(value.next()).toEqual({ value: 2, done: false });
      expect(value.next()).toEqual({ value: 4, done: false });
      expect(value.next()).toEqual({ value: 6, done: false });
      expect(value.next()).toEqual({ done: true });
    });

    it("Empty array", () => {
      const array = [];
      const value = lazyMap(array, (x) => x * 2);
      expect(value.next()).toEqual({ done: true });
    });

    it("One element", () => {
      const array = [1];
      const value = lazyMap(array, (x) => x * 2);
      expect(value.next()).toEqual({ value: 2, done: false });
      expect(value.next()).toEqual({ done: true });
    });
  });

  describe("FibonacciGenerator", () => {
    it("Normal case", () => {
      const value = fibonacciGenerator();
      expect(value.next()).toEqual(0);
      expect(value.next()).toEqual(1);
      expect(value.next()).toEqual(1);
      expect(value.next()).toEqual(2);
      expect(value.next()).toEqual(3);
      expect(value.next()).toEqual(5);
    });

    it("Zero", () => {
      const value = fibonacciGenerator();
      expect(value.next()).toEqual(0);
    });

    it("One", () => {
      const value = fibonacciGenerator();
      expect(value.next()).toEqual(0);
      expect(value.next()).toEqual(1);
    });

    it("Two", () => {
      const value = fibonacciGenerator();
      expect(value.next()).toEqual(0);
      expect(value.next()).toEqual(1);
      expect(value.next()).toEqual(1);
    });
  });
});
