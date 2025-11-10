type User = {
	id: number;
	name: {
		firstName: string;
		lastName: string;
	};
	gender: "male" | "female";
	contactNo: string | number;
	address?: {
		division: string;
		city: string;
	};
};

const user1: User = {
	id: 1,
	name: {
		firstName: "John",
		lastName: "Doe",
	},
	gender: "male",
	contactNo: "123-456-7890",
	address: {
		division: "California",
		city: "Los Angeles",
	},
};

type IsAdmin = true;

const isAdmin: IsAdmin = true;

type Name = string;

const userName: Name = "Alice";

// function

type AddFunc = (num1: number, num2: number) => number;

const add: AddFunc = (num1, num2) => {
	return num1 + num2;
};
