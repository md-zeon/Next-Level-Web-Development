"use strict";
// TypeScript Generics - Comprehensive Examples
// Generics provide type-safe reusability
Object.defineProperty(exports, "__esModule", { value: true });
// Example 1: Basic Generic Functions
function identity(arg) {
    return arg;
}
console.log("Identity function:");
console.log(identity("Hello World")); // "Hello World"
console.log(identity(42)); // 42
console.log(identity(true)); // true
// Type inference also works
console.log(identity("TypeScript")); // "TypeScript" (string inferred)
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
strContainer.setValue("Hello Generics");
console.log("String container:", strContainer.getValue());
let numContainer = new NumberContainer();
numContainer.setValue(99);
console.log("Number container:", numContainer.getValue());
// Example 3: Generic Classes
class Stack {
    items = [];
    push(item) {
        this.items.push(item);
    }
    pop() {
        return this.items.pop();
    }
    peek() {
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.items.length === 0;
    }
    size() {
        return this.items.length;
    }
}
let stringStack = new Stack();
stringStack.push("Hello");
stringStack.push("World");
stringStack.push("TypeScript");
console.log("String stack:");
console.log("Size:", stringStack.size());
console.log("Peek:", stringStack.peek());
console.log("Pop:", stringStack.pop());
console.log("Size after pop:", stringStack.size());
let numberStack = new Stack();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);
console.log("Number stack:");
console.log("Size:", numberStack.size());
console.log("Pop:", numberStack.pop());
function logLength(arg) {
    console.log(`Length: ${arg.length}`);
    return arg;
}
console.log("Generic constraints:");
logLength("Hello"); // OK - string has length
logLength([1, 2, 3, 4]); // OK - array has length
logLength({ length: 10, value: "test" }); // OK - object has length property
function processEntity(entity) {
    return `Entity ${entity.name} has ID ${entity.id}`;
}
let user = { id: 1, name: "John", email: "john@example.com" };
console.log("Multiple constraints:", processEntity(user));
// Example 6: Constructor Constraints
function createInstance(ctor) {
    return new ctor();
}
class MyClass {
    message = "Hello from MyClass";
    getMessage() {
        return this.message;
    }
}
let instance = createInstance(MyClass);
console.log("Constructor constraint:", instance.getMessage());
let partialUser = { name: "John" };
console.log("Partial user:", partialUser);
let completeUser = {
    id: 1,
    name: "John",
    email: "john@example.com",
    age: 30
};
console.log("Complete user:", completeUser);
let immutableUser = {
    id: 1,
    name: "John",
    email: "john@example.com"
};
let basicInfo = { id: 1, name: "John" };
console.log("Basic info:", basicInfo);
let userWithoutId = {
    name: "John",
    email: "john@example.com",
    age: 30
};
console.log("User without ID:", userWithoutId);
let dict = {
    "hello": "world",
    "foo": "bar",
    "typescript": "awesome"
};
console.log("String dictionary:", dict);
function createArray(length, value) {
    return value !== undefined
        ? Array(length).fill(value)
        : Array(length);
}
console.log("Generic function overloads:");
console.log("Numbers:", createArray(5, 0)); // [0, 0, 0, 0, 0]
console.log("Strings:", createArray(3, "hello")); // ["hello", "hello", "hello"]
console.log("Empty:", createArray(3)); // [undefined, undefined, undefined]
// Example 9: Generic Classes with Multiple Type Parameters
class Pair {
    first;
    second;
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }
    swap() {
        return new Pair(this.second, this.first);
    }
    toString() {
        return `${this.first} -> ${this.second}`;
    }
    getTypes() {
        return `${typeof this.first} -> ${typeof this.second}`;
    }
}
console.log("Generic classes with multiple parameters:");
let stringNumberPair = new Pair("hello", 42);
console.log("Original:", stringNumberPair.toString());
console.log("Types:", stringNumberPair.getTypes());
let swappedPair = stringNumberPair.swap();
console.log("Swapped:", swappedPair.toString());
console.log("Swapped types:", swappedPair.getTypes());
class NumberComparator {
    compare(a, b) {
        return a - b;
    }
}
class StringComparator {
    compare(a, b) {
        return a.localeCompare(b);
    }
}
class ReverseNumberComparator {
    compare(a, b) {
        return b - a;
    }
}
function sortArray(arr, comparator) {
    return [...arr].sort(comparator.compare);
}
console.log("Generic interfaces with methods:");
let numbers = [3, 1, 4, 1, 5, 9, 2, 6];
let sortedNumbers = sortArray(numbers, new NumberComparator());
console.log("Sorted numbers:", sortedNumbers);
let reverseSorted = sortArray(numbers, new ReverseNumberComparator());
console.log("Reverse sorted:", reverseSorted);
let strings = ["banana", "apple", "cherry", "date"];
let sortedStrings = sortArray(strings, new StringComparator());
console.log("Sorted strings:", sortedStrings);
// Example 11: Generic Constraints with keyof
function getProperty(obj, key) {
    return obj[key];
}
function setProperty(obj, key, value) {
    obj[key] = value;
}
let person = { name: "John", age: 30, email: "john@example.com" };
console.log("Generic constraints with keyof:");
console.log("Name:", getProperty(person, "name"));
console.log("Age:", getProperty(person, "age"));
console.log("Email:", getProperty(person, "email"));
setProperty(person, "age", 31);
console.log("Updated age:", person.age);
console.log("Conditional types:");
let a = "Yes";
let b = "No";
let optionalProduct = { name: "Laptop" };
let readonlyProduct = { id: 1, name: "Laptop", price: 999 };
// readonlyProduct.price = 899; // Error: readonly property
let nullableProduct = {
    id: null,
    name: "Laptop",
    price: 999
};
console.log("Mapped types:");
console.log("Optional product:", optionalProduct);
console.log("Readonly product:", readonlyProduct);
console.log("Nullable product:", nullableProduct);
// Example 14: Generic Cache Implementation
class Cache {
    storage = new Map();
    set(key, value, ttl) {
        if (ttl) {
            this.storage.set(key, { value, expiry: Date.now() + ttl });
        }
        else {
            this.storage.set(key, { value });
        }
    }
    get(key) {
        const item = this.storage.get(key);
        if (!item)
            return null;
        if (item.expiry && Date.now() > item.expiry) {
            this.storage.delete(key);
            return null;
        }
        return item.value;
    }
    has(key) {
        const item = this.storage.get(key);
        if (!item)
            return false;
        if (item.expiry && Date.now() > item.expiry) {
            this.storage.delete(key);
            return false;
        }
        return true;
    }
    delete(key) {
        return this.storage.delete(key);
    }
    clear() {
        this.storage.clear();
    }
    size() {
        // Clean expired items
        for (const [key, item] of this.storage.entries()) {
            if (item.expiry && Date.now() > item.expiry) {
                this.storage.delete(key);
            }
        }
        return this.storage.size;
    }
}
console.log("Generic cache:");
const userCache = new Cache();
userCache.set('user_1', { id: 1, name: 'John', email: 'john@example.com' }, 5000);
userCache.set('user_2', { id: 2, name: 'Jane', email: 'jane@example.com' });
console.log("User 1:", userCache.get('user_1'));
console.log("User 2:", userCache.get('user_2'));
console.log("Cache size:", userCache.size());
// Example 15: Generic Linked List
class LinkedListNode {
    value;
    next;
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}
class LinkedList {
    head = null;
    _size = 0;
    add(value) {
        const newNode = new LinkedListNode(value);
        if (!this.head) {
            this.head = newNode;
        }
        else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this._size++;
    }
    remove(value) {
        if (!this.head)
            return false;
        if (this.head.value === value) {
            this.head = this.head.next;
            this._size--;
            return true;
        }
        let current = this.head;
        while (current.next) {
            if (current.next.value === value) {
                current.next = current.next.next;
                this._size--;
                return true;
            }
            current = current.next;
        }
        return false;
    }
    find(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) {
                return current;
            }
            current = current.next;
        }
        return null;
    }
    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }
    size() {
        return this._size;
    }
    isEmpty() {
        return this._size === 0;
    }
}
console.log("Generic linked list:");
const numberList = new LinkedList();
numberList.add(1);
numberList.add(2);
numberList.add(3);
numberList.add(2);
console.log("List:", numberList.toArray());
console.log("Size:", numberList.size());
console.log("Find 2:", numberList.find(2) ? "Found" : "Not found");
numberList.remove(2);
console.log("After removing 2:", numberList.toArray());
// Example 16: Generic Event System
class EventEmitter {
    listeners = {};
    on(event, listener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    }
    off(event, listener) {
        if (!this.listeners[event])
            return;
        if (listener) {
            this.listeners[event] = this.listeners[event].filter(l => l !== listener);
        }
        else {
            delete this.listeners[event];
        }
    }
    emit(event, data) {
        const eventListeners = this.listeners[event];
        if (eventListeners) {
            eventListeners.forEach(listener => {
                try {
                    listener(data);
                }
                catch (error) {
                    console.error(`Error in event listener for ${event}:`, error);
                }
            });
        }
    }
    once(event, listener) {
        const onceListener = (data) => {
            listener(data);
            this.off(event, onceListener);
        };
        this.on(event, onceListener);
    }
    listenerCount(event) {
        return this.listeners[event]?.length || 0;
    }
    eventNames() {
        return Object.keys(this.listeners);
    }
}
console.log("Generic event system:");
const appEvents = new EventEmitter();
// Add listeners
appEvents.on('user_login', (user) => {
    console.log('User logged in:', user?.name);
});
appEvents.on('user_logout', () => {
    console.log('User logged out');
});
appEvents.on('error_occurred', (error) => {
    console.error('An error occurred:', error?.message);
});
// Trigger events
appEvents.emit('user_login', { id: 1, name: 'Alice' });
appEvents.emit('error_occurred', { message: 'Network error' });
appEvents.emit('user_logout');
console.log("Event names:", appEvents.eventNames());
console.log("Listeners for user_login:", appEvents.listenerCount('user_login'));
class ApiClient {
    baseUrl;
    constructor(baseUrl = 'https://api.example.com') {
        this.baseUrl = baseUrl;
    }
    async get(endpoint) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return {
                success: true,
                data,
                timestamp: Date.now()
            };
        }
        catch (error) {
            return {
                success: false,
                data: null,
                error: error instanceof Error ? error.message : 'Unknown error',
                timestamp: Date.now()
            };
        }
    }
    async post(endpoint, data) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.json();
            return {
                success: true,
                data: responseData,
                timestamp: Date.now()
            };
        }
        catch (error) {
            return {
                success: false,
                data: null,
                error: error instanceof Error ? error.message : 'Unknown error',
                timestamp: Date.now()
            };
        }
    }
}
// Simulate API calls (would work with real API)
console.log("Generic API client:");
const apiClient = new ApiClient();
// Mock responses for demonstration
function mockApiCall(data, shouldFail = false) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (shouldFail) {
                resolve({
                    success: false,
                    data: null,
                    error: 'Mock API error',
                    timestamp: Date.now()
                });
            }
            else {
                resolve({
                    success: true,
                    data,
                    timestamp: Date.now()
                });
            }
        }, 100);
    });
}
// Test the API client pattern
async function testApiClient() {
    console.log("Testing API client...");
    let userResponse = await mockApiCall({ id: 1, name: 'John', email: 'john@example.com' });
    if (userResponse.success) {
        console.log('User fetched:', userResponse.data);
    }
    else {
        console.log('Error fetching user:', userResponse.error);
    }
    let errorResponse = await mockApiCall(null, true);
    if (!errorResponse.success) {
        console.log('Expected error:', errorResponse.error);
    }
}
testApiClient();
// Example 18: Generic Filter Function
function filterByProperty(items, property, value) {
    return items.filter(item => item[property] === value);
}
function filterByCondition(items, condition) {
    return items.filter(condition);
}
console.log("Generic filter functions:");
let users = [
    { id: 1, name: 'Alice', age: 25, active: true },
    { id: 2, name: 'Bob', age: 30, active: false },
    { id: 3, name: 'Charlie', age: 35, active: true },
    { id: 4, name: 'Diana', age: 28, active: true }
];
let activeUsers = filterByProperty(users, 'active', true);
console.log('Active users:', activeUsers);
let adults = filterByCondition(users, user => user.age >= 30);
console.log('Adult users:', adults);
// Example 19: Generic Utility Functions
function pluck(items, key) {
    return items.map(item => item[key]);
}
function groupBy(items, key) {
    return items.reduce((groups, item) => {
        const groupKey = String(item[key]);
        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }
        groups[groupKey].push(item);
        return groups;
    }, {});
}
function unique(items) {
    return [...new Set(items)];
}
function first(items) {
    return items[0];
}
function last(items) {
    return items[items.length - 1];
}
console.log("Generic utility functions:");
console.log('User names:', pluck(users, 'name'));
console.log('User ages:', pluck(users, 'age'));
let groupedByActive = groupBy(users, 'active');
console.log('Grouped by active:', groupedByActive);
let ages = pluck(users, 'age');
console.log('Unique ages:', unique(ages));
console.log('First user:', first(users));
console.log('Last user:', last(users));
class GenericFactory {
    creator;
    constructor(creator) {
        this.creator = creator;
    }
    create() {
        return this.creator();
    }
    createMany(count) {
        return Array.from({ length: count }, () => this.creator());
    }
}
// Usage with different types
class RandomNumberGenerator {
    generate() {
        return Math.floor(Math.random() * 100);
    }
}
class TimestampGenerator {
    generate() {
        return new Date();
    }
}
console.log("Generic factory pattern:");
const numberFactory = new GenericFactory(() => new RandomNumberGenerator());
const timestampFactory = new GenericFactory(() => new TimestampGenerator());
const generators = numberFactory.createMany(3);
generators.forEach(gen => console.log('Random number:', gen.generate()));
const timestamps = timestampFactory.createMany(2);
timestamps.forEach(ts => console.log('Timestamp:', ts.generate()));
console.log("Generics examples completed!");
//# sourceMappingURL=M06V03.js.map