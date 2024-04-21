class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

class Student extends Person {
    constructor(firstName, lastName, grades) {
        super(firstName, lastName);
        this.grades = grades;
    }
}

function getFullName(person){
    if(!person.firstName || !person.lastName) throw new Error('Invalid input');
    if(typeof person.firstName !== 'string' || typeof person.lastName !== 'string') throw new Error('Invalid input');
    const names = [person.firstName, person.lastName].filter(name => name)
    return names.join(' ');
}

function filterUniqueWords(string){
    if (string.trim() === '') {
        return [];
    }
    const toLowerCase = (str) => str.toLowerCase();
    const splitString = (str) => str.split(' ');
    const uniqueWords = (array) => array.filter((word, index, arr) => arr.indexOf(word) === index);
    const sortWords = (array) => array.sort();
    const compose = (...funcs) => (x) => funcs.reduceRight((acc, fn) => fn(acc), x);
    return compose(sortWords, uniqueWords, splitString, toLowerCase)(string);
}

function getAverageGrade(students){
    if (students.length === 0) {
        return NaN;
    }
    const average = (arr) => arr.reduce((total, val) => total + val, 0) / arr.length;
    const gradesAverage = (student) => average(student.grades);
    const studentsAverage = (arr) => average(arr.map(gradesAverage));

    return studentsAverage(students);
}



module.exports = {
    Person,
    Student,
    getFullName,
    filterUniqueWords,
    getAverageGrade
};