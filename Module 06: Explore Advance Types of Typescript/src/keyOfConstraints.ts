// keyof : type operator

type RichPeopleVehicle = {
	bike: string;
	car: string;
	cng: string;
};

type myVehicle1 = "bike" | "car" | "cng";
type myVehicle2 = keyof RichPeopleVehicle; // "bike" | "car" | "cng"

const vehicle1: myVehicle1 = "bike";
const vehicle2: myVehicle2 = "car";

type User = {
	id: number;
	name: string;
	address: {
		city: string;
	};
};

const user: User = {
	id: 1,
	name: "John Doe",
	address: {
		city: "New York",
	},
};

type Product = {
	id: number;
	brand: string;
	name: string;
	price: number;
	stock: number;
};

const product: Product = {
	id: 1,
	brand: "HP",
	name: "Laptop",
	price: 1000,
	stock: 5,
};

// const myId = user.id;
const myId = user["id"];
const myName = user["name"];
const myAddress = user["address"];
const myCity = user["address"]["city"];

console.log({ myId, myName, myAddress, myCity });

const getPropertyFromObj = <T>(obj: T, key: keyof T) => {
	return obj[key];
};

const result = getPropertyFromObj(user, "name");
console.log({ result });

const result2 = getPropertyFromObj(product, "price");
console.log({ result2 });

const result3 = getPropertyFromObj(product, "brand");
console.log({ result3 });
