"use strict";
// 7-1 Class and Object in TypeScript
Object.defineProperty(exports, "__esModule", { value: true });
// Defining a Class
class Person {
    // Properties
    name;
    age;
    // Constructor
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    // Method
    greet() {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }
}
// Creating Objects (Instances)
const person1 = new Person("Alice", 30);
const person2 = new Person("Bob", 25);
console.log(person1.greet()); // Output: Hello, my name is Alice and I am 30 years old.
console.log(person2.greet()); // Output: Hello, my name is Bob and I am 25 years old.
// Access Modifiers Example
class Employee {
    name;
    salary;
    department;
    constructor(name, salary, department) {
        this.name = name;
        this.salary = salary;
        this.department = department;
    }
    getSalary() {
        return this.salary; // Can access private property within the class
    }
    getDepartment() {
        return this.department; // Can access protected property within the class
    }
}
const employee1 = new Employee("John", 50000, "Engineering");
console.log(employee1.name); // Accessible (public)
console.log(employee1.getSalary()); // Accessible via method
console.log(employee1.getDepartment()); // Accessible via method
// console.log(employee1.salary); // Error: private property
// console.log(employee1.department); // Error: protected property
//# sourceMappingURL=M07V01.js.map