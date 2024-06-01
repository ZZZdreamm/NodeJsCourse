function myJSONParse(jsonString, reviver) {
  const tokenPatterns = {
    whitespace: /^\s+/,
    number: /^-?\d+(\.\d+)?([eE][+-]?\d+)?/,
    string: /^"(?:\\u[\da-fA-F]{4}|\\["\\/bfnrt]|[^"\\])*"/,
    boolean: /^(true|false)/,
    null: /^null/,
    punctuation: /^[\[\]\{\}:,]/,
  };

  // Tokenize the input string
  function tokenize(input) {
    let tokens = [];
    while (input.length > 0) {
      let match = null;

      // Check for each token type
      for (let type in tokenPatterns) {
        match = tokenPatterns[type].exec(input);
        if (match) {
          // Skip all of the whitespace tokens
          if (type !== "whitespace") {
            tokens.push({ type, value: match[0] });
          }
          input = input.slice(match[0].length);
          break;
        }
      }

      if (!match) {
        throw new SyntaxError(
          `Unexpected token in JSON at position ${input.length}`
        );
      }
    }
    return tokens;
  }

  function parse(tokens) {
    function parseValue() {
      let token = tokens.shift();
      switch (token.type) {
        case "number":
          return parseFloat(token.value);
        case "string":
          return parseString(token.value);
        case "boolean":
          return token.value === "true";
        case "null":
          return null;
        case "punctuation":
          if (token.value === "[") return parseArray();
          if (token.value === "{") return parseObject();
        default:
          throw new SyntaxError(`Unexpected token: ${token.value}`);
      }
    }

    function parseString(string) {
      string = string.slice(1, -1);

      // Replace Unicode escape sequences with their corresponding characters
      string = string.replace(/\\u([\da-fA-F]{4})/g, (match, codePoint) => {
        return String.fromCharCode(parseInt(codePoint, 16));
      });

      // Handle other escape sequences
      string = string.replace(/\\(["\\/bfnrt])/g, (match, char) => {
        switch (char) {
          case '"':
            return '"';
          case "\\":
            return "\\";
          case "/":
            return "/";
          case "b":
            return "\b";
          case "f":
            return "\f";
          case "n":
            return "\n";
          case "r":
            return "\r";
          case "t":
            return "\t";
          default:
            return char;
        }
      });

      return string;
    }

    function parseArray() {
      let array = [];
      while (tokens[0].value !== "]") {
        array.push(parseValue());
        if (
          tokens[0] === undefined ||
          (tokens[0].value !== "," && tokens[0].value !== "]")
        )
          throw new SyntaxError("Missing comma between values");
        if (tokens[0].value === ",") {
          tokens.shift(); // Consume comma
          if (tokens[0] === undefined || tokens[0].value === "]")
            throw new SyntaxError("Trailing comma in array");
        }
      }
      tokens.shift(); // Consume closing bracket
      return array;
    }

    function parseObject() {
      let object = {};
      while (tokens[0].value !== "}") {
        let key = parseValue();
        if (typeof key !== "string")
          throw new SyntaxError("Object keys must be strings");
        if (tokens[0].value !== ":")
          throw new SyntaxError("Missing colon where expected");
        tokens.shift(); // Consume colon
        let value = parseValue();
        object[key] = value;
        if (tokens[0] === undefined)
          throw new SyntaxError("Unexpected end of JSON input");
        if (tokens[0].value !== "," && tokens[0].value !== "}")
          throw new SyntaxError("Missing comma between values");
        if (tokens[0].value === ",") {
          tokens.shift(); // Consume comma
          if (tokens[0].value === "}")
            throw new SyntaxError("Trailing comma in object");
        }
      }
      tokens.shift(); // Consume closing brace
      return object;
    }

    return parseValue();
  }

  function revive(object, reviver) {
    if (typeof reviver === "function") {
      const walk = (holder, key) => {
        let value = holder[key];
        if (value && typeof value === "object") {
          for (let k in value) {
            let v = walk(value, k);
            if (v === undefined) {
              delete value[k];
            } else {
              value[k] = v;
            }
          }
        }
        return reviver.call(holder, key, value);
      };
      result = walk({ "": object }, "");
    }
    return result;
  }

  let tokens = tokenize(jsonString);
  let result = parse(tokens);
  if (reviver) {
    result = revive(result, reviver);
  }

  return result;
}

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

const reviver = (key, value) => {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value;
};
// const parsedObject = myJSONParse(jsonString, reviver);
// console.log(parsedObject);

module.exports = { myJSONParse };
