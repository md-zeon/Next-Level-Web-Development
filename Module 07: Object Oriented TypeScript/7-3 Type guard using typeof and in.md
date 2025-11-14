# 7-3 Type Guards using typeof and in Operators

## Introduction to Type Guards

Type guards are functions or expressions that perform runtime checks to narrow down the type of a variable within a conditional block. In TypeScript, type guards help the compiler understand the more specific type of a value at runtime. The `typeof` and `in` operators are powerful built-in type guards.

## The `typeof` Operator

The `typeof` operator returns a string indicating the type of the operand. It can be used as a type guard to narrow down primitive types.

### Syntax

```typescript
typeof variable === "type"
```

### Common typeof Checks

```typescript
function process(value: unknown): void {
  if (typeof value === "string") {
    // TypeScript knows value is string here
    console.log(value.toUpperCase());
  } else if (typeof value === "number") {
    // TypeScript knows value is number here
    console.log(value.toFixed(2));
  } else if (typeof value === "boolean") {
    // TypeScript knows value is boolean here
    console.log(value ? "True" : "False");
  }
}
```

### Supported typeof Types

- `"string"`
- `"number"`
- `"boolean"`
- `"undefined"`
- `"object"`
- `"function"`
- `"symbol"`
- `"bigint"`

## The `in` Operator

The `in` operator checks if a property exists in an object. It's particularly useful for checking if an object has certain properties, which can help distinguish between different types of objects.

### Syntax

```typescript
"property" in object
```

### Example with Interfaces

```typescript
interface Dog {
  name: string;
  breed: string;
  bark(): void;
}

interface Cat {
  name: string;
  color: string;
  meow(): void;
}

function handlePet(pet: Dog | Cat): void {
  if ("breed" in pet) {
    // TypeScript knows pet is Dog
    console.log(`${pet.name} is a ${pet.breed}`);
    pet.bark();
  } else if ("color" in pet) {
    // TypeScript knows pet is Cat
    console.log(`${pet.name} is ${pet.color}`);
    pet.meow();
  }
}
```

## Combining Type Guards

Type guards can be combined for more complex type checking:

```typescript
interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Square | Rectangle | Circle;

function getArea(shape: Shape): number {
  if (shape.kind === "square") {
    return shape.size ** 2;
  } else if (shape.kind === "rectangle") {
    return shape.width * shape.height;
  } else {
    return Math.PI * shape.radius ** 2;
  }
}
```

## Custom Type Guards

You can create custom type guard functions using TypeScript's type predicates:

```typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function hasProperty(obj: unknown, prop: string): obj is Record<string, unknown> {
  return typeof obj === "object" && obj !== null && prop in obj;
}

// Usage
function process(value: unknown): void {
  if (isString(value)) {
    // value is now known to be string
    console.log(value.length);
  } else if (hasProperty(value, "name")) {
    // value is now known to be an object with a name property
    console.log(value.name);
  }
}
```

## Best Practices

1. **Use specific property checks**: Prefer checking for specific properties rather than general typeof checks
2. **Combine with discriminated unions**: Use literal types (like `kind: "square"`) for better type safety
3. **Avoid over-reliance on typeof**: For complex objects, typeof often returns `"object"`, making it less useful
4. **Create helper functions**: For reusable type checking logic, create custom type guard functions
5. **Consider instanceof**: For class instances, the `instanceof` operator might be more appropriate

## Comparison with Other Type Guards

### typeof vs instanceof
- `typeof`: Good for primitive types
- `instanceof`: Good for class instances and constructor functions

### typeof vs in
- `typeof`: Checks JavaScript runtime type
- `in`: Checks if a property exists on an object

## Conclusion

Type guards using `typeof` and `in` are essential TypeScript features that enable safer type checking at runtime. They help narrow down union types and provide better IntelliSense and error checking. Understanding these guards is crucial for writing robust TypeScript code that handles different data types safely.
