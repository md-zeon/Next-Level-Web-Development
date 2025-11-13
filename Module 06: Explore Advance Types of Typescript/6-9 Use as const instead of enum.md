# 6-9 Use `as const` instead of enum

## What is `as const`?

The `as const` assertion in TypeScript is a way to tell the compiler to treat an object or array as immutable and infer the most specific types possible. It's particularly useful when you want enum-like behavior without actually using enums.

## Why Use `as const` instead of Enum?

While enums are powerful, `as const` offers several advantages:

- **Better tree-shaking**: Const assertions can be better optimized by bundlers
- **More flexible**: Can create complex nested structures
- **Type inference**: Provides more precise literal types
- **No runtime overhead**: Unlike enums, `as const` doesn't create runtime objects
- **Better for string unions**: Cleaner syntax for string-based constants

## Basic Syntax

```typescript
// Instead of enum
const Colors = {
    Red: "red",
    Green: "green",
    Blue: "blue",
} as const;

// Usage
type Color = typeof Colors[keyof typeof Colors]; // "red" | "green" | "blue"
```

## Comparison with Enums

### Enum Approach

```typescript
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

let move: Direction = Direction.Up;
```

### `as const` Approach

```typescript
const Direction = {
    Up: "UP",
    Down: "DOWN",
    Left: "LEFT",
    Right: "RIGHT",
} as const;

type Direction = typeof Direction[keyof typeof Direction];
let move: Direction = Direction.Up;
```

## Basic Examples

### Example 1: Simple String Constants

```typescript
// Using as const
const Status = {
    Pending: "pending",
    Approved: "approved",
    Rejected: "rejected",
} as const;

type StatusType = typeof Status[keyof typeof Status];

function updateStatus(status: StatusType): void {
    console.log(`Status updated to: ${status}`);
}

updateStatus(Status.Approved); // ✅ Valid
// updateStatus("invalid"); // ❌ Error
```

### Example 2: Mixed Types

```typescript
const Config = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3,
    enabled: true,
} as const;

type ConfigType = typeof Config;

// All properties are literal types
const apiUrl: "https://api.example.com" = Config.apiUrl;
const timeout: 5000 = Config.timeout;
```

### Example 3: Nested Objects

```typescript
const Theme = {
    colors: {
        primary: "#007bff",
        secondary: "#6c757d",
        success: "#28a745",
    },
    spacing: {
        small: "8px",
        medium: "16px",
        large: "24px",
    },
} as const;

type ThemeType = typeof Theme;

// Deeply nested literal types
const primaryColor: "#007bff" = Theme.colors.primary;
const smallSpacing: "8px" = Theme.spacing.small;
```

## Advanced Examples

### Example 4: Array with `as const`

```typescript
const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

type Day = typeof Days[number]; // "Monday" | "Tuesday" | ...

function isWeekend(day: Day): boolean {
    return day === "Saturday" || day === "Sunday";
}

console.log(isWeekend("Saturday")); // true
console.log(isWeekend("Monday")); // false
```

### Example 5: Function Return Types

```typescript
const createAction = (type: string, payload?: any) => ({
    type,
    payload,
}) as const;

const actions = {
    increment: () => createAction("INCREMENT"),
    decrement: () => createAction("DECREMENT"),
    setValue: (value: number) => createAction("SET_VALUE", value),
} as const;

type Action = ReturnType<typeof actions[keyof typeof actions]>;

function reducer(state: number, action: Action): number {
    switch (action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        case "SET_VALUE":
            return action.payload;
        default:
            return state;
    }
}
```

### Example 6: API Endpoints

```typescript
const API_ENDPOINTS = {
    users: "/api/users",
    posts: "/api/posts",
    comments: "/api/comments",
    auth: {
        login: "/api/auth/login",
        logout: "/api/auth/logout",
        refresh: "/api/auth/refresh",
    },
} as const;

type Endpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS];

function fetchData(endpoint: Endpoint): Promise<any> {
    return fetch(endpoint);
}

// Type-safe API calls
fetchData(API_ENDPOINTS.users); // ✅
fetchData(API_ENDPOINTS.auth.login); // ✅
// fetchData("/api/invalid"); // ❌
```

### Example 7: Event Types

```typescript
const Events = {
    USER_CREATED: "user_created",
    USER_UPDATED: "user_updated",
    USER_DELETED: "user_deleted",
    POST_CREATED: "post_created",
    POST_LIKED: "post_liked",
} as const;

type EventType = typeof Events[keyof typeof Events];

interface Event {
    type: EventType;
    payload: any;
    timestamp: Date;
}

function emitEvent(event: Event): void {
    console.log(`Event emitted: ${event.type}`);
}

emitEvent({
    type: Events.USER_CREATED,
    payload: { userId: 123 },
    timestamp: new Date(),
});
```

### Example 8: HTTP Methods

```typescript
const HTTP_METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    PATCH: "PATCH",
} as const;

type HttpMethod = typeof HTTP_METHODS[keyof typeof HTTP_METHODS];

interface RequestConfig {
    method: HttpMethod;
    url: string;
    headers?: Record<string, string>;
}

function makeRequest(config: RequestConfig): Promise<any> {
    // Implementation
    return fetch(config.url, { method: config.method });
}

makeRequest({
    method: HTTP_METHODS.POST,
    url: "/api/users",
});
```

### Example 9: State Machine

```typescript
const OrderStatus = {
    Pending: "pending",
    Confirmed: "confirmed",
    Processing: "processing",
    Shipped: "shipped",
    Delivered: "delivered",
    Cancelled: "cancelled",
} as const;

type OrderStatusType = typeof OrderStatus[keyof typeof OrderStatus];

const StatusTransitions = {
    [OrderStatus.Pending]: [OrderStatus.Confirmed, OrderStatus.Cancelled],
    [OrderStatus.Confirmed]: [OrderStatus.Processing, OrderStatus.Cancelled],
    [OrderStatus.Processing]: [OrderStatus.Shipped],
    [OrderStatus.Shipped]: [OrderStatus.Delivered],
    [OrderStatus.Delivered]: [],
    [OrderStatus.Cancelled]: [],
} as const;

function canTransition(from: OrderStatusType, to: OrderStatusType): boolean {
    const allowedTransitions = StatusTransitions[from];
    return allowedTransitions.includes(to as any);
}

console.log(canTransition(OrderStatus.Pending, OrderStatus.Confirmed)); // true
console.log(canTransition(OrderStatus.Delivered, OrderStatus.Shipped)); // false
```

### Example 10: Configuration with Validation

```typescript
const AppConfig = {
    environment: "production" as const,
    features: {
        darkMode: true as const,
        notifications: false as const,
        analytics: true as const,
    },
    limits: {
        maxUsers: 1000 as const,
        maxPosts: 500 as const,
        maxComments: 100 as const,
    },
} as const;

type AppConfigType = typeof AppConfig;

// Type-safe configuration access
function isFeatureEnabled(feature: keyof AppConfigType["features"]): boolean {
    return AppConfig.features[feature];
}

console.log(isFeatureEnabled("darkMode")); // true
console.log(isFeatureEnabled("notifications")); // false
```

## `as const` vs Enum: When to Use Which

### Use `as const` when

- You want better tree-shaking and performance
- You need complex nested structures
- You're working with string unions
- You want to avoid runtime enum objects
- You need more flexibility in structure

### Use Enum when

- You need reverse mapping (numeric enums)
- You want simpler syntax for basic cases
- You need to iterate over all values easily
- You're working with mixed numeric/string values
- You want better IDE support for autocompletion

## Best Practices

### ✅ Do's

- Use `as const` for string-based constants
- Combine with `typeof` and `keyof` for type extraction
- Use for configuration objects and API endpoints
- Prefer for complex nested structures
- Use for arrays when you need tuple-like behavior

### ❌ Don'ts

- Don't use `as const` when you need numeric reverse mapping
- Avoid overusing for simple cases where enum is clearer
- Don't forget the `as const` assertion
- Don't use for dynamic values

### Safe Patterns

```typescript
// Pattern 1: String union type
const Colors = {
    Red: "red",
    Green: "green",
    Blue: "blue",
} as const;

type Color = typeof Colors[keyof typeof Colors];

// Pattern 2: API endpoints
const Endpoints = {
    users: "/api/users",
    posts: "/api/posts",
} as const;

// Pattern 3: Configuration
const Config = {
    apiUrl: "https://api.example.com",
    version: "1.0.0",
} as const;

// Pattern 4: Event types
const Events = {
    CLICK: "click",
    SUBMIT: "submit",
} as const;

// Pattern 5: State values
const States = {
    Loading: "loading",
    Success: "success",
    Error: "error",
} as const;
```

## Common Pitfalls

### Pitfall 1: Forgetting `as const`

```typescript
const Colors = {
    Red: "red",
    Green: "green",
};

// Type is string, not "red" | "green"
type Color = typeof Colors[keyof typeof Colors]; // string ❌
```

### Pitfall 2: Mutable Objects

```typescript
const Config = {
    apiUrl: "https://api.example.com",
} as const;

// This is readonly now
// Config.apiUrl = "new url"; // Error ✅
```

### Pitfall 3: Complex Type Extraction

```typescript
const Data = {
    users: [{ id: 1, name: "John" }],
    posts: [{ id: 1, title: "Hello" }],
} as const;

// Complex nested types can become hard to work with
type User = typeof Data.users[number]; // { readonly id: 1; readonly name: "John"; }
```

## Practice Exercises

### Exercise 1: Basic Constants

```typescript
// Create a const object for user roles
// Define types for role validation
```

### Exercise 2: API Configuration

```typescript
// Create API endpoints using as const
// Define request functions with proper typing
```

### Exercise 3: State Management

```typescript
// Create action types and state values
// Implement a simple reducer with type safety
```

### Exercise 4: Configuration Object

```typescript
// Create app configuration with as const
// Access configuration with type safety
```

### Exercise 5: Event System

```typescript
// Create event types and handlers
// Implement event emission with proper typing
```

## TypeScript Configuration

```json
{
    "compilerOptions": {
        "strict": true,
        "noImplicitAny": true,
        "exactOptionalPropertyTypes": true,
        "noUncheckedIndexedAccess": true
    }
}
```

## Summary

`as const` provides a powerful alternative to enums in TypeScript, offering better performance and more flexibility for string-based constants and complex structures. While enums have their place (especially for numeric values with reverse mapping), `as const` is often preferable for modern TypeScript applications.

**Key Takeaways:**

- `as const` creates readonly, literal types
- Better for tree-shaking and performance
- Excellent for string unions and complex objects
- Use `typeof` and `keyof` to extract types
- Prefer over enums for string-based constants
- Combine with arrays for tuple-like behavior

`as const` is a modern TypeScript feature that can replace many enum use cases while providing better type safety and performance characteristics.
