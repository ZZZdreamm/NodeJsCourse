const { myJSONParse } = require("./jsonParse.js");

describe("myJSONParse", () => {
  const jsonString = `{
        "person": {
            "name": "Bob",
            "age": 35,
            "contacts": {
                "email": "bob@example.com",
                "phone": "123-456-7890"
            }
        },
            "hobbies": ["Reading", "Hiking", "Gaming"],
            "work": {
                "title": "Software Developer",
                "languages": ["JavaScript", "Python"]
            },
            "quote": "This is a string with an escape character: \\nNew Line",
            "nullValue": null,
            "trueValue": true,
            "falseValue": false
        }`;
  test("Object with all of JSON types", () => {
    const parsedObject = myJSONParse(jsonString);
    expect(parsedObject).toEqual({
      person: {
        name: "Bob",
        age: 35,
        contacts: { email: "bob@example.com", phone: "123-456-7890" },
      },
      hobbies: ["Reading", "Hiking", "Gaming"],
      work: {
        title: "Software Developer",
        languages: ["JavaScript", "Python"],
      },
      quote: "This is a string with an escape character: \nNew Line",
      nullValue: null,
      trueValue: true,
      falseValue: false,
    });
  });

  test("Object with all of JSON types and reviver", () => {
    const reviver = (key, value) => {
      if (typeof value === "string") {
        return value.toUpperCase();
      }
      return value;
    };
    const parsedObject = myJSONParse(jsonString, reviver);
    expect(parsedObject).toEqual({
      person: {
        name: "BOB",
        age: 35,
        contacts: { email: "BOB@EXAMPLE.COM", phone: "123-456-7890" },
      },
      hobbies: ["READING", "HIKING", "GAMING"],
      work: {
        title: "SOFTWARE DEVELOPER",
        languages: ["JAVASCRIPT", "PYTHON"],
      },
      quote: "THIS IS A STRING WITH AN ESCAPE CHARACTER: \nNEW LINE",
      nullValue: null,
      trueValue: true,
      falseValue: false,
    });
  });

  test("should return an object with the correct properties", () => {
    const input = '{"name": "John", "age": 30, "city": "New York"}';
    const output = myJSONParse(input);
    expect(output).toHaveProperty("name");
    expect(output).toHaveProperty("age");
    expect(output).toHaveProperty("city");
    expect(output.name).toBe("John");
    expect(output.age).toBe(30);
    expect(output.city).toBe("New York");
  });

  test("should return an object with the correct nested properties", () => {
    const input =
      '{"name": "John", "age": 30, "city": "New York", "address": {"street": "123 Main St", "zip": 12345}}';
    const output = myJSONParse(input);
    expect(output.address).toHaveProperty("street");
    expect(output.address).toHaveProperty("zip");
    expect(output.address.street).toBe("123 Main St");
    expect(output.address.zip).toBe(12345);
  });

  test("should return an object with the correct array properties", () => {
    const input =
      '{"name": "John", "age": 30, "city": "New York", "hobbies": ["Reading", "Hiking"]}';
    const output = myJSONParse(input);
    expect(output.hobbies).toEqual(["Reading", "Hiking"]);
  });

  test("strings with unicode escape characters", () => {
    const input = '{"name": "\\u0041lice \\u0042ob \\u0043harlie \\u0044avid"}';
    const output = myJSONParse(input);
    expect(output.name).toBe("Alice Bob Charlie David");
  });

  test("No closing bracket for entire string object - throw error", () => {
    const input = '{"name": "John", "age": 30, "city": "New York"';
    expect(() => myJSONParse(input)).toThrow(SyntaxError);
  });

  test("trailing comma left - throw error", () => {
    const input = '{"name": "John", "age": 30, "city": "New York",}';
    expect(() => myJSONParse(input)).toThrow(SyntaxError);
  });

  test("missing character closing string value - throw error", () => {
    const input = '{"name": "John", "age": 30, "city": "New Yo';
    expect(() => myJSONParse(input)).toThrow(SyntaxError);
  });

  test("missing closing bracket after object - throw error", () => {
    const input =
      '{"name": "John", "age": 30, "city": "New York", "address": {"street": "123 Main St", "zip": 12345}';
    expect(() => myJSONParse(input)).toThrow(SyntaxError);
  });

  test("missing comma between properties - throw error", () => {
    const input = '{"name": "John" "age": 30}';
    expect(() => myJSONParse(input)).toThrow(SyntaxError);
  });

  test("missing colon between key and value - throw error", () => {
    const input = '{"name" "John"}';
    expect(() => myJSONParse(input)).toThrow(SyntaxError);
  });

  test("missing closing character for key - throw error", () => {
    const input = '{"name: "John"}';
    expect(() => myJSONParse(input)).toThrow(SyntaxError);
  });

  test("trailing comma at end of array - throw error", () => {
    const input = '{"hobbies": ["Reading", "Hiking",]';
    expect(() => myJSONParse(input)).toThrow(SyntaxError);
  });

  test("missing comma between array elements - throw error", () => {
    const input = '{"hobbies": ["Reading" "Hiking"]}';
    expect(() => myJSONParse(input)).toThrow(SyntaxError);
  });

  test("missing closing bracket for array - throw error", () => {
    const input = '{"hobbies": ["Reading", "Hiking"';
    expect(() => myJSONParse(input)).toThrow(SyntaxError);
  });

});
