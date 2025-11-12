"use strict";
// TypeScript Generic Constraints - Comprehensive Examples
// Exploring constraint syntax, patterns, and advanced usage
Object.defineProperty(exports, "__esModule", { value: true });
function getLength(arg) {
    return arg.length;
}
console.log("Basic Constraints:");
console.log("String length:", getLength("hello"));
console.log("Array length:", getLength([1, 2, 3]));
console.log("Object length:", getLength({ length: 10 }));
function createEntity(entity) {
    return {
        ...entity,
        createdAt: new Date()
    };
}
let user = createEntity({
    id: 1,
    name: "John Doe",
    email: "john@example.com"
});
console.log("Interface Constraints:");
console.log("Created entity:", user);
// Example 3: Class Constraints
class Animal {
    name;
    constructor(name) {
        this.name = name;
    }
}
class Dog extends Animal {
    breed;
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
}
function getAnimalInfo(animal) {
    return `Animal: ${animal.name}`;
}
let dog = new Dog("Buddy", "Golden Retriever");
console.log("Class Constraints:");
console.log("Animal info:", getAnimalInfo(dog));
function createUser(userData) {
    return {
        ...userData,
        role: "user"
    };
}
let newUser = createUser({
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    age: 30
});
console.log("Multiple Constraints:");
console.log("Created user:", newUser);
function processValue(value) {
    if (typeof value === "string") {
        return value.toUpperCase();
    }
    else {
        return value.toString();
    }
}
console.log("Union Constraints:");
console.log("Process string:", processValue("hello"));
console.log("Process number:", processValue(42));
// Example 6: keyof Constraints - Basic
function getProperty(obj, key) {
    return obj[key];
}
let person = {
    name: "John",
    age: 30,
    email: "john@example.com"
};
console.log("keyof Constraints - Basic:");
console.log("Get name:", getProperty(person, "name"));
console.log("Get age:", getProperty(person, "age"));
console.log("Get email:", getProperty(person, "email"));
// Example 7: keyof Constraints - Advanced
function pick(obj, keys) {
    let result = {};
    keys.forEach(key => {
        result[key] = obj[key];
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
let fullPerson = {
    name: "Alice",
    age: 25,
    email: "alice@example.com",
    password: "secret123"
};
console.log("keyof Constraints - Advanced:");
console.log("Pick public info:", pick(fullPerson, ["name", "age", "email"]));
console.log("Omit password:", omit(fullPerson, ["password"]));
function createInstance(ctor, ...args) {
    return new ctor(...args);
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
class User {
    id;
    name;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
let product = createInstance(Product, 1, "Widget", 29.99);
let userInstance = createInstance(User, 1, "John");
console.log("Constructor Constraints:");
console.log("Created product:", product);
console.log("Created user:", userInstance);
function createFactory(ctor) {
    return {
        create: () => new ctor()
    };
}
class Car {
    drive() {
        console.log("Driving car...");
    }
}
let carFactory = createFactory(Car);
let car = carFactory.create();
console.log("Factory Pattern:");
car.drive();
function findMax(items) {
    if (items.length === 0)
        return null;
    return items.reduce((max, current) => current.compareTo(max) > 0 ? current : max);
}
class NumberWrapper {
    value;
    constructor(value) {
        this.value = value;
    }
    compareTo(other) {
        return this.value - other.value;
    }
}
let numbers = [
    new NumberWrapper(5),
    new NumberWrapper(2),
    new NumberWrapper(8),
    new NumberWrapper(1)
];
console.log("Method Requirements:");
console.log("Max number:", findMax(numbers)?.value);
class InMemoryRepository {
    storage = new Map();
    findById(id) {
        return this.storage.get(id) || null;
    }
    save(entity) {
        this.storage.set(entity.id, entity);
    }
    delete(id) {
        return this.storage.delete(id);
    }
}
let userRepo = new InMemoryRepository();
userRepo.save({ id: 1, name: "John", email: "john@example.com" });
userRepo.save({ id: 2, name: "Jane", email: "jane@example.com" });
console.log("Generic Classes:");
console.log("Find user 1:", userRepo.findById(1));
console.log("Find user 2:", userRepo.findById(2));
function getLength2(item) {
    return item.length;
}
function truncate(item, maxLength) {
    let str = item.toString();
    return str.substring(0, maxLength);
}
console.log("Lengthwise Pattern:");
console.log("Length:", getLength2("hello world"));
console.log("Truncated:", truncate("hello world", 5));
function sum(...values) {
    return values.reduce((total, current) => total + current.valueOf(), 0);
}
class Money {
    amount;
    currency;
    constructor(amount, currency) {
        this.amount = amount;
        this.currency = currency;
    }
    valueOf() {
        return this.amount;
    }
}
let total = sum(new Money(10, 'USD'), new Money(20, 'USD'));
console.log("Numeric Pattern:");
console.log("Total:", total);
function processCollection(collection, processor) {
    collection.items.forEach(processor);
}
class ArrayCollection {
    items = [];
    add(item) {
        this.items.push(item);
    }
    remove(item) {
        let index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }
    find(predicate) {
        return this.items.find(predicate);
    }
}
let numberCollection = new ArrayCollection();
numberCollection.add(1);
numberCollection.add(2);
numberCollection.add(3);
console.log("Collection Types:");
processCollection(numberCollection, (num) => console.log("Processing:", num));
class EventBus {
    handlers = new Map();
    subscribe(eventType, handler) {
        if (!this.handlers.has(eventType)) {
            this.handlers.set(eventType, []);
        }
        this.handlers.get(eventType).push(handler);
    }
    publish(event) {
        const handlers = this.handlers.get(event.type);
        if (handlers) {
            handlers.forEach(handler => handler.handle(event));
        }
    }
}
let eventBus = new EventBus();
eventBus.subscribe('login', {
    handle: (event) => console.log('User logged in:', event.payload)
});
eventBus.publish({ type: 'login', payload: { userId: 1 } });
console.log("Event System:");
console.log("Event published successfully");
function getUppercaseName(obj) {
    return obj.name.toUpperCase();
}
console.log("Exercise 1:");
console.log("Uppercase name:", getUppercaseName({ name: "john", age: 30 }));
function createVerifiedUser(user) {
    return {
        ...user,
        verified: true
    };
}
console.log("Exercise 2:");
console.log("Verified user:", createVerifiedUser({ id: 1, email: "test@example.com", name: "Test" }));
// Exercise 3: keyof Constraints
function updateProperty(obj, key, value) {
    return {
        ...obj,
        [key]: value
    };
}
console.log("Exercise 3:");
let originalObj = { name: "John", age: 30 };
let updatedObj = updateProperty(originalObj, "age", 31);
console.log("Updated object:", updatedObj);
// Exercise 4: Constructor Constraints
function createFactory2(ctor) {
    return () => new ctor();
}
class TestClass {
    message = "Hello from TestClass";
}
let factory = createFactory2(TestClass);
let instance = factory();
console.log("Exercise 4:");
console.log("Factory instance:", instance.message);
// Exercise 5: Advanced Constraints
function sortItems(items) {
    return [...items].sort((a, b) => a.compareTo(b));
}
class StringWrapper {
    value;
    constructor(value) {
        this.value = value;
    }
    compareTo(other) {
        return this.value.localeCompare(other.value);
    }
}
let strings = [
    new StringWrapper("zebra"),
    new StringWrapper("apple"),
    new StringWrapper("banana")
];
console.log("Exercise 5:");
console.log("Sorted strings:", sortItems(strings).map(s => s.value));
console.log("All constraint examples completed successfully!");
//# sourceMappingURL=M06V06.js.map