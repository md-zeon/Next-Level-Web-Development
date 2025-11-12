// Generic Function

const createArrayString = (value: string) => [value];
const createArrayNumber = (value: number) => [value];
const createArrayBoolean = (value: boolean) => [value];

const createArrayWithUserObject = (value: { id: number; name: string }) => {
	return [value];
};

console.log(createArrayString("Hello TypeScript"));
console.log(createArrayNumber(42));
console.log(createArrayBoolean(true));
console.log(createArrayWithUserObject({ id: 1, name: "John Doe" }));

// Generic Function with Type Parameter

const createArrayWithUserGeneric = <T>(value: T): T[] => {
	return [value];
};

console.log(createArrayWithUserGeneric<string>("Hello Generic TypeScript"));
console.log(createArrayWithUserGeneric<number>(42));
console.log(createArrayWithUserGeneric<boolean>(true));
console.log(
	createArrayWithUserGeneric<{ id: number; name: string }>({
		id: 2,
		name: "Jane Doe",
	}),
);
console.log(createArrayWithUserGeneric<Array<number>>([1, 2, 3, 4, 5]));

// tuple

const createArrayWithTuple = (param1: string, param2: number) => {
	return [param1, param2];
};

const createArrayTuplesWithGeneric = <X, Y>(param1: X, param2: Y) => [
	param1,
	param2,
];

console.log(createArrayWithTuple("TypeScript", 2024));
console.log(createArrayTuplesWithGeneric<string, number>("Generics", 101));
console.log(
	createArrayTuplesWithGeneric<boolean, Array<string>>(true, ["a", "b", "c"]),
);

const addStudentToCourse = <T>(studentInfo: T) => {
	return {
		courseName: "Next Level TypeScript",
		...studentInfo,
	};
};

const student1 = {
	id: 123,
	name: "Alice",
	hasPen: true,
};

const student2 = {
	id: 456,
	name: "Bob",
	hasNotebook: false,
	hasCar: true,
	isMarried: true,
};

console.log(addStudentToCourse(student1));
console.log(addStudentToCourse(student2));

function mergeObjects<U, V>(obj1: U, obj2: V): U & V {
	return { ...obj1, ...obj2 };
}
const merged = mergeObjects({ name: "Alice" }, { age: 30, city: "New York" });
console.log(merged);
