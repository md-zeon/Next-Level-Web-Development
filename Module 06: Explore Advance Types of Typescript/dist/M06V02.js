"use strict";
// TypeScript Interfaces - Comprehensive Examples
// Interfaces define contracts for object structures
Object.defineProperty(exports, "__esModule", { value: true });
let user = {
    id: 1,
    name: "John Doe",
    email: "john@example.com"
};
console.log("User:", user);
let calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b
};
console.log("Calculator add:", calculator.add(5, 3));
let person1 = { name: "Alice", age: 30 };
let person2 = {
    name: "Bob",
    age: 25,
    email: "bob@example.com",
    phone: "+1234567890"
};
console.log("Person 1:", person1);
console.log("Person 2:", person2);
let point = { x: 10, y: 20 };
console.log("Point:", point);
let dict = {
    "hello": "world",
    "foo": "bar",
    "typescript": "awesome"
};
console.log("Dictionary:", dict);
let error = {
    code: 404,
    message: "Not Found",
    timestamp: Date.now(),
    details: "Page not found"
};
console.log("Error:", error);
let searchUsers = (query, limit = 10) => {
    return [`${query}_user_1`, `${query}_user_2`, `${query}_user_3`].slice(0, limit);
};
console.log("Search results:", searchUsers("john", 2));
class DigitalClock {
    currentTime = new Date();
    constructor(hour, minute) {
        this.currentTime.setHours(hour, minute, 0, 0);
    }
    tick() {
        this.currentTime.setSeconds(this.currentTime.getSeconds() + 1);
        console.log("Digital Clock:", this.currentTime.toLocaleTimeString());
    }
}
function createClock(ctor, hour, minute) {
    return new ctor(hour, minute);
}
let digitalClock = createClock(DigitalClock, 14, 30);
digitalClock.tick();
let dog = {
    name: "Buddy",
    age: 3,
    breed: "Golden Retriever",
    eat: () => console.log("Dog is eating"),
    bark: () => console.log("Woof!")
};
console.log("Dog:", dog.name, dog.breed);
dog.eat();
dog.bark();
let duck = {
    fly: () => console.log("Duck is flying"),
    wingspan: 0.8,
    swim: () => console.log("Duck is swimming"),
    maxDepth: 2,
    quack: () => console.log("Quack!")
};
console.log("Duck abilities:");
duck.fly();
duck.swim();
duck.quack();
class StringContainer {
    value = "";
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
    isEmpty() {
        return this.value.length === 0;
    }
}
class NumberContainer {
    value = 0;
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
    isEmpty() {
        return this.value === 0;
    }
}
let strContainer = new StringContainer();
strContainer.setValue("Hello TypeScript");
console.log("String container:", strContainer.getValue());
let numContainer = new NumberContainer();
numContainer.setValue(42);
console.log("Number container:", numContainer.getValue());
function logLength(arg) {
    console.log(`Length: ${arg.length}`);
    return arg;
}
logLength("Hello"); // OK
logLength([1, 2, 3]); // OK
logLength({ length: 5, value: "test" }); // OK
class Rectangle {
    width;
    height;
    name = "Rectangle";
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    area() {
        return this.width * this.height;
    }
    perimeter() {
        return 2 * (this.width + this.height);
    }
}
class Circle {
    radius;
    name = "Circle";
    constructor(radius) {
        this.radius = radius;
    }
    area() {
        return Math.PI * this.radius * this.radius;
    }
    perimeter() {
        return 2 * Math.PI * this.radius;
    }
}
let rectangle = new Rectangle(5, 10);
let circle = new Circle(7);
console.log(`${rectangle.name} - Area: ${rectangle.area()}, Perimeter: ${rectangle.perimeter()}`);
console.log(`${circle.name} - Area: ${circle.area().toFixed(2)}, Perimeter: ${circle.perimeter().toFixed(2)}`);
function calculateArea(shape) {
    switch (shape.kind) {
        case "square":
            return shape.size * shape.size;
        case "rectangle":
            return shape.width * shape.height;
        case "circle":
            return Math.PI * shape.radius * shape.radius;
        default:
            throw new Error("Unknown shape");
    }
}
let square = { kind: "square", size: 5 };
let rect = { kind: "rectangle", width: 4, height: 6 };
let circ = { kind: "circle", radius: 3 };
console.log("Square area:", calculateArea(square));
console.log("Rectangle area:", calculateArea(rect));
console.log("Circle area:", calculateArea(circ).toFixed(2));
function createCounter() {
    let count = 0;
    let counter = function (start) {
        count = start;
        return `Counter started at ${count}`;
    };
    counter.interval = 1000;
    counter.reset = function () {
        count = 0;
        console.log("Counter reset to 0");
    };
    return counter;
}
let counter = createCounter();
console.log(counter(5));
console.log("Interval:", counter.interval);
counter.reset();
let product = {
    id: 1,
    name: "Laptop",
    price: 999.99,
    category: "Electronics"
};
console.log("Product:", product);
let database = {
    get: (param1, param2) => {
        if (typeof param1 === 'number') {
            return { id: param1, type: 'single' };
        }
        if (typeof param2 === 'number') {
            return { table: param1, id: param2, type: 'by_id' };
        }
        return [{ table: param1, conditions: param2, type: 'query' }];
    }
};
console.log("Get by ID:", database.get(123));
console.log("Get by table and ID:", database.get("users", 456));
console.log("Get by conditions:", database.get("products", { category: "electronics" }));
class ConcreteUserBuilder {
    user = {};
    setName(name) {
        this.user.name = name;
        return this;
    }
    setEmail(email) {
        this.user.email = email;
        return this;
    }
    setAge(age) {
        this.user.age = age;
        return this;
    }
    build() {
        if (!this.user.name || !this.user.email) {
            throw new Error("Name and email are required");
        }
        return {
            id: Date.now(),
            name: this.user.name,
            email: this.user.email
        };
    }
}
let userBuilder = new ConcreteUserBuilder();
let builtUser = userBuilder
    .setName("Jane Smith")
    .setEmail("jane@example.com")
    .setAge(28)
    .build();
console.log("Built user:", builtUser);
class InMemoryUserRepository {
    users = [];
    async findById(id) {
        return this.users.find(user => user.id.toString() === id) || null;
    }
    async findAll() {
        return [...this.users];
    }
    async save(entity) {
        this.users.push(entity);
        return entity;
    }
    async delete(id) {
        this.users = this.users.filter(user => user.id.toString() !== id);
    }
    async findByEmail(email) {
        return this.users.find(user => user.email === email) || null;
    }
}
let userRepo = new InMemoryUserRepository();
// Wrap async operations in an async function
async function testRepository() {
    await userRepo.save({ id: 1, name: "Test User", email: "test@example.com" });
    let foundUser = await userRepo.findByEmail("test@example.com");
    console.log("Found user by email:", foundUser);
}
testRepository();
function handleApiResponse(response) {
    if (response.success) {
        console.log("Success - Data:", response.data, "Time:", new Date(response.timestamp));
    }
    else {
        console.log("Error - Code:", response.code, "Message:", response.error);
    }
}
let successResponse = {
    success: true,
    data: { users: ["Alice", "Bob"] },
    timestamp: Date.now()
};
let errorResponse = {
    success: false,
    error: "User not found",
    code: 404
};
handleApiResponse(successResponse);
handleApiResponse(errorResponse);
console.log("Interface examples completed!");
//# sourceMappingURL=M06V02.js.map