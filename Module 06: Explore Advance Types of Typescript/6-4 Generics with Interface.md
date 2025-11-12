# 6-4 Generics with Interface

## Combining Generics and Interfaces

When generics and interfaces are combined, they create powerful abstractions that provide both type safety and reusability. This combination allows you to define contracts that work with multiple types while maintaining compile-time type checking.

## Generic Interfaces

Generic interfaces define contracts that can work with different types, specified when the interface is implemented or used.

### Basic Generic Interface

```typescript
interface Container<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
  isEmpty(): boolean;
}

// Implementation
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
```

### Generic Interface with Multiple Type Parameters

```typescript
interface Pair<T, U> {
  first: T;
  second: U;
  swap(): Pair<U, T>;
  toString(): string;
}

class NumberStringPair implements Pair<number, string> {
  constructor(public first: number, public second: string) {}

  swap(): Pair<string, number> {
    return new NumberStringPair(this.second.length, this.first.toString());
  }

  toString(): string {
    return `${this.first} -> ${this.second}`;
  }
}
```

## Generic Constraints with Interfaces

### Interface Constraints

```typescript
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
}

// Usage
class UserRepository implements Repository<User> {
  private users: User[] = [];

  findById(id: number): User | null {
    return this.users.find(user => user.id === id) || null;
  }

  findAll(): User[] {
    return [...this.users];
  }

  save(entity: User): User {
    this.users.push(entity);
    return entity;
  }

  delete(id: number): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index > -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
```

### Constructor Interface with Generics

```typescript
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
    createMany: (count: number) => Array.from({ length: count }, () => new ctor())
  };
}
```

## Advanced Generic Interface Patterns

### Generic Interface for API Responses

```typescript
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

// Usage
async function fetchUsers(page: number = 1): Promise<PaginatedResponse<User>> {
  try {
    const response = await fetch(`/api/users?page=${page}`);
    const data = await response.json();

    return {
      success: true,
      data: data.users,
      error: null,
      timestamp: Date.now(),
      pagination: data.pagination
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: Date.now(),
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 }
    };
  }
}
```

### Generic Interface for Data Structures

```typescript
interface Collection<T> {
  items: T[];
  add(item: T): void;
  remove(item: T): boolean;
  find(predicate: (item: T) => boolean): T | undefined;
  filter(predicate: (item: T) => boolean): T[];
  map<U>(transform: (item: T) => U): U[];
  reduce<U>(reducer: (accumulator: U, item: T) => U, initialValue: U): U;
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
}
```

### Generic Interface for Event Systems

```typescript
interface EventEmitter<T extends string> {
  on<K extends T>(event: K, listener: (data: any) => void): void;
  off<K extends T>(event: K, listener?: (data: any) => void): void;
  emit<K extends T>(event: K, data?: any): void;
  once<K extends T>(event: K, listener: (data: any) => void): void;
}

interface TypedEventEmitter<T extends Record<string, any>> extends EventEmitter<keyof T & string> {
  emit<K extends keyof T & string>(event: K, data: T[K]): void;
}

// Usage
type AppEvents = {
  user_login: { userId: number; timestamp: number };
  user_logout: { userId: number; sessionDuration: number };
  error_occurred: { message: string; code: number };
};

class AppEventEmitter implements TypedEventEmitter<AppEvents> {
  private listeners: Record<string, Function[]> = {};

  on<K extends keyof AppEvents & string>(event: K, listener: (data: AppEvents[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  off<K extends keyof AppEvents & string>(event: K, listener?: (data: AppEvents[K]) => void): void {
    if (!this.listeners[event]) return;

    if (listener) {
      this.listeners[event] = this.listeners[event].filter(l => l !== listener);
    } else {
      delete this.listeners[event];
    }
  }

  emit<K extends keyof AppEvents & string>(event: K, data: AppEvents[K]): void {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      eventListeners.forEach(listener => listener(data));
    }
  }

  once<K extends keyof AppEvents & string>(event: K, listener: (data: AppEvents[K]) => void): void {
    const onceListener = (data: AppEvents[K]) => {
      listener(data);
      this.off(event, onceListener);
    };
    this.on(event, onceListener);
  }
}
```

## Generic Interface Inheritance

### Extending Generic Interfaces

```typescript
interface Readable<T> {
  read(): T;
  isEmpty(): boolean;
}

interface Writable<T> {
  write(value: T): void;
  clear(): void;
}

interface ReadWritable<T> extends Readable<T>, Writable<T> {
  update(transform: (current: T) => T): void;
}

class Storage<T> implements ReadWritable<T> {
  private value: T | null = null;

  read(): T {
    if (this.value === null) {
      throw new Error("No value stored");
    }
    return this.value;
  }

  isEmpty(): boolean {
    return this.value === null;
  }

  write(value: T): void {
    this.value = value;
  }

  clear(): void {
    this.value = null;
  }

  update(transform: (current: T) => T): void {
    if (this.value !== null) {
      this.value = transform(this.value);
    }
  }
}
```

### Generic Interface with Default Type Parameters

```typescript
interface Result<T, E = Error> {
  success: boolean;
  data?: T;
  error?: E;
}

interface HttpResult<T> extends Result<T, string> {
  statusCode: number;
  headers: Record<string, string>;
}

// Usage
function safeJsonParse<T = any>(json: string): Result<T> {
  try {
    const data = JSON.parse(json);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error : new Error('Parse error')
    };
  }
}
```

## Generic Interface with Method Overloads

```typescript
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
    if (typeof param1 === 'number') {
      return this.data.find(item => item.id === param1) || null;
    }

    // Field-based lookup
    if (typeof param2 !== 'undefined' && typeof param1 !== 'string') {
      return this.data.filter(item => item[param1] === param2);
    }

    // Conditions-based lookup
    if (typeof param1 === 'string' && typeof param2 === 'object') {
      return this.data.filter(item => {
        return Object.entries(param2).every(([key, value]) => item[key as keyof T] === value);
      });
    }

    return null;
  }

  insert(item: T): T {
    this.data.push(item);
    return item;
  }
}
```

## Advanced Patterns

### Generic Interface for Middleware

```typescript
interface Middleware<TInput, TOutput = TInput> {
  process(input: TInput): TOutput;
  pipe<TNext>(next: Middleware<TOutput, TNext>): Middleware<TInput, TNext>;
}

class ValidationMiddleware<T> implements Middleware<T, T> {
  constructor(private validator: (input: T) => boolean) {}

  process(input: T): T {
    if (!this.validator(input)) {
      throw new Error('Validation failed');
    }
    return input;
  }

  pipe<TNext>(next: Middleware<T, TNext>): Middleware<T, TNext> {
    return {
      process: (input: T) => next.process(this.process(input)),
      pipe: <TNextNext>(nextNext: Middleware<TNext, TNextNext>) => this.pipe(next).pipe(nextNext)
    };
  }
}

class TransformMiddleware<TInput, TOutput> implements Middleware<TInput, TOutput> {
  constructor(private transformer: (input: TInput) => TOutput) {}

  process(input: TInput): TOutput {
    return this.transformer(input);
  }

  pipe<TNext>(next: Middleware<TOutput, TNext>): Middleware<TInput, TNext> {
    return {
      process: (input: TInput) => next.process(this.process(input)),
      pipe: <TNextNext>(nextNext: Middleware<TNext, TNextNext>) => this.pipe(next).pipe(nextNext)
    };
  }
}
```

### Generic Interface for State Management

```typescript
interface StateManager<TState> {
  getState(): TState;
  setState(updater: (state: TState) => TState): void;
  subscribe(listener: (state: TState) => void): () => void;
  select<TSelected>(selector: (state: TState) => TSelected): TSelected;
}

interface Action<TType = string, TPayload = any> {
  type: TType;
  payload: TPayload;
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
    this.listeners.forEach(listener => listener(this.state));
  }

  dispatch(action: TAction): void {
    this.state = this.reducer(this.state, action);
    this.listeners.forEach(listener => listener(this.state));
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
```

## Generic Interface Best Practices

### ✅ Do's

- Use descriptive type parameter names (T, U, V)
- Provide default type parameters when appropriate
- Use constraints to limit generic types appropriately
- Document complex generic interfaces
- Keep interfaces focused on a single responsibility

### ❌ Don'ts

- Don't use `any` as type parameters
- Avoid overly complex generic constraints
- Don't create interfaces that try to do too much
- Avoid deep nesting of generics
- Don't ignore TypeScript compiler warnings

### Naming Conventions

```typescript
// Good naming
interface Container<T> { ... }
interface Repository<T> { ... }
interface Service<TInput, TOutput> { ... }

// Less descriptive (avoid)
interface Process<A, B> { ... }
interface Handler<T1, T2, T3> { ... }
```

## Common Generic Interface Patterns

### CRUD Interface

```typescript
interface CrudOperations<T, TKey = number> {
  create(entity: Omit<T, 'id'>): Promise<T>;
  read(key: TKey): Promise<T | null>;
  update(key: TKey, entity: Partial<T>): Promise<T | null>;
  delete(key: TKey): Promise<boolean>;
  list(options?: { limit?: number; offset?: number }): Promise<T[]>;
}
```

### Cache Interface

```typescript
interface Cache<T> {
  get<K extends string>(key: K): Promise<T | null>;
  set<K extends string>(key: K, value: T, ttl?: number): Promise<void>;
  delete<K extends string>(key: K): Promise<boolean>;
  clear(): Promise<void>;
  has<K extends string>(key: K): Promise<boolean>;
  size(): Promise<number>;
}
```

### Validation Interface

```typescript
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
```

## Practice Exercises

### Exercise 1: Generic Repository Interface

```typescript
// Create a generic repository interface that supports CRUD operations
// Implement it for both in-memory and API-based storage
interface Repository<T extends { id: string | number }> {
  // Implementation
}
```

### Exercise 2: Generic Cache Interface

```typescript
// Create a generic cache interface with TTL support
// Implement it using Map and localStorage
interface Cache<T> {
  // Implementation
}
```

### Exercise 3: Generic API Client Interface

```typescript
// Create a generic HTTP client interface
// Support GET, POST, PUT, DELETE with proper typing
interface HttpClient {
  // Implementation
}
```

### Exercise 4: Generic Form Validation Interface

```typescript
// Create a generic form validation interface
// Support field-level and form-level validation
interface FormValidator<T> {
  // Implementation
}
```

### Exercise 5: Generic State Management Interface

```typescript
// Create a generic state management interface
// Support actions, reducers, and selectors
interface StateManager<TState, TAction> {
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

Combining generics with interfaces creates powerful, reusable abstractions that provide:

- **Type Safety**: Compile-time checking with multiple types
- **Flexibility**: Interfaces that work with any conforming type
- **Maintainability**: Easy refactoring with interface changes
- **Reusability**: Components that can be used across different domains
- **IntelliSense**: Better IDE support and developer experience

**Key Takeaways:**
- Generic interfaces define contracts for multiple types
- Use constraints to limit acceptable types
- Combine with inheritance for complex hierarchies
- Method overloads work with generic interfaces
- Default type parameters provide flexibility
- Keep interfaces focused and well-documented

Mastering generic interfaces will enable you to create sophisticated, type-safe APIs and abstractions in TypeScript!
