const {
  promiseAll,
  promiseAllSettled,
  chainPromises,
  promisify,
} = require("./functions.js");

describe("Homework 7", () => {
  describe("Implement promiseAll function", () => {
    test("Resolved all promises", async () => {
      const promises = [
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3),
      ];
      let allResolved = false;
      let result = [];
      await promiseAll(promises)
        .then((results) => {
          allResolved = true;
          result = results;
        })
        .catch((error) => {
          console.error("At least one promise rejected:", error);
        });
      expect(allResolved).toEqual(true);
      expect(result).toEqual([1, 2, 3]);
    });

    test("At least one promise rejected", async () => {
      const promises = [
        Promise.resolve(1),
        Promise.reject("Error occurred"),
        Promise.resolve(3),
      ];
      let allResolved = false;
      let result = [];
      await promiseAll(promises)
        .then((results) => {
          allResolved = true;
          result = results;
        })
        .catch(() => {});
      expect(allResolved).toEqual(false);
      expect(result).toEqual([]);
    });
  });

  describe("PromiseAllSettled function", () => {
    test("Resolved all promises", async () => {
      const promises = [
        Promise.resolve(1),
        Promise.reject("Error occurred"),
        Promise.resolve(3),
      ];
      let allResolved = false;
      let result = [];
      await promiseAllSettled(promises)
        .then((results) => {
          allResolved = true;
          result = results;
        })
        .catch((error) => {
          console.error("At least one promise rejected:", error);
        });
      expect(allResolved).toEqual(true);
      expect(result).toEqual([
        { status: "fulfilled", value: 1 },
        { status: "rejected", reason: "Error occurred" },
        { status: "fulfilled", value: 3 },
      ]);
    });
  });

  describe("ChainPromises function", () => {
    test("Resolved all promises", async () => {
      function asyncFunction1() {
        return Promise.resolve("Result from asyncFunction1");
      }

      function asyncFunction2(data) {
        return Promise.resolve(data + " - Result from asyncFunction2");
      }

      function asyncFunction3(data) {
        return Promise.resolve(data + " - Result from asyncFunction3");
      }

      const functionsArray = [asyncFunction1, asyncFunction2, asyncFunction3];
      let endResult = "";
      await chainPromises(functionsArray)
        .then((result) => {
          endResult = result;
        })
        .catch((error) => {
          console.error("Chained promise error:", error);
        });

      expect(endResult).toEqual(
        "Result from asyncFunction1 - Result from asyncFunction2 - Result from asyncFunction3"
      );
    });

    test("At least one promise rejected", async () => {
      const functions = [
        (result) => Promise.resolve(result + 1),
        (result) => Promise.reject("Error occurred"),
        (result) => Promise.resolve(result + 3),
      ];
      let result = null;
      await chainPromises(functions)
        .then((finalResult) => {
          result = finalResult;
        })
        .catch(() => {});
      expect(result).toEqual(null);
    });
  });

  describe("Promisify function", () => {
    test("Resolved all promises", async () => {
      function callbackStyleFunction(value, callback) {
        setTimeout(() => {
          if (value > 0) {
            callback(null, value * 2);
          } else {
            callback("Invalid value", null);
          }
        }, 1000);
      }

      const promisedFunction = promisify(callbackStyleFunction);

      let resultValue = null;
      await promisedFunction(3)
        .then((result) => {
          resultValue = result;
        })
        .catch((error) => {
          console.error("Promised function error:", error);
        });

      expect(resultValue).toEqual(6);
    });
  });
});
