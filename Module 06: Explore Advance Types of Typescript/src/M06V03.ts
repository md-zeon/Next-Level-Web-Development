// TypeScript Generics - Comprehensive Examples
// Generics provide type-safe reusability

// Example 1: Basic Generic Functions
function identity<T>(arg: T): T {
  return arg;
}

console.log("Identity function:");
console.log(identity<string>("Hello World"));  // "Hello World"
console.log(identity<number>(42));             // 42
console.log(identity<boolean>(true));          // true

// Type inference also works
console.log(identity("TypeScript"));           // "TypeScript" (string inferred)

// Example 2: Generic Interfaces
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

let strContainer = new StringContainer();
strContainer.setValue("Hello Generics");
console.log("String container:", strContainer.getValue());

let numContainer = new NumberContainer();
numContainer.setValue(99);
console.log("Number container:", numContainer.getValue());

// Example 3: Generic Classes
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

let stringStack = new Stack<string>();
stringStack.push("Hello");
stringStack.push("World");
stringStack.push("TypeScript");

console.log("String stack:");
console.log("Size:", stringStack.size());
console.log("Peek:", stringStack.peek());
console.log("Pop:", stringStack.pop());
console.log("Size after pop:", stringStack.size());

let numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);

console.log("Number stack:");
console.log("Size:", numberStack.size());
console.log("Pop:", numberStack.pop());

// Example 4: Generic Constraints
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(`Length: ${arg.length}`);
  return arg;
}

console.log("Generic constraints:");
logLength("Hello");                    // OK - string has length
logLength([1, 2, 3, 4]);             // OK - array has length
logLength({ length: 10, value: "test" }); // OK - object has length property

// logLength(42);                      // Error: number has no length property

// Example 5: Multiple Constraints
interface HasId {
  id: number;
}

interface HasName {
  name: string;
}

function processEntity<T extends HasId & HasName>(entity: T): string {
  return `Entity ${entity.name} has ID ${entity.id}`;
}

let user = { id: 1, name: "John", email: "john@example.com" };
console.log("Multiple constraints:", processEntity(user));

// Example 6: Constructor Constraints
function createInstance<T>(ctor: new () => T): T {
  return new ctor();
}

class MyClass {
  message = "Hello from MyClass";
  getMessage(): string {
    return this.message;
  }
}

let instance = createInstance(MyClass);
console.log("Constructor constraint:", instance.getMessage());

// Example 7: Built-in Utility Types
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

// Partial<T> - makes all properties optional
type PartialUser = Partial<User>;
let partialUser: PartialUser = { name: "John" };
console.log("Partial user:", partialUser);

// Required<T> - makes all properties required
type CompleteUser = Required<User>;
let completeUser: CompleteUser = {
  id: 1,
  name: "John",
  email: "john@example.com",
  age: 30
};
console.log("Complete user:", completeUser);

// Readonly<T> - makes all properties readonly
type ImmutableUser = Readonly<User>;
let immutableUser: ImmutableUser = {
  id: 1,
  name: "John",
  email: "john@example.com"
};
// immutableUser.id = 2; // Error: readonly property

// Pick<T, K> - picks specific properties
type UserBasicInfo = Pick<User, 'id' | 'name'>;
let basicInfo: UserBasicInfo = { id: 1, name: "John" };
console.log("Basic info:", basicInfo);

// Omit<T, K> - omits specific properties
type UserWithoutId = Omit<User, 'id'>;
let userWithoutId: UserWithoutId = {
  name: "John",
  email: "john@example.com",
  age: 30
};
console.log("User without ID:", userWithoutId);

// Record<K, T> - creates object type with specific key/value types
type StringDictionary = Record<string, string>;
let dict: StringDictionary = {
  "hello": "world",
  "foo": "bar",
  "typescript": "awesome"
};
console.log("String dictionary:", dict);

// Example 8: Generic Function Overloads
function createArray<T>(length: number, value: T): T[];
function createArray<T>(length: number): T[];
function createArray<T>(length: number, value?: T): T[] {
  return value !== undefined
    ? Array(length).fill(value)
    : Array(length);
}

console.log("Generic function overloads:");
console.log("Numbers:", createArray(5, 0));        // [0, 0, 0, 0, 0]
console.log("Strings:", createArray(3, "hello"));  // ["hello", "hello", "hello"]
console.log("Empty:", createArray<string>(3));     // [undefined, undefined, undefined]

// Example 9: Generic Classes with Multiple Type Parameters
class Pair<T, U> {
  constructor(public first: T, public second: U) {}

  swap(): Pair<U, T> {
    return new Pair(this.second, this.first);
  }

  toString(): string {
    return `${this.first} -> ${this.second}`;
  }

  getTypes(): string {
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

// Example 10: Generic Interfaces with Methods
interface Comparator<T> {
  compare(a: T, b: T): number;
}

class NumberComparator implements Comparator<number> {
  compare(a: number, b: number): number {
    return a - b;
  }
}

class StringComparator implements Comparator<string> {
  compare(a: string, b: string): number {
    return a.localeCompare(b);
  }
}

class ReverseNumberComparator implements Comparator<number> {
  compare(a: number, b: number): number {
    return b - a;
  }
}

function sortArray<T>(arr: T[], comparator: Comparator<T>): T[] {
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
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]): void {
  obj[key] = value;
}

interface Person {
  name: string;
  age: number;
  email: string;
}

let person: Person = { name: "John", age: 30, email: "john@example.com" };

console.log("Generic constraints with keyof:");
console.log("Name:", getProperty(person, "name"));
console.log("Age:", getProperty(person, "age"));
console.log("Email:", getProperty(person, "email"));

setProperty(person, "age", 31);
console.log("Updated age:", person.age);

// Example 12: Conditional Types
type IsString<T> = T extends string ? "Yes" : "No";

type A = IsString<string>;        // "Yes"
type B = IsString<number>;        // "No"
type C = IsString<string | number>; // "Yes" | "No"

console.log("Conditional types:");
let a: A = "Yes";
let b: B = "No";
// let c: C = "Maybe"; // Error: not assignable

// Example 13: Mapped Types
type Optional<T> = {
  [P in keyof T]?: T[P];
};

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

interface Product {
  id: number;
  name: string;
  price: number;
}

type OptionalProduct = Optional<Product>;
type ReadonlyProduct = Readonly<Product>;
type NullableProduct = Nullable<Product>;

let optionalProduct: OptionalProduct = { name: "Laptop" };
let readonlyProduct: ReadonlyProduct = { id: 1, name: "Laptop", price: 999 };
// readonlyProduct.price = 899; // Error: readonly property

let nullableProduct: NullableProduct = {
  id: null,
  name: "Laptop",
  price: 999
};

console.log("Mapped types:");
console.log("Optional product:", optionalProduct);
console.log("Readonly product:", readonlyProduct);
console.log("Nullable product:", nullableProduct);

// Example 14: Generic Cache Implementation
class Cache<T> {
  private storage = new Map<string, { value: T; expiry?: number }>();

  set<K extends string>(key: K, value: T, ttl?: number): void {
    if (ttl) {
      this.storage.set(key, { value, expiry: Date.now() + ttl });
    } else {
      this.storage.set(key, { value });
    }
  }

  get<K extends string>(key: K): T | null {
    const item = this.storage.get(key);
    if (!item) return null;

    if (item.expiry && Date.now() > item.expiry) {
      this.storage.delete(key);
      return null;
    }

    return item.value;
  }

  has<K extends string>(key: K): boolean {
    const item = this.storage.get(key);
    if (!item) return false;

    if (item.expiry && Date.now() > item.expiry) {
      this.storage.delete(key);
      return false;
    }

    return true;
  }

  delete<K extends string>(key: K): boolean {
    return this.storage.delete(key);
  }

  clear(): void {
    this.storage.clear();
  }

  size(): number {
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
const userCache = new Cache<User>();
userCache.set('user_1', { id: 1, name: 'John', email: 'john@example.com' }, 5000);
userCache.set('user_2', { id: 2, name: 'Jane', email: 'jane@example.com' });

console.log("User 1:", userCache.get('user_1'));
console.log("User 2:", userCache.get('user_2'));
console.log("Cache size:", userCache.size());

// Example 15: Generic Linked List
class LinkedListNode<T> {
  constructor(public value: T, public next: LinkedListNode<T> | null = null) {}
}

class LinkedList<T> {
  private head: LinkedListNode<T> | null = null;
  private _size: number = 0;

  add(value: T): void {
    const newNode = new LinkedListNode(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this._size++;
  }

  remove(value: T): boolean {
    if (!this.head) return false;

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

  find(value: T): LinkedListNode<T> | null {
    let current = this.head;
    while (current) {
      if (current.value === value) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  size(): number {
    return this._size;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }
}

console.log("Generic linked list:");
const numberList = new LinkedList<number>();
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
class EventEmitter<T extends string> {
  private listeners: Record<string, Function[]> = {};

  on<K extends T>(event: K, listener: (data?: any) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  off<K extends T>(event: K, listener?: (data?: any) => void): void {
    if (!this.listeners[event]) return;

    if (listener) {
      this.listeners[event] = this.listeners[event].filter(l => l !== listener);
    } else {
      delete this.listeners[event];
    }
  }

  emit<K extends T>(event: K, data?: any): void {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      eventListeners.forEach(listener => {
        try {
          listener(data);
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error);
        }
      });
    }
  }

  once<K extends T>(event: K, listener: (data?: any) => void): void {
    const onceListener = (data?: any) => {
      listener(data);
      this.off(event, onceListener);
    };
    this.on(event, onceListener);
  }

  listenerCount<K extends T>(event: K): number {
    return this.listeners[event]?.length || 0;
  }

  eventNames(): T[] {
    return Object.keys(this.listeners) as T[];
  }
}

console.log("Generic event system:");
type AppEvents = 'user_login' | 'user_logout' | 'data_updated' | 'error_occurred';

const appEvents = new EventEmitter<AppEvents>();

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

// Example 17: Generic API Response Wrapper
interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error?: string;
  timestamp: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://api.example.com') {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
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
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Date.now()
      };
    }
  }

  async post<T, U>(endpoint: string, data: U): Promise<ApiResponse<T>> {
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
    } catch (error) {
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
function mockApiCall<T>(data: T, shouldFail: boolean = false): Promise<ApiResponse<T>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({
          success: false,
          data: null,
          error: 'Mock API error',
          timestamp: Date.now()
        });
      } else {
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
  } else {
    console.log('Error fetching user:', userResponse.error);
  }

  let errorResponse = await mockApiCall(null, true);
  if (!errorResponse.success) {
    console.log('Expected error:', errorResponse.error);
  }
}

testApiClient();

// Example 18: Generic Filter Function
function filterByProperty<T, K extends keyof T>(
  items: T[],
  property: K,
  value: T[K]
): T[] {
  return items.filter(item => item[property] === value);
}

function filterByCondition<T>(
  items: T[],
  condition: (item: T) => boolean
): T[] {
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
function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map(item => item[key]);
}

function groupBy<T, K extends keyof T>(items: T[], key: K): Record<string, T[]> {
  return items.reduce((groups, item) => {
    const groupKey = String(item[key]);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}

function first<T>(items: T[]): T | undefined {
  return items[0];
}

function last<T>(items: T[]): T | undefined {
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

// Example 20: Advanced Generic Patterns - Generic Factory
interface Factory<T> {
  create(): T;
  createMany(count: number): T[];
}

class GenericFactory<T> implements Factory<T> {
  constructor(private creator: () => T) {}

  create(): T {
    return this.creator();
  }

  createMany(count: number): T[] {
    return Array.from({ length: count }, () => this.creator());
  }
}

// Usage with different types
class RandomNumberGenerator {
  generate(): number {
    return Math.floor(Math.random() * 100);
  }
}

class TimestampGenerator {
  generate(): Date {
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
