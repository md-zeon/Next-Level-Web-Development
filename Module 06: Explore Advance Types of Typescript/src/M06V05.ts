// TypeScript Generics with Functions - Comprehensive Examples
// Exploring generic functions, constraints, overloads, and advanced patterns

// Example 1: Basic Generic Functions
function identity<T>(arg: T): T {
	return arg;
}

function swap<T, U>(a: T, b: U): [U, T] {
	return [b, a];
}

console.log("Basic Generic Functions:");
console.log("Identity string:", identity("Hello World"));
console.log("Identity number:", identity(42));
console.log("Swap:", swap("hello", 42));

// Example 2: Generic Function Types
type GenericFunction<T, U> = (arg: T) => U;

interface Transformer<TInput, TOutput> {
	(input: TInput): TOutput;
}

interface Processor<T> {
	process<U>(input: T): U;
	map<U>(transform: (value: T) => U): U[];
}

class DataProcessor<T> implements Processor<T> {
	constructor(private data: T[]) {}

	process<U>(input: T): U {
		return input as unknown as U;
	}

	map<U>(transform: (value: T) => U): U[] {
		return this.data.map(transform);
	}
}

console.log("Generic Function Types:");
let stringLength: GenericFunction<string, number> = (s) => s.length;
let numberToString: GenericFunction<number, string> = (n) => n.toString();

console.log("String length:", stringLength("hello"));
console.log("Number to string:", numberToString(42));

let parseJson: Transformer<string, any> = JSON.parse;
let stringifyJson: Transformer<any, string> = JSON.stringify;

console.log("Parse JSON:", parseJson('{"name": "John"}'));
console.log("Stringify JSON:", stringifyJson({ name: "John" }));

let numberProcessor = new DataProcessor<number>([1, 2, 3, 4, 5]);
console.log("Process numbers:", numberProcessor.map(n => n * 2));

// Example 3: Generic Constraints
interface HasLength {
	length: number;
}

interface HasId {
	id: number;
}

interface HasName {
	name: string;
}

function getLength<T extends HasLength>(arg: T): number {
	return arg.length;
}

function createEntity<T extends HasId & HasName>(entity: T): T & { createdAt: Date } {
	return {
		...entity,
		createdAt: new Date()
	};
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
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

// Example 4: Generic Function Overloads
function processValue<T>(value: T): T;
function processValue(value: string): string[];
function processValue(value: number): number;
function processValue<T>(value: T): T | string[] | number {
	if (typeof value === "string") {
		return value.split("");
	}
	if (typeof value === "number") {
		return value * 2;
	}
	return value;
}

interface ApiResponse<T> {
	data: T;
	status: number;
}

function fetchData<T>(url: string): Promise<ApiResponse<T>>;
function fetchData<T>(url: string, options: { method: 'GET' }): Promise<ApiResponse<T>>;
function fetchData<T>(url: string, options: { method: 'POST'; body: T }): Promise<ApiResponse<T>>;
function fetchData<T>(url: string, options?: any): Promise<ApiResponse<T>> {
	// Mock implementation
	return Promise.resolve({
		data: {} as T,
		status: 200
	});
}

console.log("Generic Function Overloads:");
console.log("Process string:", processValue("hello"));
console.log("Process number:", processValue(42));
console.log("Process boolean:", processValue(true));

// Example 5: Higher-Order Generic Functions
function createGetter<T>() {
	return function<K extends keyof T>(obj: T, key: K): T[K] {
		return obj[key];
	};
}

function compose<A, B, C>(
	f: (x: B) => C,
	g: (x: A) => B
): (x: A) => C {
	return (x) => f(g(x));
}

function curry<A, B, C>(
	fn: (a: A, b: B) => C
): (a: A) => (b: B) => C {
	return (a) => (b) => fn(a, b);
}

console.log("Higher-Order Generic Functions:");
let getUserProp = createGetter<{ id: number; name: string; email: string }>();
let sampleUser = { id: 1, name: "Alice", email: "alice@example.com" };
console.log("Get user name:", getUserProp(sampleUser, "name"));

let addOne = (x: number) => x + 1;
let double = (x: number) => x * 2;
let stringifyNum = (x: number) => x.toString();

let composed = compose(stringifyNum, compose(double, addOne));
console.log("Composed function result:", composed(5));

function add(a: number, b: number): number {
	return a + b;
}

let curriedAdd = curry(add);
let addFive = curriedAdd(5);
console.log("Curried add result:", addFive(3));

// Example 6: Generic Utility Functions
function first<T>(array: T[]): T | undefined {
	return array[0];
}

function last<T>(array: T[]): T | undefined {
	return array[array.length - 1];
}

function reverse<T>(array: T[]): T[] {
	return [...array].reverse();
}

function unique<T>(array: T[]): T[] {
	return Array.from(new Set(array));
}

function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
	let result = {} as Pick<T, K>;
	keys.forEach(key => {
		if (key in obj) {
			result[key] = obj[key];
		}
	});
	return result;
}

function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
	let result = { ...obj };
	keys.forEach(key => {
		delete result[key];
	});
	return result;
}

function isArray<T>(value: T | T[]): value is T[] {
	return Array.isArray(value);
}

function isDefined<T>(value: T | undefined | null): value is T {
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

function processItems<T>(items: T | T[]): T[] {
	if (isArray(items)) {
		return items;
	}
	return [items];
}

console.log("Process items:", processItems([1, 2, 3]));
console.log("Process single item:", processItems(42));

// Example 7: Advanced Generic Function Patterns
interface Constructor<T> {
	new (...args: any[]): T;
}

function createInstance<T>(ctor: Constructor<T>, ...args: any[]): T {
	return new ctor(...args);
}

function createFactory<T>(ctor: Constructor<T>) {
	return (...args: any[]) => new ctor(...args);
}

class Product {
	constructor(public id: number, public name: string, public price: number) {}
}

console.log("Generic Factory Functions:");
let productFactory = createFactory(Product);
let product1 = productFactory(1, "Widget", 29.99);
let product2 = createInstance(Product, 2, "Gadget", 49.99);

console.log("Factory product:", product1);
console.log("Instance product:", product2);

// Example 8: Generic Async Functions
async function fetchJson<T>(url: string): Promise<T> {
	// Mock implementation
	await new Promise(resolve => setTimeout(resolve, 100));
	return { id: 1, name: "Mock Data" } as T;
}

async function retry<T>(
	fn: () => Promise<T>,
	maxAttempts: number = 3,
	delay: number = 1000
): Promise<T> {
	for (let attempt = 1; attempt <= maxAttempts; attempt++) {
		try {
			return await fn();
		} catch (error) {
			if (attempt === maxAttempts) {
				throw error;
			}
			await new Promise(resolve => setTimeout(resolve, delay));
		}
	}
	throw new Error("Max attempts reached");
}

console.log("Generic Async Functions:");
interface User {
	id: number;
	name: string;
}

let fetchUserFn = () => fetchJson<User>("/api/user/1");
retry(fetchUserFn, 3, 500).then(user => {
	console.log("Fetched user:", user);
}).catch(error => {
	console.log("Error:", error);
});

// Example 9: Generic Memoization
function memoize<T extends (...args: any[]) => any>(fn: T): T {
	let cache = new Map<string, ReturnType<T>>();

	return ((...args: Parameters<T>) => {
		let key = JSON.stringify(args);
		if (cache.has(key)) {
			return cache.get(key);
		}
		let result = fn(...args);
		cache.set(key, result);
		return result;
	}) as T;
}

console.log("Generic Memoization:");
function expensiveCalculation(n: number): number {
	console.log(`Calculating for ${n}`);
	return n * n;
}

let memoizedCalculation = memoize(expensiveCalculation);

console.log("First call:", memoizedCalculation(5));
console.log("Second call (cached):", memoizedCalculation(5));
console.log("Third call (cached):", memoizedCalculation(5));

// Example 10: Common Generic Function Patterns
interface UserEntity extends HasId, HasName {
	email: string;
	age: number;
}

interface UserInput extends HasName {
	email: string;
	age: number;
}

function createEntityCrud<T>(entity: T): T & { id: number } {
	return { ...entity, id: Date.now() };
}

function updateEntity<T extends { id: number }>(entity: T, updates: Partial<T>): T {
	return { ...entity, ...updates };
}

function findById<T extends { id: number }>(entities: T[], id: number): T | undefined {
	return entities.find(entity => entity.id === id);
}

interface ValidationRule<T> {
	validate: (value: T) => boolean;
	message: string;
}

function validateField<T>(value: T, rules: ValidationRule<T>[]): string[] {
	return rules
		.filter(rule => !rule.validate(value))
		.map(rule => rule.message);
}

function validateObject<T>(obj: T, validators: { [K in keyof T]?: ValidationRule<T[K]>[] }): { [K in keyof T]?: string[] } {
	let errors: { [K in keyof T]?: string[] } = {};

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

function sortBy<T>(array: T[], keyFn: (item: T) => any): T[] {
	return [...array].sort((a, b) => {
		let aVal = keyFn(a);
		let bVal = keyFn(b);
		if (aVal < bVal) return -1;
		if (aVal > bVal) return 1;
		return 0;
	});
}

function groupBy<T, K extends string | number>(array: T[], keyFn: (item: T) => K): Record<K, T[]> {
	return array.reduce((groups, item) => {
		let key = keyFn(item);
		if (!groups[key]) {
			groups[key] = [];
		}
		groups[key].push(item);
		return groups;
	}, {} as Record<K, T[]>);
}

console.log("Common Generic Function Patterns:");
let newUserEntity = createEntityCrud<UserInput>({ name: "Bob", email: "bob@example.com", age: 25 });
console.log("Created user:", newUserEntity);

let updatedUserEntity = updateEntity(newUserEntity, { name: "Bobby" });
console.log("Updated user:", updatedUserEntity);

let userList: UserEntity[] = [
	{ id: 1, name: "Alice", email: "alice@example.com", age: 30 },
	{ id: 2, name: "Bob", email: "bob@example.com", age: 25 },
	{ id: 3, name: "Charlie", email: "charlie@example.com", age: 35 }
];

console.log("Find by ID:", findById(userList, 2));

let nameValidationRules: ValidationRule<string>[] = [
	{ validate: (s) => s.length > 0, message: "Name is required" },
	{ validate: (s) => s.length >= 2, message: "Name must be at least 2 characters" }
];

let ageValidationRules: ValidationRule<number>[] = [
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
