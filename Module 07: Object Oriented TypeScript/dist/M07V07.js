"use strict";
// 7-7 Static Members in TypeScript
Object.defineProperty(exports, "__esModule", { value: true });
// === Basic Static Properties ===
class Circle {
    static PI = 3.14159;
    static circleCount = 0;
    radius;
    constructor(radius) {
        this.radius = radius;
        Circle.circleCount++; // Access static property
    }
    getArea() {
        return Circle.PI * this.radius ** 2; // Access static property
    }
    getCircumference() {
        return 2 * Circle.PI * this.radius;
    }
}
console.log("=== Basic Static Properties ===");
const circle1 = new Circle(5);
const circle2 = new Circle(10);
const circle3 = new Circle(7.5);
console.log(`Total circles created: ${Circle.circleCount}`); // 3
console.log(`Circle 1 area: ${circle1.getArea()}`); // 78.53975
console.log(`Circle 2 circumference: ${circle2.getCircumference()}`); // 62.8318
console.log(`PI value: ${Circle.PI}`); // 3.14159
// === Static Methods ===
class MathHelper {
    static add(a, b) {
        return a + b;
    }
    static multiply(a, b) {
        return a * b;
    }
    static power(base, exponent) {
        return Math.pow(base, exponent);
    }
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
console.log("\n=== Static Methods ===");
console.log(`5 + 3 = ${MathHelper.add(5, 3)}`);
console.log(`4 × 6 = ${MathHelper.multiply(4, 6)}`);
console.log(`2^8 = ${MathHelper.power(2, 8)}`);
console.log(`Random number between 1-10: ${MathHelper.getRandomInt(1, 10)}`);
// Called without creating an instance of MathHelper
// Note: We never do: const math = new MathHelper();
// === Static vs Instance Members ===
class Counter {
    static globalCount = 0; // Shared across all instances
    instanceCount = 0; // Unique per instance
    constructor() {
        Counter.globalCount++; // Affects all instances
        this.instanceCount = Counter.globalCount; // Instance gets current global count
    }
    static getGlobalInfo() {
        return `Total instances created: ${Counter.globalCount}`;
    }
    static resetGlobalCount() {
        Counter.globalCount = 0;
    }
    getInstanceInfo() {
        return `This is instance number ${this.instanceCount}`;
    }
}
console.log("\n=== Static vs Instance Members ===");
const counter1 = new Counter();
const counter2 = new Counter();
const counter3 = new Counter();
console.log(Counter.getGlobalInfo()); // "Total instances created: 3"
console.log(counter1.getInstanceInfo()); // "This is instance number 1"
console.log(counter2.getInstanceInfo()); // "This is instance number 2"
console.log(counter3.getInstanceInfo()); // "This is instance number 3"
console.log(`Instance count property: ${counter1.instanceCount}`); // 1
console.log(`Global count on class: ${Counter.globalCount}`); // 3 (same for all instances)
// === Factory Pattern with Static Methods ===
class User {
    id;
    name;
    email;
    role;
    constructor(id, name, email, role = "user") {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }
    static fromJSON(jsonString) {
        const data = JSON.parse(jsonString);
        return new User(data.id, data.name, data.email, data.role);
    }
    static fromObject(obj) {
        return new User(obj.id, obj.name, obj.email, obj.role);
    }
    static createGuest() {
        return new User(0, "Guest", "guest@example.com", "guest");
    }
    static createAdmin(name, email) {
        return new User(Date.now(), name, email, "admin");
    }
    static generateEmail(name) {
        return `${name.toLowerCase().replace(/\s+/g, '.')}@company.com`;
    }
}
console.log("\n=== Factory Pattern with Static Methods ===");
const userFromJSON = User.fromJSON('{"id": 1, "name": "John Doe", "email": "john@example.com", "role": "user"}');
const userFromObject = User.fromObject({ id: 2, name: "Jane Smith", email: "jane@example.com" });
const guestUser = User.createGuest();
const adminUser = User.createAdmin("Alice Johnson", "alice@admin.com");
console.log(`User from JSON: ${userFromJSON.name} (${userFromJSON.role})`);
console.log(`User from object: ${userFromObject.name} (${userFromObject.role})`);
console.log(`Guest user: ${guestUser.name} (${guestUser.role})`);
console.log(`Admin user: ${adminUser.name} (${adminUser.role})`);
console.log(`Generated email for 'Bob Wilson': ${User.generateEmail("Bob Wilson")}`);
// === Static Constants and Readonly Properties ===
class AppConfig {
    static VERSION = "2.1.0";
    static MAX_USERS = 1000;
    static API_BASE_URL = "https://api.example.com";
    static DEFAULT_TIMEOUT = 5000;
    static SUPPORTED_FORMATS = ["json", "xml", "csv"];
    static getVersion() {
        return `App version: ${AppConfig.VERSION}`;
    }
    static isValidFormat(format) {
        return AppConfig.SUPPORTED_FORMATS.includes(format);
    }
}
console.log("\n=== Static Constants and Readonly Properties ===");
console.log(AppConfig.getVersion());
console.log(`Max users: ${AppConfig.MAX_USERS}`);
console.log(`API URL: ${AppConfig.API_BASE_URL}`);
console.log(`Default timeout: ${AppConfig.DEFAULT_TIMEOUT}ms`);
console.log(`Supported formats: ${AppConfig.SUPPORTED_FORMATS.join(", ")}`);
console.log(`Is 'json' valid? ${AppConfig.isValidFormat("json")}`);
console.log(`Is 'yaml' valid? ${AppConfig.isValidFormat("yaml")}`);
// === Static Getters and Setters ===
class DatabaseConfig {
    static _host = "localhost";
    static _port = 5432;
    static _database = "myapp";
    static _connectionString = null;
    static get host() {
        return DatabaseConfig._host;
    }
    static set host(value) {
        DatabaseConfig._host = value;
        DatabaseConfig._connectionString = null; // Invalidate cached connection string
    }
    static get port() {
        return DatabaseConfig._port;
    }
    static set port(value) {
        if (value > 0 && value <= 65535) {
            DatabaseConfig._port = value;
            DatabaseConfig._connectionString = null;
        }
        else {
            console.error("Invalid port number");
        }
    }
    static get connectionString() {
        if (!DatabaseConfig._connectionString) {
            DatabaseConfig._connectionString = `postgresql://${DatabaseConfig._database}:${DatabaseConfig._port}@${DatabaseConfig._host}`;
        }
        return DatabaseConfig._connectionString;
    }
}
console.log("\n=== Static Getters and Setters ===");
console.log(`Host: ${DatabaseConfig.host}`); // localhost
console.log(`Port: ${DatabaseConfig.port}`); // 5432
console.log(`Connection: ${DatabaseConfig.connectionString}`);
DatabaseConfig.host = "production-db.example.com";
DatabaseConfig.port = 3306;
console.log(`Updated host: ${DatabaseConfig.host}`);
console.log(`Updated port: ${DatabaseConfig.port}`);
console.log(`Updated connection: ${DatabaseConfig.connectionString}`);
// === Inheritance and Static Members ===
class Animal {
    static totalAnimals = 0;
    static species = [];
    name;
    species;
    constructor(name, species) {
        this.name = name;
        this.species = species;
        Animal.totalAnimals++;
        if (!Animal.species.includes(species)) {
            Animal.species.push(species);
        }
    }
    static getTotalCount() {
        return `Total animals: ${Animal.totalAnimals}`;
    }
    static getSpeciesList() {
        return `Known species: ${Animal.species.join(", ")}`;
    }
    introduce() {
        return `Hi, I'm ${this.name}, a ${this.species}`;
    }
}
class Dog extends Animal {
    static dogCount = 0;
    constructor(name, breed) {
        super(name, "Dog");
        Dog.dogCount++;
    }
    static getDogInfo() {
        return `Total dogs: ${Dog.dogCount}`;
    }
    bark() {
        return "Woof! Woof!";
    }
}
class Cat extends Animal {
    static catCount = 0;
    constructor(name, color) {
        super(name, "Cat");
        Cat.catCount++;
    }
    static getCatInfo() {
        return `Total cats: ${Cat.catCount}`;
    }
    meow() {
        return "Meow! Meow!";
    }
}
console.log("\n=== Inheritance and Static Members ===");
const dog1 = new Dog("Buddy", "Golden Retriever");
const dog2 = new Dog("Max", "German Shepherd");
const cat1 = new Cat("Whiskers", "Black");
const cat2 = new Cat("Mittens", "White");
console.log(Animal.getTotalCount()); // "Total animals: 4"
console.log(Animal.getSpeciesList()); // "Known species: Dog, Cat"
console.log(Dog.getDogInfo()); // "Total dogs: 2"
console.log(Cat.getCatInfo()); // "Total cats: 2"
// Child classes can access parent static members
console.log(Dog.getTotalCount()); // "Total animals: 4" (inherited)
console.log(Cat.getSpeciesList()); // "Known species: Dog, Cat" (inherited)
console.log(`Dog says: ${dog1.bark()}`);
console.log(`Cat says: ${cat1.meow()}`);
// === Real-World Example: Singleton Pattern ===
class ConfigurationManager {
    static instance;
    config = new Map();
    constructor() {
        // Private constructor prevents direct instantiation
        this.config.set("app.name", "My Awesome App");
        this.config.set("app.version", "1.0.0");
        this.config.set("database.host", "localhost");
        this.config.set("database.port", 5432);
    }
    static getInstance() {
        if (!ConfigurationManager.instance) {
            ConfigurationManager.instance = new ConfigurationManager();
        }
        return ConfigurationManager.instance;
    }
    get(key) {
        return this.config.get(key);
    }
    set(key, value) {
        this.config.set(key, value);
    }
    static getAppInfo() {
        const instance = ConfigurationManager.getInstance();
        return `${instance.get("app.name")} v${instance.get("app.version")}`;
    }
}
console.log("\n=== Real-World Example: Singleton Pattern ===");
const config = ConfigurationManager.getInstance();
console.log(`App name: ${config.get("app.name")}`);
console.log(`DB host: ${config.get("database.host")}`);
console.log(ConfigurationManager.getAppInfo()); // Static method access
// === Utility Class Example ===
class StringUtils {
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    static slugify(str) {
        return str
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    static truncate(str, maxLength, suffix = "...") {
        if (str.length <= maxLength)
            return str;
        return str.slice(0, maxLength - suffix.length) + suffix;
    }
    static isEmpty(str) {
        return !str || str.trim().length === 0;
    }
}
console.log("\n=== Utility Class Example ===");
const text = "hello world!";
console.log(`Capitalize: "${StringUtils.capitalize(text)}"`); // "Hello world!"
console.log(`Slugify: "${StringUtils.slugify("Hello, World & Universe!")}"`); // "hello-world-universe"
console.log(`Truncate: "${StringUtils.truncate("This is a very long sentence", 20)}"`); // "This is a very lo..."
console.log(`Is empty: "${StringUtils.isEmpty("")}"`); // true
console.log(`Is empty: "${StringUtils.isEmpty("hello")}"`); // false
// === Advanced: Static Members with Inheritance ===
class ApiClient {
    static baseURL = "https://api.example.com";
    static timeout = 5000;
    static apiVersion = "v1";
    // Static methods are available for inheritance
    static getBaseInfo() {
        return `API ${ApiClient.apiVersion} at ${ApiClient.baseURL}`;
    }
}
class UserApiClient extends ApiClient {
    static apiVersion = "v2"; // Shadows parent static property
    static getUserEndpoint() {
        return `${UserApiClient.baseURL}/${UserApiClient.apiVersion}/users`;
    }
}
console.log("\n=== Advanced: Static Members with Inheritance ===");
console.log(`Base API info: ${ApiClient.getBaseInfo()}`);
console.log(`User API version: ${UserApiClient.apiVersion}`);
console.log(`User API endpoint: ${UserApiClient.getUserEndpoint()}`);
console.log(`User API base URL (inherited): ${UserApiClient.baseURL}`);
//# sourceMappingURL=M07V07.js.map