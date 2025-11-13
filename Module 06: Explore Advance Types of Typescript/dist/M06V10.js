"use strict";
// Conditional Types in TypeScript
// Conditional types allow creating types based on conditions using T extends U ? X : Y syntax
Object.defineProperty(exports, "__esModule", { value: true });
// Runtime demonstration
function checkIsString(value) {
    return typeof value === "string" ? "Yes" : "No";
}
console.log("Runtime string checks:", checkIsString("hello"), checkIsString(42));
// Runtime array operations
const strings = ["hello", "world"];
const numbers = [1, 2, 3];
console.log("Array elements:", strings[0], numbers[0]);
// Runtime function calls
function exampleFunc(a, b) {
    console.log("Called with:", a, b);
}
exampleFunc("hello", 42);
// Runtime return values
const stringResult = (() => "hello")();
const booleanResult = ((x) => x > 0)(5);
console.log("Return values:", stringResult, booleanResult);
// Runtime filtering
const mixedArray = ["hello", 42, true, "world"];
const stringOnly = mixedArray.filter((item) => typeof item === "string");
console.log("Filtered strings:", stringOnly);
// Runtime usage
function testFunc(a, b) {
    return a.length > b;
}
const params = ["hello", 3];
const result = testFunc(...params);
const nonNull = "hello";
console.log("Utility types work:", result, nonNull);
// Runtime promise usage
async function demoPromises() {
    const promise = Promise.resolve("success");
    const awaited = await promise;
    console.log("Awaited result:", awaited);
}
demoPromises();
// Runtime array operations
const fruits = ["apple", "banana", "orange"];
const firstFruit = fruits[0];
console.log("First fruit:", firstFruit);
// Runtime result handling
function handleResult(result) {
    if (result.success) {
        const data = result.data;
        console.log("Success:", data);
    }
    else {
        const error = result.error;
        console.log("Error:", error.message);
    }
}
const successResult = { success: true, data: "Hello" };
const errorResult = {
    success: false,
    error: new Error("Failed"),
};
handleResult(successResult);
handleResult(errorResult);
// Runtime filtering functions
function filterNumbers(arr) {
    return arr.filter((item) => typeof item === "number");
}
function filterStrings(arr) {
    return arr.filter((item) => typeof item === "string");
}
const mixed = [1, "hello", true, 42, "world"];
console.log("Numbers:", filterNumbers(mixed));
console.log("Strings:", filterStrings(mixed));
// End of Conditional Types examples in TypeScript
//# sourceMappingURL=M06V10.js.map