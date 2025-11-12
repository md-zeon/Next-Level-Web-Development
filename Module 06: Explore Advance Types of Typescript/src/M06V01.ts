// Type Assertion in TypeScript
// Type assertion allows you to tell the compiler that you know the type of a value better than it does

// Example 1: Basic type assertion
let someValue: any = "Hello World";

// Using 'as' syntax (preferred)
let strLength: number = (someValue as string).length;
console.log("String length:", strLength);

// Using angle bracket syntax (not allowed in TSX files)
// let strLength2: number = (<string>someValue).length;

// Example 2: Type assertion with objects
interface Person {
	name: string;
	age: number;
}

let personData: any = {
	name: "John Doe",
	age: 30,
	occupation: "Developer",
};

// Asserting that personData is of type Person
let person: Person = personData as Person;
console.log("Person:", person.name, person.age);

// Example 3: Type assertion with DOM elements
// In a browser environment, document.getElementById returns HTMLElement | null
// But we know it's an HTMLInputElement

// Simulating DOM element (since we're in Node.js)
// let inputElement = document.getElementById('myInput') as HTMLInputElement;
// inputElement.value = "Hello";

// Example 4: Type assertion with unknown type
let unknownValue: unknown = "This is a string";

// We can assert it to string to access string methods
let stringValue: string = unknownValue as string;
console.log("Uppercase:", stringValue.toUpperCase());

// Example 5: Type assertion with arrays
let mixedArray: any[] = [1, "two", 3, "four"];

let stringArray: string[] = mixedArray as string[];
// This would cause runtime error because not all elements are strings
// console.log(stringArray[0].toUpperCase()); // Error at runtime

// Example 6: Double assertion (dangerous, use sparingly)
let value: any = "Hello";
// First assert to unknown, then to number (bypasses type checking)
let numberValue: number = value as unknown as number;
console.log("Number value:", numberValue); // This will be NaN at runtime

// Example 7: Type assertion with function parameters
function processValue(value: unknown): string {
	// Assert that value is a string
	return (value as string).toUpperCase();
}

console.log("Processed value:", processValue("hello world"));

// Example 8: Type assertion in conditional checks
function isString(value: unknown): value is string {
	return typeof value === "string";
}

function handleValue(value: unknown) {
	if (isString(value)) {
		// TypeScript knows value is string here
		console.log("String length:", value.length);
	} else {
		// Use type assertion if we're sure
		let numValue = value as number;
		console.log("Number value:", numValue);
	}
}

handleValue("test");
handleValue(42);

// Example 9: Type assertion with JSON.parse
let jsonString = '{"name": "Alice", "age": 25}';
let parsedData = JSON.parse(jsonString) as { name: string; age: number };
console.log("Parsed data:", parsedData.name, parsedData.age);

// Example 10: Type assertion with custom types
type User = {
	id: number;
	username: string;
};

type Admin = User & {
	permissions: string[];
};

let user: User = { id: 1, username: "user1" };
let admin: Admin = user as Admin; // Be careful - this doesn't add permissions
console.log("Admin:", admin);

// Note: Type assertions don't perform runtime checks
// They only tell TypeScript compiler to treat the value as that type
// Always ensure type safety at runtime when using assertions

// End of Type Assertion examples in TypeScript

// Instructor's examples

let anything: any;

anything = "Zeanur Rahaman Zeon";
console.log((anything as string).length);

const kgToGramConverter = (
	input: string | number,
): number | string | undefined => {
	if (typeof input === "string") {
		const [value, unit] = input.split(" ");
		if (unit?.toLowerCase() === "kg") {
			return `Converted output: ${parseFloat(value as string) * 1000}`;
		} else {
			throw new Error("Unsupported unit");
		}
	} else if (typeof input === "number") {
		return input * 1000;
	}
};

const result1 = kgToGramConverter(2) as number;
const result2 = kgToGramConverter("2 kg") as string;
console.log(result1, result2);
