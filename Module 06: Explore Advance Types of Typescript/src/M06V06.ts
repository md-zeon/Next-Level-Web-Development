// TypeScript Generic Constraints - Comprehensive Examples
// Exploring constraint syntax, patterns, and advanced usage

// Example 1: Basic Constraints
interface HasLength {
  length: number;
}

function getLength<T extends HasLength>(arg: T): number {
  return arg.length;
}

console.log("Basic Constraints:");
console.log("String length:", getLength("hello"));
console.log("Array length:", getLength([1, 2, 3]));
console.log("Object length:", getLength({ length: 10 }));

// Example 2: Interface Constraints
interface Identifiable {
  id: number;
  name: string;
}

function createEntity<T extends Identifiable>(entity: T): T & { createdAt: Date } {
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
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Dog extends Animal {
  breed: string;
  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }
}

function getAnimalInfo<T extends Animal>(animal: T): string {
  return `Animal: ${animal.name}`;
}

let dog = new Dog("Buddy", "Golden Retriever");
console.log("Class Constraints:");
console.log("Animal info:", getAnimalInfo(dog));

// Example 4: Multiple Constraints
interface HasId {
  id: number;
}

interface HasName {
  name: string;
}

interface HasEmail {
  email: string;
}

function createUser<T extends HasId & HasName & HasEmail>(userData: T): T & { role: string } {
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

// Example 5: Union Constraints
type StringOrNumber = string | number;

function processValue<T extends StringOrNumber>(value: T): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else {
    return value.toString();
  }
}

console.log("Union Constraints:");
console.log("Process string:", processValue("hello"));
console.log("Process number:", processValue(42));

// Example 6: keyof Constraints - Basic
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

interface Person {
  name: string;
  age: number;
  email: string;
}

let person: Person = {
  name: "John",
  age: 30,
  email: "john@example.com"
};

console.log("keyof Constraints - Basic:");
console.log("Get name:", getProperty(person, "name"));
console.log("Get age:", getProperty(person, "age"));
console.log("Get email:", getProperty(person, "email"));

// Example 7: keyof Constraints - Advanced
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  let result = {} as Pick<T, K>;
  keys.forEach(key => {
    result[key] = obj[key];
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

let fullPerson = {
  name: "Alice",
  age: 25,
  email: "alice@example.com",
  password: "secret123"
};

console.log("keyof Constraints - Advanced:");
console.log("Pick public info:", pick(fullPerson, ["name", "age", "email"]));
console.log("Omit password:", omit(fullPerson, ["password"]));

// Example 8: Constructor Constraints
interface Constructable<T> {
  new (...args: any[]): T;
}

function createInstance<T>(ctor: Constructable<T>, ...args: any[]): T {
  return new ctor(...args);
}

class Product {
  constructor(public id: number, public name: string, public price: number) {}
}

class User {
  constructor(public id: number, public name: string) {}
}

let product = createInstance(Product, 1, "Widget", 29.99);
let userInstance = createInstance(User, 1, "John");

console.log("Constructor Constraints:");
console.log("Created product:", product);
console.log("Created user:", userInstance);

// Example 9: Factory Pattern with Constraints
interface Factory<T> {
  create(): T;
}

function createFactory<T>(ctor: Constructable<T>): Factory<T> {
  return {
    create: () => new ctor()
  };
}

class Car {
  drive(): void {
    console.log("Driving car...");
  }
}

let carFactory = createFactory(Car);
let car = carFactory.create();
console.log("Factory Pattern:");
car.drive();

// Example 10: Constraint with Method Requirements
interface Comparable<T> {
  compareTo(other: T): number;
}

function findMax<T extends Comparable<T>>(items: T[]): T | null {
  if (items.length === 0) return null;

  return items.reduce((max, current) => current.compareTo(max) > 0 ? current : max);
}

class NumberWrapper implements Comparable<NumberWrapper> {
  constructor(public value: number) {}

  compareTo(other: NumberWrapper): number {
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

// Example 11: Constraint with Generic Classes
interface Repository<T, K extends keyof T> {
  findById(id: T[K]): T | null;
  save(entity: T): void;
  delete(id: T[K]): boolean;
}

class InMemoryRepository<T extends { id: number }, K extends keyof T = 'id'> implements Repository<T, K> {
  private storage = new Map<T[K], T>();

  findById(id: T[K]): T | null {
    return this.storage.get(id) || null;
  }

  save(entity: T): void {
    this.storage.set(entity.id as T[K], entity);
  }

  delete(id: T[K]): boolean {
    return this.storage.delete(id);
  }
}

interface UserEntity {
  id: number;
  name: string;
  email: string;
}

let userRepo = new InMemoryRepository<UserEntity>();

userRepo.save({ id: 1, name: "John", email: "john@example.com" });
userRepo.save({ id: 2, name: "Jane", email: "jane@example.com" });

console.log("Generic Classes:");
console.log("Find user 1:", userRepo.findById(1));
console.log("Find user 2:", userRepo.findById(2));

// Example 12: Common Constraint Patterns - Lengthwise
interface Lengthwise {
  length: number;
}

function getLength2<T extends Lengthwise>(item: T): number {
  return item.length;
}

function truncate<T extends Lengthwise>(item: T, maxLength: number): string {
  let str = item.toString();
  return str.substring(0, maxLength);
}

console.log("Lengthwise Pattern:");
console.log("Length:", getLength2("hello world"));
console.log("Truncated:", truncate("hello world", 5));

// Example 13: Common Constraint Patterns - Numeric
interface Numeric {
  valueOf(): number;
}

function sum<T extends Numeric>(...values: T[]): number {
  return values.reduce((total, current) => total + current.valueOf(), 0);
}

class Money implements Numeric {
  constructor(public amount: number, public currency: string) {}

  valueOf(): number {
    return this.amount;
  }
}

let total = sum(new Money(10, 'USD'), new Money(20, 'USD'));
console.log("Numeric Pattern:");
console.log("Total:", total);

// Example 14: Collection Types
interface Collection<T> {
  items: T[];
  add(item: T): void;
  remove(item: T): boolean;
  find(predicate: (item: T) => boolean): T | undefined;
}

function processCollection<T, U extends Collection<T>>(collection: U, processor: (item: T) => void): void {
  collection.items.forEach(processor);
}

class ArrayCollection<T> implements Collection<T> {
  items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  remove(item: T): boolean {
    let index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  find(predicate: (item: T) => boolean): T | undefined {
    return this.items.find(predicate);
  }
}

let numberCollection = new ArrayCollection<number>();
numberCollection.add(1);
numberCollection.add(2);
numberCollection.add(3);

console.log("Collection Types:");
processCollection(numberCollection, (num) => console.log("Processing:", num));

// Example 15: Event System with Constraints
interface Event<T extends string = string> {
  type: T;
  payload?: any;
}

interface EventHandler<T extends Event> {
  handle(event: T): void;
}

class EventBus<T extends Event = Event> {
  private handlers = new Map<string, EventHandler<T>[]>();

  subscribe<U extends T>(eventType: U['type'], handler: EventHandler<U>): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType)!.push(handler as EventHandler<T>);
  }

  publish(event: T): void {
    const handlers = this.handlers.get(event.type);
    if (handlers) {
      handlers.forEach(handler => handler.handle(event));
    }
  }
}

type UserEvents = 'login' | 'logout';

let eventBus = new EventBus<Event<UserEvents>>();

eventBus.subscribe('login', {
  handle: (event) => console.log('User logged in:', event.payload)
});

eventBus.publish({ type: 'login', payload: { userId: 1 } });

console.log("Event System:");
console.log("Event published successfully");

// Example 16: Practice Exercises Solutions

// Exercise 1: Basic Constraints
interface HasName {
  name: string;
}

function getUppercaseName<T extends HasName>(obj: T): string {
  return obj.name.toUpperCase();
}

console.log("Exercise 1:");
console.log("Uppercase name:", getUppercaseName({ name: "john", age: 30 }));

// Exercise 2: Multiple Constraints
interface HasId2 {
  id: number;
}

interface HasEmail2 {
  email: string;
}

function createVerifiedUser<T extends HasId2 & HasEmail2>(user: T): T & { verified: boolean } {
  return {
    ...user,
    verified: true
  };
}

console.log("Exercise 2:");
console.log("Verified user:", createVerifiedUser({ id: 1, email: "test@example.com", name: "Test" }));

// Exercise 3: keyof Constraints
function updateProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]): T {
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
function createFactory2<T>(ctor: Constructable<T>): () => T {
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
function sortItems<T extends Comparable<T>>(items: T[]): T[] {
  return [...items].sort((a, b) => a.compareTo(b));
}

class StringWrapper implements Comparable<StringWrapper> {
  constructor(public value: string) {}

  compareTo(other: StringWrapper): number {
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
