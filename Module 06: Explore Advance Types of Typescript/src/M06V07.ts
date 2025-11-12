// TypeScript keyof Constraints with Generics - Comprehensive Examples
// Exploring keyof operator usage with generic constraints

// Example 1: Basic keyof with Generics
interface Person {
	name: string;
	age: number;
	email: string;
}

type PersonKeys = keyof Person; // "name" | "age" | "email"

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
	return obj[key];
}

let person: Person = {
	name: "John",
	age: 30,
	email: "john@example.com",
};

console.log("Basic keyof:");
console.log("Get name:", getProperty(person, "name"));
console.log("Get age:", getProperty(person, "age"));
console.log("Get email:", getProperty(person, "email"));

// Example 2: keyof with Generic Classes
class PropertyAccessor<T extends object> {
	constructor(private obj: T) {}

	get<K extends keyof T>(key: K): T[K] {
		return this.obj[key];
	}

	set<K extends keyof T>(key: K, value: T[K]): void {
		(this.obj as any)[key] = value;
	}

	has<K extends keyof T>(key: K): boolean {
		return key in this.obj;
	}
}

let accessor = new PropertyAccessor(person);
accessor.set("age", 31);
console.log("Generic Class:");
console.log("Updated age:", accessor.get("age"));
console.log("Has name:", accessor.has("name"));

// Example 3: Property Picker Functions
function pick<T extends object, K extends keyof T>(
	obj: T,
	keys: K[],
): Pick<T, K> {
	let result = {} as Pick<T, K>;
	keys.forEach((key) => {
		if (key in obj) {
			result[key] = obj[key];
		}
	});
	return result;
}

function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
	let result = { ...obj };
	keys.forEach((key) => {
		delete result[key];
	});
	return result;
}

interface User {
	id: number;
	name: string;
	email: string;
	password: string;
	createdAt: Date;
}

let user: User = {
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
function updateProperty<T, K extends keyof T>(
	obj: T,
	key: K,
	updater: (currentValue: T[K]) => T[K],
): T {
	return {
		...obj,
		[key]: updater(obj[key]),
	};
}

function validateAndUpdate<T, K extends keyof T>(
	obj: T,
	key: K,
	newValue: T[K],
	validator: (value: T[K]) => boolean,
): T | null {
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

let nameValidator = (name: string) => name.length >= 3;
let validUpdate = validateAndUpdate(user, "name", "Bob", nameValidator);
console.log("Valid name update:", validUpdate?.name);

let invalidUpdate = validateAndUpdate(user, "name", "A", nameValidator);
console.log("Invalid name update:", invalidUpdate);

// Example 5: keyof with Mapped Types
type PropertyMapper<T> = {
	[K in keyof T]: (value: T[K]) => T[K];
};

function mapProperties<T extends object>(
	obj: T,
	mappers: Partial<PropertyMapper<T>>,
): T {
	let result = { ...obj };
	for (let key in mappers) {
		if (key in obj && mappers[key]) {
			(result as any)[key] = mappers[key]!((obj as any)[key]);
		}
	}
	return result;
}

console.log("Mapped Types:");
let userMappers: Partial<PropertyMapper<User>> = {
	name: (name) => name.trim(),
	email: (email) => email.toLowerCase(),
};

let mappedUser = mapProperties(user, userMappers);
console.log("Mapped user:", mappedUser);

// Example 6: Property Existence Checker
function hasAllProperties<T>(obj: any, keys: (keyof T)[]): obj is T {
	return keys.every((key) => key in obj);
}

function hasAnyProperty<T>(obj: any, keys: (keyof T)[]): boolean {
	return keys.some((key) => key in obj);
}

console.log("Property Checkers:");
let someObj = { name: "Test", age: 25 };
if (hasAllProperties<User>(someObj, ["id", "name", "email"])) {
	console.log("Has all User properties");
} else {
	console.log("Missing some User properties");
}

if (hasAnyProperty(someObj, ["name", "email"])) {
	console.log("Has some properties");
}

// Example 7: Generic Event Handlers
interface EventMap {
	click: { x: number; y: number };
	hover: { element: string };
	submit: { data: any };
}

type EventNames = keyof EventMap;

function addEventListener<T extends EventNames>(
	eventName: T,
	handler: (event: EventMap[T]) => void,
): void {
	console.log(`Added listener for ${eventName}`);
}

console.log("Event Handlers:");
addEventListener("click", (event) => {
	console.log(`Clicked at ${event.x}, ${event.y}`);
});

addEventListener("submit", (event) => {
	console.log("Form submitted with", event.data);
});

// Example 8: Generic API Client
interface ApiEndpoints {
	users: { id: number; name: string }[];
	user: { id: number; name: string; email: string };
	posts: { id: number; title: string; content: string }[];
}

type EndpointNames = keyof ApiEndpoints;

class ApiClient {
	async get<T extends EndpointNames>(
		endpoint: T,
		params?: any,
	): Promise<ApiEndpoints[T]> {
		console.log(`GET /${endpoint}`, params);
		return {} as ApiEndpoints[T];
	}

	async post<T extends EndpointNames>(
		endpoint: T,
		data: Partial<ApiEndpoints[T]>,
	): Promise<ApiEndpoints[T]> {
		console.log(`POST /${endpoint}`, data);
		return {} as ApiEndpoints[T];
	}
}

console.log("API Client:");
let api = new ApiClient();
api.get("users").then((users) => console.log("Got users"));
api.post("user", { name: "John", email: "john@example.com" });

// Example 9: Property Observer Pattern
class PropertyObserver<T extends object> {
	private observers = new Map<keyof T, ((value: any) => void)[]>();

	observe<K extends keyof T>(
		property: K,
		callback: (value: T[K]) => void,
	): void {
		if (!this.observers.has(property)) {
			this.observers.set(property, []);
		}
		this.observers.get(property)!.push(callback as (value: any) => void);
	}

	notify<K extends keyof T>(property: K, value: T[K]): void {
		let callbacks = this.observers.get(property);
		if (callbacks) {
			callbacks.forEach((callback) => callback(value));
		}
	}
}

interface ObservableUser {
	name: string;
	age: number;
	email: string;
}

class ObservableUserClass implements ObservableUser {
	private observer = new PropertyObserver<ObservableUser>();

	constructor(public name: string, public age: number, public email: string) {}

	onPropertyChange<K extends keyof ObservableUser>(
		property: K,
		callback: (value: ObservableUser[K]) => void,
	): void {
		this.observer.observe(property, callback);
	}

	set<K extends keyof ObservableUser>(
		property: K,
		value: ObservableUser[K],
	): void {
		(this as any)[property] = value;
		this.observer.notify(property, value);
	}
}

console.log("Property Observer:");
let obsUser = new ObservableUserClass("Alice", 30, "alice@example.com");
obsUser.onPropertyChange("name", (name) => {
	console.log(`Name changed to: ${name}`);
});
obsUser.set("name", "Alice Smith");

// Example 10: Generic Data Validator
type ValidationRules<T> = {
	[K in keyof T]?: (value: T[K]) => boolean;
};

class DataValidator<T> {
	constructor(private rules: ValidationRules<T>) {}

	validate(obj: T): { [K in keyof T]?: string } {
		let errors: { [K in keyof T]?: string } = {};

		for (let key in this.rules) {
			let k = key as keyof T;
			let rule = this.rules[k];
			if (rule && !rule(obj[k])) {
				errors[k] = `${String(key)} is invalid`;
			}
		}

		return errors;
	}

	isValid(obj: T): boolean {
		let errors = this.validate(obj);
		return Object.keys(errors).length === 0;
	}
}

interface UserData {
	name: string;
	age: number;
	email: string;
}

let userValidator = new DataValidator<UserData>({
	name: (name) => name.length >= 2,
	age: (age) => age >= 18,
	email: (email) => email.includes("@"),
});

let testUser: UserData = {
	name: "A",
	age: 16,
	email: "invalid-email",
};

console.log("Data Validator:");
console.log("Validation errors:", userValidator.validate(testUser));
console.log("Is valid:", userValidator.isValid(testUser));

// Example 11: Advanced Utility Types with keyof
type OptionalKeys<T> = {
	[K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

type RequiredKeys<T> = {
	[K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

type KeysOfType<T, U> = {
	[K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

interface ComplexUser {
	id: number;
	name?: string;
	age: number;
	email?: string;
	tags: string[];
	metadata: Record<string, any>;
}

type OptionalUserKeys = OptionalKeys<ComplexUser>; // "name" | "email"
type RequiredUserKeys = RequiredKeys<ComplexUser>; // "id" | "age" | "tags" | "metadata"
type StringKeys = KeysOfType<ComplexUser, string>; // "name" | "email"
type ArrayKeys = KeysOfType<ComplexUser, any[]>; // "tags"

console.log("Utility Types:");
console.log("Optional keys:", {} as OptionalUserKeys);
console.log("Required keys:", {} as RequiredUserKeys);
console.log("String keys:", {} as any as StringKeys);
console.log("Array keys:", {} as ArrayKeys);

// Example 12: Generic Property Path Accessor (Simplified)
function getPropertyPath<T>(obj: T, path: string): any {
	return path.split(".").reduce((current, key) => (current as any)[key], obj);
}

function setPropertyPath<T>(obj: T, path: string, value: any): T {
	let keys = path.split(".") as any;
	let result = { ...obj };
	let current: any = result;

	for (let i = 0; i < keys.length - 1; i++) {
		current[keys[i]] = { ...current[keys[i]] };
		current = current[keys[i]];
	}

	current[keys[keys.length - 1]] = value;
	return result;
}

interface NestedUser {
	profile: {
		personal: {
			name: string;
			age: number;
		};
		contact: {
			email: string;
			phone: string;
		};
	};
	settings: {
		theme: string;
		notifications: boolean;
	};
}

let nestedUser: NestedUser = {
	profile: {
		personal: { name: "John", age: 30 },
		contact: { email: "john@example.com", phone: "123-456-7890" },
	},
	settings: { theme: "dark", notifications: true },
};

console.log("Property Paths:");
console.log(
	"Get nested name:",
	getPropertyPath(nestedUser, "profile.personal.name"),
);
let updatedNested = setPropertyPath(nestedUser, "settings.theme", "light");
console.log("Updated theme:", getPropertyPath(updatedNested, "settings.theme"));

// Example 13: Common keyof Patterns
function mergeProperties<T extends object, U extends object>(
	target: T,
	source: U,
	properties: (keyof T & keyof U)[],
): T {
	let result = { ...target };
	properties.forEach((prop) => {
		(result as any)[prop] = (source as any)[prop];
	});
	return result;
}

function compareProperties<T, K extends keyof T>(
	obj1: T,
	obj2: T,
	properties: K[],
): boolean {
	return properties.every((prop) => obj1[prop] === obj2[prop]);
}

function cloneProperties<T, K extends keyof T>(
	obj: T,
	properties: K[],
): Pick<T, K> {
	let result = {} as Pick<T, K>;
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
class PropertyManager<T extends object> {
	constructor(private obj: T) {}

	get<K extends keyof T>(key: K): T[K] {
		return this.obj[key];
	}

	set<K extends keyof T>(key: K, value: T[K]): void {
		(this.obj as any)[key] = value;
	}

	hasProperty<K extends keyof T>(key: K): boolean {
		return key in this.obj;
	}
}

interface Car {
	make: string;
	model: string;
	year: number;
}

let carManager = new PropertyManager<Car>({
	make: "Toyota",
	model: "Camry",
	year: 2020,
});
carManager.set("year", 2021);
console.log("Exercise 1:");
console.log("Car model:", carManager.get("model"));
console.log("Has year:", carManager.hasProperty("year"));

// Exercise 2: Object Transformer
function transformProperties<T, K extends keyof T>(
	obj: T,
	transformers: { [P in K]?: (value: T[P]) => T[P] },
): T {
	let result = { ...obj };
	for (let key in transformers) {
		if (transformers[key as K]) {
			(result as any)[key] = transformers[key as K]!((obj as any)[key]);
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

// Exercise 3: Type-Safe Event Emitter
interface Events {
	userLoggedIn: { userId: number; timestamp: Date };
	orderPlaced: { orderId: string; amount: number };
	error: { message: string; code: number };
}

class EventEmitter {
	private handlers = new Map<keyof Events, Function[]>();

	on<K extends keyof Events>(
		event: K,
		handler: (data: Events[K]) => void,
	): void {
		if (!this.handlers.has(event)) {
			this.handlers.set(event, []);
		}
		this.handlers.get(event)!.push(handler);
	}

	emit<K extends keyof Events>(event: K, data: Events[K]): void {
		let handlers = this.handlers.get(event);
		if (handlers) {
			handlers.forEach((handler) => (handler as Function)(data));
		}
	}
}

console.log("Exercise 3:");
let emitter = new EventEmitter();
emitter.on("userLoggedIn", (event) =>
	console.log(`User ${event.userId} logged in`),
);
emitter.emit("userLoggedIn", { userId: 123, timestamp: new Date() });

// Exercise 4: Generic Form Validator
interface FormFields {
	username: string;
	email: string;
	age: number;
	password: string;
}

type ValidationResult<T> = {
	[K in keyof T]?: string[];
};

class FormValidator<T extends Record<string, any>> {
	private rules: { [K in keyof T]?: (value: T[K]) => boolean } = {};

	addRule<K extends keyof T>(field: K, rule: (value: T[K]) => boolean): void {
		this.rules[field] = rule;
	}

	validate(obj: T): ValidationResult<T> {
		let errors: ValidationResult<T> = {};

		Object.keys(this.rules).forEach((key) => {
			let k = key as keyof T;
			let rule = this.rules[k];
			if (rule && !rule(obj[k])) {
				if (!errors[k]) {
					(errors as any)[k] = [];
				}
				(errors as any)[k].push(`${key} is invalid`);
			}
		});

		return errors;
	}
}

console.log("Exercise 4:");
let validator = new FormValidator<FormFields>();
validator.addRule("username", (val) => val.length >= 3);
validator.addRule("email", (val) => val.includes("@"));
validator.addRule("age", (val) => val >= 18);
validator.addRule("password", (val) => val.length >= 6);

let formData = { username: "us", email: "invalid", age: 15, password: "123" };
let errors = validator.validate(formData);
console.log("Form errors:", errors);

// Exercise 5: Property Path Utilities (Simplified)
function getDeepValue(obj: any, path: string): any {
	return path.split(".").reduce((current, key) => current?.[key], obj);
}

function setDeepValue(obj: any, path: string, value: any): any {
	let keys = path.split(".") as any;
	let result = { ...obj };
	let current = result;

	for (let i = 0; i < keys.length - 1; i++) {
		current[keys[i]] = { ...current[keys[i]] };
		current = current[keys[i]];
	}

	current[keys[keys.length - 1]] = value;
	return result;
}

interface DeepObject {
	user: {
		profile: {
			name: string;
			settings: { theme: string };
		};
	};
}

console.log("Exercise 5:");
let deepObj: DeepObject = {
	user: { profile: { name: "John", settings: { theme: "dark" } } },
};
let deepName = getDeepValue(deepObj, "user.profile.name");
console.log("Deep name:", deepName);

let updatedDeep = setDeepValue(deepObj, "user.profile.settings.theme", "light");
console.log(
	"Updated deep theme:",
	getDeepValue(updatedDeep, "user.profile.settings.theme"),
);

console.log("All keyof constraint examples completed successfully!");
