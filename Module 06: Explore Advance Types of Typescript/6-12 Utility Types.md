# 6-12: Utility Types in TypeScript

Utility types are built-in TypeScript types that help with common type transformations. They provide powerful ways to manipulate and create new types from existing ones, making TypeScript code more type-safe and expressive.

## Object Property Utilities

### `Partial<T>`
Makes all properties of type `T` optional:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
// Equivalent to: { id?: number; name?: string; email?: string; }
```

### `Required<T>`
Makes all properties of type `T` required (opposite of `Partial`):

```typescript
type RequiredUser = Required<PartialUser>;
// All properties become required again
```

### `Readonly<T>`
Makes all properties of type `T` readonly:

```typescript
type ReadonlyUser = Readonly<User>;
// Equivalent to: { readonly id: number; readonly name: string; readonly email: string; }
```

### `Pick<T, K>`
Creates a type by picking specific properties from `T`:

```typescript
type UserBasicInfo = Pick<User, 'name' | 'email'>;
// Equivalent to: { name: string; email: string; }
```

### `Omit<T, K>`
Creates a type by omitting specific properties from `T`:

```typescript
type UserWithoutId = Omit<User, 'id'>;
// Equivalent to: { name: string; email: string; age: number; }
```

## Union and Intersection Utilities

### `Record<K, T>`
Creates an object type with keys of type `K` and values of type `T`:

```typescript
type UserRoles = Record<string, 'admin' | 'user' | 'moderator'>;
type StringDictionary = Record<string, string>;
type NumberRecord = Record<'a' | 'b' | 'c', number>;
```

### `Exclude<T, U>`
Excludes types from union `T` that are assignable to `U`:

```typescript
type Status = 'active' | 'inactive' | 'pending' | 'suspended';
type ActiveStatus = Exclude<Status, 'inactive' | 'suspended'>;
// Equivalent to: 'active' | 'pending'
```

### `Extract<T, U>`
Extracts types from union `T` that are assignable to `U` (opposite of `Exclude`):

```typescript
type InactiveStatus = Extract<Status, 'inactive' | 'suspended'>;
// Equivalent to: 'inactive' | 'suspended'
```

### `NonNullable<T>`
Removes `null` and `undefined` from type `T`:

```typescript
type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>;
// Equivalent to: string
```

## Function Utilities

### `Parameters<T>`
Extracts the parameter types from a function type `T`:

```typescript
function createUser(name: string, email: string, age?: number): User {
  // ...
}

type CreateUserParams = Parameters<typeof createUser>;
// Equivalent to: [name: string, email: string, age?: number | undefined]
```

### `ReturnType<T>`
Extracts the return type from a function type `T`:

```typescript
type CreateUserReturn = ReturnType<typeof createUser>;
// Equivalent to: User
```

### `ConstructorParameters<T>`
Extracts the constructor parameter types from a class `T`:

```typescript
class UserService {
  constructor(private users: User[] = []) {}
}

type UserServiceConstructorParams = ConstructorParameters<typeof UserService>;
// Equivalent to: [users?: User[] | undefined]
```

### `InstanceType<T>`
Extracts the instance type from a class constructor `T`:

```typescript
type UserServiceInstance = InstanceType<typeof UserService>;
// Equivalent to: UserService
```

## 'this' Parameter Utilities

### `ThisParameterType<T>`
Extracts the type of the `this` parameter from function type `T`:

```typescript
function logUser(this: User, message: string) {
  console.log(`${this.name}: ${message}`);
}

type LogUserThis = ThisParameterType<typeof logUser>;
// Equivalent to: User
```

### `OmitThisParameter<T>`
Removes the `this` parameter from function type `T`:

```typescript
type LogUserWithoutThis = OmitThisParameter<typeof logUser>;
// Equivalent to: (message: string) => void
```

### `ThisType<T>`
Marks the contextual `this` type for object literals:

```typescript
interface EventHandlers {
  onclick: (this: HTMLElement, event: Event) => void;
}

const handlers: EventHandlers & ThisType<HTMLElement> = {
  onclick(event) {
    // 'this' is HTMLElement
    this.style.backgroundColor = 'red';
  }
};
```

## String Manipulation Utilities (TypeScript 4.1+)

### `Uppercase<T>`
Converts string literal type `T` to uppercase:

```typescript
type UppercaseString = Uppercase<'hello world'>; // "HELLO WORLD"
```

### `Lowercase<T>`
Converts string literal type `T` to lowercase:

```typescript
type LowercaseString = Lowercase<'HELLO WORLD'>; // "hello world"
```

### `Capitalize<T>`
Capitalizes the first character of string literal type `T`:

```typescript
type CapitalizeString = Capitalize<'hello world'>; // "Hello world"
```

### `Uncapitalize<T>`
Uncapitalizes the first character of string literal type `T`:

```typescript
type UncapitalizeString = Uncapitalize<'Hello World'>; // "hello World"
```

## Promise Utility (TypeScript 4.5+)

### `Awaited<T>`
Unwraps the type from a `Promise<T>` or recursively unwraps nested promises:

```typescript
type PromiseUser = Promise<User>;
type AwaitedUser = Awaited<PromiseUser>; // User

async function fetchUser(): Promise<User> {
  return { id: 1, name: 'John', email: 'john@example.com', age: 30 };
}

type FetchUserReturn = Awaited<ReturnType<typeof fetchUser>>; // User
```

## Advanced Usage Examples

### API Response Transformation

```typescript
type ApiUser = {
  user_id: number;
  user_name: string;
  user_email: string;
  created_at: string;
  updated_at: string;
};

type InternalUser = Omit<
  {
    [K in keyof ApiUser as K extends `user_${string}`
      ? K extends 'user_id' ? 'id'
        : K extends 'user_name' ? 'name'
        : K extends 'user_email' ? 'email'
        : K
      : K]: K extends 'created_at' | 'updated_at'
        ? Date
        : ApiUser[K];
  },
  'updated_at'
>;
```

### Form Handling

```typescript
type FormField<T> = {
  value: T;
  error?: string;
  touched: boolean;
};

type UserForm = {
  [K in keyof Omit<User, 'id'>]: FormField<User[K]>;
};
```

## Best Practices

1. **Use built-in utilities first**: Prefer `Partial`, `Readonly`, `Pick`, etc., over custom implementations.

2. **Combine utilities**: Utility types work well together:
   ```typescript
   type CreateUserInput = Omit<Partial<User>, 'id'>;
   ```

3. **Type inference**: Use `typeof` with utilities for runtime values:
   ```typescript
   const user = { name: 'John', age: 30 };
   type UserType = typeof user; // Infers the exact type
   ```

4. **Function utilities**: Great for working with APIs and libraries:
   ```typescript
   type ApiFunction = (params: Parameters<typeof myApi>) => ReturnType<typeof myApi>;
   ```

5. **Conditional combinations**: Mix with conditional types for advanced scenarios.

## Common Patterns

- **API DTOs**: Use `Pick`/`Omit` to create request/response types
- **Form types**: Combine with mapped types for form validation
- **Component props**: Use `Partial` for optional props, `Readonly` for immutable data
- **Event handlers**: Leverage `ThisType` for DOM event handling
- **Database models**: Transform between database and application models

Utility types are fundamental to TypeScript development, providing type-safe ways to manipulate and transform types without runtime overhead.
