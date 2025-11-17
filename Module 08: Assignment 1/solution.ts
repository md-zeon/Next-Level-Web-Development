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

// const person1 = new Person("John Doe", 30);
// console.log(person1.getDetails());

// const person2 = new Person("Alice", 25);
// console.log(person2.getDetails());

// Problem 04:

interface Item {
	title: string;
	rating: number;
}

const filterByRating = (items: Item[]): Item[] => {
	return items.filter((item: Item) => item.rating >= 4);
};

const books = [
	{ title: "Book A", rating: 4.5 },
	{ title: "Book B", rating: 3.2 },
	{ title: "Book C", rating: 5.0 },
];

// console.log(filterByRating(books));
// console.log(books);

// Problem 05:

interface User {
	id: number;
	name: string;
	email: string;
	isActive: boolean;
}

const filterActiveUsers = (users: User[]): User[] => {
	return users.filter((user: User) => user.isActive === true);
};

// const users: User[] = [
// 	{ id: 1, name: "Rakib", email: "rakib@example.com", isActive: true },
// 	{ id: 2, name: "Asha", email: "asha@example.com", isActive: false },
// 	{ id: 3, name: "Rumi", email: "rumi@example.com", isActive: true },
// ];

// console.log(filterActiveUsers(users));
// console.log(users);

// Problem 06:

interface Book {
	title: string;
	author: string;
	publishedYear: number;
	isAvailable: boolean;
}

const printBookDetails = (book: Book): void => {
	const { author, isAvailable, publishedYear, title } = book;
	console.log(
		`Title: ${title}, Author: ${author}, Published: ${publishedYear}, Available: ${
			isAvailable ? "Yes" : "No"
		}`,
	);
};

// const myBook: Book = {
// 	title: "The Great Gatsby",
// 	author: "F. Scott Fitzgerald",
// 	publishedYear: 1925,
// 	isAvailable: true,
// };

// printBookDetails(myBook);

// Problem 07:

type UniqueArrayType = (string | number)[];

const getUniqueValues = (
	arr1: UniqueArrayType,
	arr2: UniqueArrayType,
): UniqueArrayType => {
	const uniqueValues: UniqueArrayType = [];

	const unique: { [key: string]: boolean } = {};

	for (let i = 0; i < arr1.length; i++) {
		const value = arr1[i];
		if (!unique[value]) {
			uniqueValues.push(value);
			unique[value] = true;
		}
	}

	for (let i = 0; i < arr2.length; i++) {
		const value = arr2[i];
		if (!unique[value]) {
			uniqueValues.push(value);
			unique[value] = true;
		}
	}

	return uniqueValues;
};

const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
console.log(getUniqueValues(array1, array2));
