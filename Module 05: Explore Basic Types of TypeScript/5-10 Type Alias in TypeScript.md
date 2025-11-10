# 5-10 Type Alias in TypeScript

## Type Aliases in TypeScript

Type aliases create custom names for types, making code more readable and maintainable. They don't create new types - they're just alternative names for existing types.

## Basic Type Aliases

### Simple Type Aliases

```typescript
// Basic type alias
type UserId = number;
type UserName = string;
type IsActive = boolean;

// Using type aliases
let userId: UserId = 123;
let userName: UserName = "John";
let isActive: IsActive = true;

// Without type aliases (less readable)
let userId2: number = 123;
let userName2: string = "John";
let isActive2: boolean = true;
```

### Object Type Aliases

```typescript
// Object type alias
type User = {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
};

// Using the type alias
const user: User = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    createdAt: new Date()
};

// Function parameter with type alias
function createUser(userData: User): User {
    return {
        ...userData,
        createdAt: new Date()
    };
}
```

## Union Type Aliases

Union types allow a value to be one of several types.

```typescript
// Union type alias
type StringOrNumber = string | number;
type Status = "active" | "inactive" | "pending";

// Using union type aliases
let value: StringOrNumber = "hello";
value = 42; // OK

let userStatus: Status = "active";
// userStatus = "deleted"; // Error: not assignable to Status

// More complex unions
type Result<T> = T | Error;
type ApiResponse = SuccessResponse | ErrorResponse;

interface SuccessResponse {
    success: true;
    data: any;
}

interface ErrorResponse {
    success: false;
    error: string;
}
```

## Intersection Type Aliases

Intersection types combine multiple types into one.

```typescript
// Intersection type alias
type Nameable = {
    name: string;
};

type Ageable = {
    age: number;
};

type Person = Nameable & Ageable;

// Person now has both name and age properties
const person: Person = {
    name: "John",
    age: 25
};

// Practical example: combining interfaces
type Employee = Person & {
    employeeId: number;
    department: string;
};

const employee: Employee = {
    name: "Jane",
    age: 30,
    employeeId: 12345,
    department: "Engineering"
};
```

## Function Type Aliases

Type aliases for function signatures.

```typescript
// Function type alias
type MathOperation = (a: number, b: number) => number;
type Comparator<T> = (a: T, b: T) => number;
type Callback<T> = (data: T) => void;

// Using function type aliases
const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;

const compareNumbers: Comparator<number> = (a, b) => a - b;
const compareStrings: Comparator<string> = (a, b) => a.localeCompare(b);

function processData<T>(data: T[], callback: Callback<T>): void {
    data.forEach(callback);
}

// Constructor type alias
type Constructor<T> = new (...args: any[]) => T;

type UserConstructor = Constructor<User>;
```

## Generic Type Aliases

Type aliases can be generic, accepting type parameters.

```typescript
// Generic type alias
type Container<T> = {
    value: T;
    isEmpty: boolean;
};

type Dictionary<T> = {
    [key: string]: T;
};

type Pair<T, U> = {
    first: T;
    second: U;
};

// Using generic type aliases
const numberContainer: Container<number> = {
    value: 42,
    isEmpty: false
};

const stringDict: Dictionary<string> = {
    "name": "John",
    "email": "john@example.com"
};

const mixedPair: Pair<string, number> = {
    first: "age",
    second: 25
};

// Generic with constraints
type HasId<T extends { id: any }> = T;

type UserWithId = HasId<User>; // OK
// type StringWithId = HasId<string>; // Error: string doesn't have id property
```

## Advanced Type Alias Patterns

### Conditional Type Aliases

```typescript
// Conditional type alias
type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>;  // "yes"
type B = IsString<number>;  // "no"

// Practical example: API response types
type ApiResponse<T> = T extends string
    ? { data: string; length: number }
    : T extends number
    ? { data: number; isEven: boolean }
    : { data: T };
```

### Mapped Type Aliases

```typescript
// Mapped type alias
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Partial<T> = {
    [P in keyof T]?: T[P];
};

type Required<T> = {
    [P in keyof T]-?: T[P]; // -? removes optional modifier
};

// Using mapped types
type ReadonlyUser = Readonly<User>;
type PartialUser = Partial<User>;
type RequiredUser = Required<PartialUser>; // Makes all properties required again

// Custom mapped type
type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};

type NullableUser = Nullable<User>;
```

### Template Literal Type Aliases

```typescript
// Template literal types
type EventName = "click" | "hover" | "focus";
type EventHandler = `on${Capitalize<EventName>}`;

type ClickHandler = "onClick";
type HoverHandler = "onHover";
type FocusHandler = "onFocus";

// CSS property names
type CSSProperty = "color" | "backgroundColor" | "fontSize";
type CSSValue<T extends CSSProperty> = T extends "color" | "backgroundColor"
    ? string
    : T extends "fontSize"
    ? number
    : never;

// API endpoint types
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type Endpoint = `/${string}`;

type ApiEndpoint = `${HttpMethod} ${Endpoint}`;
```

## Type Alias vs Interface

### When to Use Type Aliases

```typescript
// ✅ Use type aliases for:
// Union types
type Status = "active" | "inactive" | "pending";

// Intersection types
type Employee = Person & { employeeId: number };

// Primitive types
type UserId = number;
type Email = string;

// Tuple types
type Point = [number, number];

// Function types
type Comparator<T> = (a: T, b: T) => number;

// Complex types
type Result<T, E> = { success: true; data: T } | { success: false; error: E };

// Mapped types
type Readonly<T> = { readonly [P in keyof T]: T[P] };

// Conditional types
type IsArray<T> = T extends any[] ? true : false;
```

### When to Use Interfaces

```typescript
// ✅ Use interfaces for:
// Object shapes that will be extended
interface Animal {
    name: string;
}

interface Dog extends Animal {
    breed: string;
}

// Classes implementing interfaces
class Labrador implements Dog {
    name = "Buddy";
    breed = "Labrador";
}

// Declaration merging (interfaces can be merged)
interface User {
    name: string;
}

interface User {
    age: number;
}

// User now has both name and age
```

### Converting Between Type Aliases and Interfaces

```typescript
// Interface to type alias
interface UserInterface {
    name: string;
    age: number;
}

type UserType = UserInterface; // ✅ Valid

// Type alias to interface (limited)
type UserAlias = {
    name: string;
    age: number;
};

// interface UserFromAlias extends UserAlias {} // ❌ Not allowed
// But you can use the type alias directly
const user: UserAlias = { name: "John", age: 25 };
```

## Best Practices

### Naming Conventions

```typescript
// Use PascalCase for type names
type User = { /* ... */ };
type ApiResponse = { /* ... */ };

// Use descriptive names
type UserId = number; // ✅ Clear
type Num = number;    // ❌ Unclear

// Use suffix for clarity
type UserData = { /* ... */ };
type UserResponse = { /* ... */ };
type CreateUserRequest = { /* ... */ };
```

### Keep Type Aliases Simple

```typescript
// ✅ Simple and clear
type User = {
    id: number;
    name: string;
    email: string;
};

// ❌ Overly complex inline type
function createUser(user: {
    id: number;
    name: string;
    email: string;
    address: {
        street: string;
        city: string;
        country: string;
    };
    preferences: {
        theme: "light" | "dark";
        notifications: boolean;
    };
}) {
    // ...
}
```

### Reuse Type Aliases

```typescript
// ✅ Reuse common types
type Id = number;
type Timestamp = Date;

type User = {
    id: Id;
    name: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
};

type Post = {
    id: Id;
    title: string;
    content: string;
    authorId: Id;
    createdAt: Timestamp;
    updatedAt: Timestamp;
};
```

### Avoid Circular References

```typescript
// ❌ Circular reference (will cause issues)
type A = B;
type B = A;

// ✅ Use interfaces for circular references
interface Node {
    value: number;
    parent?: Node;
    children: Node[];
}
```

## Common Patterns

### API Response Types

```typescript
// Common API patterns
type ApiResponse<T> = {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
};

type PaginatedResponse<T> = ApiResponse<{
    items: T[];
    total: number;
    page: number;
    limit: number;
}>;

type UserResponse = ApiResponse<User>;
type UsersResponse = PaginatedResponse<User>;
```

### Form Types

```typescript
// Form handling
type FormField = {
    value: string;
    error?: string;
    touched: boolean;
};

type LoginForm = {
    email: FormField;
    password: FormField;
};

type FormErrors<T> = {
    [K in keyof T]?: string;
};

type LoginFormErrors = FormErrors<LoginForm>;
```

### Event Types

```typescript
// Event handling
type EventType = "click" | "hover" | "focus" | "blur";

type EventHandler<T extends EventType> = T extends "click"
    ? (event: MouseEvent) => void
    : T extends "focus" | "blur"
    ? (event: FocusEvent) => void
    : (event: Event) => void;

type ClickHandler = EventHandler<"click">;
type FocusHandler = EventHandler<"focus">;
```

## Utility Types with Type Aliases

```typescript
// Common utility types
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Usage
type User = {
    id: number;
    name: string;
    email?: string;
};

type UserWithRequiredEmail = WithRequired<User, "email">;
```

## Practice Exercises

### Exercise 1: Basic Type Aliases

```typescript
// Create type aliases for:
// - User ID (number)
// - Email (string)
// - User status ("active" | "inactive")
// - User object combining these types
```

### Exercise 2: Union and Intersection Types

```typescript
// Create type aliases for:
// - Shape (circle with radius | rectangle with width/height)
// - Vehicle (car | bike, both with common properties)
// - AdminUser (User & admin permissions)
```

### Exercise 3: Generic Type Aliases

```typescript
// Create generic type aliases for:
// - Container<T> with value and metadata
// - Result<T, E> for success/error responses
// - Dictionary<K, V> for key-value mappings
```

### Exercise 4: Function Type Aliases

```typescript
// Create type aliases for:
// - Math operation functions
// - Event handlers with different event types
// - API call functions with generic responses
```

### Exercise 5: Advanced Patterns

```typescript
// Create type aliases for:
// - CSS properties and values
// - API endpoints with HTTP methods
// - Form validation with field states
```

## Type Alias Limitations

### No Declaration Merging

```typescript
// ❌ Type aliases cannot be merged
type User = { name: string; };
type User = { age: number; }; // Error: duplicate identifier

// ✅ Interfaces can be merged
interface User { name: string; }
interface User { age: number; } // OK, merged
```

### No implements Clause

```typescript
// ❌ Cannot implement type aliases
class MyClass implements MyTypeAlias { } // Error

// ✅ Can implement interfaces
interface MyInterface { method(): void; }
class MyClass implements MyInterface { method() {} }
```

### No Augmentation

```typescript
// ❌ Cannot add properties to type aliases
type MyType = { prop: string };
// Cannot extend MyType later

// ✅ Can augment interfaces
interface MyInterface { prop: string; }
// Can add more properties later
```

## Next Steps

Type aliases are powerful tools for creating maintainable and readable TypeScript code. Next, you'll learn about:

- Utility types
- Type guards and narrowing
- Advanced TypeScript patterns
- Declaration files

Remember: Type aliases create alternative names for types - use them to improve code readability and maintainability!
