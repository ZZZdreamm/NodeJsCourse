// Task 1

function customFilterUnique(array, callback){
    const uniqueElements = [];
    const seen = new Set();

    array.forEach(item => {
        if (!seen.has(callback(item))) {
            seen.add(callback(item));
            uniqueElements.push(item);
        }
    });

    return uniqueElements;
}

// Task 2

function chunkArray(array, chunkSize){
    const chunkedArray = [];

    for (let i = 0; i < array.length; i += chunkSize) {
        chunkedArray.push(array.slice(i, i + chunkSize));
    }

    return chunkedArray;
}

// Task 3

function randomShuffle(array){
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
}

// Task 4

function getArrayIntersection(array1, array2){
    let arrayIntersection = [];
    let index = 0;
    while (index < array1.length) {
        const element = array1[index];
        if (array2.includes(element)) {
            arrayIntersection.push(element);
        }
        index++;
    }
    return arrayIntersection;
}

function getArrayUnion(array1, array2){
    let array_union = new Set([...array1, ...array2]);
    return Array.from(array_union);
}

// Task 5

function measureArrayPerformance(func, array, ...args) {
    const startTime = performance.now();
    func(array, ...args);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    return executionTime;
}


function builtInFilter(array) {
    return array.filter(num => num % 2 === 0);
}

function builtInMap(array) {
    return array.map(num => num * 2);
}

function builtInReduce(array) {
    return array.reduce((x) => x, 0);
}


function compareArrayFuncPerformances(array, functionName, func1, func2, ...func2Args){
    const times = 10;
    let totalTimeForFunc1 = 0;
    let totalTimeForFunc2 = 0;
    for (let i = 0; i < times; i++) {
        const startTimeForFunc1 = performance.now();
        func1(array);
        const endTimeForFunc1 = performance.now();
        totalTimeForFunc1 += endTimeForFunc1 - startTimeForFunc1;

        const startTimeForFunc2 = performance.now();
        func2(array, ...func2Args);
        const endTimeForFunc2 = performance.now();
        totalTimeForFunc2 += endTimeForFunc2 - startTimeForFunc2;
    }
    totalTimeForFunc1 /= times;
    totalTimeForFunc2 /= times;
    let func1Better = totalTimeForFunc1 < totalTimeForFunc2;
    console.log(`Average time for built-in ${functionName} function:`, totalTimeForFunc1, "milliseconds");
    console.log(`Average time for custom ${functionName} function:`, totalTimeForFunc2, "milliseconds");
    console.log(`${func1Better ? 'Built-in' : 'Custom'} ${functionName} function is faster by ${func1Better ? totalTimeForFunc2 - totalTimeForFunc1 : totalTimeForFunc1 - totalTimeForFunc2} milliseconds\n`);
}

const testArray = Array.from({ length: 1000000 }, () => Math.floor(Math.random() * 1000000));
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const array1 = [1, 2, 3, 4, 5];
const array2 = [4, 5, 6, 7, 8];


compareArrayFuncPerformances(testArray, "Filter", builtInFilter, customFilterUnique, (num) => num % 2 === 0);

const chunkArrayTime = measureArrayPerformance(chunkArray, array, 3);
console.log("Custom Chunk Array:", chunkArrayTime, "ms\n");

const randomShuffleTime = measureArrayPerformance(randomShuffle, testArray);
console.log("Custom Random Shuffle Time:", randomShuffleTime, "milliseconds\n");

const getArrayIntersectionTime = measureArrayPerformance(getArrayIntersection, array1, array2);
const builtInIntersectionTime = measureArrayPerformance(array1.filter.bind(array1), item => array2.includes(item));
console.log("Custom Array Intersection:", getArrayIntersectionTime, "ms");
console.log("Built-in Intersection:", builtInIntersectionTime, "ms\n");


const getArrayUnionTime = measureArrayPerformance(getArrayUnion, array1, array2);
console.log("Custom Array Union:", getArrayUnionTime, "ms\n");

const builtInMapTime = measureArrayPerformance(builtInMap, testArray);
const builtInReduceTime = measureArrayPerformance(builtInReduce, testArray);
console.log("Built-in Map Time:", builtInMapTime, "milliseconds");
console.log("Built-in Reduce Time:", builtInReduceTime, "milliseconds\n");


module.exports = { customFilterUnique, chunkArray, randomShuffle, getArrayIntersection, getArrayUnion };