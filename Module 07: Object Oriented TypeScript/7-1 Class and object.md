# 7-1 Class and Object in TypeScript

## Introduction to Classes

In TypeScript, classes are a fundamental part of object-oriented programming. A class is a blueprint for creating objects with specific properties and methods.

## Defining a Class

To define a class in TypeScript, use the `class` keyword followed by the class name.

```typescript
class Person {
  // Properties
  name: string;
  age: number;

  // Constructor
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // Method
  greet(): string {
    return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
  }
}
```

## Creating Objects (Instances)

To create an object from a class, use the `new` keyword.

```typescript
const person1 = new Person("Alice", 30);
const person2 = new Person("Bob", 25);

console.log(person1.greet()); // Output: Hello, my name is Alice and I am 30 years old.
console.log(person2.greet()); // Output: Hello, my name is Bob and I am 25 years old.
```

## Key Concepts

1. **Properties**: Variables that hold data for the object.
2. **Methods**: Functions that define the behavior of the object.
3. **Constructor**: A special method called when creating a new instance of the class.
4. **this**: Refers to the current instance of the class.

## Access Modifiers

TypeScript provides access modifiers to control the visibility of class members:

- `public`: Accessible from anywhere (default)
- `private`: Accessible only within the class
- `protected`: Accessible within the class and its subclasses

```typescript
class Employee {
  public name: string;
  private salary: number;
  protected department: string;

  constructor(name: string, salary: number, department: string) {
    this.name = name;
    this.salary = salary;
    this.department = department;
  }

  public getSalary(): number {
    return this.salary; // Can access private property within the class
  }
}
```

## Conclusion

Classes and objects are essential for organizing code in an object-oriented manner. They allow you to create reusable blueprints for objects with consistent structure and behavior.
