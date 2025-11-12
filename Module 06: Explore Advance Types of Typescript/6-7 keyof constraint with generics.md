# 6-7 keyof Constraint with Generics

## What is keyof in TypeScript?

The `keyof` operator in TypeScript is a type operator that produces a union type of all known, public property names of a given type. When combined with generic constraints, it enables powerful type-safe operations on object properties, allowing you to create flexible yet type-safe functions that work with any object's keys.

## Why Use keyof with Generics?

- **Type Safety**: Ensure operations are performed on valid property names
- **IntelliSense**: Get autocomplete for property names
- **Refactoring Safety**: Code changes are caught at compile time
- **Generic Reusability**: Create utility functions that work with any object type
- **Property Validation**: Guarantee that keys exist on the target type

## Basic keyof Syntax

### keyof with Object Types

```typescript
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
  email: "john@example.com"
};

// Type-safe property access
let name = getProperty(person, "name");    // string
let age = getProperty(person, "age");     // number
let email = getProperty(person, "email"); // string

// Error: "phone" is not a key of Person
// let phone = getProperty(person, "phone"); // Error
```

### keyof with Generic Classes

```typescript
class PropertyAccessor<T> {
  constructor(private obj: T) {}

  get<K extends keyof T>(key: K): T[K] {
    return this.obj[key];
  }

  set<K extends keyof T>(key: K, value: T[K]): void {
    this.obj[key] = value;
  }

  has<K extends keyof T>(key: K): boolean {
    return key in this.obj;
  }
}

let accessor = new PropertyAccessor(person);
accessor.set("age", 31);
console.log(accessor.get("name")); // "John"
```

## Advanced keyof Patterns

### Property Picker Functions

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
  createdAt: new Date()
};

// Pick specific properties
let publicUser = pick(user, ["id", "name", "email"]);
console.log(publicUser); // { id: 1, name: "Alice", email: "alice@example.com" }

// Omit sensitive properties
let safeUser = omit(user, ["password"]);
console.log(safeUser); // User without password
```

### Property Updater with Validation

```typescript
function updateProperty<T, K extends keyof T>(
  obj: T,
  key: K,
  updater: (currentValue: T[K]) => T[K]
): T {
  return {
    ...obj,
    [key]: updater(obj[key])
  };
}

function validateAndUpdate<T, K extends keyof T>(
  obj: T,
  key: K,
  newValue: T[K],
  validator: (value: T[K]) => boolean
): T | null {
  if (validator(newValue)) {
    return {
      ...obj,
      [key]: newValue
    };
  }
  return null;
}

// Update with transformation
let updatedUser = updateProperty(user, "name", name => name.toUpperCase());
console.log(updatedUser.name); // "ALICE"

// Update with validation
let ageValidator = (age: number) => age >= 18 && age <= 120;
let validUpdate = validateAndUpdate(user, "age", 25, ageValidator);
console.log(validUpdate?.age); // 25

let invalidUpdate = validateAndUpdate(user, "age", 150, ageValidator);
console.log(invalidUpdate); // null
```

## keyof with Mapped Types

### Creating Property Mappers

```typescript
type PropertyMapper<T> = {
  [K in keyof T]: (value: T[K]) => T[K];
};

function mapProperties<T>(
  obj: T,
  mappers: Partial<PropertyMapper<T>>
): T {
  let result = { ...obj };
  for (let key in mappers) {
    if (key in obj && mappers[key]) {
      result[key] = mappers[key]!(obj[key]);
    }
  }
  return result;
}

// Usage
let userMappers: Partial<PropertyMapper<User>> = {
  name: (name) => name.trim(),
  email: (email) => email.toLowerCase(),
  createdAt: (date) => new Date(date)
};

let mappedUser = mapProperties(user, userMappers);
console.log(mappedUser.name); // "Alice" (trimmed)
console.log(mappedUser.email); // "alice@example.com" (lowercase)
```

### Property Existence Checker

```typescript
function hasAllProperties<T, K extends keyof T>(
  obj: any,
  keys: K[]
): obj is T {
  return keys.every(key => key in obj);
}

function hasAnyProperty<T, K extends keyof T>(
  obj: any,
  keys: K[]
): boolean {
  return keys.some(key => key in obj);
}

// Type guards
if (hasAllProperties<User>(someObj, ["id", "name", "email"])) {
  // someObj is now typed as User
  console.log(someObj.name);
}

if (hasAnyProperty(someObj, ["name", "email"])) {
  // At least one property exists
  console.log("Object has name or email");
}
```

## keyof with Function Parameters

### Generic Event Handlers

```typescript
interface EventMap {
  click: { x: number; y: number };
  hover: { element: string };
  submit: { data: any };
}

type EventNames = keyof EventMap;

function addEventListener<T extends EventNames>(
  eventName: T,
  handler: (event: EventMap[T]) => void
): void {
  // Implementation would register the handler
  console.log(`Added listener for ${eventName}`);
}

// Usage
addEventListener("click", (event) => {
  console.log(`Clicked at ${event.x}, ${event.y}`);
});

addEventListener("submit", (event) => {
  console.log("Form submitted with", event.data);
});

// Error: "invalid" is not a key of EventMap
// addEventListener("invalid", () => {}); // Error
```

### Generic API Client

```typescript
interface ApiEndpoints {
  users: { id: number; name: string }[];
  user: { id: number; name: string; email: string };
  posts: { id: number; title: string; content: string }[];
}

type EndpointNames = keyof ApiEndpoints;

class ApiClient {
  async get<T extends EndpointNames>(
    endpoint: T,
    params?: any
  ): Promise<ApiEndpoints[T]> {
    // Mock implementation
    console.log(`GET /${endpoint}`, params);
    return {} as ApiEndpoints[T];
  }

  async post<T extends EndpointNames>(
    endpoint: T,
    data: Partial<ApiEndpoints[T]>
  ): Promise<ApiEndpoints[T]> {
    // Mock implementation
    console.log(`POST /${endpoint}`, data);
    return {} as ApiEndpoints[T];
  }
}

let api = new ApiClient();

// Type-safe API calls
let users = await api.get("users");
let user = await api.get("user"); // Returns single user object
let posts = await api.get("posts");

await api.post("user", { name: "John", email: "john@example.com" });
```

## keyof with Class Properties

### Property Observer Pattern

```typescript
class PropertyObserver<T> {
  private observers = new Map<keyof T, ((value: T[keyof T]) => void)[]>();

  observe<K extends keyof T>(property: K, callback: (value: T[K]) => void): void {
    if (!this.observers.has(property)) {
      this.observers.set(property, []);
    }
    this.observers.get(property)!.push(callback as (value: T[keyof T]) => void);
  }

  notify<K extends keyof T>(property: K, value: T[K]): void {
    let callbacks = this.observers.get(property);
    if (callbacks) {
      callbacks.forEach(callback => callback(value));
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

  constructor(
    public name: string,
    public age: number,
    public email: string
  ) {}

  onPropertyChange<K extends keyof ObservableUser>(
    property: K,
    callback: (value: ObservableUser[K]) => void
  ): void {
    this.observer.observe(property, callback);
  }

  set<K extends keyof ObservableUser>(property: K, value: ObservableUser[K]): void {
    (this as any)[property] = value;
    this.observer.notify(property, value);
  }
}

let obsUser = new ObservableUserClass("Alice", 30, "alice@example.com");

obsUser.onPropertyChange("name", (name) => {
  console.log(`Name changed to: ${name}`);
});

obsUser.set("name", "Alice Smith"); // Triggers callback
```

### Generic Data Validator

```typescript
interface ValidationRules<T> {
  [K in keyof T]?: (value: T[K]) => boolean;
}

class DataValidator<T> {
  constructor(private rules: ValidationRules<T>) {}

  validate(obj: T): { [K in keyof T]?: string } {
    let errors: { [K in keyof T]?: string } = {};

    for (let key in this.rules) {
      let rule = this.rules[key];
      if (rule && !rule(obj[key as keyof T])) {
        errors[key as keyof T] = `${String(key)} is invalid`;
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
  email: (email) => email.includes("@")
});

let testUser: UserData = {
  name: "A",
  age: 16,
  email: "invalid-email"
};

console.log(userValidator.validate(testUser));
// { name: "name is invalid", age: "age is invalid", email: "email is invalid" }

console.log(userValidator.isValid(testUser)); // false
```

## keyof with Utility Types

### Advanced Utility Types

```typescript
// Get all optional keys
type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

// Get all required keys
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

// Get keys of a specific type
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
type ArrayKeys = KeysOfType<ComplexUser, any[]>;   // "tags"
```

### Generic Property Path Accessor

```typescript
type PropertyPath<T, K extends keyof T = keyof T> = K extends string
  ? T[K] extends Record<string, any>
    ? T[K] extends readonly unknown[]
      ? K | `${K}.${PropertyPath<T[K], Exclude<keyof T[K], keyof unknown[]>>}`
      : K | `${K}.${PropertyPath<T[K], keyof T[K]>}`
    : K
  : never;

type PropertyPathValue<T, P extends PropertyPath<T>> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? Rest extends PropertyPath<T[K]>
      ? PropertyPathValue<T[K], Rest>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never;

function getPropertyPath<T, P extends PropertyPath<T>>(
  obj: T,
  path: P
): PropertyPathValue<T, P> {
  return path.split('.').reduce((current, key) => (current as any)[key], obj as any);
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
    contact: { email: "john@example.com", phone: "123-456-7890" }
  },
  settings: { theme: "dark", notifications: true }
};

// Type-safe nested property access
let userName = getPropertyPath(nestedUser, "profile.personal.name"); // string
let userEmail = getPropertyPath(nestedUser, "profile.contact.email"); // string
let theme = getPropertyPath(nestedUser, "settings.theme"); // string
```

## Best Practices for keyof with Generics

### ✅ Do's

- Use `keyof` constraints for type-safe property operations
- Combine with mapped types for powerful transformations
- Create reusable utility functions with keyof constraints
- Use keyof with conditional types for advanced patterns
- Document keyof usage in complex generic functions

### ❌ Don'ts

- Don't use keyof without constraints when you need specific keys
- Avoid overusing keyof in simple cases where explicit types suffice
- Don't create keyof constraints that are too restrictive
- Avoid keyof with `any` or `unknown` types
- Don't mix keyof with loose type assertions

### Naming Conventions

```typescript
// Good naming for keyof constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] { ... }
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> { ... }
function updateProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]): T { ... }

// Less clear naming (avoid)
function get<T, Key extends keyof T>(object: T, property: Key): T[Key] { ... }
function select<T, Keys extends keyof T>(data: T, fields: Keys[]): Pick<T, Keys> { ... }
```

## Common keyof Patterns

### Property Merger

```typescript
function mergeProperties<T, U>(
  target: T,
  source: U,
  properties: (keyof T & keyof U)[]
): T {
  let result = { ...target };
  properties.forEach(prop => {
    result[prop] = source[prop] as T[keyof T & keyof U];
  });
  return result;
}
```

### Property Comparator

```typescript
function compareProperties<T, K extends keyof T>(
  obj1: T,
  obj2: T,
  properties: K[]
): boolean {
  return properties.every(prop => obj1[prop] === obj2[prop]);
}
```

### Property Cloner

```typescript
function cloneProperties<T, K extends keyof T>(
  obj: T,
  properties: K[]
): Pick<T, K> {
  let result = {} as Pick<T, K>;
  properties.forEach(prop => {
    result[prop] = obj[prop];
  });
  return result;
}
```

## Practice Exercises

### Exercise 1: Property Getter/Setter

```typescript
// Create a generic class that can get and set properties of any object
// Use keyof constraints to ensure type safety

class PropertyManager<T> {
  // Implement constructor, get, set, and hasProperty methods
}

// Usage
interface Car {
  make: string;
  model: string;
  year: number;
}

let carManager = new PropertyManager<Car>({ make: "Toyota", model: "Camry", year: 2020 });
carManager.set("year", 2021);
console.log(carManager.get("model")); // "Camry"
```

### Exercise 2: Object Transformer

```typescript
// Create a function that transforms specific properties of an object
// Use keyof and mapped types

function transformProperties<T, K extends keyof T>(
  obj: T,
  transformers: { [P in K]?: (value: T[P]) => T[P] }
): T {
  // Implementation
}

// Usage
let user = { name: "john", age: 25, email: "JOHN@EXAMPLE.COM" };
let transformed = transformProperties(user, {
  name: (n) => n.toUpperCase(),
  email: (e) => e.toLowerCase()
});
```

### Exercise 3: Type-Safe Event Emitter

```typescript
// Create a type-safe event emitter using keyof constraints

interface Events {
  userLoggedIn: { userId: number; timestamp: Date };
  orderPlaced: { orderId: string; amount: number };
  error: { message: string; code: number };
}

class EventEmitter {
  // Implement emit and on methods with keyof constraints
}

// Usage
let emitter = new EventEmitter();
emitter.on("userLoggedIn", (event) => console.log(`User ${event.userId} logged in`));
emitter.emit("userLoggedIn", { userId: 123, timestamp: new Date() });
```

### Exercise 4: Generic Form Validator

```typescript
// Create a generic form validation system

interface FormFields {
  username: string;
  email: string;
  age: number;
  password: string;
}

type ValidationResult<T> = {
  [K in keyof T]?: string[];
};

class FormValidator<T> {
  // Implement validate method using keyof constraints
}

// Usage
let validator = new FormValidator<FormFields>();
let formData = { username: "user", email: "invalid", age: 15, password: "123" };
let errors = validator.validate(formData);
```

### Exercise 5: Property Path Utilities

```typescript
// Create utilities for working with property paths

type DeepKeys<T> = // Implement deep key extraction

function getDeepValue<T, P extends DeepKeys<T>>(obj: T, path: P): any {
  // Implementation
}

function setDeepValue<T, P extends DeepKeys<T>>(obj: T, path: P, value: any): T {
  // Implementation
}

// Usage
interface DeepObject {
  user: {
    profile: {
      name: string;
      settings: { theme: string };
    };
  };
}

let obj: DeepObject = { user: { profile: { name: "John", settings: { theme: "dark" } } } };
let name = getDeepValue(obj, "user.profile.name");
let updated = setDeepValue(obj, "user.profile.settings.theme", "light");
```

## Summary

`keyof` constraints with generics provide powerful type-safe operations on object properties:

- **Type-Safe Property Access**: Guarantee valid property names at compile time
- **Generic Utility Functions**: Create reusable functions that work with any object type
- **Advanced Patterns**: Enable complex operations like property mapping and validation
- **IntelliSense Support**: Get autocomplete for property names and types
- **Refactoring Safety**: Catch property name changes at compile time

**Key Takeaways:**
- Use `K extends keyof T` for property name constraints
- Combine with mapped types for property transformations
- Create utility functions for common property operations
- Use keyof with conditional types for advanced scenarios
- Always prefer keyof constraints over string literals for property access

Mastering `keyof` with generics will significantly enhance your ability to write type-safe, reusable TypeScript code!
