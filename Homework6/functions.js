// Task 1

function localize(...strings) {
    return function(lang, translations) {
        let result = '';
        for (let i = 0; i < strings.length; i++) {
            result += (translations[strings[i]] && translations[strings[i]][lang]) || '';
        }
        return result;
    };
}

// const translations = {
//     greeting: {
//         en: "Hello",
//         fr: "Bonjour",
//         es: "Hola"
//     },
//     name: {
//         en: "John",
//         fr: "Jean",
//         es: "Juan"
//     }
// };

// const lang = 'fr';
// const greeting = "greeting";
// const name = "name";

// const localizeMessage = localize`${greeting}${name}`;
// console.log(localizeMessage(lang, translations));


// Task 2

function highlightKeywords(template, keywords) {
    return template.replace(/\${(\d)}/g, (_, index) => {
        const keyword = keywords[index];
        return `<span class='highlight'>${keyword}</span>`;
    });
}

// const keywords = ["JavaScript", "template", "tagged"];
// const template = "Learn \${0} tagged templates to create custom \${1} literals for \${2} manipulation.";

// const highlighted = highlightKeywords(template, keywords);

// console.log(highlighted);


// Task 3

function multiline(strings) {
    let linesBefore = 0;
    let result = strings.reduce((acc, str, i) => {
        let lines = str.trim().split('\n');
        for (let j = 0; j < lines.length; j++) {
            acc.push(`${j + 1 + linesBefore} ${lines[j]}`);
        }

        linesBefore += lines.length;
        return acc;
    }, []);
    return result.join('\n');
}

const constant = 10;

const code = multiline`
function add(a, b) {
return a + b;
text
}
`;

console.log(code);


// Task 4

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}



function debouncedSearch(query) {
	console.log("Searching for:", query);
}


const debouncedSearchHandler = debounce(debouncedSearch, 1000);

// for (let i = 0; i < 10; i++) {
//     debouncedSearchHandler("Search query");
// }


// Task 5

function throttle(func, interval) {
    let lastCallTime = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastCallTime >= interval) {
            lastCallTime = now;
            func(...args);
        }
    };
}

function onScroll(event) {
	console.log("Scroll event:", event);
}

// const throttledScrollHandler = throttle(onScroll, 1000);

// for (let i = 0; i < 1000000000000000; i++) {
//     throttledScrollHandler({ index: i });
// }



/// Task 6

function curry(func, arity) {
    return function curried(...args) {
        if (args.length >= arity) {
            return func(...args);
        }
        return function(...newArgs) {
            return curried(...args, ...newArgs);
        };
    };
}

function curryWithOptional(func, arity){
    return function curried(...args){
        const actualArgs = args.filter(arg => arg !== '_');
        if (actualArgs.length >= arity) {
            return func(...actualArgs);
        }
        return function(...newArgs){
            const combinedArgs = [];
            let argIndex = 0;
            for (const arg of args) {
                if(arg !== '_'){
                    combinedArgs.push(arg);
                }
            }
            for (const arg of newArgs) {
                if (argIndex < newArgs.length) {
                    combinedArgs.push(arg);
                    argIndex++;
                }
            }
            return curried(...combinedArgs);
        };
    };
}

function multiply(a, b, c) {
	return a * b * c;
}

// const curriedMultiply = curry(multiply, 3);

// const step1 = curriedMultiply(2); // Returns a curried function
// const step2 = step1(3); // Returns a curried function
// const result = step2(4); // Returns the final result: 2 * 3 * 4 = 24

// console.log("Result:", result); // Expected: 24

// const curriedMultiply2 = curryWithOptional(multiply, 3);

// console.log(curriedMultiply2(1)(2)(3));
// console.log(curriedMultiply2('_', 2)(3)(1));
// console.log(curriedMultiply2('_', '_', 3)(1)(2));
// console.log(curriedMultiply2('_', 2, '_')('_')(3)(1));


module.exports = {
    localize,
    highlightKeywords,
    multiline,
    debounce,
    debouncedSearch,
    throttle,
    onScroll,
    curry,
    curryWithOptional
}