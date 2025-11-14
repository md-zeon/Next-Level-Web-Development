# 7-10 Encapsulation: The Fourth Pillar of OOP

## Introduction to Encapsulation

Encapsulation is the fourth and final pillar of Object-Oriented Programming. It refers to the bundling of data (properties) and methods (functions) that operate on that data into a single unit (class), while restricting direct access to some of the object's components. This is achieved through access modifiers and provides data hiding and information security.

### What is Encapsulation?

Encapsulation involves:
- **Data Hiding**: Internal data is not directly accessible from outside
- **Access Control**: Using access modifiers to control visibility and modification
- **Validation**: Data can be validated before being set or accessed
- **Information Hiding**: Implementation details are hidden from the user
- **Interface Design**: Providing controlled access through public methods

### Why Encapsulation Matters

1. **Data Protection**: Prevents unauthorized access to internal state
2. **Maintainability**: Changes to internal implementation don't affect external code
3. **Flexibility**: Internal changes without breaking the public interface
4. **Validation**: Data integrity through controlled access
5. **Security**: Sensitive data can be properly protected

## Access Modifiers in TypeScript

TypeScript provides three main access modifiers:

### 1. Public (`public`)
- **Default modifier** - no keyword needed
- **Accessible from anywhere** - inside class, subclasses, and external code
- Use for: Public API, getters/setters that are part of the interface

```typescript
class PublicExample {
  public name: string; // Accessible everywhere

  public method(): void {
    // Can access name
    console.log(this.name);
  }
}

const instance = new PublicExample();
instance.name = "Accessible"; // ✅ Allowed
```

### 2. Private (`private`)
- **Only accessible within the same class**
- **Not accessible in subclasses**
- Use for: Internal state, helper methods, validation logic

```typescript
class PrivateExample {
  private password: string;

  constructor(password: string) {
    this.password = this.hashPassword(password); // ✅ Allowed
  }

  private hashPassword(raw: string): string {
    // Complex hashing logic
    return `hashed_${raw}`;
  }

  public authenticate(input: string): boolean {
    return this.hashPassword(input) === this.password; // ✅ Allowed internally
  }
}

const secureInstance = new PrivateExample("secret");
// secureInstance.password; // ❌ Error: Property 'password' is private
// secureInstance.hashPassword("test"); // ❌ Error: Method 'hashPassword' is private
```

### 3. Protected (`protected`)
- **Accessible within the class and its subclasses**
- **Not accessible from external code**
- Use for: Methods that subclasses need to access or override

```typescript
class ProtectedExample {
  protected title: string;

  protected formatTitle(): string {
    return `**${this.title}**`;
  }
}

class SubClass extends ProtectedExample {
  public displayTitle(): void {
    this.title = "My Title"; // ✅ Allowed in subclass
    console.log(this.formatTitle()); // ✅ Can call protected method
  }
}

const subInstance = new SubClass();
subInstance.displayTitle(); // ✅ Public method can be called
// subInstance.title; // ❌ Error: Property 'title' is protected
```

## Getters and Setters

Getters and setters provide controlled access to private properties:

### Basic Getters and Setters

```typescript
class Person {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  // Getter - controls how property is accessed
  get name(): string {
    return this._name.toUpperCase();
  }

  // Setter - controls how property is set
  set name(value: string) {
    this._name = value.trim();
  }
}

const person = new Person("john");
console.log(person.name); // "JOHN" (getter transforms value)
person.name = "  jane  "; // Setter trims whitespace
console.log(person.name); // "JANE"
```

### Validation with Setters

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
      throw new Error("Maximum balance exceeded");
    }
    this._balance = amount;
  }

  deposit(amount: number): void {
    this.balance = this._balance + amount;
  }

  withdraw(amount: number): void {
    if (amount > this._balance) {
      throw new Error("Insufficient funds");
    }
    this.balance = this._balance - amount;
  }
}
```

### Computed Properties

```typescript
class Circle {
  private _radius: number;

  constructor(radius: number) {
    this._radius = radius;
  }

  get radius(): number {
    return this._radius;
  }

  set radius(value: number) {
    if (value <= 0) {
      throw new Error("Radius must be positive");
    }
    this._radius = value;
  }

  // Read-only computed property
  get area(): number {
    return Math.PI * this._radius ** 2;
  }

  get circumference(): number {
    return 2 * Math.PI * this._radius;
  }

  // No setter for area - it's computed automatically
}

const circle = new Circle(5);
console.log(`Radius: ${circle.radius}`); // 5
console.log(`Area: ${circle.area.toFixed(2)}`); // 78.54
console.log(`Circumference: ${circle.circumference.toFixed(2)}`); // 31.42

circle.radius = 10;
console.log(`New area: ${circle.area.toFixed(2)}`); // 314.16 (automatically updated)
```

## Real-World Encapsulation Examples

### Example 1: User Authentication System

```typescript
class User {
  private _username: string;
  private _password: string;
  private _loginAttempts: number = 0;
  private _isLocked: boolean = false;

  constructor(username: string, password: string) {
    this._username = username;
    this._password = this.hashPassword(password);
  }

  get username(): string {
    return this._username;
  }

  get isLocked(): boolean {
    return this._isLocked;
  }

  // Password validation with attempt limiting
  authenticate(password: string): boolean {
    if (this._isLocked) {
      throw new Error("Account is locked due to too many failed attempts");
    }

    if (this.hashPassword(password) === this._password) {
      this._loginAttempts = 0; // Reset on successful login
      return true;
    } else {
      this._loginAttempts++;
      if (this._loginAttempts >= 3) {
        this._isLocked = true;
      }
      return false;
    }
  }

  changePassword(oldPassword: string, newPassword: string): boolean {
    if (this.authenticate(oldPassword)) {
      this._password = this.hashPassword(newPassword);
      return true;
    }
    return false;
  }

  private hashPassword(password: string): string {
    // In real implementation, use proper hashing
    return `hashed_${password}`;
  }
}
```

### Example 2: Product Inventory System

```typescript
class Product {
  private _id: string;
  private _name: string;
  private _price: number;
  private _stock: number;

  constructor(id: string, name: string, price: number, stock: number = 0) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._stock = stock;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (!value.trim()) {
      throw new Error("Product name cannot be empty");
    }
    this._name = value.trim();
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    if (value < 0) {
      throw new Error("Price cannot be negative");
    }
    this._price = value;
  }

  get stock(): number {
    return this._stock;
  }

  // Controlled stock management
  addStock(amount: number): void {
    if (amount < 0) {
      throw new Error("Cannot add negative stock");
    }
    this._stock += amount;
  }

  removeStock(amount: number): void {
    if (amount > this._stock) {
      throw new Error("Insufficient stock");
    }
    if (amount < 0) {
      throw new Error("Cannot remove negative stock");
    }
    this._stock -= amount;
  }

  getValue(): number {
    return this._price * this._stock;
  }

  isLowStock(threshold: number = 10): boolean {
    return this._stock <= threshold;
  }
}
```

### Example 3: Database Connection Manager

```typescript
class DatabaseConnectionManager {
  private _connection: any = null;
  private _isConnected: boolean = false;
  private _connectionAttempts: number = 0;
  private _maxRetries: number = 3;

  private _host: string;
  private _port: number;
  private _database: string;

  constructor(host: string, port: number = 5432, database: string = "app") {
    this._host = host;
    this._port = port;
    this._database = database;
  }

  get isConnected(): boolean {
    return this._isConnected;
  }

  get host(): string {
    return this._host;
  }

  get database(): string {
    return this._database;
  }

  async connect(): Promise<void> {
    if (this._isConnected) {
      return; // Already connected
    }

    try {
      console.log(`Connecting to ${this._host}:${this._port}/${this._database}...`);
      // Simulate connection logic
      await new Promise(resolve => setTimeout(resolve, 1000));

      this._connection = { host: this._host, database: this._database };
      this._isConnected = true;
      this._connectionAttempts = 0;

      console.log("Connected successfully");
    } catch (error) {
      this._connectionAttempts++;
      console.error(`Connection failed (${this._connectionAttempts}/${this._maxRetries})`);

      if (this._connectionAttempts < this._maxRetries) {
        console.log("Retrying in 2 seconds...");
        await new Promise(resolve => setTimeout(resolve, 2000));
        return this.connect();
      } else {
        throw new Error("Failed to connect after maximum retries");
      }
    }
  }

  async disconnect(): Promise<void> {
    if (!this._isConnected) {
      return;
    }

    console.log("Disconnecting from database...");
    // Simulate disconnect logic
    await new Promise(resolve => setTimeout(resolve, 500));

    this._connection = null;
    this._isConnected = false;
    console.log("Disconnected successfully");
  }

  async query(sql: string): Promise<any[]> {
    if (!this._isConnected) {
      throw new Error("Not connected to database");
    }

    console.log(`Executing query: ${sql}`);
    // Simulate query execution
    return [{ id: 1, name: "Sample Data" }];
  }
}
```

## Encapsulation Patterns

### Builder Pattern with Encapsulation

```typescript
class EmailBuilder {
  private _to: string[] = [];
  private _cc: string[] = [];
  private _bcc: string[] = [];
  private _subject: string = "";
  private _body: string = "";
  private _isHtml: boolean = false;
  private _attachments: string[] = [];

  to(email: string | string[]): EmailBuilder {
    this._to = Array.isArray(email) ? email : [email];
    return this;
  }

  cc(email: string | string[]): EmailBuilder {
    this._cc = Array.isArray(email) ? email : [email];
    return this;
  }

  subject(subject: string): EmailBuilder {
    this._subject = subject;
    return this;
  }

  body(content: string, isHtml: boolean = false): EmailBuilder {
    this._body = content;
    this._isHtml = isHtml;
    return this;
  }

  attach(file: string): EmailBuilder {
    this._attachments.push(file);
    return this;
  }

  // Validation and final build
  build(): EmailMessage | null {
    if (!this._to.length || !this._subject || !this._body) {
      throw new Error("Email must have recipient, subject, and body");
    }

    return {
      to: this._to,
      cc: this._cc,
      bcc: this._bcc,
      subject: this._subject,
      body: this._body,
      isHtml: this._isHtml,
      attachments: this._attachments,
      send: () => {
        console.log(`Email sent to ${this._to.join(", ")}`);
      }
    };
  }
}

interface EmailMessage {
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  body: string;
  isHtml: boolean;
  attachments: string[];
  send(): void;
}
```

### Singleton Pattern with Encapsulation

```typescript
class AppConfiguration {
  private static _instance: AppConfiguration;
  private _settings: Map<string, any> = new Map();

  private constructor() {
    // Private constructor prevents instantiation
    this.loadDefaultSettings();
  }

  static getInstance(): AppConfiguration {
    if (!AppConfiguration._instance) {
      AppConfiguration._instance = new AppConfiguration();
    }
    return AppConfiguration._instance;
  }

  private loadDefaultSettings(): void {
    this._settings.set("app.name", "My App");
    this._settings.set("app.version", "1.0.0");
    this._settings.set("database.host", "localhost");
    this._settings.set("database.port", 5432);
    this._settings.set("logging.level", "info");
  }

  get(key: string): any {
    return this._settings.get(key);
  }

  set(key: string, value: any): void {
    // Validation can be added here
    this._settings.set(key, value);
  }

  getAll(): { [key: string]: any } {
    const result: { [key: string]: any } = {};
    for (const [key, value] of this._settings) {
      result[key] = value;
    }
    return result;
  }
}
```

## Benefits and Best Practices

### Benefits of Encapsulation
1. **Data Integrity**: Controlled access prevents invalid states
2. **Maintainability**: Internal changes don't break external code
3. **Security**: Sensitive data can be protected
4. **Modularity**: Classes become self-contained units
5. **Testing**: Easier to test with controlled interfaces

### Best Practices
1. **Use private by default**: Start with private access modifiers
2. **Create meaningful getters/setters**: Provide controlled access when needed
3. **Validate data**: Always validate input in setters
4. **Document public APIs**: Clearly document the public interface
5. **Avoid exposing internals**: Don't make internal implementation details public
6. **Use protected judiciously**: Only for inheritance relationships

### Common Mistakes to Avoid
1. **Over-encapsulation**: Don't make everything private
2. **Getter/setter for everything**: Only use when validation or computation is needed
3. **Exposing private fields indirectly**: Public methods shouldn't return mutable references to private data
4. **Inconsistent validation**: Apply validation rules consistently

## Conclusion

Encapsulation completes the four pillars of Object-Oriented Programming by providing the mechanism to protect and control access to an object's internal state. Through access modifiers, getters, setters, and careful interface design, encapsulation ensures that objects maintain their integrity while providing clear, well-defined interactions with the outside world. This principle is fundamental to building robust, maintainable, and secure software systems.</content>
