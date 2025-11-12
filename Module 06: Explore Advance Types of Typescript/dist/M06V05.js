"use strict";
// TypeScript Generics with Functions - Comprehensive Examples
// Exploring generic functions, constraints, overloads, and advanced patterns
Object.defineProperty(exports, "__esModule", { value: true });
// Example 1: Basic Generic Functions
function identity(arg) {
    return arg;
}
function swap(a, b) {
    return [b, a];
}
console.log("Basic Generic Functions:");
console.log("Identity string:", identity("Hello World"));
console.log("Identity number:", identity(42));
console.log("Swap:", swap("hello", 42));
class DataProcessor {
    data;
    constructor(data) {
        this.data = data;
    }
    process(input) {
        return input;
    }
    map(transform) {
        return this.data.map(transform);
    }
}
console.log("Generic Function Types:");
let stringLength = (s) => s.length;
let numberToString = (n) => n.toString();
console.log("String length:", stringLength("hello"));
console.log("Number to string:", numberToString(42));
let parseJson = JSON.parse;
let stringifyJson = JSON.stringify;
console.log("Parse JSON:", parseJson('{"name": "John"}'));
console.log("Stringify JSON:", stringifyJson({ name: "John" }));
let numberProcessor = new DataProcessor([1, 2, 3, 4, 5]);
console.log("Process numbers:", numberProcessor.map(n => n * 2));
function getLength(arg) {
    return arg.length;
}
function createEntity(entity) {
    return {
        ...entity,
        createdAt: new Date()
    };
}
function getProperty(obj, key) {
    return obj[key];
}
console.log("Generic Constraints:");
console.log("String length:", getLength("hello"));
console.log("Array length:", getLength([1, 2, 3]));
console.log("Object length:", getLength({ length: 10 }));
let user = createEntity({ id: 1, name: "Alice", email: "alice@example.com" });
console.log("Created entity:", user);
let person = { name: "John", age: 30 };
console.log("Get property name:", getProperty(person, "name"));
console.log("Get property age:", getProperty(person, "age"));
function processValue(value) {
    if (typeof value === "string") {
        return value.split("");
    }
    if (typeof value === "number") {
        return value * 2;
    }
    return value;
}
function fetchData(url, options) {
    // Mock implementation
    return Promise.resolve({
        data: {},
        status: 200
    });
}
console.log("Generic Function Overloads:");
console.log("Process string:", processValue("hello"));
console.log("Process number:", processValue(42));
console.log("Process boolean:", processValue(true));
// Example 5: Higher-Order Generic Functions
function createGetter() {
    return function (obj, key) {
        return obj[key];
    };
}
function compose(f, g) {
    return (x) => f(g(x));
}
function curry(fn) {
    return (a) => (b) => fn(a, b);
}
console.log("Higher-Order Generic Functions:");
let getUserProp = createGetter();
let sampleUser = { id: 1, name: "Alice", email: "alice@example.com" };
console.log("Get user name:", getUserProp(sampleUser, "name"));
let addOne = (x) => x + 1;
let double = (x) => x * 2;
let stringifyNum = (x) => x.toString();
let composed = compose(stringifyNum, compose(double, addOne));
console.log("Composed function result:", composed(5));
function add(a, b) {
    return a + b;
}
let curriedAdd = curry(add);
let addFive = curriedAdd(5);
console.log("Curried add result:", addFive(3));
// Example 6: Generic Utility Functions
function first(array) {
    return array[0];
}
function last(array) {
    return array[array.length - 1];
}
function reverse(array) {
    return [...array].reverse();
}
function unique(array) {
    return Array.from(new Set(array));
}
function pick(obj, keys) {
    let result = {};
    keys.forEach(key => {
        if (key in obj) {
            result[key] = obj[key];
        }
    });
    return result;
}
function omit(obj, keys) {
    let result = { ...obj };
    keys.forEach(key => {
        delete result[key];
    });
    return result;
}
function isArray(value) {
    return Array.isArray(value);
}
function isDefined(value) {
    return value !== undefined && value !== null;
}
console.log("Generic Utility Functions:");
let numbers = [1, 2, 3, 4, 5];
console.log("First:", first(numbers));
console.log("Last:", last(numbers));
console.log("Reverse:", reverse(numbers));
console.log("Unique:", unique([1, 2, 2, 3, 3, 3]));
let fullUserObj = { id: 1, name: "Alice", email: "alice@example.com", password: "secret" };
console.log("Pick:", pick(fullUserObj, ["id", "name", "email"]));
console.log("Omit:", omit(fullUserObj, ["password"]));
function processItems(items) {
    if (isArray(items)) {
        return items;
    }
    return [items];
}
console.log("Process items:", processItems([1, 2, 3]));
console.log("Process single item:", processItems(42));
function createInstance(ctor, ...args) {
    return new ctor(...args);
}
function createFactory(ctor) {
    return (...args) => new ctor(...args);
}
class Product {
    id;
    name;
    price;
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
console.log("Generic Factory Functions:");
let productFactory = createFactory(Product);
let product1 = productFactory(1, "Widget", 29.99);
let product2 = createInstance(Product, 2, "Gadget", 49.99);
console.log("Factory product:", product1);
console.log("Instance product:", product2);
// Example 8: Generic Async Functions
async function fetchJson(url) {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 100));
    return { id: 1, name: "Mock Data" };
}
async function retry(fn, maxAttempts = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        }
        catch (error) {
            if (attempt === maxAttempts) {
                throw error;
            }
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error("Max attempts reached");
}
console.log("Generic Async Functions:");
let fetchUserFn = () => fetchJson("/api/user/1");
retry(fetchUserFn, 3, 500).then(user => {
    console.log("Fetched user:", user);
}).catch(error => {
    console.log("Error:", error);
});
// Example 9: Generic Memoization
function memoize(fn) {
    let cache = new Map();
    return ((...args) => {
        let key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        let result = fn(...args);
        cache.set(key, result);
        return result;
    });
}
console.log("Generic Memoization:");
function expensiveCalculation(n) {
    console.log(`Calculating for ${n}`);
    return n * n;
}
let memoizedCalculation = memoize(expensiveCalculation);
console.log("First call:", memoizedCalculation(5));
console.log("Second call (cached):", memoizedCalculation(5));
console.log("Third call (cached):", memoizedCalculation(5));
function createEntityCrud(entity) {
    return { ...entity, id: Date.now() };
}
function updateEntity(entity, updates) {
    return { ...entity, ...updates };
}
function findById(entities, id) {
    return entities.find(entity => entity.id === id);
}
function validateField(value, rules) {
    return rules
        .filter(rule => !rule.validate(value))
        .map(rule => rule.message);
}
function validateObject(obj, validators) {
    let errors = {};
    for (let key in validators) {
        let fieldValidators = validators[key];
        if (fieldValidators) {
            let fieldErrors = validateField(obj[key], fieldValidators);
            if (fieldErrors.length > 0) {
                errors[key] = fieldErrors;
            }
        }
    }
    return errors;
}
function sortBy(array, keyFn) {
    return [...array].sort((a, b) => {
        let aVal = keyFn(a);
        let bVal = keyFn(b);
        if (aVal < bVal)
            return -1;
        if (aVal > bVal)
            return 1;
        return 0;
    });
}
function groupBy(array, keyFn) {
    return array.reduce((groups, item) => {
        let key = keyFn(item);
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(item);
        return groups;
    }, {});
}
console.log("Common Generic Function Patterns:");
let newUserEntity = createEntityCrud({ name: "Bob", email: "bob@example.com", age: 25 });
console.log("Created user:", newUserEntity);
let updatedUserEntity = updateEntity(newUserEntity, { name: "Bobby" });
console.log("Updated user:", updatedUserEntity);
let userList = [
    { id: 1, name: "Alice", email: "alice@example.com", age: 30 },
    { id: 2, name: "Bob", email: "bob@example.com", age: 25 },
    { id: 3, name: "Charlie", email: "charlie@example.com", age: 35 }
];
console.log("Find by ID:", findById(userList, 2));
let nameValidationRules = [
    { validate: (s) => s.length > 0, message: "Name is required" },
    { validate: (s) => s.length >= 2, message: "Name must be at least 2 characters" }
];
let ageValidationRules = [
    { validate: (n) => n >= 18, message: "Must be 18 or older" },
    { validate: (n) => n <= 120, message: "Age must be realistic" }
];
let userValidatorsObj = {
    name: nameValidationRules,
    age: ageValidationRules
};
let testUserObj = { name: "A", age: 15 };
let validationErrorsObj = validateObject(testUserObj, userValidatorsObj);
console.log("Validation errors:", validationErrorsObj);
let sortedUsersList = sortBy(userList, user => user.age);
console.log("Sorted by age:", sortedUsersList);
let groupedByAgeDecade = groupBy(userList, user => Math.floor(user.age / 10) * 10);
console.log("Grouped by age decade:", groupedByAgeDecade);
console.log("All examples completed successfully!");
//# sourceMappingURL=M06V05.js.map