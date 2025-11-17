// Problem 01:

type formatValueType = string | number | boolean;

const formatValue = (value: formatValueType): formatValueType | undefined => {
	if (typeof value === "string") {
		return value.toUpperCase();
	} else if (typeof value === "number") {
		return value * 10;
	} else if (typeof value === "boolean") {
		return !value;
	}
};

// console.log(formatValue("hello"));
// console.log(formatValue(5));
// console.log(formatValue(true));

// Problem 02:

function getLength(value: string | any[]): number | undefined {
	if (typeof value === "string") {
		return value.length;
	} else if (Array.isArray(value)) {
		return value.length;
	}
}

// console.log(getLength("typescript"));
// console.log(getLength([10, 20, 30, 40]));

// Problem 03:

class Person {
	name: string;
	age: number;

	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}

	getDetails(): string {
		return `"Name: ${this.name}, Age: ${this.age}"`;
	}
}

const person1 = new Person("John Doe", 30);
console.log(person1.getDetails());

const person2 = new Person("Alice", 25);
console.log(person2.getDetails());
