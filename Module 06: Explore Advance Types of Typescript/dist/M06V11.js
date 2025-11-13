"use strict";
// 6-11: Explore Mapped Types in TypeScript
Object.defineProperty(exports, "__esModule", { value: true });
// Usage examples
const person = {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com'
};
const partialPerson = {
    name: 'Jane Doe'
};
const readonlyPerson = {
    name: 'Alice',
    age: 25,
    email: 'alice@example.com'
};
// readonlyPerson.age = 26; // Error: Cannot assign to 'age' because it is a read-only property
const stringPerson = {
    name: 'Bob',
    age: '30',
    email: 'bob@example.com'
};
const record = {
    key1: 'value1',
    key2: 'value2'
};
const numberRecord = {
    a: 1,
    b: 2,
    c: 3
};
console.log('Mapped types exploration complete!');
//# sourceMappingURL=M06V11.js.map