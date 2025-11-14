// 7-2 Inheritance in TypeScript: The 1st Pillar of OOP

// Base class (Parent/Superclass)
class Animal {
  public name: string;
  protected age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public makeSound(): void {
    console.log("Some generic animal sound");
  }

  public introduce(): string {
    return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
  }
}

// Derived class using inheritance (Child/Subclass)
class Dog extends Animal {
  public breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, age); // Call parent constructor
    this.breed = breed;
  }

  // Override parent method
  makeSound(): void {
    console.log("Woof! Woof!");
  }

  // Add new method specific to Dog
  wagTail(): void {
    console.log(`${this.name} is wagging its tail!`);
  }
}

// Another derived class
class Cat extends Animal {
  constructor(name: string, age: number) {
    super(name, age);
  }

  // Override parent method
  makeSound(): void {
    console.log("Meow!");
  }

  // Use super to call parent method first
  introduce(): string {
    const basicIntro = super.introduce();
    return `${basicIntro} And I'm a cool cat!`;
  }
}

// Creating instances
const dog = new Dog("Buddy", 3, "Golden Retriever");
const cat = new Cat("Whiskers", 2);

// Using inherited properties and methods
console.log(dog.introduce()); // Inherited method
console.log(dog.name); // Inherited property
console.log(dog.breed); // Own property

dog.makeSound(); // Overridden method
dog.wagTail(); // Own method

console.log(cat.introduce()); // Enhanced inherited method
cat.makeSound(); // Overridden method

// Multi-level inheritance
class ElectricCar {
  public brand: string;
  protected model: string;
  private vin: string;

  constructor(brand: string, model: string, vin: string) {
    this.brand = brand;
    this.model = model;
    this.vin = vin;
  }

  public drive(): void {
    console.log(`${this.brand} ${this.model} is driving.`);
  }
}

class TeslaSedan extends ElectricCar {
  private batteryCapacity: number;

  constructor(model: string, vin: string, batteryCapacity: number) {
    super("Tesla", model, vin);
    this.batteryCapacity = batteryCapacity;
  }

  // Override drive method
  drive(): void {
    console.log(`Tesla ${this.model} with ${this.batteryCapacity}kWh battery is silently driving.`);
  }

  public charge(): void {
    console.log(`${this.brand} is charging to ${this.batteryCapacity}kWh.`);
  }
}

const tesla = new TeslaSedan("Model 3", "TSL123456", 75);
tesla.drive(); // Overridden method
tesla.charge(); // Own method
console.log(tesla.brand); // Inherited public property

// Demonstration of access modifiers in inheritance
class Vehicle {
  public brand: string;
  protected model: string;
  private vin: string;

  constructor(brand: string, model: string, vin: string) {
    this.brand = brand;
    this.model = model;
    this.vin = vin;
  }

  public getInfo(): string {
    return `${this.brand} ${this.model}`;
  }

  protected getVIN(): string {
    // Can access private members within the class
    return this.vin;
  }
}

class Car extends Vehicle {
  private numDoors: number;

  constructor(brand: string, model: string, vin: string, numDoors: number) {
    super(brand, model, vin);
    this.numDoors = numDoors;
  }

  public getCarInfo(): string {
    // Can access public and protected members
    return `${this.getInfo()} with ${this.numDoors} doors`;
  }

  // Can use protected method from parent
  public getVINThroughParent(): string {
    return this.getVIN(); // Inherited protected method
  }
}

const car = new Car("Toyota", "Camry", "TYT789", 4);
console.log(car.getCarInfo()); // Can access inherited protected model indirectly
// console.log(car.model); // Error: protected property not directly accessible
// console.log(car.vin); // Error: private property not inherited
// console.log(car.getVIN()); // Error: inherited protected method would access private parent property
