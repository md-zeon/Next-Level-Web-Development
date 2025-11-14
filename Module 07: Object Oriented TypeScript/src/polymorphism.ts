// Polymorphism: bohurupi

class Person {
	getSleep(): void {
		console.log("Person is sleeping 8 hours a day");
	}
}

class Student extends Person {
	getSleep(): void {
		console.log("Student is sleeping 6 hours a day");
	}
}

class NextLevelDeveloper extends Person {
	getSleep(): void {
		console.log("Next Level Developer is sleeping 4 hours a day");
	}
}

const getSleepingHours = (person: Person): void => {
	person.getSleep();
};

const person1 = new Person();
const person2 = new Student();
const person3 = new NextLevelDeveloper();

getSleepingHours(person1);
getSleepingHours(person2);
getSleepingHours(person3);

class Shape {
	getArea() {
		return 0;
	}
}

class Circle extends Shape {
	//! Error: Method 'getArea' in type 'Circle' is not assignable to the same method in base type 'Shape'.
	// getArea(radius: number): number {
	// 	return Math.PI * radius * radius;
	// }
	radius: number;
	constructor(radius: number) {
		super();
		this.radius = radius;
	}
	getArea(): number {
		return Math.PI * this.radius * this.radius;
	}
}

class Rectangle extends Shape {
	length: number;
	width: number;
	constructor(length: number, width: number) {
		super();
		this.length = length;
		this.width = width;
	}
	getArea(): number {
		return this.length * this.width;
	}
}

const shapes: Shape[] = [
	new Circle(5),
	new Rectangle(4, 6),
	new Circle(3),
	new Rectangle(2, 8),
	new Shape(),
];

for (const shape of shapes) {
	if (shape instanceof Circle) {
		console.log(`Circle Area: ${shape.getArea().toFixed(2)}`);
	} else if (shape instanceof Rectangle) {
		console.log(`Rectangle Area: ${shape.getArea()}`);
	} else {
		console.log(`Shape Area: ${shape.getArea()}`);
	}
}
