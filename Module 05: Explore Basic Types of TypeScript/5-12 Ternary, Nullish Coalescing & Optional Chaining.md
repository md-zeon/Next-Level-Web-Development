# 5-12 Ternary, Nullish Coalescing & Optional Chaining

## Conditional Operators in TypeScript

TypeScript provides powerful operators for handling conditional logic, null/undefined values, and safe property access. These operators help write cleaner, more concise code while maintaining type safety.

## Ternary Operator (Conditional Operator)

The ternary operator is a shorthand for `if-else` statements. It evaluates a condition and returns one of two values.

### Basic Syntax

```typescript
// condition ? expressionIfTrue : expressionIfFalse
const age: number = 25;
const status: string = age >= 18 ? "adult" : "minor";
console.log(status); // "adult"

// With function calls
function greet(isMorning: boolean): string {
    return isMorning ? "Good morning!" : "Good evening!";
}

console.log(greet(true)); // "Good morning!"
console.log(greet(false)); // "Good evening!"
```

### Ternary with TypeScript Types

```typescript
// Type narrowing with ternary
function processValue(value: string | number): string {
    return typeof value === "string"
        ? value.toUpperCase()
        : value.toFixed(2);
}

// Union type results
type Result = "success" | "error";
function checkStatus(code: number): Result {
    return code >= 200 && code < 300 ? "success" : "error";
}

// Complex expressions
interface User {
    name: string;
    role: "admin" | "user";
    isActive: boolean;
}

function getUserMessage(user: User): string {
    return user.isActive
        ? user.role === "admin"
            ? `Welcome back, Admin ${user.name}!`
            : `Hello, ${user.name}!`
        : "Account deactivated";
}
```

### Nested Ternary Operators

```typescript
// Be careful with nested ternaries - they can reduce readability
function getGrade(score: number): string {
    return score >= 90 ? "A" :
           score >= 80 ? "B" :
           score >= 70 ? "C" :
           score >= 60 ? "D" : "F";
}

// Alternative: Use if-else or switch for complex logic
function getGradeImproved(score: number): string {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
}
```

## Nullish Coalescing Operator (??)

The nullish coalescing operator returns the right-hand operand when the left-hand operand is `null` or `undefined`. Unlike `||`, it doesn't treat falsy values like `0`, `""`, or `false` as nullish.

### Basic Usage

```typescript
// value ?? defaultValue
const userInput: string | null = null;
const defaultName: string = userInput ?? "Anonymous";
console.log(defaultName); // "Anonymous"

// With undefined
const config: { timeout?: number } = {};
const timeout: number = config.timeout ?? 5000;
console.log(timeout); // 5000
```

### Difference from Logical OR (||)

```typescript
// Nullish coalescing vs Logical OR
const count1 = 0 ?? 10;     // 0 (0 is not nullish)
const count2 = 0 || 10;     // 10 (0 is falsy)

const name1 = "" ?? "Default";    // "" (empty string is not nullish)
const name2 = "" || "Default";    // "Default" (empty string is falsy)

const flag1 = false ?? true;      // false (false is not nullish)
const flag2 = false || true;      // true (false is falsy)
```

### TypeScript Type Narrowing

```typescript
// Type narrowing with nullish coalescing
function getUserName(user: { name?: string }): string {
    // user.name could be string | undefined
    return user.name ?? "Unknown User";
}

// With complex types
interface ApiConfig {
    baseUrl?: string;
    timeout?: number;
    retries?: number;
}

function createConfig(options: Partial<ApiConfig> = {}): ApiConfig {
    return {
        baseUrl: options.baseUrl ?? "https://api.example.com",
        timeout: options.timeout ?? 5000,
        retries: options.retries ?? 3
    };
}
```

### Chaining Nullish Coalescing

```typescript
// Multiple fallback values
const value1: string | null | undefined = null;
const result1: string = value1 ?? "first" ?? "second"; // "first"

const value2: string | null | undefined = undefined;
const result2: string = value2 ?? "first" ?? "second"; // "first"

// Practical example
function getDisplayName(user: {
    profile?: {
        displayName?: string;
        username?: string;
    };
    name?: string;
}): string {
    return user.profile?.displayName ??
           user.profile?.username ??
           user.name ??
           "Anonymous";
}
```

## Optional Chaining Operator (?.)

The optional chaining operator allows safe access to nested properties that might be `null` or `undefined`. It short-circuits and returns `undefined` if any part of the chain is nullish.

### Basic Property Access

```typescript
// object?.property
const user: { profile?: { name?: string } } = {};

const name1: string | undefined = user.profile?.name;
console.log(name1); // undefined

// Without optional chaining (would throw error)
// const name2 = user.profile.name; // TypeError: Cannot read property 'name' of undefined
```

### Method Calls

```typescript
// object?.method()
const calculator: { add?: (a: number, b: number) => number } = {};

const result1: number | undefined = calculator.add?.(5, 3);
console.log(result1); // undefined

// With method
const calculator2 = { add: (a: number, b: number) => a + b };
const result2: number | undefined = calculator2.add?.(5, 3);
console.log(result2); // 8
```

### Array Access

```typescript
// array?.[index]
const data: { items?: string[] } = {};

const firstItem1: string | undefined = data.items?.[0];
console.log(firstItem1); // undefined

// With array
const data2 = { items: ["apple", "banana"] };
const firstItem2: string | undefined = data2.items?.[0];
console.log(firstItem2); // "apple"
```

### Deep Nesting

```typescript
// Deep optional chaining
interface Company {
    ceo?: {
        assistant?: {
            name?: string;
            contact?: {
                email?: string;
                phone?: string;
            };
        };
    };
}

const company: Company = {
    ceo: {
        assistant: {
            name: "Alice",
            contact: {
                email: "alice@company.com"
            }
        }
    }
};

// Safe deep access
const email: string | undefined = company.ceo?.assistant?.contact?.email;
console.log(email); // "alice@company.com"

const phone: string | undefined = company.ceo?.assistant?.contact?.phone;
console.log(phone); // undefined
```

### Combining with Nullish Coalescing

```typescript
// Optional chaining + nullish coalescing = powerful combination
function getUserEmail(user: {
    profile?: {
        contact?: {
            email?: string;
        };
    };
}): string {
    return user.profile?.contact?.email ?? "No email provided";
}

const user1 = { profile: { contact: { email: "user@example.com" } } };
const user2 = { profile: { contact: {} } };
const user3 = {};

console.log(getUserEmail(user1)); // "user@example.com"
console.log(getUserEmail(user2)); // "No email provided"
console.log(getUserEmail(user3)); // "No email provided"
```

## Advanced Patterns

### Conditional Assignment with Ternary

```typescript
// Complex conditional logic
type UserRole = "admin" | "moderator" | "user";

function getPermissions(role: UserRole): string[] {
    return role === "admin" ? ["read", "write", "delete", "manage"] :
           role === "moderator" ? ["read", "write", "moderate"] :
           ["read"];
}

// Type-safe conditional
function formatValue(value: unknown): string {
    return typeof value === "string" ? value.toUpperCase() :
           typeof value === "number" ? value.toFixed(2) :
           typeof value === "boolean" ? (value ? "Yes" : "No") :
           "Unknown type";
}
```

### Nullish Coalescing with Type Guards

```typescript
// Type guards with nullish coalescing
function processUser(user: { name?: string; age?: number }): string {
    const name = user.name ?? "Unknown";
    const age = user.age ?? 0;

    return `${name} is ${age} years old`;
}

// Advanced type guard pattern
function isDefined<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
}

function safeProcess<T>(value: T | null | undefined, defaultValue: T): T {
    return isDefined(value) ? value : defaultValue;
}
```

### Optional Chaining in Function Calls

```typescript
// Optional chaining with function calls
interface Logger {
    info?: (message: string) => void;
    error?: (message: string) => void;
}

function logMessage(logger: Logger, level: "info" | "error", message: string): void {
    const logMethod = level === "info" ? logger.info : logger.error;
    logMethod?.(message); // Safe call
}

// Method chaining with optional chaining
interface Calculator {
    add?: (n: number) => Calculator;
    multiply?: (n: number) => Calculator;
    getResult?: () => number;
}

function calculate(calc: Calculator): number {
    return calc
        .add?.(5)
        .multiply?.(2)
        .getResult?.() ?? 0;
}
```

## Common Use Cases

### Configuration Objects

```typescript
// Safe configuration access
interface AppConfig {
    database?: {
        host?: string;
        port?: number;
        credentials?: {
            username?: string;
            password?: string;
        };
    };
    cache?: {
        ttl?: number;
        maxSize?: number;
    };
}

function getDatabaseUrl(config: AppConfig): string {
    const host = config.database?.host ?? "localhost";
    const port = config.database?.port ?? 5432;
    const user = config.database?.credentials?.username ?? "admin";

    return `postgresql://${user}@${host}:${port}/mydb`;
}
```

### API Response Handling

```typescript
// Safe API response access
interface ApiResponse {
    data?: {
        user?: {
            profile?: {
                name?: string;
                avatar?: string;
            };
        };
    };
    error?: string;
}

function extractUserName(response: ApiResponse): string {
    return response.data?.user?.profile?.name ??
           response.error ??
           "Unknown user";
}
```

### Form Validation

```typescript
// Safe form field access
interface FormData {
    personal?: {
        firstName?: string;
        lastName?: string;
    };
    contact?: {
        email?: string;
        phone?: string;
    };
}

function validateForm(form: FormData): string[] {
    const errors: string[] = [];

    const firstName = form.personal?.firstName;
    const lastName = form.personal?.lastName;
    const email = form.contact?.email;

    if (!firstName?.trim()) {
        errors.push("First name is required");
    }

    if (!lastName?.trim()) {
        errors.push("Last name is required");
    }

    if (!email?.trim()) {
        errors.push("Email is required");
    } else if (!email.includes("@")) {
        errors.push("Email must be valid");
    }

    return errors;
}
```

### React/JSX Patterns (if applicable)

```typescript
// Safe prop access in components (conceptual)
interface UserCardProps {
    user?: {
        name?: string;
        avatar?: string;
        stats?: {
            followers?: number;
            following?: number;
        };
    };
}

function UserCard({ user }: UserCardProps) {
    const name = user?.name ?? "Anonymous";
    const avatar = user?.avatar ?? "/default-avatar.png";
    const followers = user?.stats?.followers ?? 0;
    const following = user?.stats?.following ?? 0;

    return {
        name,
        avatar,
        followers,
        following
    };
}
```

## Best Practices

### Use Ternary for Simple Conditions

```typescript
// ✅ Good: Simple ternary
const status = isActive ? "active" : "inactive";

// ❌ Avoid: Complex nested ternary
const result = condition1 ? (condition2 ? "A" : "B") : (condition3 ? "C" : "D");

// ✅ Better: Use if-else or early returns
function getResult(condition1: boolean, condition2: boolean, condition3: boolean): string {
    if (condition1 && condition2) return "A";
    if (condition1 && !condition2) return "B";
    if (!condition1 && condition3) return "C";
    return "D";
}
```

### Prefer Nullish Coalescing over Logical OR for Defaults

```typescript
// ✅ Good: Nullish coalescing for intentional defaults
const timeout = config.timeout ?? 5000;

// ❌ Avoid: Logical OR can mask bugs
const timeout = config.timeout || 5000; // Hides if timeout is 0
```

### Use Optional Chaining for Deep Access

```typescript
// ✅ Good: Safe deep access
const email = user?.profile?.contact?.email;

// ❌ Avoid: Verbose null checks
const email = user && user.profile && user.profile.contact && user.profile.contact.email;
```

### Combine Operators Effectively

```typescript
// ✅ Good: Optional chaining + nullish coalescing
const displayName = user?.profile?.name ?? user?.username ?? "Anonymous";

// ✅ Good: Ternary with optional chaining
const greeting = user?.isLoggedIn ? `Welcome ${user.name}!` : "Please log in";
```

## Performance Considerations

### Operator Performance

```typescript
// Optional chaining has minimal performance impact
// Ternary and nullish coalescing are very fast

// For performance-critical code, you might prefer explicit checks
// But readability usually trumps micro-optimizations

// Example: Hot path optimization (rarely needed)
function fastPath(obj: any): string {
    // Instead of: return obj?.property?.method?.() ?? "default";

    if (!obj) return "default";
    if (!obj.property) return "default";
    if (!obj.property.method) return "default";
    return obj.property.method();
}
```

## Practice Exercises

### Exercise 1: Ternary Operator

```typescript
// Create functions using ternary operators for:
// - Checking if a number is even or odd
// - Determining user role permissions
// - Formatting dates (relative time like "2 hours ago")
```

### Exercise 2: Nullish Coalescing

```typescript
// Use nullish coalescing for:
// - Setting default configuration values
// - Providing fallback values for API responses
// - Handling optional function parameters
```

### Exercise 3: Optional Chaining

```typescript
// Use optional chaining for:
// - Safe access to nested object properties
// - Safe method calls on potentially undefined objects
// - Safe array access with optional indices
```

### Exercise 4: Combining Operators

```typescript
// Combine operators for:
// - Safe property access with defaults
// - Conditional logic with safe chaining
// - Complex validation with multiple fallbacks
```

### Exercise 5: Real-world Scenarios

```typescript
// Implement practical examples:
// - User profile display with fallbacks
// - API error handling with defaults
// - Configuration merging with safety checks
```

## Common Pitfalls

### Ternary Operator Issues

```typescript
// ❌ Wrong: Assignment in ternary (confusing)
let result;
condition ? result = "A" : result = "B";

// ✅ Correct: Direct assignment
let result = condition ? "A" : "B";

// ❌ Wrong: Different types in branches
const value: string | number = condition ? "string" : 42; // OK but confusing

// ✅ Better: Consistent types or union types
const value: string = condition ? "yes" : "no";
```

### Nullish Coalescing Confusion

```typescript
// ❌ Wrong: Using || when ?? is needed
const count = 0 ?? 10; // 0 (correct)
const count = 0 || 10; // 10 (wrong if 0 is valid)

// ✅ Correct: Use ?? for null/undefined checks
const timeout = config.timeout ?? 5000;

// ❌ Wrong: Unnecessary ?? with already safe values
const name = user.name ?? "Default"; // If name is optional
const name = user.name || "Default"; // If name might be empty string
```

### Optional Chaining Overuse

```typescript
// ❌ Wrong: Optional chaining when you know the value exists
const name = user!.name; // Non-null assertion if you're sure
const name = user?.name; // Unnecessary if user is guaranteed

// ✅ Correct: Use when uncertainty exists
const email = user?.profile?.contact?.email; // Appropriate uncertainty
```

## Next Steps

Mastering these conditional operators will make your TypeScript code more concise and safer. Next, you'll learn about:

- Type guards and type narrowing
- Utility types
- Advanced TypeScript patterns
- Error handling patterns

Remember: Ternary for conditions (?:), nullish coalescing for defaults (??), optional chaining for safe access (?.) - each has its perfect use case!
