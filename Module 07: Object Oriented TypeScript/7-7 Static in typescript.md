# 7-7 Static Members in TypeScript

## Introduction to Static Members

Static members in TypeScript are properties and methods that belong to the class itself rather than to instances of the class. They are accessed directly on the class, not on instances created from the class.

### Key Characteristics
- **Class-level**: Belong to the class, not instances
- **Shared**: All instances share the same static members
- **No `this` context**: Cannot access instance properties/methods
- **Memory efficient**: Created once per class, not per instance

### Syntax

```typescript
class ClassName {
  static propertyName: type = value;
  static methodName(): returnType { ... }
}
```

## Static Properties

Static properties store data that is shared across all instances of the class:

```typescript
class Circle {
  static PI: number = 3.14159;
  static circleCount: number = 0;

  radius: number;

  constructor(radius: number) {
    this.radius = radius;
    Circle.circleCount++; // Access static property
  }

  getArea(): number {
    return Circle.PI * this.radius ** 2; // Access static property
  }
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);

console.log(Circle.circleCount); // 2
console.log(Circle.PI); // 3.14159
```

## Static Methods

Static methods can be called without creating an instance:

```typescript
class MathHelper {
  static add(a: number, b: number): number {
    return a + b;
  }

  static multiply(a: number, b: number): number {
    return a * b;
  }

  static getRandomNumber(): number {
    return Math.random();
  }
}

// Call static methods directly on the class
console.log(MathHelper.add(5, 3)); // 8
console.log(MathHelper.multiply(4, 2)); // 8
console.log(MathHelper.getRandomNumber()); // Random number between 0 and 1
```

## Static vs Instance Members

```typescript
class Counter {
  static globalCount: number = 0; // Shared across all instances
  instanceCount: number = 0;      // Unique per instance

  constructor() {
    Counter.globalCount++; // Affects all instances
    this.instanceCount = Counter.globalCount; // Instance gets current global count
  }

  static getGlobalInfo(): string {
    return `Total instances: ${Counter.globalCount}`;
  }

  getInstanceInfo(): string {
    return `This is instance #${this.instanceCount}`;
  }
}

const counter1 = new Counter();
const counter2 = new Counter();
const counter3 = new Counter();

console.log(Counter.getGlobalInfo()); // "Total instances: 3"
console.log(counter1.getInstanceInfo()); // "This is instance #1"
console.log(counter2.getInstanceInfo()); // "This is instance #2"
```

## Static Methods in Factory Patterns

Static methods are commonly used for factory patterns:

```typescript
class User {
  constructor(public id: number, public name: string, public email: string) {}

  static fromJSON(jsonString: string): User {
    const data = JSON.parse(jsonString);
    return new User(data.id, data.name, data.email);
  }

  static createGuest(): User {
    return new User(0, "Guest", "guest@example.com");
  }

  static createAdmin(name: string): User {
    return new User(Date.now(), name, `${name.toLowerCase()}@admin.com`);
  }
}

const user1 = User.fromJSON('{"id": 1, "name": "John", "email": "john@example.com"}');
const guest = User.createGuest();
const admin = User.createAdmin("Alice");

console.log(user1.name); // "John"
console.log(guest.name); // "Guest"
console.log(admin.email); // "alice@admin.com"
```

## Static Constants and Readonly Properties

Use `readonly` with static properties for constants:

```typescript
class Constants {
  static readonly MAX_USERS: number = 100;
  static readonly API_VERSION: string = "v2.1.0";
  static readonly DEFAULT_TIMEOUT: number = 5000;
}

class ApiService {
  static async fetchData(endpoint: string): Promise<any> {
    console.log(`Using API ${Constants.API_VERSION}`);
    // Simulating API call with timeout
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ data: "Mock data" });
      }, Constants.DEFAULT_TIMEOUT);
    });
  }
}
```

## Static Getters and Setters

You can create static getters and setters:

```typescript
class Configuration {
  private static _environment: string = "development";
  private static _debug: boolean = true;

  static get environment(): string {
    return Configuration._environment;
  }

  static set environment(env: string) {
    if (env === "development" || env === "production" || env === "staging") {
      Configuration._environment = env;
      Configuration._debug = env === "development";
    }
  }

  static get debug(): boolean {
    return Configuration._debug;
  }
}

console.log(Configuration.environment); // "development"
console.log(Configuration.debug); // true

Configuration.environment = "production";
console.log(Configuration.environment); // "production"
console.log(Configuration.debug); // false
```

## Inheritance and Static Members

Static members can be inherited but are not overridden in child classes:

```typescript
class Vehicle {
  static vehicleCount: number = 0;

  constructor() {
    Vehicle.vehicleCount++;
  }

  static getVehicleInfo(): string {
    return `Total vehicles: ${Vehicle.vehicleCount}`;
  }
}

class Car extends Vehicle {
  static carCount: number = 0;

  constructor() {
    super();
    Car.carCount++;
  }

  static getCarInfo(): string {
    return `Total cars: ${Car.carCount}`;
  }
}

const car1 = new Car();
const car2 = new Car();

console.log(Vehicle.getVehicleInfo()); // "Total vehicles: 2"
console.log(Car.getVehicleInfo()); // "Total vehicles: 2" (inherited)
console.log(Car.getCarInfo()); // "Total cars: 2"
```

## Common Use Cases

### 1. Utility Classes
```typescript
class DateUtils {
  static formatDate(date: Date, format: string = "YYYY-MM-DD"): string {
    // Implementation
    return date.toISOString().split('T')[0];
  }

  static isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6;
  }
}
```

### 2. Singleton Pattern
```typescript
class DatabaseConnection {
  private static instance: DatabaseConnection;
  private isConnected: boolean = false;

  private constructor() {
    // Private constructor prevents direct instantiation
  }

  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  connect(): void {
    this.isConnected = true;
    console.log("Connected to database");
  }
}
```

### 3. Counting Instances
```typescript
class Animal {
  static count: number = 0;

  constructor() {
    Animal.count++;
  }

  static getCount(): number {
    return Animal.count;
  }
}
```

## Best Practices

1. **Use for class-level data**: Static properties for data shared across all instances
2. **Factory methods**: Use static methods for object creation patterns
3. **Constants**: Define constants as static readonly properties
4. **Utility functions**: Group related utility functions in static methods
5. **Avoid overusing**: Don't make everything static - use instance members for instance-specific data

## Limitations

1. **No `this` access**: Cannot access instance properties or methods
2. **Inheritance**: Static members are inherited but can be shadowed, not overridden
3. **Memory**: Static members exist for the lifetime of the application
4. **Testing**: Can make testing more difficult due to shared state

## Conclusion

Static members provide a powerful way to organize class-level functionality and shared data in TypeScript. They are essential for utility functions, factory patterns, constants, and any data that should be shared across all instances of a class. Understanding when and how to use static members is crucial for effective object-oriented programming in TypeScript.</content>
