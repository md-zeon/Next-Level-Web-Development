type User = {
	name: string;
	age: number;
};

// interface : object type: array, object, function

interface IUser {
	name: string;
	age: number;
}

type Role = {
	role: "admin" | "user" | "guest";
};

type UserWithRole = User & Role;

interface IUserWithRole extends IUser {
	role: "admin" | "user" | "guest";
}

const user1: IUserWithRole = {
	name: "Alice",
	age: 30,
	role: "admin",
};

const user2: IUser = {
	name: "Bob",
	age: 25,
};

type IsAdmin = boolean;

const isAdmin: IsAdmin = true;

// function

type add = (a: number, b: number) => number;

interface IAdd {
	(a: number, b: number): number;
}

const addNumbers: add = (a, b) => a + b;

const addNumbersInterface: IAdd = (a, b) => a + b;

type Friends = string[];

const friends: Friends = ["Charlie", "Dave", "Eve"];

interface IFriends {
	[index: number]: string;
}

const friendsInterface: IFriends = ["Frank", "Grace", "Heidi"];

// Recommendation: Use interfaces over type aliases for object types when possible, as interfaces are more extensible and can be merged.
// Use type aliases for union types, intersection types, and primitive types.
// However, both can often be used interchangeably for object types.
// Interfaces can be extended and implemented in classes, making them more suitable for defining contracts in OOP.
