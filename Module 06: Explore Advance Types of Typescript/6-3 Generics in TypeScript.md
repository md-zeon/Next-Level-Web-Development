# 6-3 Generics in TypeScript

## What are Generics?

Generics in TypeScript provide a way to create reusable components that work with multiple types while maintaining type safety. They allow you to write functions, classes, and interfaces that can work with any data type without sacrificing type checking.

Think of generics as "type variables" - placeholders for types that will be specified when the code is used.

## Why Use Generics?

- **Type Safety**: Maintain compile-time type checking with different types
- **Code Reusability**: Write once, use with multiple types
- **Flexibility**: Components that work with any type while preserving type information
- **Better IntelliSense**: IDEs provide better autocomplete and error detection
- **Performance**: No runtime type casting or boxing/unboxing

## Basic Generic Syntax

### Generic Functions

```typescript
function identity<T>(arg: T): T {
  return arg;
}

// Usage
let output1 = identity<string>("Hello");
let output2 = identity<number>(42);
let output3 = identity<boolean>(true);
```

### Generic Interfaces

```typescript
interface Container<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
}

let stringContainer: Container<string> = {
  value: "Hello",
  getValue: () => this.value,
  setValue: (value) => { this.value = value; }
};
```

### Generic Classes

```typescript
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
}

let stringStack = new Stack<string>();
stringStack.push("Hello");
stringStack.push("World");

let numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
```

## Generic Constraints

Sometimes you need to restrict the types that can be used with generics. This is done using constraints.

### Basic Constraints

```typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// Works with arrays and strings
logLength([1, 2, 3]);        // OK
logLength("Hello");          // OK
logLength({ length: 5 });    // OK

// Error: number doesn't have length property
// logLength(42);            // Error
```

### Multiple Constraints

```typescript
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
processEntity(user); // OK

let product = { id: 2, title: "Laptop" };
// processEntity(product); // Error: missing 'name' property
```

### Constructor Constraints

```typescript
function createInstance<T>(ctor: new () => T): T {
  return new ctor();
}

class MyClass {
  message = "Hello from MyClass";
}

let instance = createInstance(MyClass);
console.log(instance.message);
```

## Generic Utility Types

TypeScript provides several built-in generic utility types:

### Partial<T>

Makes all properties of T optional:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
// Equivalent to: { id?: number; name?: string; email?: string; }

function updateUser(user: User, updates: PartialUser): User {
  return { ...user, ...updates };
}
```

### Required<T>

Makes all properties of T required:

```typescript
type CompleteUser = Required<PartialUser>;
// All properties are now required again
```

### Readonly<T>

Makes all properties of T readonly:

```typescript
type ImmutableUser = Readonly<User>;

let user: ImmutableUser = { id: 1, name: "John", email: "john@example.com" };
// user.id = 2; // Error: Cannot assign to 'id' because it is a read-only property
```

### Pick<T, K>

Creates a type with only the specified properties from T:

```typescript
type UserBasicInfo = Pick<User, 'id' | 'name'>;
// Equivalent to: { id: number; name: string; }

function getBasicInfo(user: User): UserBasicInfo {
  return { id: user.id, name: user.name };
}
```

### Omit<T, K>

Creates a type without the specified properties from T:

```typescript
type UserWithoutId = Omit<User, 'id'>;
// Equivalent to: { name: string; email: string; }
```

### Record<K, T>

Creates an object type with keys of type K and values of type T:

```typescript
type StringDictionary = Record<string, string>;
type NumberDictionary = Record<string, number>;

let dict: StringDictionary = {
  "hello": "world",
  "foo": "bar"
};
```

### Exclude<T, U>

Excludes types from T that are assignable to U:

```typescript
type Primitive = string | number | boolean | null | undefined;
type NonNullablePrimitive = Exclude<Primitive, null | undefined>;
// Result: string | number | boolean
```

### Extract<T, U>

Extracts types from T that are assignable to U:

```typescript
type FunctionTypes = Extract<string | number | (() => void), Function>;
// Result: () => void
```

## Advanced Generic Patterns

### Generic Function Overloads

```typescript
function createArray<T>(length: number, value: T): T[];
function createArray<T>(length: number): T[];
function createArray<T>(length: number, value?: T): T[] {
  return value !== undefined
    ? Array(length).fill(value)
    : Array(length);
}

let numbers = createArray(5, 0);      // [0, 0, 0, 0, 0]
let strings = createArray(3, "hello"); // ["hello", "hello", "hello"]
let empty = createArray<string>(3);    // [undefined, undefined, undefined]
```

### Generic Classes with Multiple Type Parameters

```typescript
class Pair<T, U> {
  constructor(public first: T, public second: U) {}

  swap(): Pair<U, T> {
    return new Pair(this.second, this.first);
  }

  toString(): string {
    return `${this.first} -> ${this.second}`;
  }
}

let pair = new Pair("hello", 42);
console.log(pair.toString());        // "hello -> 42"

let swapped = pair.swap();
console.log(swapped.toString());     // "42 -> hello"
```

### Generic Interfaces with Methods

```typescript
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

function sortArray<T>(arr: T[], comparator: Comparator<T>): T[] {
  return [...arr].sort(comparator.compare);
}

let numbers = [3, 1, 4, 1, 5];
let sortedNumbers = sortArray(numbers, new NumberComparator());
console.log(sortedNumbers); // [1, 1, 3, 4, 5]
```

### Generic Constraints with keyof

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

interface Person {
  name: string;
  age: number;
  email: string;
}

let person: Person = { name: "John", age: 30, email: "john@example.com" };

let name = getProperty(person, "name");      // string
let age = getProperty(person, "age");       // number
let email = getProperty(person, "email");    // string

// Error: 'phone' is not a property of Person
// let phone = getProperty(person, "phone"); // Error
```

### Conditional Types

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;      // true
type B = IsString<number>;      // false
type C = IsString<string | number>; // boolean (union of true | false)
```

### Mapped Types

```typescript
type Optional<T> = {
  [P in keyof T]?: T[P];
};

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

interface User {
  name: string;
  age: number;
}

type OptionalUser = Optional<User>;        // { name?: string; age?: number; }
type ReadonlyUser = Readonly<User>;        // { readonly name: string; readonly age: number; }
type NullableUser = Nullable<User>;        // { name: string | null; age: number | null; }
```

## Generic Best Practices

### ✅ Do's

- Use descriptive type parameter names (T, U, V, etc.)
- Provide constraints when necessary
- Use built-in utility types when possible
- Keep generic functions/classes focused on one responsibility
- Document generic type parameters

### ❌ Don'ts

- Don't use generics when not needed
- Avoid overly complex generic constraints
- Don't use `any` as a type parameter
- Avoid deep nesting of generics
- Don't create generic classes just for one use case

### Naming Conventions

```typescript
// Good naming
function identity<T>(value: T): T { ... }
function merge<T, U>(a: T, b: U): T & U { ... }
class Container<T> { ... }
interface Repository<T> { ... }

// Less descriptive (avoid)
function process<A, B>(a: A, b: B) { ... }
function doSomething<T1, T2>(param1: T1, param2: T2) { ... }
```

## Common Generic Patterns

### API Response Wrapper

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

async function fetchUser(id: number): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    return { success: true, data: user };
  } catch (error) {
    return { success: false, data: null as any, error: error.message };
  }
}
```

### Event System

```typescript
class EventEmitter<T extends string> {
  private listeners: Record<T, Function[]> = {} as Record<T, Function[]>;

  on<K extends T>(event: K, listener: (data: any) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  emit<K extends T>(event: K, data?: any): void {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      eventListeners.forEach(listener => listener(data));
    }
  }
}

type UserEvents = 'login' | 'logout' | 'update';
const userEvents = new EventEmitter<UserEvents>();

userEvents.on('login', (user) => console.log('User logged in:', user));
userEvents.emit('login', { id: 1, name: 'John' });
```

### Generic Cache

```typescript
class Cache<T> {
  private storage = new Map<string, { value: T; expiry?: number }>();

  set<K extends string>(key: K, value: T, ttl?: number): void {
    const expiry = ttl ? Date.now() + ttl : undefined;
    this.storage.set(key, { value, expiry });
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

  clear(): void {
    this.storage.clear();
  }
}

const userCache = new Cache<User>();
userCache.set('user_1', { id: 1, name: 'John', email: 'john@example.com' }, 60000);
```

## Practice Exercises

### Exercise 1: Generic Stack

```typescript
// Create a generic Stack class with push, pop, peek, and isEmpty methods
// Test it with different types (numbers, strings, objects)
```

### Exercise 2: Generic Filter Function

```typescript
// Create a generic filter function that works with arrays
// Use constraints to ensure the array elements have the properties you need
function filterByProperty<T, K extends keyof T>(
  items: T[],
  property: K,
  value: T[K]
): T[] {
  // Implementation
}
```

### Exercise 3: Generic API Client

```typescript
// Create a generic API client class
// It should have methods like get, post, put, delete
// Use generics to type the request/response data
class ApiClient {
  // Implementation
}
```

### Exercise 4: Generic Linked List

```typescript
// Implement a generic LinkedList class
// Include methods: add, remove, find, toArray
// Use proper constraints and error handling
```

### Exercise 5: Generic Event System

```typescript
// Create a generic event system
// Support different event types with typed payloads
// Include methods: on, off, emit, once
interface EventSystem {
  // Implementation
}
```

## TypeScript Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

## Summary

Generics are one of TypeScript's most powerful features, enabling:

- **Type-Safe Reusability**: Write code that works with multiple types safely
- **Better Abstractions**: Create data structures and algorithms that work with any type
- **Compile-Time Safety**: Catch type errors before runtime
- **Clean APIs**: Self-documenting code with explicit type contracts
- **Performance**: No runtime type checking overhead

**Key Takeaways:**
- Use `<T>` syntax for type parameters
- Apply constraints with `extends` when needed
- Leverage built-in utility types (Partial, Pick, Record, etc.)
- Combine generics with other TypeScript features (interfaces, classes, constraints)
- Keep generic code simple and focused
- Use descriptive names for type parameters
- Test generics with different types to ensure robustness

Mastering generics will significantly enhance your TypeScript programming capabilities and enable you to write more flexible, reusable, and type-safe code!
