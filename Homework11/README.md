myJSONParse function flow:
1. Tokenize all the sequences of the input string and punctuation, removing all the whitespaces.
2. Parse all of the tokens into values and objects:
- If the token is a number, convert it to a number.
- If the token is a boolean, convert it to a boolean.
- If the token is null, convert it to null.
- If the token is string remove strins quotas and replace escape characters with the actual characters.
- If the token is punctuation, check if it is object or array and parse it accordingly.
3. If passed string is not a valid JSON, raise an error.
4. If reviver function is passed, call it on every parsed value and object:
- if the value after reviver is undefined, delete it from the object.
5. Return the parsed JSON object.

My reflections:
- handling all error situations was very tricky, because there are many possible situations that can go wrong.
I have also not handled every single possible error (for example, no digit after "-" sign should be specially handled but it isn't, just unexpected token error), but I have handled the most common and important ones.
- parsing unicode and other escape characters was also tricky, because I had to handle them separately and at beginning I tried to handle all of them together
- implementing regular expressions was mostly easy, but I had to test them a lot to make sure they work correctly
