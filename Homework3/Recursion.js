function calculateFactorial(n, accumulator = 1) {
  if (n === 0) {
    return accumulator;
  }
  return calculateFactorial(n - 1, n * accumulator);
}


function power(base, exponent, accumulator = 1){
    if(exponent === 0){
        return accumulator;
    }
    return power(base, exponent - 1, base * accumulator);
}


module.exports = {
    calculateFactorial,
    power
};
