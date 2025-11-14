"use strict";
// 7-4 Type Guards using instanceof Operator
Object.defineProperty(exports, "__esModule", { value: true });
// === Basic instanceof Usage ===
class Animal {
    name;
    constructor(name) {
        this.name = name;
    }
    makeSound() {
        console.log("Generic animal sound");
    }
}
class Dog extends Animal {
    breed;
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
    makeSound() {
        console.log("Woof!");
    }
    wagTail() {
        console.log(`${this.name} wags its tail`);
    }
}
class Cat extends Animal {
    color;
    constructor(name, color) {
        super(name);
        this.color = color;
    }
    makeSound() {
        console.log("Meow!");
    }
    purr() {
        console.log(`${this.name} purrs`);
    }
}
console.log("=== Basic instanceof Usage ===");
const animal = new Animal("Generic Pet");
const dog = new Dog("Buddy", "Golden Retriever");
const cat = new Cat("Whiskers", "Black");
console.log(animal instanceof Animal); // true
console.log(animal instanceof Dog); // false
console.log(animal instanceof Cat); // false
console.log(dog instanceof Animal); // true (inheritance!)
console.log(dog instanceof Dog); // true
console.log(dog instanceof Cat); // false
console.log(cat instanceof Animal); // true (inheritance!)
console.log(cat instanceof Cat); // true
console.log(cat instanceof Dog); // false
// === instanceof as Type Guard ===
function handlePet(pet) {
    console.log(`Handling pet: ${pet.name}`);
    if (pet instanceof Dog) {
        // TypeScript knows pet is Dog here
        console.log(`It's a dog! Breed: ${pet.breed}`);
        pet.wagTail(); // Can call Dog-specific methods
    }
    else if (pet instanceof Cat) {
        // TypeScript knows pet is Cat here
        console.log(`It's a cat! Color: ${pet.color}`);
        pet.purr(); // Can call Cat-specific methods
    }
    else {
        // This is the base Animal class
        console.log("It's a generic animal");
        pet.makeSound();
    }
}
console.log("\n=== instanceof as Type Guard ===");
handlePet(dog);
handlePet(cat);
handlePet(animal);
// === instanceof with Complex Inheritance ===
class Shape {
    name;
    constructor(name) {
        this.name = name;
    }
    area() {
        return 0;
    }
    perimeter() {
        return 0;
    }
}
class Circle extends Shape {
    radius;
    constructor(radius) {
        super("Circle");
        this.radius = radius;
    }
    area() {
        return Math.PI * this.radius ** 2;
    }
    perimeter() {
        return 2 * Math.PI * this.radius;
    }
}
class Rectangle extends Shape {
    width;
    height;
    constructor(width, height) {
        super("Rectangle");
        this.width = width;
        this.height = height;
    }
    area() {
        return this.width * this.height;
    }
    perimeter() {
        return 2 * (this.width + this.height);
    }
    isSquare() {
        return this.width === this.height;
    }
}
class Triangle extends Shape {
    base;
    height;
    constructor(base, height) {
        super("Triangle");
        this.base = base;
        this.height = height;
    }
    area() {
        return 0.5 * this.base * this.height;
    }
}
function printShapeInfo(shape) {
    console.log(`Shape: ${shape.name}`);
    console.log(`Area: ${shape.area().toFixed(2)}`);
    console.log(`Perimeter: ${shape.perimeter().toFixed(2)}`);
    if (shape instanceof Rectangle) {
        console.log(`Is square: ${shape.isSquare()}`);
    }
    else if (shape instanceof Triangle) {
        console.log(`Type: Triangle with base ${shape.base} and height ${shape.height}`);
    }
    else if (shape instanceof Circle) {
        console.log(`Radius: ${shape.radius}`);
    }
}
console.log("\n=== instanceof with Complex Inheritance ===");
const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);
const square = new Rectangle(5, 5);
const triangle = new Triangle(6, 4);
printShapeInfo(circle);
console.log();
printShapeInfo(rectangle);
console.log();
printShapeInfo(square);
console.log();
printShapeInfo(triangle);
// === instanceof with Built-in Classes ===
function processData(data) {
    if (data instanceof Array) {
        console.log(`Array with ${data.length} elements: [${data.join(", ")}]`);
    }
    else if (data instanceof Date) {
        console.log(`Date: ${data.toLocaleDateString()} ${data.toLocaleTimeString()}`);
    }
    else if (data instanceof RegExp) {
        console.log(`Regular expression: /${data.source}/${data.flags}`);
    }
    else if (data instanceof Map) {
        console.log(`Map with ${data.size} entries`);
        data.forEach((value, key) => console.log(`  ${key} => ${value}`));
    }
    else if (data instanceof Set) {
        console.log(`Set with ${data.size} elements: {${Array.from(data).join(", ")}}`);
    }
    else if (typeof data === "string") {
        console.log(`String: "${data}"`);
    }
    else if (typeof data === "number") {
        console.log(`Number: ${data}`);
    }
    else {
        console.log(`Other type: ${typeof data}`);
    }
}
console.log("\n=== instanceof with Built-in Classes ===");
processData([1, 2, 3, 4, 5]);
processData(new Date());
processData(/test/gi);
processData(new Map([
    ["name", "John"],
    ["age", "30"],
]));
processData(new Set([1, 2, 3, 1, 2]));
processData("Hello World");
processData(42);
class Employee {
    name;
    age;
    salary;
    constructor(name, age, salary) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }
}
const personObj = { name: "John", age: 30 };
const employeeObj = new Employee("Jane", 25, 50000);
console.log("\n=== instanceof vs typeof vs in Comparison ===");
console.log("Person Object:");
console.log(`  typeof: ${typeof personObj}`);
console.log(`  "name" in object: ${"name" in personObj}`);
console.log(`  instanceof Employee: ${personObj instanceof Employee}`);
console.log("Employee Object:");
console.log(`  typeof: ${typeof employeeObj}`);
console.log(`  "name" in object: ${"name" in employeeObj}`);
console.log(`  instanceof Employee: ${employeeObj instanceof Employee}`);
console.log(`  instanceof Object (base): ${employeeObj instanceof Object}`);
// === Custom Classes Example ===
class Product {
    name;
    price;
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}
class DigitalProduct extends Product {
    fileSize;
    constructor(name, price, fileSize) {
        super(name, price);
        this.fileSize = fileSize;
    }
    getDeliveryMethod() {
        return "Download link";
    }
}
class PhysicalProduct extends Product {
    weight;
    constructor(name, price, weight) {
        super(name, price);
        this.weight = weight;
    }
    getDeliveryMethod() {
        return "Shipping";
    }
    calculateShipping() {
        return this.weight * 0.5; // $0.50 per unit weight
    }
}
class Furniture extends PhysicalProduct {
    requiresAssembly;
    constructor(name, price, weight, requiresAssembly) {
        super(name, price, weight);
        this.requiresAssembly = requiresAssembly;
    }
    getDeliveryMethod() {
        return `Shipping ${this.requiresAssembly ? "(assembly required)" : "(ready to use)"}`;
    }
}
function displayProductInfo(product) {
    console.log(`\nProduct: ${product.name}`);
    console.log(`Price: $${product.price}`);
    if (product instanceof DigitalProduct) {
        console.log(`Type: Digital Product`);
        console.log(`File Size: ${product.fileSize} MB`);
        console.log(`Delivery: ${product.getDeliveryMethod()}`);
    }
    else if (product instanceof Furniture) {
        console.log(`Type: Furniture`);
        console.log(`Weight: ${product.weight} lbs`);
        console.log(`Assembly Required: ${product.requiresAssembly}`);
        console.log(`Delivery: ${product.getDeliveryMethod()}`);
        console.log(`Shipping Cost: $${product.calculateShipping()}`);
    }
    else if (product instanceof PhysicalProduct) {
        console.log(`Type: Physical Product`);
        console.log(`Weight: ${product.weight} lbs`);
        console.log(`Shipping Cost: $${product.calculateShipping()}`);
        console.log(`Delivery: ${product.getDeliveryMethod()}`);
    }
    else {
        console.log(`Type: Product`);
    }
}
console.log("\n=== Custom Classes Example ===");
const ebook = new DigitalProduct("TypeScript Guide", 29.99, 5);
const chair = new Furniture("Office Chair", 199.99, 25, false);
const book = new PhysicalProduct("Programming Book", 49.99, 2);
const genericProduct = new Product("Generic Item", 19.99);
displayProductInfo(ebook);
displayProductInfo(chair);
displayProductInfo(book);
displayProductInfo(genericProduct);
// === Abstract Classes with instanceof ===
class Vehicle {
    brand;
    model;
    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
    }
}
class ElectricCar extends Vehicle {
    batteryCapacity;
    constructor(brand, model, batteryCapacity) {
        super(brand, model);
        this.batteryCapacity = batteryCapacity;
    }
    move() {
        console.log("Electric car moving silently...");
    }
    getFuelType() {
        return "Electricity";
    }
    getRange() {
        return this.batteryCapacity * 4; // rough calculation
    }
}
class GasolineCar extends Vehicle {
    engineSize;
    constructor(brand, model, engineSize) {
        super(brand, model);
        this.engineSize = engineSize;
    }
    move() {
        console.log("Gasoline car moving with engine sound...");
    }
    getFuelType() {
        return "Gasoline";
    }
    getFuelEfficiency() {
        return 25; // MPG
    }
}
class HybridCar extends ElectricCar {
    gasTank;
    constructor(brand, model, batteryCapacity, gasTank) {
        super(brand, model, batteryCapacity);
        this.gasTank = gasTank;
    }
    getFuelType() {
        return "Hybrid (Electricity + Gasoline)";
    }
}
function testDrive(vehicle) {
    console.log(`\nTesting ${vehicle.brand} ${vehicle.model}:`);
    if (vehicle instanceof ElectricCar) {
        console.log("Testing electric vehicle:");
        console.log(`Battery Capacity: ${vehicle.batteryCapacity} kWh`);
        console.log(`Estimated Range: ${vehicle.getRange()} miles`);
        if (vehicle instanceof HybridCar) {
            console.log(`Hybrid with gas tank: ${vehicle.gasTank} gallons`);
        }
    }
    else if (vehicle instanceof GasolineCar) {
        console.log("Testing gasoline vehicle:");
        console.log(`Engine Size: ${vehicle.engineSize}L`);
        console.log(`Fuel Efficiency: ${vehicle.getFuelEfficiency()} MPG`);
    }
    vehicle.move();
    console.log(`Fuel Type: ${vehicle.getFuelType()}`);
}
console.log("\n=== Abstract Classes with instanceof ===");
const tesla = new ElectricCar("Tesla", "Model 3", 75);
const prius = new HybridCar("Toyota", "Prius", 10, 11);
const camry = new GasolineCar("Toyota", "Camry", 2.5);
testDrive(tesla);
testDrive(prius);
testDrive(camry);
//# sourceMappingURL=M07V04.js.map