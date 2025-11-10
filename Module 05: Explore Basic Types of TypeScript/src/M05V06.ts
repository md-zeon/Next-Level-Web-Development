// reference type: object type

const user: {
	name: {
		firstName: string;
		middleName?: string; // optional property
		lastName: string;
	};
	age: number;
	isMarried?: boolean; // optional property
	organization: "Programming Hero"; // literal type
} = {
	name: {
		firstName: "Zeanur Rahaman",
		lastName: "Zeon",
	},
	age: 22,
	organization: "Programming Hero",
};

console.log(user);

// user.organization = "Northern University Bangladesh"; //! Error: Type '"Northern University Bangladesh"' is not assignable to type '"Programming Hero"'.

// readonly properties
type Person = {
	readonly id: number;
	name: string;
	age: number;
};
const person: Person = {
	id: 1,
	name: "Alice",
	age: 30,
};
console.log(person);
// person.id = 2; //! Error: Cannot assign to 'id' because it is a read-only property.
person.name = "Bob"; // Allowed
console.log(person);

/*
 * readonly vs literal type
 * A 'readonly' property can be assigned a value once and cannot be changed afterwards.
 * A 'literal type' restricts a variable to have a specific value or set of values.
 */
