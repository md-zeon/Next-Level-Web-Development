# Stateless vs Stateful

## What is Stateless?

Stateless refers to operations or functions that do not maintain any internal state between calls. Each function call is independent and produces the same output given the same input, regardless of previous calls.

### Characteristics of Stateless:

- No memory of previous operations
- Pure functions (same input = same output)
- Thread-safe
- Easy to test and debug
- No side effects

### Examples:

- Mathematical functions: `add(2, 3)` always returns `5`
- String operations: `toUpperCase("hello")` always returns `"HELLO"`
- Array methods like `map()`, `filter()`, `reduce()` (when used purely)

## What is Stateful?

Stateful refers to operations or functions that maintain internal state that persists between calls. The behavior can change based on previous interactions.

### Characteristics of Stateful:

- Maintains internal state
- Behavior depends on history
- Can have side effects
- More complex to test and debug
- May not be thread-safe

### Examples:

- Class instances with properties
- Functions that modify global variables
- Database operations
- UI components that track user interactions

## Why Does This Matter?

Understanding stateless vs stateful thinking is crucial for:

- Writing predictable, testable code
- Designing efficient data structures
- Building scalable applications
- Debugging complex systems

## Key Takeaway

Prefer stateless approaches when possible, as they lead to more predictable and maintainable code. Use stateful approaches when you need to track changes over time or maintain context between operations.
