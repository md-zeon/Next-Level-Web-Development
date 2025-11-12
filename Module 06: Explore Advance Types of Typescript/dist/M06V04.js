"use strict";
// TypeScript Generics with Interfaces - Comprehensive Examples
// Combining generics and interfaces for powerful abstractions
Object.defineProperty(exports, "__esModule", { value: true });
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
console.log("Basic Generic Interface:");
let strContainer = new StringContainer();
strContainer.setValue("Hello Generics");
console.log("String container:", strContainer.getValue());
let numContainer = new NumberContainer();
numContainer.setValue(42);
console.log("Number container:", numContainer.getValue());
class NumberStringPair {
    first;
    second;
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }
    toString() {
        return `${this.first} -> ${this.second}`;
    }
    getTypes() {
        return `${typeof this.first} -> ${typeof this.second}`;
    }
}
console.log("Generic Interface with Multiple Type Parameters:");
let pair = new NumberStringPair(42, "hello");
console.log("Original:", pair.toString());
console.log("Types:", pair.getTypes());
class UserRepository {
    users = [];
    findById(id) {
        return this.users.find((user) => user.id === id) || null;
    }
    findAll() {
        return [...this.users];
    }
    save(entity) {
        const existingIndex = this.users.findIndex((user) => user.id === entity.id);
        if (existingIndex > -1) {
            this.users[existingIndex] = entity;
        }
        else {
            this.users.push(entity);
        }
        return entity;
    }
    delete(id) {
        const index = this.users.findIndex((user) => user.id === id);
        if (index > -1) {
            this.users.splice(index, 1);
            return true;
        }
        return false;
    }
    findByName(name) {
        return this.users.filter((user) => user.name.toLowerCase().includes(name.toLowerCase()));
    }
}
console.log("Generic Constraints with Interfaces:");
const userRepo = new UserRepository();
userRepo.save({ id: 1, name: "Alice", email: "alice@example.com", age: 30 });
userRepo.save({ id: 2, name: "Bob", email: "bob@example.com", age: 25 });
userRepo.save({
    id: 3,
    name: "Alice Smith",
    email: "alice.smith@example.com",
    age: 28,
});
console.log("All users:", userRepo.findAll());
console.log("Find by ID 2:", userRepo.findById(2));
console.log("Find by name 'Alice':", userRepo.findByName("Alice"));
function createFactory(ctor) {
    return {
        create: () => new ctor(),
        createMany: (count) => Array.from({ length: count }, () => new ctor()),
    };
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
    toString() {
        return `${this.name} ($${this.price})`;
    }
}
console.log("Constructor Interface with Generics:");
const productFactory = createFactory(Product);
const products = productFactory.createMany(3);
products.forEach((product, index) => {
    Object.assign(product, {
        id: index + 1,
        name: `Product ${index + 1}`,
        price: (index + 1) * 10,
    });
});
products.forEach((product) => console.log("Created product:", product.toString()));
class ApiClient {
    baseUrl;
    constructor(baseUrl = "https://api.example.com") {
        this.baseUrl = baseUrl;
    }
    async get(endpoint) {
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 100));
            // Mock successful response
            return {
                success: true,
                data: { id: 1, name: "Mock Data" },
                error: null,
                timestamp: Date.now(),
            };
        }
        catch (error) {
            return {
                success: false,
                data: null,
                error: error instanceof Error ? error.message : "Unknown error",
                timestamp: Date.now(),
            };
        }
    }
    async getPaginated(endpoint, page = 1) {
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 100));
            // Mock paginated response
            return {
                success: true,
                data: [
                    { id: 1, name: "Item 1" },
                    { id: 2, name: "Item 2" },
                ],
                error: null,
                timestamp: Date.now(),
                pagination: {
                    page,
                    limit: 10,
                    total: 25,
                    totalPages: 3,
                },
            };
        }
        catch (error) {
            return {
                success: false,
                data: null,
                error: error instanceof Error ? error.message : "Unknown error",
                timestamp: Date.now(),
                pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
            };
        }
    }
}
console.log("Generic Interface for API Responses:");
const apiClient = new ApiClient();
// Test regular response
apiClient.get("/users/1").then((response) => {
    if (response.success) {
        console.log("User fetched:", response.data);
    }
    else {
        console.log("Error:", response.error);
    }
});
// Test paginated response
apiClient.getPaginated("/users", 1).then((response) => {
    if (response.success) {
        console.log("Users fetched:", response.data?.length, "items");
        console.log("Pagination:", response.pagination);
    }
    else {
        console.log("Error:", response.error);
    }
});
class GenericCollection {
    items = [];
    add(item) {
        this.items.push(item);
    }
    remove(item) {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }
    find(predicate) {
        return this.items.find(predicate);
    }
    filter(predicate) {
        return this.items.filter(predicate);
    }
    map(transform) {
        return this.items.map(transform);
    }
    reduce(reducer, initialValue) {
        return this.items.reduce(reducer, initialValue);
    }
    size() {
        return this.items.length;
    }
    isEmpty() {
        return this.items.length === 0;
    }
}
console.log("Generic Interface for Data Structures:");
const numberCollection = new GenericCollection();
numberCollection.add(1);
numberCollection.add(2);
numberCollection.add(3);
numberCollection.add(4);
numberCollection.add(5);
console.log("Collection size:", numberCollection.size());
console.log("Even numbers:", numberCollection.filter((n) => n % 2 === 0));
console.log("Doubled numbers:", numberCollection.map((n) => n * 2));
console.log("Sum:", numberCollection.reduce((sum, n) => sum + n, 0));
class AppEventEmitter {
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
            this.listeners[event] = this.listeners[event].filter((l) => l !== listener);
        }
        else {
            delete this.listeners[event];
        }
    }
    emit(event, data) {
        const eventListeners = this.listeners[event];
        if (eventListeners) {
            eventListeners.forEach((listener) => {
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
}
console.log("Generic Interface for Event Systems:");
const appEvents = new AppEventEmitter();
// Add listeners
appEvents.on("user_login", (data) => {
    console.log(`User ${data.userId} logged in at ${new Date(data.timestamp)}`);
});
appEvents.on("error_occurred", (data) => {
    console.log(`Error ${data.code}: ${data.message}`);
});
appEvents.once("data_updated", (data) => {
    console.log(`Data updated for ${data.entity} with ID ${data.id}`);
});
// Trigger events
appEvents.emit("user_login", { userId: 123, timestamp: Date.now() });
appEvents.emit("error_occurred", { message: "Network timeout", code: 500 });
appEvents.emit("data_updated", {
    entity: "user",
    id: 123,
    changes: { lastLogin: new Date() },
});
console.log("Listeners for user_login:", appEvents.listenerCount("user_login"));
class Storage {
    value = null;
    capacity;
    constructor(capacity = 1) {
        this.capacity = capacity;
    }
    read() {
        if (this.value === null) {
            throw new Error("No value stored");
        }
        return this.value;
    }
    isEmpty() {
        return this.value === null;
    }
    peek() {
        return this.value || undefined;
    }
    write(value) {
        this.value = value;
    }
    clear() {
        this.value = null;
    }
    isFull() {
        return this.value !== null;
    }
    update(transform) {
        if (this.value !== null) {
            this.value = transform(this.value);
        }
    }
    size() {
        return this.value === null ? 0 : 1;
    }
}
console.log("Generic Interface Inheritance:");
const stringStorage = new Storage();
stringStorage.write("Hello");
console.log("Read:", stringStorage.read());
console.log("Is empty:", stringStorage.isEmpty());
console.log("Size:", stringStorage.size());
stringStorage.update((str) => str.toUpperCase());
console.log("After update:", stringStorage.read());
function safeJsonParse(json) {
    try {
        const data = JSON.parse(json);
        return { success: true, data };
    }
    catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error : new Error("Parse error"),
        };
    }
}
function safeHttpRequest(url) {
    return fetch(url)
        .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
    })
        .then((data) => ({
        success: true,
        data,
        statusCode: 200,
        headers: {},
    }))
        .catch((error) => ({
        success: false,
        error: error.message,
        statusCode: 500,
        headers: {},
    }));
}
console.log("Generic Interface with Default Type Parameters:");
const parseResult = safeJsonParse('{"name": "John", "age": 30}');
if (parseResult.success) {
    console.log("Parsed data:", parseResult.data);
}
else {
    console.log("Parse error:", parseResult.error);
}
class InMemoryDatabase {
    data = [];
    get(param1, param2) {
        // Single ID lookup
        if (typeof param1 === "number") {
            return this.data.find((item) => item.id === param1) || null;
        }
        // Field-based lookup
        if (typeof param2 !== "undefined" && typeof param1 !== "string") {
            return this.data.filter((item) => item[param1] === param2);
        }
        // Conditions-based lookup
        if (typeof param1 === "string" && typeof param2 === "object") {
            return this.data.filter((item) => {
                return Object.entries(param2).every(([key, value]) => item[key] === value);
            });
        }
        return null;
    }
    insert(item) {
        this.data.push(item);
        return item;
    }
}
console.log("Generic Interface with Method Overloads:");
const db = new InMemoryDatabase();
db.insert({ id: 1, name: "Alice", email: "alice@example.com", age: 30 });
db.insert({ id: 2, name: "Bob", email: "bob@example.com", age: 25 });
db.insert({ id: 3, name: "Charlie", email: "charlie@example.com", age: 35 });
console.log("Get by ID:", db.get(1));
console.log("Get by email field:", db.get("email", "bob@example.com"));
console.log("Get by conditions:", db.get("users", { age: 30 }));
class ValidationMiddleware {
    validator;
    constructor(validator) {
        this.validator = validator;
    }
    process(input) {
        if (!this.validator(input)) {
            throw new Error("Validation failed");
        }
        return input;
    }
    pipe(next) {
        return {
            process: (input) => next.process(this.process(input)),
            pipe: (nextNext) => this.pipe(next).pipe(nextNext),
        };
    }
}
class TransformMiddleware {
    transformer;
    constructor(transformer) {
        this.transformer = transformer;
    }
    process(input) {
        return this.transformer(input);
    }
    pipe(next) {
        return {
            process: (input) => next.process(this.process(input)),
            pipe: (nextNext) => this.pipe(next).pipe(nextNext),
        };
    }
}
class LoggingMiddleware {
    label;
    constructor(label) {
        this.label = label;
    }
    process(input) {
        console.log(`${this.label}:`, input);
        return input;
    }
    pipe(next) {
        return {
            process: (input) => next.process(this.process(input)),
            pipe: (nextNext) => this.pipe(next).pipe(nextNext),
        };
    }
}
console.log("Generic Interface for Middleware:");
const validationMiddleware = new ValidationMiddleware((n) => n > 0);
const transformMiddleware = new TransformMiddleware((n) => `Value: ${n}`);
const loggingMiddleware = new LoggingMiddleware("Result");
const pipeline = validationMiddleware
    .pipe(transformMiddleware)
    .pipe(loggingMiddleware);
try {
    const result = pipeline.process(42);
    console.log("Pipeline result:", result);
}
catch (error) {
    console.log("Pipeline error:", error);
}
class Store {
    state;
    listeners = [];
    reducer;
    constructor(initialState, reducer) {
        this.state = initialState;
        this.reducer = reducer;
    }
    getState() {
        return this.state;
    }
    setState(updater) {
        this.state = updater(this.state);
        this.listeners.forEach((listener) => listener(this.state));
    }
    dispatch(action) {
        this.state = this.reducer(this.state, action);
        this.listeners.forEach((listener) => listener(this.state));
    }
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            const index = this.listeners.indexOf(listener);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        };
    }
    select(selector) {
        return selector(this.state);
    }
}
console.log("Generic Interface for State Management:");
const initialState = {
    counter: 0,
    user: null,
};
const appReducer = (state, action) => {
    switch (action.type) {
        case "INCREMENT":
            return { ...state, counter: state.counter + 1 };
        case "DECREMENT":
            return { ...state, counter: state.counter - 1 };
        case "SET_USER":
            return { ...state, user: { name: action.payload.name, loggedIn: true } };
        case "LOGOUT":
            return { ...state, user: null };
        default:
            return state;
    }
};
const store = new Store(initialState, appReducer);
// Subscribe to state changes
const unsubscribe = store.subscribe((state) => {
    console.log("State updated:", state);
});
// Dispatch actions
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "SET_USER", payload: { name: "Alice" } });
store.dispatch({ type: "DECREMENT" });
// Use selector
const counterValue = store.select((state) => state.counter);
console.log("Current counter value:", counterValue);
unsubscribe();
console.log("Complex Generic Interface Patterns:");
console.log("All examples completed successfully!");
//# sourceMappingURL=M06V04.js.map