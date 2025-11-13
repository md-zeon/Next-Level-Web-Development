"use strict";
// 6-12: Explore Utility Types in TypeScript
Object.defineProperty(exports, "__esModule", { value: true });
// Example 10: Parameters<T> - Extracts parameter types from a function
function createUser(name, email, age) {
    return { id: Math.random(), name, email, age: age || 18 };
}
// Example 12: InstanceType<T> - Extracts instance type from a class constructor
class UserService {
    users;
    constructor(users = []) {
        this.users = users;
    }
    findById(id) {
        return this.users.find(user => user.id === id);
    }
    create(userData) {
        const user = { ...userData, id: Math.random() };
        this.users.push(user);
        return user;
    }
}
// Example 14: ThisParameterType<T> - Extracts 'this' parameter type
function logUser(message) {
    console.log(`${this.name}: ${message}`);
}
const handlers = {
    onclick(event) {
        // 'this' is HTMLElement
        this.style.backgroundColor = 'red';
    },
    onsubmit(event) {
        // 'this' is HTMLFormElement
        event.preventDefault();
    }
};
async function fetchUser() {
    return { id: 1, name: 'John', email: 'john@example.com', age: 30 };
}
// Usage examples
const partialUser = {
    name: 'John Doe',
    email: 'john@example.com'
};
const readonlyUser = {
    id: 1,
    name: 'Jane Doe',
    email: 'jane@example.com',
    age: 25
};
// readonlyUser.age = 26; // Error: Cannot assign to 'age' because it is a read-only property
const userBasicInfo = {
    name: 'Alice',
    email: 'alice@example.com'
};
const userWithoutId = {
    name: 'Bob',
    email: 'bob@example.com',
    age: 30
};
const activeStatuses = ['active', 'pending'];
const stringDict = {
    key1: 'value1',
    key2: 'value2'
};
const numberRec = {
    a: 1,
    b: 2,
    c: 3
};
// Function parameter extraction
function validateUser(name, email, age) {
    return name.length > 0 && email.includes('@') && age >= 18;
}
// Class instance type
const userService = new UserService();
// Form example
const userForm = {
    name: { value: 'John', touched: false },
    email: { value: 'john@example.com', touched: true, error: 'Invalid email' },
    age: { value: 30, touched: true }
};
console.log('Utility types exploration complete!');
//# sourceMappingURL=M06V12.js.map