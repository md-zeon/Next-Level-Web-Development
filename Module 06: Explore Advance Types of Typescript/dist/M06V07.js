"use strict";
// TypeScript keyof Constraints with Generics - Comprehensive Examples
// Exploring keyof operator usage with generic constraints
Object.defineProperty(exports, "__esModule", { value: true });
function getProperty(obj, key) {
    return obj[key];
}
let person = {
    name: "John",
    age: 30,
    email: "john@example.com",
};
console.log("Basic keyof:");
console.log("Get name:", getProperty(person, "name"));
console.log("Get age:", getProperty(person, "age"));
console.log("Get email:", getProperty(person, "email"));
// Example 2: keyof with Generic Classes
class PropertyAccessor {
    obj;
    constructor(obj) {
        this.obj = obj;
    }
    get(key) {
        return this.obj[key];
    }
    set(key, value) {
        this.obj[key] = value;
    }
    has(key) {
        return key in this.obj;
    }
}
let accessor = new PropertyAccessor(person);
accessor.set("age", 31);
console.log("Generic Class:");
console.log("Updated age:", accessor.get("age"));
console.log("Has name:", accessor.has("name"));
// Example 3: Property Picker Functions
function pick(obj, keys) {
    let result = {};
    keys.forEach((key) => {
        if (key in obj) {
            result[key] = obj[key];
        }
    });
    return result;
}
function omit(obj, keys) {
    let result = { ...obj };
    keys.forEach((key) => {
        delete result[key];
    });
    return result;
}
let user = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    password: "secret123",
    createdAt: new Date(),
};
console.log("Property Pickers:");
console.log("Public user:", pick(user, ["id", "name", "email"]));
console.log("Safe user:", omit(user, ["password"]));
// Example 4: Property Updater with Validation
function updateProperty(obj, key, updater) {
    return {
        ...obj,
        [key]: updater(obj[key]),
    };
}
function validateAndUpdate(obj, key, newValue, validator) {
    if (validator(newValue)) {
        return {
            ...obj,
            [key]: newValue,
        };
    }
    return null;
}
console.log("Property Updater:");
let updatedUser = updateProperty(user, "name", (name) => name.toUpperCase());
console.log("Updated name:", updatedUser.name);
let nameValidator = (name) => name.length >= 3;
let validUpdate = validateAndUpdate(user, "name", "Bob", nameValidator);
console.log("Valid name update:", validUpdate?.name);
let invalidUpdate = validateAndUpdate(user, "name", "A", nameValidator);
console.log("Invalid name update:", invalidUpdate);
function mapProperties(obj, mappers) {
    let result = { ...obj };
    for (let key in mappers) {
        if (key in obj && mappers[key]) {
            result[key] = mappers[key](obj[key]);
        }
    }
    return result;
}
console.log("Mapped Types:");
let userMappers = {
    name: (name) => name.trim(),
    email: (email) => email.toLowerCase(),
};
let mappedUser = mapProperties(user, userMappers);
console.log("Mapped user:", mappedUser);
// Example 6: Property Existence Checker
function hasAllProperties(obj, keys) {
    return keys.every((key) => key in obj);
}
function hasAnyProperty(obj, keys) {
    return keys.some((key) => key in obj);
}
console.log("Property Checkers:");
let someObj = { name: "Test", age: 25 };
if (hasAllProperties(someObj, ["id", "name", "email"])) {
    console.log("Has all User properties");
}
else {
    console.log("Missing some User properties");
}
if (hasAnyProperty(someObj, ["name", "email"])) {
    console.log("Has some properties");
}
function addEventListener(eventName, handler) {
    console.log(`Added listener for ${eventName}`);
}
console.log("Event Handlers:");
addEventListener("click", (event) => {
    console.log(`Clicked at ${event.x}, ${event.y}`);
});
addEventListener("submit", (event) => {
    console.log("Form submitted with", event.data);
});
class ApiClient {
    async get(endpoint, params) {
        console.log(`GET /${endpoint}`, params);
        return {};
    }
    async post(endpoint, data) {
        console.log(`POST /${endpoint}`, data);
        return {};
    }
}
console.log("API Client:");
let api = new ApiClient();
api.get("users").then((users) => console.log("Got users"));
api.post("user", { name: "John", email: "john@example.com" });
// Example 9: Property Observer Pattern
class PropertyObserver {
    observers = new Map();
    observe(property, callback) {
        if (!this.observers.has(property)) {
            this.observers.set(property, []);
        }
        this.observers.get(property).push(callback);
    }
    notify(property, value) {
        let callbacks = this.observers.get(property);
        if (callbacks) {
            callbacks.forEach((callback) => callback(value));
        }
    }
}
class ObservableUserClass {
    name;
    age;
    email;
    observer = new PropertyObserver();
    constructor(name, age, email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }
    onPropertyChange(property, callback) {
        this.observer.observe(property, callback);
    }
    set(property, value) {
        this[property] = value;
        this.observer.notify(property, value);
    }
}
console.log("Property Observer:");
let obsUser = new ObservableUserClass("Alice", 30, "alice@example.com");
obsUser.onPropertyChange("name", (name) => {
    console.log(`Name changed to: ${name}`);
});
obsUser.set("name", "Alice Smith");
class DataValidator {
    rules;
    constructor(rules) {
        this.rules = rules;
    }
    validate(obj) {
        let errors = {};
        for (let key in this.rules) {
            let k = key;
            let rule = this.rules[k];
            if (rule && !rule(obj[k])) {
                errors[k] = `${String(key)} is invalid`;
            }
        }
        return errors;
    }
    isValid(obj) {
        let errors = this.validate(obj);
        return Object.keys(errors).length === 0;
    }
}
let userValidator = new DataValidator({
    name: (name) => name.length >= 2,
    age: (age) => age >= 18,
    email: (email) => email.includes("@"),
});
let testUser = {
    name: "A",
    age: 16,
    email: "invalid-email",
};
console.log("Data Validator:");
console.log("Validation errors:", userValidator.validate(testUser));
console.log("Is valid:", userValidator.isValid(testUser));
console.log("Utility Types:");
console.log("Optional keys:", {});
console.log("Required keys:", {});
console.log("String keys:", {});
console.log("Array keys:", {});
// Example 12: Generic Property Path Accessor (Simplified)
function getPropertyPath(obj, path) {
    return path.split(".").reduce((current, key) => current[key], obj);
}
function setPropertyPath(obj, path, value) {
    let keys = path.split(".");
    let result = { ...obj };
    let current = result;
    for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    return result;
}
let nestedUser = {
    profile: {
        personal: { name: "John", age: 30 },
        contact: { email: "john@example.com", phone: "123-456-7890" },
    },
    settings: { theme: "dark", notifications: true },
};
console.log("Property Paths:");
console.log("Get nested name:", getPropertyPath(nestedUser, "profile.personal.name"));
let updatedNested = setPropertyPath(nestedUser, "settings.theme", "light");
console.log("Updated theme:", getPropertyPath(updatedNested, "settings.theme"));
// Example 13: Common keyof Patterns
function mergeProperties(target, source, properties) {
    let result = { ...target };
    properties.forEach((prop) => {
        result[prop] = source[prop];
    });
    return result;
}
function compareProperties(obj1, obj2, properties) {
    return properties.every((prop) => obj1[prop] === obj2[prop]);
}
function cloneProperties(obj, properties) {
    let result = {};
    properties.forEach((prop) => {
        result[prop] = obj[prop];
    });
    return result;
}
console.log("Common Patterns:");
let obj1 = { a: 1, b: 2, c: 3 };
let obj2 = { a: 1, b: 5, c: 3 };
let merged = mergeProperties(obj1, obj2, ["a", "b"]);
console.log("Merged:", merged);
console.log("Compare equal:", compareProperties(obj1, obj1, ["a", "b"]));
console.log("Compare different:", compareProperties(obj1, obj2, ["a", "b"]));
let cloned = cloneProperties(obj1, ["a", "c"]);
console.log("Cloned:", cloned);
// Example 14: Practice Exercises Solutions
// Exercise 1: Property Getter/Setter
class PropertyManager {
    obj;
    constructor(obj) {
        this.obj = obj;
    }
    get(key) {
        return this.obj[key];
    }
    set(key, value) {
        this.obj[key] = value;
    }
    hasProperty(key) {
        return key in this.obj;
    }
}
let carManager = new PropertyManager({
    make: "Toyota",
    model: "Camry",
    year: 2020,
});
carManager.set("year", 2021);
console.log("Exercise 1:");
console.log("Car model:", carManager.get("model"));
console.log("Has year:", carManager.hasProperty("year"));
// Exercise 2: Object Transformer
function transformProperties(obj, transformers) {
    let result = { ...obj };
    for (let key in transformers) {
        if (transformers[key]) {
            result[key] = transformers[key](obj[key]);
        }
    }
    return result;
}
console.log("Exercise 2:");
let testUser2 = { name: "john", age: 25, email: "JOHN@EXAMPLE.COM" };
let transformed = transformProperties(testUser2, {
    name: (n) => n.toUpperCase(),
    email: (e) => e.toLowerCase(),
});
console.log("Transformed:", transformed);
class EventEmitter {
    handlers = new Map();
    on(event, handler) {
        if (!this.handlers.has(event)) {
            this.handlers.set(event, []);
        }
        this.handlers.get(event).push(handler);
    }
    emit(event, data) {
        let handlers = this.handlers.get(event);
        if (handlers) {
            handlers.forEach((handler) => handler(data));
        }
    }
}
console.log("Exercise 3:");
let emitter = new EventEmitter();
emitter.on("userLoggedIn", (event) => console.log(`User ${event.userId} logged in`));
emitter.emit("userLoggedIn", { userId: 123, timestamp: new Date() });
class FormValidator {
    rules = {};
    addRule(field, rule) {
        this.rules[field] = rule;
    }
    validate(obj) {
        let errors = {};
        Object.keys(this.rules).forEach((key) => {
            let k = key;
            let rule = this.rules[k];
            if (rule && !rule(obj[k])) {
                if (!errors[k]) {
                    errors[k] = [];
                }
                errors[k].push(`${key} is invalid`);
            }
        });
        return errors;
    }
}
console.log("Exercise 4:");
let validator = new FormValidator();
validator.addRule("username", (val) => val.length >= 3);
validator.addRule("email", (val) => val.includes("@"));
validator.addRule("age", (val) => val >= 18);
validator.addRule("password", (val) => val.length >= 6);
let formData = { username: "us", email: "invalid", age: 15, password: "123" };
let errors = validator.validate(formData);
console.log("Form errors:", errors);
// Exercise 5: Property Path Utilities (Simplified)
function getDeepValue(obj, path) {
    return path.split(".").reduce((current, key) => current?.[key], obj);
}
function setDeepValue(obj, path, value) {
    let keys = path.split(".");
    let result = { ...obj };
    let current = result;
    for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    return result;
}
console.log("Exercise 5:");
let deepObj = {
    user: { profile: { name: "John", settings: { theme: "dark" } } },
};
let deepName = getDeepValue(deepObj, "user.profile.name");
console.log("Deep name:", deepName);
let updatedDeep = setDeepValue(deepObj, "user.profile.settings.theme", "light");
console.log("Updated deep theme:", getDeepValue(updatedDeep, "user.profile.settings.theme"));
console.log("All keyof constraint examples completed successfully!");
//# sourceMappingURL=M06V07.js.map