# Basic Class Constructor and Methods Refresher

## What is a Class?

A class is a blueprint for creating objects with predefined properties and methods. Classes encapsulate data and behavior into reusable templates.

## Class Declaration Syntax

```javascript
class ClassName {
  // Constructor
  constructor(parameters) {
    // Initialize properties
  }

  // Methods
  methodName(parameters) {
    // Method implementation
  }
}
```

## Constructor

The `constructor` is a special method that gets called when a new instance of the class is created. It's used to initialize object properties.

### Constructor Rules:
- There can only be one constructor per class
- It's automatically called with the `new` keyword
- It doesn't have a return value
- If no constructor is defined, JavaScript provides a default empty constructor

## Instance Methods

Methods defined in a class become available on instances of that class. They can access instance properties using `this`.

### Types of Methods:
- **Instance methods**: Available on class instances
- **Static methods**: Available on the class itself (not instances)
- **Getter/Setter methods**: Special methods for property access

## The `this` Keyword

Inside class methods, `this` refers to the current instance of the class. It allows methods to access and modify the instance's properties.

## Creating Instances

Use the `new` keyword followed by the class name and constructor arguments:

```javascript
const instance = new ClassName(arguments);
```

## Class Properties vs Instance Properties

- **Class properties**: Shared across all instances (using `static`)
- **Instance properties**: Unique to each instance (defined in constructor)

## Method Binding

When passing methods as callbacks, the `this` context can be lost. Solutions include:
- Arrow functions
- `.bind()` method
- Class field syntax with arrow functions

## Inheritance

Classes can extend other classes using the `extends` keyword, inheriting properties and methods from the parent class.

## Best Practices

1. Use descriptive class and method names
2. Keep classes focused on a single responsibility
3. Initialize all properties in the constructor
4. Use private fields (when available) for internal state
5. Document your classes and methods
6. Consider composition over inheritance when appropriate

## Common Patterns

- **Factory Pattern**: Classes that create other objects
- **Singleton Pattern**: Classes that allow only one instance
- **Builder Pattern**: Classes that construct complex objects step-by-step

## ES6+ Features

- **Class fields**: Property declarations outside constructor
- **Private fields**: Using `#` prefix (ES2022)
- **Static blocks**: For complex static initialization
- **Public/private class fields**: Modern property syntax
