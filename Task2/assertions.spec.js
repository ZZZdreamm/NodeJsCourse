const DataTransform = require("./DataTransform");

class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

class UserDTO {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class NotAUser {
  constructor(field1, field2, field3) {
    this.field1 = field1;
    this.field2 = field2;
    this.field3 = field3;
  }
}

describe("DataTransform", () => {
  describe("addValues", () => {
    it("should correctly add two numbers", () => {
      expect(DataTransform.addValues(5, 10)).toEqual(15);
    });

    it("should concatenate two strings", () => {
      expect(DataTransform.addValues("Hello", " World")).toEqual("Hello World");
    });

    it("should concatenate a number and a string", () => {
      expect(DataTransform.addValues(5, " World")).toEqual("5 World");
    });
    it("should add true and false and return true", () => {
      expect(DataTransform.addValues(true, false)).toEqual(true);
    });

    it("add false and false and return false", () => {
      expect(DataTransform.addValues(false, false)).toEqual(false);
    });

    it("should add two bigints", () => {
      expect(DataTransform.addValues(1n, 2n)).toEqual(3n);
    });

    it("concatenate two arrays", () => {
      expect(DataTransform.addValues([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
    });

    it("concatenate an array and a not array", () => {
      expect(DataTransform.addValues([1, 2], 3)).toEqual([1, 2, 3]);
      expect(DataTransform.addValues([1, 2], "str")).toEqual([1, 2, "str"]);
    });
  });

  describe("stringifyValue", () => {
    it("should stringify an object", () => {
      expect(DataTransform.stringifyValue({ a: 1, b: 2 })).toEqual(
        '{"a":1,"b":2}'
      );
    });

    it("should stringify an object with nested array", () => {
      expect(DataTransform.stringifyValue({ a: ["1", 2, "3"], b: 5 })).toEqual(
        '{"a":["1",2,"3"],"b":5}'
      );
    });

    it("should stringify an array", () => {
      expect(DataTransform.stringifyValue([1, 2, 3])).toEqual("[1,2,3]");
    });

    it("should stringify an empty array", () => {
      expect(DataTransform.stringifyValue([])).toEqual("[]");
    });

    it("should stringify an array with an object", () => {
      expect(DataTransform.stringifyValue([{ a: "1" }])).toEqual('[{"a":"1"}]');
    });

    it("should stringify a number", () => {
      expect(DataTransform.stringifyValue(123)).toEqual("123");
    });

    it("should stringify a boolean", () => {
      expect(DataTransform.stringifyValue(true)).toEqual("true");
      expect(DataTransform.stringifyValue(false)).toEqual("false");
    });

    it("should stringify null", () => {
      expect(DataTransform.stringifyValue(null)).toEqual("null");
    });

    it("should stringify undefined", () => {
      expect(DataTransform.stringifyValue(undefined)).toEqual("undefined");
    });
  });

  describe("invertBoolean", () => {
    it("should invert a boolean value", () => {
      expect(DataTransform.invertBoolean(true)).toEqual(false);
      expect(DataTransform.invertBoolean(false)).toEqual(true);
    });

    it("should throw an error when trying to invert a string", () => {
      expect(() => {
        DataTransform.invertBoolean("true");
      }).toThrow();
    });
  });

  describe("convertToNumber", () => {
    it("should convert a string to a number", () => {
      expect(DataTransform.convertToNumber("123")).toEqual(123);
    });

    it("should convert a boolean to a number", () => {
      expect(DataTransform.convertToNumber(true)).toEqual(1);
      expect(DataTransform.convertToNumber(false)).toEqual(0);
    });

    it("should convert a string with floating point to a number", () => {
      expect(DataTransform.convertToNumber("123.45")).toEqual(123.45);
    });

    it("should throw an error when trying to convert a non-numeric string", () => {
      expect(() => {
        DataTransform.convertToNumber("abc");
      }).toThrow();
    });

    it('should convert string "0123" to number 123', () => {
      expect(DataTransform.convertToNumber("0123")).toEqual(123);
    });
  });

  describe("coerceToType", () => {
    it("should coerce a string to a boolean", () => {
      expect(DataTransform.coerceToType("true", "boolean")).toEqual(true);
    });

    it("should coerce a number to a string", () => {
      expect(DataTransform.coerceToType(123, "string")).toEqual("123");
    });

    it("should coerce a string to a number", () => {
      expect(DataTransform.coerceToType("123", "number")).toEqual(123);
    });

    it("should throw an error when trying to coerce a non-numeric string to a number", () => {
      expect(() => {
        DataTransform.coerceToType("abc", "number");
      }).toThrow();
    });

    it("should coerce a string to an array", () => {
      expect(DataTransform.coerceToType("abc", "array")).toEqual([
        "a",
        "b",
        "c",
      ]);
    });

    it("error because string converted to object is incorrect", () => {
      expect(() => {
        DataTransform.coerceToType("abc", "object");
      }).toThrow();
    });

    it("should coerce a string to an object", () => {
      expect(DataTransform.coerceToType('{"a":1,"b":2}', "object")).toEqual({
        a: 1,
        b: 2,
      });
    });

    it("should coerce a string to a boolean", () => {
      expect(DataTransform.coerceToType("abc", "boolean")).toEqual(true);
    });

    it("passing null to coerceType should throw error", () => {
      expect(() => {
        DataTransform.coerceToType(null, "boolean");
      }).toThrow();
    });

    it("passing undefined to coerceType should throw error", () => {
      expect(() => {
        DataTransform.coerceToType(undefined, "boolean");
      }).toThrow();
    });
  });

  describe("convertToObject", () => {
    it("should convert an object to a string", () => {
      expect(DataTransform.coerceToType({ a: 1, b: 2 }, "string")).toEqual(
        '{"a":1,"b":2}'
      );
    });

    it("should convert an object to an array", () => {
      expect(DataTransform.coerceToType({ a: 1, b: 2 }, "array")).toEqual([
        1, 2,
      ]);
    });

    it("should throw an error when trying to convert an object to a number", () => {
      expect(() => {
        DataTransform.coerceToType({ a: 1, b: 2 }, "number");
      }).toThrow();
    });
  });

  describe("mapFields", () => {
    it("should map fields of a basic class to converted class", () => {
      const basicClass = new User(1, "John Doe", "john@example.com");
      const convertedClass = UserDTO;
      const mappedObject = DataTransform._mapFields(basicClass, convertedClass);
      expect(mappedObject).toBeInstanceOf(UserDTO);
      expect(mappedObject.id).toEqual(1);
      expect(mappedObject.name).toEqual("John Doe");
    });

    it("should map fields of a converted class to basic class", () => {
      const basicClass = new UserDTO(1, "John Doe");
      const convertedClass = User;
      const mappedObject = DataTransform._mapFields(basicClass, convertedClass);
      expect(mappedObject).toBeInstanceOf(User);
      expect(mappedObject.id).toEqual(1);
      expect(mappedObject.name).toEqual("John Doe");
      expect(mappedObject.email).toBeUndefined();
    });

    it("should map fields even if there are extra fields in basic class", () => {
      const basicClass = new NotAUser("field1", "field2", "field3");
      const convertedClass = UserDTO;
      const mappedObject = DataTransform._mapFields(basicClass, convertedClass);
      expect(mappedObject).toEqual({});
    });

    it("should return an empty object if basic class is empty", () => {
      const basicClass = {};
      const convertedClass = UserDTO;
      const mappedObject = DataTransform._mapFields(basicClass, convertedClass);
      expect(mappedObject).toEqual({});
    });
  });
});
