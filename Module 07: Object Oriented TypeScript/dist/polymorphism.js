"use strict";
// Polymorphism: bohurupi
Object.defineProperty(exports, "__esModule", { value: true });
class Person {
    getSleep() {
        console.log("Person is sleeping 8 hours a day");
    }
}
class Student extends Person {
    getSleep() {
        console.log("Student is sleeping 6 hours a day");
    }
}
class NextLevelDeveloper extends Person {
    getSleep() {
        console.log("Next Level Developer is sleeping 4 hours a day");
    }
}
const getSleepingHours = (person) => {
    person.getSleep();
};
const person1 = new Person();
const person2 = new Student();
const person3 = new NextLevelDeveloper();
getSleepingHours(person1);
getSleepingHours(person2);
getSleepingHours(person3);
class Shape {
    getArea() {
        return 0;
    }
}
class Circle extends Shape {
    //! Error: Method 'getArea' in type 'Circle' is not assignable to the same method in base type 'Shape'.
    // getArea(radius: number): number {
    // 	return Math.PI * radius * radius;
    // }
    radius;
    constructor(radius) {
        super();
        this.radius = radius;
    }
    getArea() {
        return Math.PI * this.radius * this.radius;
    }
}
class Rectangle extends Shape {
    length;
    width;
    constructor(length, width) {
        super();
        this.length = length;
        this.width = width;
    }
    getArea() {
        return this.length * this.width;
    }
}
const shapes = [
    new Circle(5),
    new Rectangle(4, 6),
    new Circle(3),
    new Rectangle(2, 8),
    new Shape(),
];
for (const shape of shapes) {
    if (shape instanceof Circle) {
        console.log(`Circle Area: ${shape.getArea().toFixed(2)}`);
    }
    else if (shape instanceof Rectangle) {
        console.log(`Rectangle Area: ${shape.getArea()}`);
    }
    else {
        console.log(`Shape Area: ${shape.getArea()}`);
    }
}
//# sourceMappingURL=polymorphism.js.map