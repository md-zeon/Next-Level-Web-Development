"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Person {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getDetails() {
        return `Name: ${this.name}, Age: ${this.age}`;
    }
}
class Student extends Person {
    studentId;
    address; // New property for Student class
    constructor(name, age, studentId, address) {
        super(name, age);
        this.studentId = studentId;
        this.address = address;
    }
    getDetails() {
        return `Name: ${this.name}, Age: ${this.age}, Student ID: ${this.studentId}, Address: ${this.address}`;
    }
    getSleep() {
        return `${this.name} is sleeping.`;
    }
}
class AssistantTeacher extends Student {
    TeacherId;
    designation; // New property for Assistant Teacher class
    constructor(name, age, studentId, address, TeacherId, designation) {
        // Calling the parent class constructor
        super(name, age, studentId, address);
        // Initializing the designation property
        this.TeacherId = TeacherId;
        this.designation = designation;
    }
    // Overriding getDetails method
    getDetails() {
        return `Name: ${this.name}, Age: ${this.age}, Student ID: ${this.studentId}, Address: ${this.address}, Teacher ID: ${this.TeacherId}, Designation: ${this.designation}`;
    }
    takeClasses() {
        return `${this.name} is taking classes as a ${this.designation}.`;
    }
}
const student1 = new Student("Alice", 20, 123, "123 Main St");
console.log(student1.getDetails());
console.log(student1.getSleep());
const assistantTeacher1 = new AssistantTeacher("Bob", 25, 456, "456 Elm St", 789, "Assistant Professor");
console.log(assistantTeacher1.getDetails());
console.log(assistantTeacher1.takeClasses());
//# sourceMappingURL=inheritance.js.map