const add = (a: number, b: number): number => {
	return a + b;
};

const result: number = add(5, 10);
console.log(`The sum is: ${result}`);

const addArrow = (x: number, y: number): number => x + y;
const arrowResult: number = addArrow(15, 25);
console.log(`The sum using arrow function is: ${arrowResult}`);

// Object method

const poorUser = {
	name: "Zeanur Rahaman Zeon",
	money: 0,
	addBalance(money: number): number {
		return this.money + money; //* 'this' refers to the current object
	},
};

console.log("User before adding balance:", poorUser);
poorUser.addBalance(1000);
console.log("User after adding balance:", poorUser);

// Array method with map

const arr: number[] = [1, 2, 3, 4, 5];
console.log(`Original Array: ${arr}`);
const squareArr: number[] = arr.map((num: number): number => num * num);
console.log(`Squared Array: ${squareArr}`);
