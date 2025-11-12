"use strict";
// Type Assertion in TypeScript
// Type assertion allows you to tell the compiler that you know the type of a value better than it does
Object.defineProperty(exports, "__esModule", { value: true });
// Example 1: Basic type assertion
let someValue = "Hello World";
// Using 'as' syntax (preferred)
let strLength = someValue.length;
console.log("String length:", strLength);
let personData = {
    name: "John Doe",
    age: 30,
    occupation: "Developer",
};
// Asserting that personData is of type Person
let person = personData;
console.log("Person:", person.name, person.age);
// Example 3: Type assertion with DOM elements
// In a browser environment, document.getElementById returns HTMLElement | null
// But we know it's an HTMLInputElement
// Simulating DOM element (since we're in Node.js)
// let inputElement = document.getElementById('myInput') as HTMLInputElement;
// inputElement.value = "Hello";
// Example 4: Type assertion with unknown type
let unknownValue = "This is a string";
// We can assert it to string to access string methods
let stringValue = unknownValue;
console.log("Uppercase:", stringValue.toUpperCase());
// Example 5: Type assertion with arrays
let mixedArray = [1, "two", 3, "four"];
let stringArray = mixedArray;
// This would cause runtime error because not all elements are strings
// console.log(stringArray[0].toUpperCase()); // Error at runtime
// Example 6: Double assertion (dangerous, use sparingly)
let value = "Hello";
// First assert to unknown, then to number (bypasses type checking)
let numberValue = value;
console.log("Number value:", numberValue); // This will be NaN at runtime
// Example 7: Type assertion with function parameters
function processValue(value) {
    // Assert that value is a string
    return value.toUpperCase();
}
console.log("Processed value:", processValue("hello world"));
// Example 8: Type assertion in conditional checks
function isString(value) {
    return typeof value === "string";
}
function handleValue(value) {
    if (isString(value)) {
        // TypeScript knows value is string here
        console.log("String length:", value.length);
    }
    else {
        // Use type assertion if we're sure
        let numValue = value;
        console.log("Number value:", numValue);
    }
}
handleValue("test");
handleValue(42);
// Example 9: Type assertion with JSON.parse
let jsonString = '{"name": "Alice", "age": 25}';
let parsedData = JSON.parse(jsonString);
console.log("Parsed data:", parsedData.name, parsedData.age);
let user = { id: 1, username: "user1" };
let admin = user; // Be careful - this doesn't add permissions
console.log("Admin:", admin);
// Note: Type assertions don't perform runtime checks
// They only tell TypeScript compiler to treat the value as that type
// Always ensure type safety at runtime when using assertions
// End of Type Assertion examples in TypeScript
// Instructor's examples
let anything;
anything = "Zeanur Rahaman Zeon";
console.log(anything.length);
const kgToGramConverter = (input) => {
    if (typeof input === "string") {
        const [value, unit] = input.split(" ");
        if (unit?.toLowerCase() === "kg") {
            return `Converted output: ${parseFloat(value) * 1000}`;
        }
        else {
            throw new Error("Unsupported unit");
        }
    }
    else if (typeof input === "number") {
        return input * 1000;
    }
};
const result1 = kgToGramConverter(2);
const result2 = kgToGramConverter("2 kg");
console.log(result1, result2);
//# sourceMappingURL=M06V01.js.map