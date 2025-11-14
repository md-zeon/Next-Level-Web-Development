# 7-6 Getter and Setter in TypeScript

## Introduction to Getters and Setters

Getters and setters are special methods that provide controlled access to class properties. They allow you to encapsulate the internal state of an object while providing a clean public interface. In TypeScript, getters and setters are defined using the `get` and `set` keywords and are accessed like regular properties.

## Why Use Getters and Setters?

1. **Encapsulation**: Hide internal implementation details
2. **Validation**: Validate data before setting values
3. **Computed Properties**: Calculate values on-the-fly
4. **Backward Compatibility**: Change internal implementation without breaking API
5. **Controlled Access**: Read-only or write-only properties

## Syntax and Basic Usage

```typescript
class Example {
  private _value: number = 0;

  // Getter
  get value(): number {
    return this._value;
  }

  // Setter
  set value(newValue: number) {
    if (newValue >= 0) {
      this._value = newValue;
    }
  }
}

const example = new Example();
example.value = 10; // Uses setter
console.log(example.value); // 10, uses getter
```

## Private Backing Fields Convention

It's common to use an underscore prefix for the private backing field when you have a getter/setter:

```typescript
class Person {
  private _name: string;
  private _age: number;

  constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value.trim();
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    if (value >= 0 && value <= 150) {
      this._age = value;
    }
  }
}
```

## Getter-Only Properties (Read-Only)

You can create read-only properties by providing only a getter:

```typescript
class Circle {
  private _radius: number;

  constructor(radius: number) {
    this._radius = radius;
  }

  // Read-only property
  get radius(): number {
    return this._radius;
  }

  // Computed read-only property
  get area(): number {
    return Math.PI * this._radius * this._radius;
  }

  get circumference(): number {
    return 2 * Math.PI * this._radius;
  }
}
```

## Validation in Setters

Getters and setters are perfect for adding validation logic:

```typescript
class BankAccount {
  private _balance: number = 0;

  get balance(): number {
    return this._balance;
  }

  set balance(amount: number) {
    if (amount < 0) {
      throw new Error("Balance cannot be negative");
    }
    if (amount > 1000000) {
      throw new Error("Balance cannot exceed $1,000,000");
    }
    this._balance = amount;
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount; // Uses setter with validation
    }
  }
}
```

## Computed Properties

Getters can return computed values based on other properties:

```typescript
class Rectangle {
  constructor(private _width: number, private _height: number) {}

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    if (value > 0) this._width = value;
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    if (value > 0) this._height = value;
  }

  // Computed properties
  get area(): number {
    return this._width * this._height;
  }

  get perimeter(): number {
    return 2 * (this._width + this._height);
  }

  get isSquare(): boolean {
    return this._width === this._height;
  }
}
```

## Inheritance and Getters/Setters

Getters and setters can be inherited and overridden in subclasses:

```typescript
class Vehicle {
  private _speed: number = 0;

  get speed(): number {
    return this._speed;
  }

  set speed(value: number) {
    if (value >= 0 && value <= 200) {
      this._speed = value;
    }
  }
}

class Car extends Vehicle {
  private _fuelLevel: number = 100;

  // Override setter to add additional validation
  set speed(value: number) {
    if (this._fuelLevel > 0) {
      super.speed = value;
    } else {
      console.log("Cannot accelerate - no fuel!");
    }
  }

  // Additional getter
  get fuelLevel(): number {
    return this._fuelLevel;
  }

  set fuelLevel(value: number) {
    if (value >= 0 && value <= 100) {
      this._fuelLevel = value;
    }
  }
}
```

## Combining Getters/Setters with Access Modifiers

```typescript
class Employee {
  private _salary: number;

  constructor(public name: string, salary: number) {
    this._salary = salary;
  }

  // Public getter - anyone can read salary
  get salary(): number {
    return this._salary;
  }

  // Protected setter - only accessible within class and subclasses
  protected set salary(value: number) {
    if (value >= 30000) {
      this._salary = value;
    }
  }

  // Public method that can modify salary
  public giveRaise(amount: number): void {
    this.salary += amount; // Uses protected setter
  }
}

class Manager extends Employee {
  constructor(name: string, salary: number, public department: string) {
    super(name, salary);
  }

  // Can access protected setter in subclass
  public promote(): void {
    this.salary += 10000; // Uses protected setter from parent
  }
}
```

## Advanced Patterns

### Lazy Loading with Getters

```typescript
class DataLoader {
  private _data: any[] | null = null;

  get data(): any[] {
    if (this._data === null) {
      console.log("Loading data...");
      // Simulate loading data
      this._data = [1, 2, 3, 4, 5];
    }
    return this._data;
  }
}
```

### Type Guards with Getters

```typescript
class OptionalValue<T> {
  constructor(private _value?: T) {}

  get value(): T {
    if (this._value === undefined) {
      throw new Error("Value not set");
    }
    return this._value;
  }

  get hasValue(): boolean {
    return this._value !== undefined;
  }

  set value(newValue: T) {
    this._value = newValue;
  }
}
```

## Best Practices

1. **Use meaningful names**: Getters/setters should represent the property they're accessing
2. **Keep logic simple**: Avoid complex operations in getters; they should be fast
3. **Consistent validation**: Apply the same validation rules everywhere the property can be set
4. **Document side effects**: If getters/setters have side effects, document them clearly
5. **Avoid infinite recursion**: Don't call the setter from within itself by mistake

```typescript
class BadExample {
  private _value: number = 0;

  get value(): number {
    return this._value;
  }

  set value(newValue: number) {
    // Wrong! This will cause infinite recursion
    // this.value = newValue; // Don't do this!

    // Correct way:
    this._value = newValue;
  }
}
```

## Common Use Cases

1. **Data Validation**: Email validation, age ranges, etc.
2. **Unit Conversion**: Converting between different units
3. **Caching**: Computing expensive operations once
4. **Logging/Auditing**: Tracking property changes
5. **Dependency Management**: Updating related properties

## Conclusion

Getters and setters are powerful tools for creating maintainable and robust classes. They provide controlled access to object state, enable validation, and allow for clean APIs. When used properly, they enhance encapsulation and make your code more flexible and maintainable. Remember that getters and setters should be used when you need to add behavior around property access, not just to replace direct property access for its own sake.
