// 7-1 Class and Object in TypeScript

// Defining a Class
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

// Creating Objects (Instances)
const person1 = new Person("Alice", 30);
const person2 = new Person("Bob", 25);

console.log(person1.greet()); // Output: Hello, my name is Alice and I am 30 years old.
console.log(person2.greet()); // Output: Hello, my name is Bob and I am 25 years old.

// Access Modifiers Example
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

  public getDepartment(): string {
    return this.department; // Can access protected property within the class
  }
}

const employee1 = new Employee("John", 50000, "Engineering");
console.log(employee1.name); // Accessible (public)
console.log(employee1.getSalary()); // Accessible via method
console.log(employee1.getDepartment()); // Accessible via method
// console.log(employee1.salary); // Error: private property
// console.log(employee1.department); // Error: protected property
