# 6-5 Generics with Function

## Generic Functions in TypeScript

Generic functions allow you to write reusable functions that work with multiple types while maintaining type safety. They provide flexibility and type inference, enabling you to create functions that can operate on different data types without sacrificing compile-time type checking.

## Basic Generic Functions

### Simple Generic Function

```typescript
function identity<T>(arg: T): T {
  return arg;
}

// Usage
let output1 = identity<string>("Hello World"); // Explicit type
let output2 = identity("Hello World");         // Type inferred
let output3 = identity<number>(42);           // Explicit type
let output4 = identity(42);                   // Type inferred
```

### Generic Function with Multiple Parameters

```typescript
function swap<T, U>(a: T, b: U): [U, T] {
  return [b, a];
}

// Usage
let swapped = swap("hello", 42); // ["hello", 42] with types [string, number]
```

## Generic Function Types

### Function Type with Generics

```typescript
// Generic function type
type GenericFunction<T, U> = (arg: T) => U;

// Usage
let stringLength: GenericFunction<string, number> = (s) => s.length;
let numberToString: GenericFunction<number, string> = (n) => n.toString();

// Generic interface for functions
interface Transformer<TInput, TOutput> {
  (input: TInput): TOutput;
}

let parseJson: Transformer<string, any> = JSON.parse;
let stringifyJson: Transformer<any, string> = JSON.stringify;
```

### Generic Method in Interface

```typescript
interface Processor<T> {
  process<U>(input: T): U;
  map<U>(transform: (value: T) => U): U[];
}

class DataProcessor<T> implements Processor<T> {
  constructor(private data: T[]) {}

  process<U>(input: T): U {
    // Process single item
    return input as unknown as U; // Type assertion for demo
  }

  map<U>(transform: (value: T) => U): U[] {
    return this.data.map(transform);
  }
}
```

## Generic Constraints

### Basic Constraints

```typescript
interface HasLength {
  length: number;
}

function getLength<T extends HasLength>(arg: T): number {
  return arg.length;
}

// Usage
getLength("hello");     // 5
getLength([1, 2, 3]);   // 3
getLength({length: 10}); // 10

// Error: number doesn't have length
// getLength(42); // TypeScript error
```

### Multiple Constraints

```typescript
interface HasId {
  id: number;
}

interface HasName {
  name: string;
}

function createEntity<T extends HasId & HasName>(entity: T): T & { createdAt: Date } {
  return {
    ...entity,
    createdAt: new Date()
  };
}

// Usage
let user = createEntity({ id: 1, name: "Alice", email: "alice@example.com" });
```

### Keyof Constraints

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Usage
let person = { name: "John", age: 30 };
let name = getProperty(person, "name");    // string
let age = getProperty(person, "age");     // number

// Error: property doesn't exist
// let invalid = getProperty(person, "email"); // TypeScript error
```

## Generic Function Overloads

### Function Overloads with Generics

```typescript
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

// Usage
let result1 = processValue("hello"); // string[]
let result2 = processValue(42);      // number
let result3 = processValue(true);    // boolean
```

### Advanced Overloads

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
}

function fetchData<T>(url: string): Promise<ApiResponse<T>>;
function fetchData<T>(url: string, options: { method: 'GET' }): Promise<ApiResponse<T>>;
function fetchData<T>(url: string, options: { method: 'POST'; body: T }): Promise<ApiResponse<T>>;
function fetchData<T>(url: string, options?: any): Promise<ApiResponse<T>> {
  // Implementation would make actual HTTP request
  return Promise.resolve({
    data: {} as T,
    status: 200
  });
}

// Usage
fetchData<User>("/users");                    // GET request
fetchData<User>("/users", { method: 'GET' }); // GET request
fetchData<User>("/users", { method: 'POST', body: { name: "John" } }); // POST request
```

## Higher-Order Generic Functions

### Functions that Return Generic Functions

```typescript
function createGetter<T>() {
  return function<K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  };
}

// Usage
let getUserProp = createGetter<User>();
let userName = getUserProp({ id: 1, name: "Alice", email: "alice@example.com" }, "name");
```

### Generic Function Composition

```typescript
function compose<A, B, C>(
  f: (x: B) => C,
  g: (x: A) => B
): (x: A) => C {
  return (x) => f(g(x));
}

// Usage
let addOne = (x: number) => x + 1;
let double = (x: number) => x * 2;
let stringify = (x: number) => x.toString();

let composed = compose(stringify, compose(double, addOne));
console.log(composed(5)); // "12"
```

### Generic Currying

```typescript
function curry<A, B, C>(
  fn: (a: A, b: B) => C
): (a: A) => (b: B) => C {
  return (a) => (b) => fn(a, b);
}

// Usage
function add(a: number, b: number): number {
  return a + b;
}

let curriedAdd = curry(add);
let addFive = curriedAdd(5);
console.log(addFive(3)); // 8
```

## Generic Utility Functions

### Array Utilities

```typescript
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

// Usage
let numbers = [1, 2, 3, 4, 5];
console.log(first(numbers));  // 1
console.log(last(numbers));   // 5
console.log(reverse(numbers)); // [5, 4, 3, 2, 1]
console.log(unique([1, 2, 2, 3, 3, 3])); // [1, 2, 3]
```

### Object Utilities

```typescript
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
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

// Usage
let user = { id: 1, name: "Alice", email: "alice@example.com", password: "secret" };

let publicUser = pick(user, ["id", "name", "email"]);
let userWithoutPassword = omit(user, ["password"]);
```

### Type Guards with Generics

```typescript
function isArray<T>(value: T | T[]): value is T[] {
  return Array.isArray(value);
}

function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

// Usage
function processItems<T>(items: T | T[]): T[] {
  if (isArray(items)) {
    return items;
  }
  return [items];
}

function safeGet<T>(array: T[], index: number): T | undefined {
  let item = array[index];
  return isDefined(item) ? item : undefined;
}
```

## Advanced Generic Function Patterns

### Generic Factory Functions

```typescript
interface Constructor<T> {
  new (...args: any[]): T;
}

function createInstance<T>(ctor: Constructor<T>, ...args: any[]): T {
  return new ctor(...args);
}

function createFactory<T>(ctor: Constructor<T>) {
  return (...args: any[]) => new ctor(...args);
}

// Usage
class Product {
  constructor(public id: number, public name: string, public price: number) {}
}

let productFactory = createFactory(Product);
let product1 = productFactory(1, "Widget", 29.99);
let product2 = createInstance(Product, 2, "Gadget", 49.99);
```

### Generic Async Functions

```typescript
async function fetchJson<T>(url: string): Promise<T> {
  let response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
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

// Usage
interface User {
  id: number;
  name: string;
}

let fetchUser = () => fetchJson<User>("/api/user/1");
let user = await retry(fetchUser, 3, 500);
```

### Generic Memoization

```typescript
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

// Usage
function expensiveCalculation(n: number): number {
  console.log(`Calculating for ${n}`);
  return n * n;
}

let memoizedCalculation = memoize(expensiveCalculation);

console.log(memoizedCalculation(5)); // Calculates and logs
console.log(memoizedCalculation(5)); // Returns cached result, no log
```

## Generic Function Best Practices

### ✅ Do's

- Use descriptive type parameter names (T, U, V)
- Provide default type parameters when appropriate
- Use constraints to limit generic types appropriately
- Keep functions focused on a single responsibility
- Use type inference when possible

### ❌ Don'ts

- Don't use `any` as type parameters
- Avoid overly complex generic constraints
- Don't create functions that try to do too much
- Avoid deep nesting of generics
- Don't ignore TypeScript compiler warnings

### Naming Conventions

```typescript
// Good naming
function transform<TInput, TOutput>(input: TInput): TOutput { ... }
function createMap<TKey, TValue>(): Map<TKey, TValue> { ... }
function processList<TItem>(list: TItem[]): TItem[] { ... }

// Less descriptive (avoid)
function process<A, B>(a: A): B { ... }
function handle<T1, T2, T3>(data: T1): T2 { ... }
```

## Common Generic Function Patterns

### CRUD Operations

```typescript
function createEntity<T extends { id?: number }>(entity: T): T & { id: number } {
  return { ...entity, id: Date.now() };
}

function updateEntity<T extends { id: number }>(entity: T, updates: Partial<T>): T {
  return { ...entity, ...updates };
}

function findById<T extends { id: number }>(entities: T[], id: number): T | undefined {
  return entities.find(entity => entity.id === id);
}
```

### Validation Functions

```typescript
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
```

### Sorting and Filtering

```typescript
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
```

## Practice Exercises

### Exercise 1: Generic Utility Functions

```typescript
// Create generic utility functions for arrays and objects
// Include functions like: map, filter, reduce, find, some, every
interface ArrayUtils {
  // Implementation
}
```

### Exercise 2: Generic API Client

```typescript
// Create a generic HTTP client with proper typing
// Support GET, POST, PUT, DELETE with type-safe responses
interface HttpClient {
  // Implementation
}
```

### Exercise 3: Generic Cache Implementation

```typescript
// Implement a generic cache with TTL support
// Support different storage backends (memory, localStorage, etc.)
interface Cache<T> {
  // Implementation
}
```

### Exercise 4: Generic Form Validation

```typescript
// Create a generic form validation system
// Support field-level and form-level validation with custom rules
interface FormValidator<T> {
  // Implementation
}
```

### Exercise 5: Generic State Management

```typescript
// Implement a generic state management system
// Support actions, reducers, and selectors with type safety
interface Store<TState, TAction> {
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
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true
  }
}
```

## Summary

Generic functions in TypeScript provide powerful abstractions that enable:

- **Type Safety**: Compile-time checking with multiple types
- **Reusability**: Functions that work with any conforming type
- **Flexibility**: Type inference and default parameters
- **Maintainability**: Easy refactoring with type changes
- **IntelliSense**: Better IDE support and developer experience

**Key Takeaways:**
- Generic functions use type parameters `<T>` to work with multiple types
- Constraints limit acceptable types using `extends`
- Function overloads work with generic functions
- Higher-order functions can be generic
- Utility functions benefit greatly from generics
- Keep generic functions focused and well-typed

Mastering generic functions will enable you to write more flexible, reusable, and type-safe code in TypeScript!

## Additional Resources

- [TypeScript Handbook: Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [TypeScript Handbook: Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [Advanced TypeScript Patterns](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
