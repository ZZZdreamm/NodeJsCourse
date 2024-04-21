function createCounter() {
  let count = 0;

  function counter() {
    count++;
    return count;
  }

  return counter;
}

function repeatFunction(func, numberOfRepetitions) {
  if(typeof numberOfRepetitions !== "number" || numberOfRepetitions < 0) {
    throw new Error('numberOfRepetitions should be greater than or equal to 0');
  }
  return function () {
    let i = 0;
    while (i !== numberOfRepetitions) {
      func();
      i++;
    }
  };
}


module.exports = {
  createCounter,
  repeatFunction,
};
