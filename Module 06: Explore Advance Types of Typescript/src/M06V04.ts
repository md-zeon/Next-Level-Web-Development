// TypeScript Generics with Interfaces - Comprehensive Examples
// Combining generics and interfaces for powerful abstractions

// Example 1: Basic Generic Interface
interface Container<T> {
	value: T;
	getValue(): T;
	setValue(value: T): void;
	isEmpty(): boolean;
}

class StringContainer implements Container<string> {
	value: string = "";

	getValue(): string {
		return this.value;
	}

	setValue(value: string): void {
		this.value = value;
	}

	isEmpty(): boolean {
		return this.value.length === 0;
	}
}

class NumberContainer implements Container<number> {
	value: number = 0;

	getValue(): number {
		return this.value;
	}

	setValue(value: number): void {
		this.value = value;
	}

	isEmpty(): boolean {
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

// Example 2: Generic Interface with Multiple Type Parameters
interface Pair<T, U> {
	first: T;
	second: U;
	toString(): string;
	getTypes(): string;
}

class NumberStringPair implements Pair<number, string> {
	constructor(public first: number, public second: string) {}

	toString(): string {
		return `${this.first} -> ${this.second}`;
	}

	getTypes(): string {
		return `${typeof this.first} -> ${typeof this.second}`;
	}
}

console.log("Generic Interface with Multiple Type Parameters:");
let pair = new NumberStringPair(42, "hello");
console.log("Original:", pair.toString());
console.log("Types:", pair.getTypes());

// Example 3: Generic Constraints with Interfaces
interface HasId {
	id: number;
}

interface HasName {
	name: string;
}

interface Repository<T extends HasId & HasName> {
	findById(id: number): T | null;
	findAll(): T[];
	save(entity: T): T;
	delete(id: number): boolean;
	findByName(name: string): T[];
}

interface User extends HasId, HasName {
	email: string;
	age: number;
}

class UserRepository implements Repository<User> {
	private users: User[] = [];

	findById(id: number): User | null {
		return this.users.find((user) => user.id === id) || null;
	}

	findAll(): User[] {
		return [...this.users];
	}

	save(entity: User): User {
		const existingIndex = this.users.findIndex((user) => user.id === entity.id);
		if (existingIndex > -1) {
			this.users[existingIndex] = entity;
		} else {
			this.users.push(entity);
		}
		return entity;
	}

	delete(id: number): boolean {
		const index = this.users.findIndex((user) => user.id === id);
		if (index > -1) {
			this.users.splice(index, 1);
			return true;
		}
		return false;
	}

	findByName(name: string): User[] {
		return this.users.filter((user) =>
			user.name.toLowerCase().includes(name.toLowerCase()),
		);
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

// Example 4: Constructor Interface with Generics
interface Factory<T> {
	create(): T;
	createMany(count: number): T[];
}

interface Constructor<T> {
	new (...args: any[]): T;
}

function createFactory<T>(ctor: Constructor<T>): Factory<T> {
	return {
		create: () => new ctor(),
		createMany: (count: number) =>
			Array.from({ length: count }, () => new ctor()),
	};
}

class Product {
	constructor(public id: number, public name: string, public price: number) {}

	toString(): string {
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

products.forEach((product) =>
	console.log("Created product:", product.toString()),
);

// Example 5: Generic Interface for API Responses
interface ApiResponse<T, E = string> {
	success: boolean;
	data: T | null;
	error: E | null;
	timestamp: number;
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}

class ApiClient<T> {
	private baseUrl: string;

	constructor(baseUrl: string = "https://api.example.com") {
		this.baseUrl = baseUrl;
	}

	async get(endpoint: string): Promise<ApiResponse<T>> {
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 100));

			// Mock successful response
			return {
				success: true,
				data: { id: 1, name: "Mock Data" } as T,
				error: null,
				timestamp: Date.now(),
			};
		} catch (error) {
			return {
				success: false,
				data: null,
				error: error instanceof Error ? error.message : "Unknown error",
				timestamp: Date.now(),
			};
		}
	}

	async getPaginated(
		endpoint: string,
		page: number = 1,
	): Promise<PaginatedResponse<T>> {
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 100));

			// Mock paginated response
			return {
				success: true,
				data: [
					{ id: 1, name: "Item 1" },
					{ id: 2, name: "Item 2" },
				] as T[],
				error: null,
				timestamp: Date.now(),
				pagination: {
					page,
					limit: 10,
					total: 25,
					totalPages: 3,
				},
			};
		} catch (error) {
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
const apiClient = new ApiClient<User>();

// Test regular response
apiClient.get("/users/1").then((response) => {
	if (response.success) {
		console.log("User fetched:", response.data);
	} else {
		console.log("Error:", response.error);
	}
});

// Test paginated response
apiClient.getPaginated("/users", 1).then((response) => {
	if (response.success) {
		console.log("Users fetched:", response.data?.length, "items");
		console.log("Pagination:", response.pagination);
	} else {
		console.log("Error:", response.error);
	}
});

// Example 6: Generic Interface for Data Structures
interface Collection<T> {
	items: T[];
	add(item: T): void;
	remove(item: T): boolean;
	find(predicate: (item: T) => boolean): T | undefined;
	filter(predicate: (item: T) => boolean): T[];
	map<U>(transform: (item: T) => U): U[];
	reduce<U>(reducer: (accumulator: U, item: T) => U, initialValue: U): U;
	size(): number;
	isEmpty(): boolean;
}

class GenericCollection<T> implements Collection<T> {
	items: T[] = [];

	add(item: T): void {
		this.items.push(item);
	}

	remove(item: T): boolean {
		const index = this.items.indexOf(item);
		if (index > -1) {
			this.items.splice(index, 1);
			return true;
		}
		return false;
	}

	find(predicate: (item: T) => boolean): T | undefined {
		return this.items.find(predicate);
	}

	filter(predicate: (item: T) => boolean): T[] {
		return this.items.filter(predicate);
	}

	map<U>(transform: (item: T) => U): U[] {
		return this.items.map(transform);
	}

	reduce<U>(reducer: (accumulator: U, item: T) => U, initialValue: U): U {
		return this.items.reduce(reducer, initialValue);
	}

	size(): number {
		return this.items.length;
	}

	isEmpty(): boolean {
		return this.items.length === 0;
	}
}

console.log("Generic Interface for Data Structures:");
const numberCollection = new GenericCollection<number>();
numberCollection.add(1);
numberCollection.add(2);
numberCollection.add(3);
numberCollection.add(4);
numberCollection.add(5);

console.log("Collection size:", numberCollection.size());
console.log(
	"Even numbers:",
	numberCollection.filter((n) => n % 2 === 0),
);
console.log(
	"Doubled numbers:",
	numberCollection.map((n) => n * 2),
);
console.log(
	"Sum:",
	numberCollection.reduce((sum, n) => sum + n, 0),
);

// Example 7: Generic Interface for Event Systems
interface EventEmitter<T extends string> {
	on<K extends T>(event: K, listener: (data: any) => void): void;
	off<K extends T>(event: K, listener?: (data: any) => void): void;
	emit<K extends T>(event: K, data?: any): void;
	once<K extends T>(event: K, listener: (data: any) => void): void;
	listenerCount<K extends T>(event: K): number;
}

interface TypedEventEmitter<T extends Record<string, any>>
	extends EventEmitter<keyof T & string> {
	emit<K extends keyof T & string>(event: K, data: T[K]): void;
}

type AppEvents = {
	user_login: { userId: number; timestamp: number };
	user_logout: { userId: number; sessionDuration: number };
	error_occurred: { message: string; code: number };
	data_updated: { entity: string; id: number; changes: Record<string, any> };
};

class AppEventEmitter implements TypedEventEmitter<AppEvents> {
	private listeners: Record<string, Function[]> = {};

	on<K extends keyof AppEvents & string>(
		event: K,
		listener: (data: AppEvents[K]) => void,
	): void {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}
		this.listeners[event].push(listener);
	}

	off<K extends keyof AppEvents & string>(
		event: K,
		listener?: (data: AppEvents[K]) => void,
	): void {
		if (!this.listeners[event]) return;

		if (listener) {
			this.listeners[event] = this.listeners[event].filter(
				(l) => l !== listener,
			);
		} else {
			delete this.listeners[event];
		}
	}

	emit<K extends keyof AppEvents & string>(event: K, data: AppEvents[K]): void {
		const eventListeners = this.listeners[event];
		if (eventListeners) {
			eventListeners.forEach((listener) => {
				try {
					listener(data);
				} catch (error) {
					console.error(`Error in event listener for ${event}:`, error);
				}
			});
		}
	}

	once<K extends keyof AppEvents & string>(
		event: K,
		listener: (data: AppEvents[K]) => void,
	): void {
		const onceListener = (data: AppEvents[K]) => {
			listener(data);
			this.off(event, onceListener);
		};
		this.on(event, onceListener);
	}

	listenerCount<K extends keyof AppEvents & string>(event: K): number {
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

// Example 8: Generic Interface Inheritance
interface Readable<T> {
	read(): T;
	isEmpty(): boolean;
	peek(): T | undefined;
}

interface Writable<T> {
	write(value: T): void;
	clear(): void;
	isFull(): boolean;
}

interface ReadWritable<T> extends Readable<T>, Writable<T> {
	update(transform: (current: T) => T): void;
	size(): number;
}

class Storage<T> implements ReadWritable<T> {
	private value: T | null = null;
	private capacity: number;

	constructor(capacity: number = 1) {
		this.capacity = capacity;
	}

	read(): T {
		if (this.value === null) {
			throw new Error("No value stored");
		}
		return this.value;
	}

	isEmpty(): boolean {
		return this.value === null;
	}

	peek(): T | undefined {
		return this.value || undefined;
	}

	write(value: T): void {
		this.value = value;
	}

	clear(): void {
		this.value = null;
	}

	isFull(): boolean {
		return this.value !== null;
	}

	update(transform: (current: T) => T): void {
		if (this.value !== null) {
			this.value = transform(this.value);
		}
	}

	size(): number {
		return this.value === null ? 0 : 1;
	}
}

console.log("Generic Interface Inheritance:");
const stringStorage = new Storage<string>();
stringStorage.write("Hello");
console.log("Read:", stringStorage.read());
console.log("Is empty:", stringStorage.isEmpty());
console.log("Size:", stringStorage.size());

stringStorage.update((str) => str.toUpperCase());
console.log("After update:", stringStorage.read());

// Example 9: Generic Interface with Default Type Parameters
interface Result<T, E = Error> {
	success: boolean;
	data?: T;
	error?: E;
}

interface HttpResult<T> extends Result<T, string> {
	statusCode: number;
	headers: Record<string, string>;
}

function safeJsonParse<T = any>(json: string): Result<T> {
	try {
		const data = JSON.parse(json);
		return { success: true, data };
	} catch (error) {
		return {
			success: false,
			error: error instanceof Error ? error : new Error("Parse error"),
		};
	}
}

function safeHttpRequest<T>(url: string): Promise<HttpResult<T>> {
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
} else {
	console.log("Parse error:", parseResult.error);
}

// Example 10: Generic Interface with Method Overloads
interface Database<T> {
	get(id: number): T | null;
	get(table: string, id: number): T | null;
	get(table: string, conditions: Partial<T>): T[];
	get<K extends keyof T>(field: K, value: T[K]): T[];
}

class InMemoryDatabase<T extends { id: number }> implements Database<T> {
	private data: T[] = [];

	get(id: number): T | null;
	get(table: string, id: number): T | null;
	get(table: string, conditions: Partial<T>): T[];
	get<K extends keyof T>(field: K, value: T[K]): T[];
	get(param1: any, param2?: any): T | T[] | null {
		// Single ID lookup
		if (typeof param1 === "number") {
			return this.data.find((item) => item.id === param1) || null;
		}

		// Field-based lookup
		if (typeof param2 !== "undefined" && typeof param1 !== "string") {
			return this.data.filter((item) => (item as any)[param1] === param2);
		}

		// Conditions-based lookup
		if (typeof param1 === "string" && typeof param2 === "object") {
			return this.data.filter((item) => {
				return Object.entries(param2).every(
					([key, value]) => (item as any)[key] === value,
				);
			});
		}

		return null;
	}

	insert(item: T): T {
		this.data.push(item);
		return item;
	}
}

console.log("Generic Interface with Method Overloads:");
const db = new InMemoryDatabase<User>();
db.insert({ id: 1, name: "Alice", email: "alice@example.com", age: 30 });
db.insert({ id: 2, name: "Bob", email: "bob@example.com", age: 25 });
db.insert({ id: 3, name: "Charlie", email: "charlie@example.com", age: 35 });

console.log("Get by ID:", db.get(1));
console.log("Get by email field:", db.get("email", "bob@example.com"));
console.log("Get by conditions:", db.get("users", { age: 30 }));

// Example 11: Generic Interface for Middleware
interface Middleware<TInput, TOutput = TInput> {
	process(input: TInput): TOutput;
	pipe<TNext>(next: Middleware<TOutput, TNext>): Middleware<TInput, TNext>;
}

class ValidationMiddleware<T> implements Middleware<T, T> {
	constructor(private validator: (input: T) => boolean) {}

	process(input: T): T {
		if (!this.validator(input)) {
			throw new Error("Validation failed");
		}
		return input;
	}

	pipe<TNext>(next: Middleware<T, TNext>): Middleware<T, TNext> {
		return {
			process: (input: T) => next.process(this.process(input)),
			pipe: <TNextNext>(nextNext: Middleware<TNext, TNextNext>) =>
				this.pipe(next).pipe(nextNext),
		};
	}
}

class TransformMiddleware<TInput, TOutput>
	implements Middleware<TInput, TOutput>
{
	constructor(private transformer: (input: TInput) => TOutput) {}

	process(input: TInput): TOutput {
		return this.transformer(input);
	}

	pipe<TNext>(next: Middleware<TOutput, TNext>): Middleware<TInput, TNext> {
		return {
			process: (input: TInput) => next.process(this.process(input)),
			pipe: <TNextNext>(nextNext: Middleware<TNext, TNextNext>) =>
				this.pipe(next).pipe(nextNext),
		};
	}
}

class LoggingMiddleware<T> implements Middleware<T, T> {
	constructor(private label: string) {}

	process(input: T): T {
		console.log(`${this.label}:`, input);
		return input;
	}

	pipe<TNext>(next: Middleware<T, TNext>): Middleware<T, TNext> {
		return {
			process: (input: T) => next.process(this.process(input)),
			pipe: <TNextNext>(nextNext: Middleware<TNext, TNextNext>) =>
				this.pipe(next).pipe(nextNext),
		};
	}
}

console.log("Generic Interface for Middleware:");
const validationMiddleware = new ValidationMiddleware<number>((n) => n > 0);
const transformMiddleware = new TransformMiddleware<number, string>(
	(n) => `Value: ${n}`,
);
const loggingMiddleware = new LoggingMiddleware<string>("Result");

const pipeline = validationMiddleware
	.pipe(transformMiddleware)
	.pipe(loggingMiddleware);

try {
	const result = pipeline.process(42);
	console.log("Pipeline result:", result);
} catch (error) {
	console.log("Pipeline error:", error);
}

// Example 12: Generic Interface for State Management
interface StateManager<TState> {
	getState(): TState;
	setState(updater: (state: TState) => TState): void;
	subscribe(listener: (state: TState) => void): () => void;
	select<TSelected>(selector: (state: TState) => TSelected): TSelected;
}

interface Action<TType = string, TPayload = any> {
	type: TType;
	payload?: TPayload;
}

interface Reducer<TState, TAction extends Action> {
	(state: TState, action: TAction): TState;
}

class Store<TState, TAction extends Action> implements StateManager<TState> {
	private state: TState;
	private listeners: ((state: TState) => void)[] = [];
	private reducer: Reducer<TState, TAction>;

	constructor(initialState: TState, reducer: Reducer<TState, TAction>) {
		this.state = initialState;
		this.reducer = reducer;
	}

	getState(): TState {
		return this.state;
	}

	setState(updater: (state: TState) => TState): void {
		this.state = updater(this.state);
		this.listeners.forEach((listener) => listener(this.state));
	}

	dispatch(action: TAction): void {
		this.state = this.reducer(this.state, action);
		this.listeners.forEach((listener) => listener(this.state));
	}

	subscribe(listener: (state: TState) => void): () => void {
		this.listeners.push(listener);
		return () => {
			const index = this.listeners.indexOf(listener);
			if (index > -1) {
				this.listeners.splice(index, 1);
			}
		};
	}

	select<TSelected>(selector: (state: TState) => TSelected): TSelected {
		return selector(this.state);
	}
}

console.log("Generic Interface for State Management:");
interface AppState {
	counter: number;
	user: { name: string; loggedIn: boolean } | null;
}

type AppAction =
	| { type: "INCREMENT" }
	| { type: "DECREMENT" }
	| { type: "SET_USER"; payload: { name: string } }
	| { type: "LOGOUT" };

const initialState: AppState = {
	counter: 0,
	user: null,
};

const appReducer: Reducer<AppState, AppAction> = (state, action) => {
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

// Example 13: Complex Generic Interface Patterns
interface CrudOperations<T, TKey = number> {
	create(entity: Omit<T, "id">): Promise<T>;
	read(key: TKey): Promise<T | null>;
	update(key: TKey, entity: Partial<T>): Promise<T | null>;
	delete(key: TKey): Promise<boolean>;
	list(options?: { limit?: number; offset?: number }): Promise<T[]>;
}

interface Cache<T> {
	get<K extends string>(key: K): Promise<T | null>;
	set<K extends string>(key: K, value: T, ttl?: number): Promise<void>;
	delete<K extends string>(key: K): Promise<boolean>;
	clear(): Promise<void>;
	has<K extends string>(key: K): Promise<boolean>;
	size(): Promise<number>;
}

interface Validator<T> {
	validate(value: T): ValidationResult;
	validateField<K extends keyof T>(field: K, value: T[K]): ValidationResult;
	validateObject(obj: T): ValidationResult[];
}

interface ValidationResult {
	isValid: boolean;
	errors: string[];
	field?: string;
}

console.log("Complex Generic Interface Patterns:");
console.log("All examples completed successfully!");
