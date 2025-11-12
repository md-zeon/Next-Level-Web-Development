// TypeScript Interfaces - Comprehensive Examples
// Interfaces define contracts for object structures

// Example 1: Basic Interface
interface User {
  id: number;
  name: string;
  email: string;
}

let user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};

console.log("User:", user);

// Example 2: Interface with Methods
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
}

let calculator: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b
};

console.log("Calculator add:", calculator.add(5, 3));

// Example 3: Optional Properties
interface Person {
  name: string;
  age: number;
  email?: string;
  phone?: string;
}

let person1: Person = { name: "Alice", age: 30 };
let person2: Person = {
  name: "Bob",
  age: 25,
  email: "bob@example.com",
  phone: "+1234567890"
};

console.log("Person 1:", person1);
console.log("Person 2:", person2);

// Example 4: Readonly Properties
interface Point {
  readonly x: number;
  readonly y: number;
}

let point: Point = { x: 10, y: 20 };
console.log("Point:", point);

// point.x = 15; // Error: Cannot assign to 'x' because it is a read-only property

// Example 5: Index Signatures
interface Dictionary {
  [key: string]: string;
}

let dict: Dictionary = {
  "hello": "world",
  "foo": "bar",
  "typescript": "awesome"
};

console.log("Dictionary:", dict);

// Example 6: Index Signature with Specific Properties
interface ErrorContainer {
  [prop: string]: string | number;
  code: number;
  message: string;
}

let error: ErrorContainer = {
  code: 404,
  message: "Not Found",
  timestamp: Date.now(),
  details: "Page not found"
};

console.log("Error:", error);

// Example 7: Function Interface (Call Signature)
interface SearchFunction {
  (query: string, limit?: number): string[];
}

let searchUsers: SearchFunction = (query, limit = 10) => {
  return [`${query}_user_1`, `${query}_user_2`, `${query}_user_3`].slice(0, limit);
};

console.log("Search results:", searchUsers("john", 2));

// Example 8: Constructor Interface
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
  tick(): void;
  currentTime: Date;
}

class DigitalClock implements ClockInterface {
  currentTime: Date = new Date();

  constructor(hour: number, minute: number) {
    this.currentTime.setHours(hour, minute, 0, 0);
  }

  tick() {
    this.currentTime.setSeconds(this.currentTime.getSeconds() + 1);
    console.log("Digital Clock:", this.currentTime.toLocaleTimeString());
  }
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}

let digitalClock = createClock(DigitalClock, 14, 30);
digitalClock.tick();

// Example 9: Extending Interfaces
interface Animal {
  name: string;
  age: number;
  eat(): void;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

let dog: Dog = {
  name: "Buddy",
  age: 3,
  breed: "Golden Retriever",
  eat: () => console.log("Dog is eating"),
  bark: () => console.log("Woof!")
};

console.log("Dog:", dog.name, dog.breed);
dog.eat();
dog.bark();

// Example 10: Multiple Interface Inheritance
interface CanFly {
  fly(): void;
  wingspan: number;
}

interface CanSwim {
  swim(): void;
  maxDepth: number;
}

interface Duck extends CanFly, CanSwim {
  quack(): void;
}

let duck: Duck = {
  fly: () => console.log("Duck is flying"),
  wingspan: 0.8,
  swim: () => console.log("Duck is swimming"),
  maxDepth: 2,
  quack: () => console.log("Quack!")
};

console.log("Duck abilities:");
duck.fly();
duck.swim();
duck.quack();

// Example 11: Generic Interfaces
interface Container<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
  isEmpty(): boolean;
}

class StringContainer implements Container<string> {
  value: string = "";

  getValue(): string {
    return this.value;
  }

  setValue(value: string): void {
    this.value = value;
  }

  isEmpty(): boolean {
    return this.value.length === 0;
  }
}

class NumberContainer implements Container<number> {
  value: number = 0;

  getValue(): number {
    return this.value;
  }

  setValue(value: number): void {
    this.value = value;
  }

  isEmpty(): boolean {
    return this.value === 0;
  }
}

let strContainer = new StringContainer();
strContainer.setValue("Hello TypeScript");
console.log("String container:", strContainer.getValue());

let numContainer = new NumberContainer();
numContainer.setValue(42);
console.log("Number container:", numContainer.getValue());

// Example 12: Generic Constraints
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(`Length: ${arg.length}`);
  return arg;
}

logLength("Hello");     // OK
logLength([1, 2, 3]);   // OK
logLength({ length: 5, value: "test" }); // OK
// logLength(42);       // Error: number has no length property

// Example 13: Interface Implementation in Classes
interface Shape {
  area(): number;
  perimeter(): number;
  name: string;
}

class Rectangle implements Shape {
  name: string = "Rectangle";

  constructor(private width: number, private height: number) {}

  area(): number {
    return this.width * this.height;
  }

  perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

class Circle implements Shape {
  name: string = "Circle";

  constructor(private radius: number) {}

  area(): number {
    return Math.PI * this.radius * this.radius;
  }

  perimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

let rectangle = new Rectangle(5, 10);
let circle = new Circle(7);

console.log(`${rectangle.name} - Area: ${rectangle.area()}, Perimeter: ${rectangle.perimeter()}`);
console.log(`${circle.name} - Area: ${circle.area().toFixed(2)}, Perimeter: ${circle.perimeter().toFixed(2)}`);

// Example 14: Discriminated Unions with Interfaces
interface Square {
  kind: "square";
  size: number;
}

interface RectangleShape {
  kind: "rectangle";
  width: number;
  height: number;
}

interface CircleShape {
  kind: "circle";
  radius: number;
}

type Shape2D = Square | RectangleShape | CircleShape;

function calculateArea(shape: Shape2D): number {
  switch (shape.kind) {
    case "square":
      return shape.size * shape.size;
    case "rectangle":
      return shape.width * shape.height;
    case "circle":
      return Math.PI * shape.radius * shape.radius;
    default:
      throw new Error("Unknown shape");
  }
}

let square: Square = { kind: "square", size: 5 };
let rect: RectangleShape = { kind: "rectangle", width: 4, height: 6 };
let circ: CircleShape = { kind: "circle", radius: 3 };

console.log("Square area:", calculateArea(square));
console.log("Rectangle area:", calculateArea(rect));
console.log("Circle area:", calculateArea(circ).toFixed(2));

// Example 15: Hybrid Types (Object + Function)
interface Counter {
  (start: number): string;  // Call signature
  interval: number;         // Property
  reset(): void;           // Method
}

function createCounter(): Counter {
  let count = 0;

  let counter = function (start: number): string {
    count = start;
    return `Counter started at ${count}`;
  } as Counter;

  counter.interval = 1000;
  counter.reset = function () {
    count = 0;
    console.log("Counter reset to 0");
  };

  return counter;
}

let counter = createCounter();
console.log(counter(5));
console.log("Interval:", counter.interval);
counter.reset();

// Example 16: Interface Declaration Merging
interface Product {
  id: number;
  name: string;
}

interface Product {
  price: number;
  category?: string;
}

let product: Product = {
  id: 1,
  name: "Laptop",
  price: 999.99,
  category: "Electronics"
};

console.log("Product:", product);

// Example 17: Interface with Method Overloads
interface Database {
  get(id: number): any;
  get(table: string, id: number): any;
  get(table: string, conditions: object): any[];
}

let database: Database = {
  get: (param1: any, param2?: any): any => {
    if (typeof param1 === 'number') {
      return { id: param1, type: 'single' };
    }
    if (typeof param2 === 'number') {
      return { table: param1, id: param2, type: 'by_id' };
    }
    return [{ table: param1, conditions: param2, type: 'query' }];
  }
};

console.log("Get by ID:", database.get(123));
console.log("Get by table and ID:", database.get("users", 456));
console.log("Get by conditions:", database.get("products", { category: "electronics" }));

// Example 18: Builder Pattern with Interfaces
interface UserBuilder {
  setName(name: string): this;
  setEmail(email: string): this;
  setAge(age: number): this;
  build(): User;
}

class ConcreteUserBuilder implements UserBuilder {
  private user: Partial<User & { age?: number }> = {};

  setName(name: string): this {
    this.user.name = name;
    return this;
  }

  setEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  setAge(age: number): this {
    this.user.age = age;
    return this;
  }

  build(): User {
    if (!this.user.name || !this.user.email) {
      throw new Error("Name and email are required");
    }
    return {
      id: Date.now(),
      name: this.user.name,
      email: this.user.email
    };
  }
}

let userBuilder = new ConcreteUserBuilder();
let builtUser = userBuilder
  .setName("Jane Smith")
  .setEmail("jane@example.com")
  .setAge(28)
  .build();

console.log("Built user:", builtUser);

// Example 19: Repository Pattern
interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
}

interface UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | null>;
}

class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id.toString() === id) || null;
  }

  async findAll(): Promise<User[]> {
    return [...this.users];
  }

  async save(entity: User): Promise<User> {
    this.users.push(entity);
    return entity;
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter(user => user.id.toString() !== id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }
}

let userRepo = new InMemoryUserRepository();

// Wrap async operations in an async function
async function testRepository() {
  await userRepo.save({ id: 1, name: "Test User", email: "test@example.com" });
  let foundUser = await userRepo.findByEmail("test@example.com");
  console.log("Found user by email:", foundUser);
}

testRepository();

// Example 20: Complex Interface with Union Types
interface SuccessResponse {
  success: true;
  data: any;
  timestamp: number;
}

interface ErrorResponse {
  success: false;
  error: string;
  code: number;
}

type ApiResponse = SuccessResponse | ErrorResponse;

function handleApiResponse(response: ApiResponse): void {
  if (response.success) {
    console.log("Success - Data:", response.data, "Time:", new Date(response.timestamp));
  } else {
    console.log("Error - Code:", response.code, "Message:", response.error);
  }
}

let successResponse: SuccessResponse = {
  success: true,
  data: { users: ["Alice", "Bob"] },
  timestamp: Date.now()
};

let errorResponse: ErrorResponse = {
  success: false,
  error: "User not found",
  code: 404
};

handleApiResponse(successResponse);
handleApiResponse(errorResponse);

console.log("Interface examples completed!");
