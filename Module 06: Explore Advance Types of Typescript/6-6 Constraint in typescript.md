# 6-6 Constraint in TypeScript

## What are Generic Constraints?

Generic constraints in TypeScript allow you to restrict the types that can be used as type arguments for a generic type parameter. This provides more control over the types that can be passed to generic functions, classes, and interfaces, ensuring type safety while maintaining flexibility.

Constraints are specified using the `extends` keyword followed by a type that the generic type parameter must extend or implement.

## Why Use Constraints?

- **Type Safety**: Ensure that generic types have certain properties or methods
- **IntelliSense Support**: Better autocomplete and error detection in IDEs
- **API Design**: Create more predictable and self-documenting APIs
- **Compile-Time Checks**: Catch type errors before runtime
- **Code Reusability**: Write generic code that works with a subset of types that share common characteristics

## Basic Constraint Syntax

### Single Type Constraint

```typescript
interface HasLength {
  length: number;
}

function getLength<T extends HasLength>(arg: T): number {
  return arg.length;
}

// Works with types that have a length property
getLength("hello");        // OK - string has length
getLength([1, 2, 3]);      // OK - array has length
getLength({ length: 10 }); // OK - object has length property

// Error: number doesn't have length property
// getLength(42); // Error
```

### Interface Constraints

```typescript
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

console.log(user); // { id: 1, name: "John Doe", email: "john@example.com", createdAt: Date }
```

### Class Constraints

```typescript
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
console.log(getAnimalInfo(dog)); // "Animal: Buddy"
```

## Multiple Constraints

### Intersection Types

```typescript
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

console.log(newUser); // { id: 1, name: "Alice", email: "alice@example.com", age: 30, role: "user" }
```

### Union Constraints (Advanced)

```typescript
type StringOrNumber = string | number;

function processValue<T extends StringOrNumber>(value: T): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else {
    return value.toString();
  }
}

console.log(processValue("hello")); // "HELLO"
console.log(processValue(42));      // "42"

// Error: boolean is not assignable to StringOrNumber
// processValue(true); // Error
```

## keyof Constraints

### Basic keyof Usage

```typescript
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

let nameValue = getProperty(person, "name");    // string
let ageValue = getProperty(person, "age");     // number
let emailValue = getProperty(person, "email"); // string

// Error: 'phone' is not a key of Person
// let phoneValue = getProperty(person, "phone"); // Error
```

### Advanced keyof with Generic Objects

```typescript
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

let publicInfo = pick(fullPerson, ["name", "age", "email"]);
console.log(publicInfo); // { name: "Alice", age: 25, email: "alice@example.com" }

let withoutPassword = omit(fullPerson, ["password"]);
console.log(withoutPassword); // { name: "Alice", age: 25, email: "alice@example.com" }
```

## Constructor Constraints

### new() Constraints

```typescript
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
let user = createInstance(User, 1, "John");

console.log(product); // Product { id: 1, name: "Widget", price: 29.99 }
console.log(user);    // User { id: 1, name: "John" }
```

### Factory Pattern with Constraints

```typescript
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
car.drive(); // "Driving car..."
```

## Advanced Constraint Patterns

### Constraint with Method Requirements

```typescript
interface Comparable<T> {
  compareTo(other: T): number;
}

function findMax<T extends Comparable<T>>(items: T[]): T | null {
  if (items.length === 0) return null;

  let max = items[0];
  for (let i = 1; i < items.length; i++) {
    if (items[i].compareTo(max) > 0) {
      max = items[i];
    }
  }
  return max;
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

let maxNumber = findMax(numbers);
console.log(maxNumber?.value); // 8
```

### Constraint with Generic Classes

```typescript
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

interface User {
  id: number;
  name: string;
  email: string;
}

let userRepo = new InMemoryRepository<User>();

userRepo.save({ id: 1, name: "John", email: "john@example.com" });
userRepo.save({ id: 2, name: "Jane", email: "jane@example.com" });

console.log(userRepo.findById(1)); // { id: 1, name: "John", email: "john@example.com" }
console.log(userRepo.findById(2)); // { id: 2, name: "Jane", email: "jane@example.com" }
```

## Constraint Best Practices

### ✅ Do's

- Use constraints to ensure type safety
- Keep constraints as specific as needed, but not overly restrictive
- Use interface constraints for better code organization
- Combine multiple constraints with intersection types
- Use keyof constraints for property access patterns
- Document constraint requirements in comments

### ❌ Don'ts

- Don't use `any` as a constraint (defeats the purpose)
- Avoid overly complex constraint hierarchies
- Don't create constraints that are too restrictive
- Avoid circular constraint dependencies
- Don't use constraints when simple type unions would suffice

### Naming Conventions

```typescript
// Good constraint names
interface HasLength { length: number; }
interface Identifiable { id: string | number; }
interface Serializable { toJSON(): string; }

// Less descriptive (avoid)
interface A { prop: any; }
interface MyInterface { value: unknown; }
```

## Common Constraint Patterns

### Lengthwise Types

```typescript
interface Lengthwise {
  length: number;
}

function getLength<T extends Lengthwise>(item: T): number {
  return item.length;
}

function truncate<T extends Lengthwise>(item: T, maxLength: number): string {
  if (typeof item === 'string') {
    return item.substring(0, maxLength);
  }
  return item.toString().substring(0, maxLength);
}
```

### Numeric Types

```typescript
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
console.log(total); // 30
```

### Collection Types

```typescript
interface Collection<T> {
  items: T[];
  add(item: T): void;
  remove(item: T): boolean;
  find(predicate: (item: T) => boolean): T | undefined;
}

function processCollection<T, U extends Collection<T>>(collection: U, processor: (item: T) => void): void {
  collection.items.forEach(processor);
}
```

### Event System with Constraints

```typescript
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
```

## Practice Exercises

### Exercise 1: Basic Constraints

```typescript
// Create a function that accepts only objects with a 'name' property
// The function should return the name in uppercase

function getUppercaseName(obj: ???): string {
  // Implementation
}
```

### Exercise 2: Multiple Constraints

```typescript
// Create a function that accepts objects with both 'id' and 'email' properties
// Return an object with additional 'verified' property

function createVerifiedUser(user: ???): ??? {
  // Implementation
}
```

### Exercise 3: keyof Constraints

```typescript
// Create a generic function that updates a property of an object
// Use keyof constraints to ensure type safety

function updateProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]): T {
  // Implementation
}
```

### Exercise 4: Constructor Constraints

```typescript
// Create a factory function that can instantiate any class
// Use constructor constraints

function createFactory<T>(ctor: ???): () => T {
  // Implementation
}
```

### Exercise 5: Advanced Constraints

```typescript
// Create a generic sorting function that works with comparable objects
// Use constraints to ensure objects can be compared

interface Comparable<T> {
  compareTo(other: T): number;
}

function sortItems<T extends ???>(items: T[]): T[] {
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

Generic constraints are a powerful TypeScript feature that allows you to:

- **Restrict Generic Types**: Limit type parameters to specific types or interfaces
- **Ensure Type Safety**: Guarantee that generic types have required properties/methods
- **Improve Developer Experience**: Better IntelliSense and compile-time error detection
- **Create Flexible APIs**: Write reusable code that works with constrained type families
- **Maintain Code Quality**: Self-documenting code with explicit type requirements

**Key Takeaways:**
- Use `extends` keyword to specify constraints
- Combine constraints with `&` for multiple requirements
- Use `keyof` for property-based constraints
- Apply constructor constraints with `new () => T`
- Keep constraints focused and not overly restrictive
- Use constraints to create type-safe, reusable generic code

Mastering constraints will enable you to write more robust and type-safe generic code in TypeScript!
