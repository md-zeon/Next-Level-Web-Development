# 7-2 Inheritance in TypeScript: The 1st Pillar of OOP

## Introduction to Inheritance

Inheritance is one of the fundamental pillars of Object-Oriented Programming (OOP). It allows a class (child class or subclass) to inherit properties and methods from another class (parent class or superclass). This promotes code reuse, modularity, and hierarchical classification.

## The `extends` Keyword

In TypeScript, inheritance is implemented using the `extends` keyword. The child class inherits all public and protected members from the parent class.

```typescript
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  makeSound(): void {
    console.log("Some sound");
  }
}

class Dog extends Animal {
  breed: string;

  constructor(name: string, breed: string) {
    super(name); // Call parent constructor
    this.breed = breed;
  }

  // Override parent method
  makeSound(): void {
    console.log("Woof!");
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
console.log(dog.name); // Inherited property: Buddy
dog.makeSound(); // Overridden method: Woof!
```

## The `super` Keyword

The `super` keyword is used to call the parent class's constructor and methods:

1. In the constructor: `super()` calls the parent constructor
2. In methods: `super.methodName()` calls the parent's method

```typescript
class Cat extends Animal {
  constructor(name: string) {
    super(name); // Must be called first
  }

  makeSound(): void {
    super.makeSound(); // Call parent method
    console.log("Meow!");
  }
}
```

## Method Overriding

Child classes can override parent methods by defining a method with the same name and signature. This allows for specialized behavior while maintaining the same interface.

```typescript
class Bird extends Animal {
  fly(): void {
    console.log(`${this.name} is flying!`);
  }

  // Override makeSound
  makeSound(): void {
    console.log("Chirp!");
  }
}
```

## Access Modifiers in Inheritance

- `public`: Inherited and accessible everywhere
- `protected`: Inherited but only accessible within the class hierarchy
- `private`: Not inherited

```typescript
class Vehicle {
  public brand: string;
  protected model: string;
  private vin: string;

  constructor(brand: string, model: string, vin: string) {
    this.brand = brand;
    this.model = model;
    this.vin = vin;
  }
}

class Car extends Vehicle {
  constructor(brand: string, model: string, vin: string) {
    super(brand, model, vin);
  }

  getModel(): string {
    // this.brand accessible (public)
    // this.model accessible (protected)
    // this.vin not accessible (private)
    return this.model;
  }
}
```

## Inheritance Hierarchy

Classes can form multiple levels of inheritance:

```typescript
class ElectricCar extends Car {
  batteryCapacity: number;

  constructor(brand: string, model: string, vin: string, batteryCapacity: number) {
    super(brand, model, vin);
    this.batteryCapacity = batteryCapacity;
  }
}
```

## Benefits of Inheritance

1. **Code Reuse**: Avoid duplicating code by inheriting common functionality
2. **Modular Design**: Create hierarchical relationships between classes
3. **Polymorphism**: Objects of child classes can be treated as objects of parent classes
4. **Maintainability**: Changes to parent class automatically affect child classes

## Conclusion

Inheritance enables building complex systems by creating relationships between classes, promoting cleaner and more maintainable code. It's essential for implementing real-world hierarchies like animals, vehicles, or organizational structures.
