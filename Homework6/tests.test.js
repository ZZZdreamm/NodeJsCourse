const {
  localize,
  highlightKeywords,
  multiline,
  debounce,
  throttle,
  curry,
  curryWithOptional,
} = require("./functions.js");
const functions = require("./functions.js");

//
describe("Homework 6", () => {
  describe("Task 1", () => {
    test("Localize 2 words", () => {
      const translations = {
        greeting: {
          en: "Hello",
          fr: "Bonjour",
          es: "Hola",
        },
        name: {
          en: "John",
          fr: "Jean",
          es: "Juan",
        },
      };

      const lang = "fr";
      const greeting = "greeting";
      const name = "name";

      const localizeMessage = localize`${greeting}${name}`;
      expect(localizeMessage(lang, translations)).toBe("BonjourJean");
    });
  });
  describe("Task 2", () => {
    test("Test 1", () => {
      const keywords = ["JavaScript", "template", "tagged"];
      const template =
        "Learn ${0} tagged templates to create custom ${1} literals for ${2} manipulation.";

      const highlighted = highlightKeywords(template, keywords);
      expect(highlighted).toBe(
        "Learn <span class='highlight'>JavaScript</span> tagged templates to create custom <span class='highlight'>template</span> literals for <span class='highlight'>tagged</span> manipulation."
      );
    });
  });

  describe("Task 3", () => {
    test("Three lines with trimmed first and last \n sign", () => {
      const code = multiline`
function add(a, b) {
return a + b;
text
}
        `;
      console.log(code);
      expect(code).toBe(`1 function add(a, b) {
2 return a + b;
3 text
4 }`);
    });
  });

  describe("Task 4", () => {
    test("Debounce 10 times but run function only 1", () => {
      jest.useFakeTimers();

      const spyOnDebouncedSearch = jest.spyOn(functions, "debouncedSearch");

      const debouncedSearchHandler = debounce(functions.debouncedSearch, 10000);

      for (let i = 0; i < 10; i++) {
        debouncedSearchHandler("search query");
      }
      jest.advanceTimersByTime(50000);
      expect(spyOnDebouncedSearch).toHaveBeenCalled();
      expect(spyOnDebouncedSearch.mock.calls.length).toBe(1);
        jest.useRealTimers();
    });
  });
  describe("Task 5", () => {
    test("Throttle only once in 1000 very fast calls", () => {
        const spyOnDebouncedSearch = jest.spyOn(functions, "onScroll");

        const throttledSearchHandler = throttle(functions.onScroll, 1000);

        for (let i = 0; i < 1000; i++) {
            throttledSearchHandler("search query");
        }
        expect(spyOnDebouncedSearch).toHaveBeenCalled();
        expect(spyOnDebouncedSearch.mock.calls.length).toBe(1);

        spyOnDebouncedSearch.mockRestore();
    });
    test("Throttle 11 times in 1000 calls with fast-forwarded timer", () => {
        jest.useFakeTimers();
        const spyOnDebouncedSearch = jest.spyOn(functions, "onScroll");

        const throttledSearchHandler = throttle(functions.onScroll, 1000);

        for (let i = 0; i < 1000; i++) {
            throttledSearchHandler("search query");
            if(i % 100 === 0) {
                jest.advanceTimersByTime(1000);
            }
        }
        expect(spyOnDebouncedSearch).toHaveBeenCalled();
        expect(spyOnDebouncedSearch.mock.calls.length).toBe(11);
        jest.useRealTimers();
        spyOnDebouncedSearch.mockRestore();
    });
  });
  describe("Task 6", () => {
    test("Curry function with 3 arguments", () => {
        function multiply(a, b, c) {
            return a * b * c;
        }

        const curriedMultiply = curry(multiply, 3);

        const step1 = curriedMultiply(2);
        const step2 = step1(3);
        const result = step2(4);

        expect(result).toBe(24);
    });
  });
  describe("Task 6 - optional", () => {
    function multiply(a, b, c) {
        return a * b * c;
    }
    const curriedMultiply2 = curryWithOptional(multiply, 3);
    test("Curry function with special characters for missing parameters ", () => {
        expect(curriedMultiply2(1)(2)(3)).toBe(6);
        expect(curriedMultiply2('_', 2)(3)(1)).toBe(6);
        expect(curriedMultiply2('_', '_', 3)(1)(2)).toBe(6);
        expect(curriedMultiply2('_', 2, '_')('_')(3)(1)).toBe(6);
    });
  });
});
