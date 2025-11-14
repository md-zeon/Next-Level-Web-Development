"use strict";
// 7-3 Type Guards using typeof and in Operators
Object.defineProperty(exports, "__esModule", { value: true });
// === Type Guards with typeof Operator ===
function processValue(value) {
    if (typeof value === "string") {
        // TypeScript knows value is string here
        console.log(`String: ${value.toUpperCase()}`);
    }
    else if (typeof value === "number") {
        // TypeScript knows value is number here
        console.log(`Number: ${value.toFixed(2)}`);
    }
    else if (typeof value === "boolean") {
        // TypeScript knows value is boolean here
        console.log(`Boolean: ${value ? "True" : "False"}`);
    }
    else if (typeof value === "undefined") {
        // TypeScript knows value is undefined here
        console.log("Value is undefined");
    }
    else if (typeof value === "function") {
        // TypeScript knows value is a function here
        console.log("Value is a function");
    }
    else {
        console.log("Unknown type");
    }
}
// Testing typeof type guards
console.log("=== typeof Type Guards ===");
processValue("hello world");
processValue(42);
processValue(true);
processValue(undefined);
processValue(() => console.log("function"));
function handlePet(pet) {
    console.log(`Handling pet: ${pet.name}`);
    if ("breed" in pet) {
        // TypeScript knows pet is Dog here
        console.log(`Dog: ${pet.name} is a ${pet.breed}`);
        pet.bark();
    }
    else if ("color" in pet) {
        // TypeScript knows pet is Cat here
        console.log(`Cat: ${pet.name} is ${pet.color}`);
        pet.meow();
    }
    else if ("wingspan" in pet) {
        // TypeScript knows pet is Bird here
        console.log(`Bird: ${pet.name} has ${pet.wingspan} cm wingspan`);
        pet.chirp();
    }
}
// Testing in type guards
console.log("\\n=== in Type Guards ===");
const dog = {
    name: "Buddy",
    breed: "Golden Retriever",
    bark: () => console.log("Woof!")
};
const cat = {
    name: "Whiskers",
    color: "white",
    meow: () => console.log("Meow!")
};
const bird = {
    name: "Tweety",
    wingspan: 25,
    chirp: () => console.log("Chirp!")
};
handlePet(dog);
handlePet(cat);
handlePet(bird);
function getArea(shape) {
    if (shape.kind === "square") {
        return shape.size ** 2;
    }
    else if (shape.kind === "rectangle") {
        return shape.width * shape.height;
    }
    else {
        return Math.PI * shape.radius ** 2;
    }
}
function getPerimeter(shape) {
    if (shape.kind === "square") {
        return 4 * shape.size;
    }
    else if (shape.kind === "rectangle") {
        return 2 * (shape.width + shape.height);
    }
    else {
        return 2 * Math.PI * shape.radius;
    }
}
// Testing combined type guards with discriminated unions
console.log("\\n=== Combined Type Guards ===");
const square = { kind: "square", size: 5 };
const rectangle = { kind: "rectangle", width: 4, height: 6 };
const circle = { kind: "circle", radius: 3 };
console.log(`Square area: ${getArea(square)}`);
console.log(`Rectangle area: ${getArea(rectangle)}`);
console.log(`Circle area: ${getArea(circle).toFixed(2)}`);
console.log(`Square perimeter: ${getPerimeter(square)}`);
console.log(`Rectangle perimeter: ${getPerimeter(rectangle)}`);
console.log(`Circle perimeter: ${getPerimeter(circle).toFixed(2)}`);
// === Custom Type Guard Functions ===
function isString(value) {
    return typeof value === "string";
}
function isNumber(value) {
    return typeof value === "number" && !isNaN(value);
}
function hasStringProperty(obj, prop) {
    return typeof obj === "object" && obj !== null && prop in obj && typeof obj[prop] === "string";
}
function hasProperty(obj, prop) {
    return typeof obj === "object" && obj !== null && prop in obj;
}
// Testing custom type guards
console.log("\\n=== Custom Type Guard Functions ===");
function processData(data) {
    if (isString(data)) {
        console.log(`String data: ${data.length} characters`);
    }
    else if (isNumber(data)) {
        console.log(`Number data: ${data.toFixed(2)}`);
    }
    else if (typeof data === "object" && data !== null) {
        if (hasStringProperty(data, "name")) {
            console.log(`Object with name: ${data.name}`);
        }
        else {
            console.log("Object without name property");
        }
    }
    else {
        console.log("Unknown data type");
    }
}
processData("Hello");
processData(123.45);
processData({ name: "Alice", age: 30 });
processData({ title: "Book", pages: 200 });
processData(null);
function processApiResponse(response) {
    if (!response.success) {
        console.log(`Error: ${response.error || "Unknown error"}`);
        return;
    }
    if (response.data === undefined) {
        console.log("No data in response");
        return;
    }
    // Check if it's a user
    if (typeof response.data === "object" && response.data !== null) {
        if ("email" in response.data) {
            // It's a User
            const user = response.data;
            console.log(`User: ${user.name} (${user.email})`);
        }
        else if ("price" in response.data) {
            // It's a Product
            const product = response.data;
            console.log(`Product: ${product.name} - $${product.price} (${product.category})`);
        }
        else {
            console.log("Unknown data structure");
        }
    }
    else {
        console.log(`Primitive data: ${response.data}`);
    }
}
// Testing complex type guards
console.log("\\n=== Complex Type Guards Example ===");
const userResponse = {
    success: true,
    data: { id: 1, name: "John Doe", email: "john@example.com" }
};
const productResponse = {
    success: true,
    data: { id: 101, name: "Laptop", price: 899.99, category: "Electronics" }
};
const errorResponse = {
    success: false,
    error: "Network error"
};
const noDataResponse = {
    success: true
};
processApiResponse(userResponse);
processApiResponse(productResponse);
processApiResponse(errorResponse);
processApiResponse(noDataResponse);
//# sourceMappingURL=M07V03.js.map