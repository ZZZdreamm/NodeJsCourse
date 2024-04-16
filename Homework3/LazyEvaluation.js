function lazyMap(array, mappingFunction) {
    let index = 0;

    return {
      next: function() {
        if (index < array.length) {
          return {
            value: mappingFunction(array[index++]),
            done: false
          };
        } else {
          return { done: true };
        }
      }
    };
}

function fibonacciGenerator(){
    let a = 0;
    let b = 1;

    return {
        next: function(){
            let c = a;
            a = b;
            b = c + b;
            return c;
        }
    };
}

module.exports = {
  lazyMap,
  fibonacciGenerator
};