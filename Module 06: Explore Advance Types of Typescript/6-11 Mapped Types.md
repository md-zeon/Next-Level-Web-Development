# 6-11: Mapped Types in TypeScript

Mapped types are one of the most powerful features in TypeScript's type system. They allow you to create new types by transforming properties of existing types. This is done using a special syntax that iterates over the keys of an existing type.

## Syntax

The basic syntax for a mapped type is:

```typescript
type MappedType<T> = {
  [P in keyof T]: TransformedType
};
```

Where:
- `P` is a placeholder for each property key
- `keyof T` gets all keys of type T
- `in` is the mapping operator
- The value type can be transformed as needed

## Built-in Mapped Types

TypeScript provides several built-in mapped types:

### 1. `Partial<T>`
Makes all properties of T optional:

```typescript
type PartialPerson = Partial<Person>;
// Equivalent to: { name?: string; age?: number; email?: string; }
```

### 2. `Readonly<T>`
Makes all properties of T readonly:

```typescript
type ReadonlyPerson = Readonly<Person>;
// Equivalent to: { readonly name: string; readonly age: number; readonly email: string; }
```

### 3. `Record<K, T>`
Creates an object type with keys of type K and values of type T:

```typescript
type StringRecord = Record<string, string>;
// Equivalent to: { [key: string]: string; }

type NumberRecord = Record<'a' | 'b' | 'c', number>;
// Equivalent to: { a: number; b: number; c: number; }
```

### 4. `Pick<T, K>`
Creates a type by picking specific properties from T:

```typescript
type PickedPerson = Pick<Person, 'name' | 'age'>;
// Equivalent to: { name: string; age: number; }
```

### 5. `Omit<T, K>`
Creates a type by omitting specific properties from T:

```typescript
type OmittedPerson = Omit<Person, 'email'>;
// Equivalent to: { name: string; age: number; }
```

## Custom Mapped Types

### Transforming Property Types

```typescript
type Stringify<T> = {
  [P in keyof T]: string;
};

type StringPerson = Stringify<Person>;
// { name: string; age: string; email: string; }
```

### Adding Modifiers

```typescript
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type NullablePerson = Nullable<Person>;
// { name: string | null; age: number | null; email: string | null; }
```

## Advanced Mapped Types

### Using Template Literal Types (TypeScript 4.1+)

```typescript
type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}Change`]: (value: T[K]) => void;
};

type PersonEventHandlers = EventHandlers<Person>;
// { onNameChange: (value: string) => void; onAgeChange: (value: number) => void; onEmailChange: (value: string) => void; }
```

### Key Remapping

```typescript
type InternalUser = {
  [K in keyof ApiUser as K extends 'first_name' | 'last_name'
    ? 'name'
    : K extends 'email_address'
    ? 'email'
    : K]: K extends 'first_name' | 'last_name'
    ? string
    : K extends 'created_at'
    ? Date
    : ApiUser[K];
};
```

### Filtering Properties

```typescript
type NonNullableKeys<T> = {
  [P in keyof T]-?: T[P] extends null | undefined ? never : P;
}[keyof T];
```

## Real-World Examples

### API Response Transformation

```typescript
interface ApiUser {
  id: number;
  first_name: string;
  last_name: string;
  email_address: string;
  created_at: string;
}

type InternalUser = {
  [K in keyof ApiUser as K extends 'first_name' | 'last_name'
    ? 'name'
    : K extends 'email_address'
    ? 'email'
    : K]: K extends 'first_name' | 'last_name'
    ? string
    : K extends 'created_at'
    ? Date
    : ApiUser[K];
};
```

### Extracting Function Properties

```typescript
type FunctionProperties<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : never;
};
```

## Key Concepts

1. **Homomorphic Mapping**: When the mapped type preserves the original property modifiers (`readonly`, `?`).

2. **Key Remapping**: Using `as` to transform property keys (TypeScript 4.1+).

3. **Conditional Types**: Combining mapped types with conditional types for complex transformations.

4. **Template Literal Types**: Creating dynamic property names using template literals.

## Best Practices

1. Use built-in mapped types when possible (`Partial`, `Readonly`, `Record`, etc.)

2. Create custom mapped types for reusable transformations

3. Combine mapped types with conditional types for advanced scenarios

4. Use key remapping sparingly and only when necessary

5. Document complex mapped types with comments explaining the transformation logic

## Common Use Cases

- Making API responses type-safe
- Creating form types from data types
- Transforming database models to API models
- Creating event handler types
- Building utility types for common transformations

Mapped types are essential for creating flexible, reusable type transformations in TypeScript applications.
