"use strict";
// OOP : instance of type guard / type narrowing
Object.defineProperty(exports, "__esModule", { value: true });
class Person {
    name;
    constructor(name) {
        this.name = name;
    }
    getSleep(hours) {
        console.log(`${this.name} sleeps for ${hours} hours.`);
    }
}
class Student extends Person {
    constructor(name) {
        super(name);
    }
    doStudy(numberOfHours) {
        console.log(`${this.name} is studying for ${numberOfHours} hours.`);
    }
}
class Teacher extends Person {
    constructor(name) {
        super(name);
    }
    takeClass(numberOfHours) {
        console.log(`${this.name} is taking class for ${numberOfHours} hours.`);
    }
}
// function guard using 'instanceof'
const isStudent = (user) => {
    return user instanceof Student; // returns boolean true/false
};
const isTeacher = (user) => {
    return user instanceof Teacher; // returns boolean true/false
};
const getUserInfo = (user) => {
    if (isStudent(user)) {
        user.doStudy(5);
    }
    else if (isTeacher(user)) {
        user.takeClass(6);
    }
    else {
        console.log(`${user.name} is neither a Student nor a Teacher.`);
    }
    user.getSleep(8);
};
const student1 = new Student("Mr. Student");
const teacher1 = new Teacher("Mr. Teacher");
getUserInfo(student1);
getUserInfo(teacher1);
//# sourceMappingURL=instanceOf.js.map