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
    const names = [person.firstName, person.lastName].filter(name => name)
    return names.join(' ');
}

function filterUniqueWords(string){
    if (string.trim() === '') {
        return [];
    }
    return string.split(' ').filter((word, index, array) => array.indexOf(word) === index);
}

function getAverageGrade(students){
    return students.reduce((total, student) => total + student.grades.reduce((total, grade) => total + grade, 0) / student.grades.length, 0) / students.length;
}



module.exports = {
    Person,
    Student,
    getFullName,
    filterUniqueWords,
    getAverageGrade
};