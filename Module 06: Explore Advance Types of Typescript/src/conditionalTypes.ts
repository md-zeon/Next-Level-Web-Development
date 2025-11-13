type A = null;
type B = undefined;

type C = A extends number ? true : B extends undefined ? true : false;

type RichPeopleVehicle = {
	bike: string;
	car: string;
	ship: string;
};

type CheckVehicle<T> = T extends keyof RichPeopleVehicle ? true : false;

type HasBike = CheckVehicle<"bike">; // true
type HasPlane = CheckVehicle<"plane">; // false

// example

const checkVehicle = <T>(vehicle: T): CheckVehicle<T> => {
	if (vehicle === "bike" || vehicle === "car" || vehicle === "ship") {
		return true as CheckVehicle<T>; // Type assertion to satisfy the return type
	}
	return false as CheckVehicle<T>; // Type assertion to satisfy the return type
};

const myVehicle1 = checkVehicle("bike"); // true
const myVehicle2 = checkVehicle("plane"); // false
console.log(myVehicle1); // Output: true
console.log(myVehicle2); // Output: false
