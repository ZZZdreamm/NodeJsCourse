function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let counter = 0;
    promises.forEach((promise, index) => {
      promise
        .then((result) => {
          results[index] = result;
          counter++;
          if (counter === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

function promiseAllSettled(promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let counter = 0;
    promises.forEach(async (promise, index) => {
      await promise
        .then((result) => {
          results[index] = { status: "fulfilled", value: result };
        })
        .catch((error) => {
          results[index] = { status: "rejected", reason: error };
        });
      counter++;
      if (counter === promises.length) {
        resolve(results);
      }
    });
  });
}

// const promises = [
//   Promise.resolve(1),
//   Promise.reject("Error occurred"),
//   Promise.resolve(3),
// ];

// promiseAllSettled(promises).then((results) => {
//   console.log("All promises settled:", results);
// });

function chainPromises(functions) {
  let resultPromise = Promise.resolve();

  for (const func of functions) {
    resultPromise = resultPromise.then((result) => func(result));
  }

  return resultPromise.catch((error) => {
    throw error;
  });
}



function promisify(func) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      func(...args, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
}


module.exports = {
  promiseAll,
  promiseAllSettled,
  chainPromises,
  promisify,
};
