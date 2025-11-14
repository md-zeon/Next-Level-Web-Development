"use strict";
// Module 7 Lesson 2: Inheritance Practice Exercises
Object.defineProperty(exports, "__esModule", { value: true });
// Exercise 1: Vehicle Inheritance
class Vehicle {
    brand;
    year;
    constructor(brand, year) {
        this.brand = brand;
        this.year = year;
    }
    start() {
        console.log(`${this.brand} vehicle is starting.`);
    }
    stop() {
        console.log(`${this.brand} vehicle is stopping.`);
    }
    getVehicleInfo() {
        return `${this.brand} (${this.year})`;
    }
}
class Car extends Vehicle {
    seats;
    constructor(brand, year, seats) {
        super(brand, year);
        this.seats = seats;
    }
    drive() {
        console.log(`${this.getVehicleInfo()} is driving on the road.`);
    }
    getCarInfo() {
        console.log(`This car is a ${this.getVehicleInfo()} with ${this.seats} seats.`);
    }
}
class Motorcycle extends Vehicle {
    hasSidecar;
    constructor(brand, year, hasSidecar) {
        super(brand, year);
        this.hasSidecar = hasSidecar;
    }
    ride() {
        console.log(`${this.getVehicleInfo()} is riding${this.hasSidecar ? ' with sidecar' : ''}.`);
    }
    wheelie() {
        if (!this.hasSidecar) {
            console.log(`${this.getVehicleInfo()} is doing a wheelie!`);
        }
        else {
            console.log(`${this.getVehicleInfo()} cannot do wheelies with a sidecar.`);
        }
    }
}
// Exercise 2: Employee Hierarchy with Method Overriding
class Employee {
    name;
    salary;
    position;
    constructor(name, salary, position) {
        this.name = name;
        this.salary = salary;
        this.position = position;
    }
    work() {
        console.log(`${this.name} (${this.position}) is working.`);
    }
    getSalary() {
        return this.salary;
    }
    introduce() {
        console.log(`Hi, I'm ${this.name}, a ${this.position}.`);
    }
}
class Manager extends Employee {
    teamSize;
    constructor(name, salary, teamSize) {
        super(name, salary, "Manager");
        this.teamSize = teamSize;
    }
    work() {
        super.work();
        console.log(`${this.name} is managing a team of ${this.teamSize} people.`);
    }
    manageTeam() {
        console.log(`${this.name} is holding a team meeting.`);
    }
}
class Developer extends Employee {
    programmingLanguage;
    constructor(name, salary, programmingLanguage) {
        super(name, salary, "Developer");
        this.programmingLanguage = programmingLanguage;
    }
    work() {
        super.work();
        console.log(`${this.name} is coding in ${this.programmingLanguage}.`);
    }
    writeCode() {
        console.log(`${this.name} is writing ${this.programmingLanguage} code.`);
    }
}
// Testing the exercises
console.log("=== Vehicle Inheritance Exercise ===");
const car = new Car("Toyota", 2020, 5);
const motorcycle = new Motorcycle("Harley-Davidson", 2019, false);
car.start();
car.drive();
car.getCarInfo();
car.stop();
motorcycle.start();
motorcycle.ride();
motorcycle.wheelie();
motorcycle.stop();
console.log("\n=== Employee Hierarchy Exercise ===");
const manager = new Manager("Alice Johnson", 80000, 8);
const developer = new Developer("Bob Smith", 70000, "TypeScript");
manager.introduce();
manager.work();
manager.manageTeam();
console.log(`Salary: $${manager.getSalary()}`);
developer.introduce();
developer.work();
developer.writeCode();
console.log(`Salary: $${developer.getSalary()}`);
// Exercise 3: Shape Inheritance with Abstract-like behavior
class Shape {
    color;
    constructor(color) {
        this.color = color;
    }
    // This would be an abstract method in a proper abstract class
    calculateArea() {
        throw new Error("Method must be implemented by subclass");
    }
    getColor() {
        return this.color;
    }
}
class Rectangle extends Shape {
    width;
    height;
    constructor(color, width, height) {
        super(color);
        this.width = width;
        this.height = height;
    }
    calculateArea() {
        return this.width * this.height;
    }
    getRectangleInfo() {
        console.log(`${this.color} rectangle: ${this.width}x${this.height}, Area: ${this.calculateArea()}`);
    }
}
class Circle extends Shape {
    radius;
    constructor(color, radius) {
        super(color);
        this.radius = radius;
    }
    calculateArea() {
        return Math.PI * this.radius * this.radius;
    }
    getCircleInfo() {
        console.log(`${this.color} circle: radius ${this.radius}, Area: ${this.calculateArea().toFixed(2)}`);
    }
}
console.log("\n=== Shape Inheritance Exercise ===");
const rectangle = new Rectangle("Red", 10, 5);
const circle = new Circle("Blue", 7);
rectangle.getRectangleInfo();
circle.getCircleInfo();
//# sourceMappingURL=M07V02.js.map