function createCounter() {
  let count = 0;

  function counter() {
    count++;
    return count;
  }

  return counter;
}

function repeatFunction(func, numberOfRepetitions) {
  return function () {
    let i = 0;
    while (i !== numberOfRepetitions) {
      func();
      i++;
    }
  };
}

let counter = 0;
repeatFunction(() => counter++, 3)();

module.exports = {
  createCounter,
  repeatFunction,
};
