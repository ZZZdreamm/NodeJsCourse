const DataTransform = require('./DataTransform');

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

try {
    console.log("---------------------- Add Values");
    console.log("Result of adding 5 and 10:", DataTransform.addValues(5, 10)); // Output: 15
    console.log("Result of adding 'Hello' and ' World':", DataTransform.addValues('Hello', ' World')); // Output: 'Hello World'
    console.log("Result of adding 5 and ' World':", DataTransform.addValues(5, ' World')); // Output: '5 World'
    console.log("Trying to add boolean values:", DataTransform.addValues(true, false)); // Throws error

    console.log("---------------------- Stringify Value");
    console.log("Stringify an object:", DataTransform.stringifyValue({ a: 1, b: 2 })); // Output: '{"a":1,"b":2}'
    console.log("Stringify an object with nested array:", DataTransform.stringifyValue({ a: ['1', 2, '3'], b: 5 })); // Output: '{"a":["1",2,"3"],"b":5}'
    console.log("Stringify an array:", DataTransform.stringifyValue([1, 2, 3])); // Output: '[1,2,3]'
    console.log("Stringify an empty array:", DataTransform.stringifyValue([])); // Output: '[]'
    console.log("Stringify an array with an object:", DataTransform.stringifyValue([{ a: '1' }])); // Output: '[{"a":"1"}]'
    console.log("Stringify a number:", DataTransform.stringifyValue(123)); // Output: '123'
    console.log("Stringify a boolean:", DataTransform.stringifyValue(true)); // Output: 'true'
    console.log("Stringify null:", DataTransform.stringifyValue(null)); // Output: 'null'
    console.log("Stringify undefined:", DataTransform.stringifyValue(undefined)); // Output: 'undefined'

    console.log("---------------------- Invert Boolean");
    console.log("Invert a boolean value:", DataTransform.invertBoolean(true)); // Output: false
    console.log("Invert a boolean value:", DataTransform.invertBoolean(false)); // Output: true
    console.log("Trying to invert a string:", DataTransform.invertBoolean('true')); // Throws error

    console.log("---------------------- Convert To Number");
    console.log("Convert a string to a number:", DataTransform.convertToNumber('123')); // Output: 123
    console.log("Convert a boolean to a number:", DataTransform.convertToNumber(true)); // Output: 1
    console.log("Convert a string with floating point to a number:", DataTransform.convertToNumber('123.45')); // Output: 123.45
    console.log("Trying to convert a non-numeric string:", DataTransform.convertToNumber('abc')); // Throws error
    console.log("Convert string '123' to a number:", DataTransform.convertToNumber('123')); // Output: 123
    console.log("Convert string '0123' to a number:", DataTransform.convertToNumber('0123')); // Output: 123
    console.log("Trying to convert a non-numeric string 'abc' to a number:", DataTransform.convertToNumber('abc')); // Throws error

    console.log("---------------------- Coerce To Type");
    console.log("Coerce a string to a boolean:", DataTransform.coerceToType('true', 'boolean')); // Output: true
    console.log("Coerce a number to a string:", DataTransform.coerceToType(123, 'string')); // Output: '123'
    console.log("Coerce a string to a number:", DataTransform.coerceToType('123', 'number')); // Output: 123
    console.log("Trying to coerce a non-numeric string to a number:", DataTransform.coerceToType('abc', 'number')); // Throws error
    console.log("Coerce a string to an array:", DataTransform.coerceToType('abc', 'array')); // Output: ['a', 'b', 'c']
    console.log("Coerce a string to an object:", DataTransform.coerceToType('abc', 'object')); // Output: { '0': 'a', '1': 'b', '2': 'c' }
    console.log("Coerce a string to a boolean:", DataTransform.coerceToType('abc', 'boolean')); // Output: '{"a":1,"b":2}'

    console.log("---------------------- Convert Object to Another Type");
    console.log("Convert an object to a string:", DataTransform.coerceToType({ a: 1, b: 2 }, 'string')); // Output: '{"a":1,"b":2}'
    console.log("Convert an object to an array:", DataTransform.coerceToType({ a: 1, b: 2 }, 'array')); // Output: [1, 2]
    console.log("Trying to convert an object to a number:", DataTransform.coerceToType({ a: 1, b: 2 }, 'number')); // Throws error

    console.log("---------------------- Convert Class to Another Class")
    const user = new User(1, 'John Doe', 'john@gmail.com');
    const userDto = new UserDTO(1, 'John Doe');
    console.log("Convert a User object to a UserDTO object:", DataTransform.coerceToType(user, UserDTO));
    console.log("Convert a UserDTO object to a User object:", DataTransform.coerceToType(userDto, User));
    console.log("Trying to convert a User object to a class without matching fields:", DataTransform.coerceToType(user, NotAUser));

  } catch (error) {
    console.error(error.message);
  }




