// generics : dynamically generalize

type GenericArray<T> = Array<T>;
// const friends: string[] = ["Alice", "Bob", "Charlie"];
// const friends: Array<string> = ["Alice", "Bob", "Charlie"];
const friends: GenericArray<string> = ["Alice", "Bob", "Charlie"];

// const rollNumbers: number[] = [4, 12, 3];
// const rollNumbers: Array<number> = [4, 12, 3];
const rollNumbers: GenericArray<number> = [4, 12, 3];

// const isEligibleList: boolean[] = [true, false, true];
// const isEligibleList: Array<boolean> = [true, false, true];
const isEligibleList: GenericArray<boolean> = [true, false, true];

// generic function
function getArray<T>(items: T[]): T[] {
	return new Array<T>().concat(items);
}
const numArray = getArray<number>([1, 2, 3, 4]);
const strArray = getArray<string>(["Alice", "Bob", "Charlie"]);

type Coordinates<X, Y> = [X, Y];

const coordinates1: Coordinates<number, number> = [10, 20];
const coordinates2: Coordinates<string, string> = ["30", "40"];

const userList: GenericArray<{ name: string; age: number }> = [
	{ name: "Alice", age: 25 },
	{ name: "Bob", age: 30 },
	{ name: "Charlie", age: 35 },
];
