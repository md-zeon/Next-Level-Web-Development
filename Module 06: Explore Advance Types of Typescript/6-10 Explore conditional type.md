# 6-10 Explore Conditional Types

## What are Conditional Types?

Conditional types in TypeScript allow you to create types that depend on a condition. They use a ternary operator-like syntax to choose between two types based on whether a type extends another type. Conditional types are one of the most powerful features in TypeScript's type system.

## Basic Syntax

```typescript
T extends U ? X : Y
```

Where:
- `T` is the type being checked
- `U` is the type to check against
- `X` is the type returned if `T extends U` is true
- `Y` is the type returned if `T extends U` is false

## Why Use Conditional Types?

Conditional types enable:

- **Type-level programming**: Create complex type logic
- **Utility types**: Build reusable type transformations
- **API design**: Create types that adapt based on inputs
- **Advanced patterns**: Mapped types, template literal types, and more
- **Type inference**: Extract and transform types dynamically

## Basic Examples

### Example 1: Simple Conditional Type

```typescript
type IsString<T> = T extends string ? "Yes" : "No";

type Test1 = IsString<string>;     // "Yes"
type Test2 = IsString<number>;     // "No"
type Test3 = IsString<"hello">;    // "Yes"
```

### Example 2: Type Extraction

```typescript
type ExtractArrayType<T> = T extends (infer U)[] ? U : never;

type Element1 = ExtractArrayType<string[]>;    // string
type Element2 = ExtractArrayType<number[]>;    // number
type Element3 = ExtractArrayType<boolean>;     // never
```

### Example 3: Function Parameter Types

```typescript
type GetParameterType<T> = T extends (...args: infer P) => any ? P : never;

type Params1 = GetParameterType<(a: string, b: number) => void>;  // [string, number]
type Params2 = GetParameterType<() => string>;                   // []
type Params3 = GetParameterType<string>;                         // never
```

### Example 4: Return Type Extraction

```typescript
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Return1 = GetReturnType<() => string>;        // string
type Return2 = GetReturnType<(x: number) => boolean>; // boolean
type Return3 = GetReturnType<string>;              // never
```

## Advanced Examples

### Example 5: Union Type Filtering

```typescript
type FilterString<T> = T extends string ? T : never;

type OnlyStrings<T> = T extends any ? FilterString<T> : never;

type Result1 = OnlyStrings<string | number | boolean>; // string
type Result2 = OnlyStrings<"a" | "b" | 1 | 2>;         // "a" | "b"
```

### Example 6: Deep Type Flattening

```typescript
type Flatten<T> = T extends readonly (infer U)[] ? Flatten<U> : T;

type NestedArray = (string | number)[][];
type Flattened = Flatten<NestedArray>; // string | number
```

### Example 7: Property Type Extraction

```typescript
type PropertyType<T, K extends keyof T> = T extends { [P in K]: infer V } ? V : never;

interface User {
    name: string;
    age: number;
    active: boolean;
}

type NameType = PropertyType<User, "name">;      // string
type AgeType = PropertyType<User, "age">;        // number
type ActiveType = PropertyType<User, "active">;  // boolean
```

### Example 8: Conditional Type with Constraints

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type Example1 = NonNullable<string | null>;      // string
type Example2 = NonNullable<number | undefined>; // number
type Example3 = NonNullable<boolean>;            // boolean
```

### Example 9: Type Guards at Type Level

```typescript
type IsArray<T> = T extends any[] ? true : false;

type Check1 = IsArray<string[]>;  // true
type Check2 = IsArray<number>;    // false
type Check3 = IsArray<any[]>;     // true
```

### Example 10: Template Literal Type Conditions

```typescript
type StartsWith<T, U extends string> = T extends `${U}${string}` ? true : false;

type Test1 = StartsWith<"hello", "he">;   // true
type Test2 = StartsWith<"hello", "hi">;   // false
type Test3 = StartsWith<"hello", "">;     // true
```

## Distributive Conditional Types

### What are Distributive Conditional Types?

When a conditional type is applied to a union type, TypeScript distributes the condition over each member of the union. This is called "distributivity."

### Example 11: Basic Distributivity

```typescript
type ToArray<T> = T extends any ? T[] : never;

type Result = ToArray<string | number>; // string[] | number[]
// Equivalent to: (string extends any ? string[] : never) | (number extends any ? number[] : never)
```

### Example 12: Filtering Unions

```typescript
type Filter<T, U> = T extends U ? T : never;

type StringsOnly = Filter<string | number | boolean, string>; // string
type NumbersOnly = Filter<string | number | boolean, number>; // number
```

### Example 13: Non-Distributive Version

```typescript
type ToArrayNonDistributive<T> = [T] extends [any] ? T[] : never;

type Result1 = ToArrayNonDistributive<string | number>; // (string | number)[]
// Not distributed: [string | number] extends [any] ? (string | number)[] : never
```

### Example 14: Complex Filtering

```typescript
type ExtractFunctions<T> = T extends (...args: any[]) => any ? T : never;

type FunctionsOnly = ExtractFunctions<string | (() => void) | number | ((x: string) => number)>;
// Result: (() => void) | ((x: string) => number)
```

## Conditional Types with `infer`

### What is `infer`?

The `infer` keyword allows you to extract and capture types from conditions. It's like declaring a type variable within the conditional type.

### Example 15: Basic `infer` Usage

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type Func1 = () => string;
type Func2 = (x: number) => boolean;

type Result1 = ReturnType<Func1>; // string
type Result2 = ReturnType<Func2>; // boolean
```

### Example 16: Multiple `infer` Keywords

```typescript
type FirstParameter<T> = T extends (first: infer F, ...args: any[]) => any ? F : never;

type Func1 = (a: string, b: number) => void;
type Func2 = () => string;
type Func3 = (x: boolean) => number;

type Param1 = FirstParameter<Func1>; // string
type Param2 = FirstParameter<Func2>; // never
type Param3 = FirstParameter<Func3>; // boolean
```

### Example 17: Extracting Object Properties

```typescript
type ValueOf<T> = T[keyof T];

interface User {
    name: string;
    age: number;
}

type UserValues = ValueOf<User>; // string | number
```

### Example 18: Promise Type Unwrapping

```typescript
type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

type Result1 = Awaited<Promise<string>>;        // string
type Result2 = Awaited<Promise<number[]>>;      // number[]
type Result3 = Awaited<string>;                  // string
```

### Example 19: Array Element Type

```typescript
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type Element1 = ArrayElement<string[]>;     // string
type Element2 = ArrayElement<number[]>;     // number
type Element3 = ArrayElement<(string | number)[]>; // string | number
type Element4 = ArrayElement<string>;       // never
```

### Example 20: Complex Type Extraction

```typescript
type ExtractProps<T, U> = {
    [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

interface Person {
    name: string;
    age: number;
    active: boolean;
    tags: string[];
}

type StringProps = ExtractProps<Person, string>;     // "name"
type ArrayProps = ExtractProps<Person, any[]>;       // "tags"
```

## Real-World Applications

### Example 21: API Response Types

```typescript
type ApiResponse<T> = {
    data: T;
    status: number;
    message?: string;
};

type ExtractData<T> = T extends ApiResponse<infer D> ? D : never;

type UserData = ExtractData<ApiResponse<{ id: number; name: string }>>;
// Result: { id: number; name: string }
```

### Example 22: Event Handler Types

```typescript
type EventHandler<T> = T extends `on${infer E}` ? (event: E) => void : never;

type ClickHandler = EventHandler<"onClick">;     // (event: "Click") => void
type ChangeHandler = EventHandler<"onChange">;   // (event: "Change") => void
```

### Example 23: Database Query Types

```typescript
type QueryResult<T> = T extends { select: infer S } ? S : T;

interface UserQuery {
    select: { id: number; name: string };
    where: { active: true };
}

type SelectedFields = QueryResult<UserQuery>; // { id: number; name: string }
```

### Example 24: Form Validation Types

```typescript
type ValidationResult<T> = T extends { value: infer V; rules: readonly (infer R)[] }
    ? { value: V; errors: R[] }
    : never;

interface TextField {
    value: string;
    rules: readonly ["required", "minLength"];
}

type ValidatedTextField = ValidationResult<TextField>;
// Result: { value: string; errors: ("required" | "minLength")[] }
```

### Example 25: Component Props Types

```typescript
type ComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

type ButtonProps = ComponentProps<typeof Button>; // Inferred props type
```

## Best Practices

### ✅ Do's

- Use `infer` for type extraction
- Leverage distributivity for union type operations
- Combine with mapped types for powerful transformations
- Use for API response type extraction
- Document complex conditional types

### ❌ Don'ts

- Don't create overly complex conditional types
- Avoid deep nesting without good reason
- Don't use conditional types when simple types suffice
- Avoid performance issues with deeply recursive types

### Safe Patterns

```typescript
// Pattern 1: Type extraction
type ExtractType<T, U> = T extends U ? T : never;

// Pattern 2: Array element type
type ElementType<T> = T extends (infer U)[] ? U : never;

// Pattern 3: Function parameter types
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

// Pattern 4: Function return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

// Pattern 5: Promise unwrapping
type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
```

## Common Pitfalls

### Pitfall 1: Unexpected Distributivity

```typescript
type NaiveToArray<T> = T extends any ? T[] : never;

type Result = NaiveToArray<string | number>; // string[] | number[]
// This might be unexpected if you wanted (string | number)[]
```

### Pitfall 2: `never` in Unions

```typescript
type Filter<T, U> = T extends U ? T : never;

type Result = Filter<string | number, string>; // string
// The `never` is removed from the union
```

### Pitfall 3: Complex `infer` Patterns

```typescript
// This can become hard to read and maintain
type ComplexExtract<T> = T extends {
    data: infer D;
    meta: { count: infer C };
    items: readonly (infer I)[];
} ? { data: D; count: C; items: I[] } : never;
```

## Performance Considerations

- Conditional types are evaluated at compile time
- Deep recursion can slow down compilation
- Use with caution in large codebases
- Prefer simpler types when possible

## Practice Exercises

### Exercise 1: Basic Conditional Types

```typescript
// Create a conditional type that checks if a type is a function
type IsFunction<T> = // Your implementation

type Test1 = IsFunction<() => void>;  // true
type Test2 = IsFunction<string>;      // false
```

### Exercise 2: Type Extraction

```typescript
// Extract the element type from an array type
type ArrayElement<T> = // Your implementation

type Test1 = ArrayElement<string[]>;     // string
type Test2 = ArrayElement<number[]>;     // number
type Test3 = ArrayElement<string>;       // never
```

### Exercise 3: Union Filtering

```typescript
// Filter a union to only include string literals
type StringLiteralsOnly<T> = // Your implementation

type Test = StringLiteralsOnly<"a" | "b" | 1 | 2>; // "a" | "b"
```

### Exercise 4: Function Types

```typescript
// Extract parameter types from a function type
type FunctionParams<T> = // Your implementation

type Test = FunctionParams<(a: string, b: number) => void>; // [string, number]
```

### Exercise 5: Advanced Extraction

```typescript
// Extract the value type from a Promise
type PromiseValue<T> = // Your implementation

type Test1 = PromiseValue<Promise<string>>;   // string
type Test2 = PromiseValue<Promise<number[]>>; // number[]
type Test3 = PromiseValue<string>;            // string
```

## TypeScript Configuration

```json
{
    "compilerOptions": {
        "strict": true,
        "noImplicitAny": true,
        "exactOptionalPropertyTypes": true,
        "noUncheckedIndexedAccess": true,
        "strictNullChecks": true
    }
}
```

## Summary

Conditional types are a cornerstone of advanced TypeScript programming, enabling type-level logic and powerful type transformations. They allow you to:

- Create types that adapt based on conditions
- Extract and manipulate types using `infer`
- Build utility types and type transformations
- Implement complex type logic at compile time

**Key Takeaways:**

- Use `T extends U ? X : Y` syntax
- `infer` captures types within conditions
- Distributivity applies conditions to union members
- Combine with mapped types for advanced patterns
- Balance power with readability and performance

Conditional types unlock TypeScript's full potential for type-level programming, making your code more type-safe and expressive.
