"use strict";
// Constraints in Generics
Object.defineProperty(exports, "__esModule", { value: true });
const addStudentToCourse = (studentInfo) => {
    return {
        courseName: "Next Level TypeScript",
        ...studentInfo,
    };
};
const student1 = {
    id: 123,
    name: "Alice",
    hasPen: true,
};
const student2 = {
    id: 456,
    name: "Bob",
    hasNotebook: false,
    hasCar: true,
    isMarried: true,
};
const student3 = {
    id: 789,
    name: "Charlie",
    hasWatch: true,
};
console.log(addStudentToCourse(student1));
console.log(addStudentToCourse(student2));
console.log(addStudentToCourse(student3));
//# sourceMappingURL=constraints.js.map