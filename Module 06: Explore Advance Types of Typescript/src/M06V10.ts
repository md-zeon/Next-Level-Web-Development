// Conditional Types in TypeScript
// Conditional types allow creating types based on conditions using T extends U ? X : Y syntax

// Example 1: Simple Conditional Type
type IsString<T> = T extends string ? "Yes" : "No";

// Runtime demonstration
function checkIsString(value: unknown): string {
	return typeof value === "string" ? "Yes" : "No";
}

console.log(
	"Runtime string checks:",
	checkIsString("hello"),
	checkIsString(42),
);

// Example 2: Type Extraction with infer
type ExtractArrayType<T> = T extends (infer U)[] ? U : never;

// Runtime array operations
const strings = ["hello", "world"];
const numbers = [1, 2, 3];
console.log("Array elements:", strings[0], numbers[0]);

// Example 3: Function Parameter Types
type GetParameterType<T> = T extends (...args: infer P) => any ? P : never;

// Runtime function calls
function exampleFunc(a: string, b: number): void {
	console.log("Called with:", a, b);
}

exampleFunc("hello", 42);

// Example 4: Return Type Extraction
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// Runtime return values
const stringResult = (() => "hello")();
const booleanResult = ((x: number) => x > 0)(5);
console.log("Return values:", stringResult, booleanResult);

// Example 5: Union Type Filtering
type FilterString<T> = T extends string ? T : never;

// Runtime filtering
const mixedArray = ["hello", 42, true, "world"];
const stringOnly = mixedArray.filter(
	(item): item is string => typeof item === "string",
);
console.log("Filtered strings:", stringOnly);

// Example 6: Utility Types Implementation
type MyParameters<T> = T extends (...args: infer P) => any ? P : never;
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
type MyNonNullable<T> = T extends null | undefined ? never : T;

// Runtime usage
function testFunc(a: string, b: number): boolean {
	return a.length > b;
}

const params: MyParameters<typeof testFunc> = ["hello", 3];
const result: MyReturnType<typeof testFunc> = testFunc(...params);
const nonNull: MyNonNullable<string | null> = "hello";

console.log("Utility types work:", result, nonNull);

// Example 7: Promise Type Unwrapping
type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

// Runtime promise usage
async function demoPromises() {
	const promise = Promise.resolve("success");
	const awaited: Awaited<typeof promise> = await promise;
	console.log("Awaited result:", awaited);
}

demoPromises();

// Example 8: Array Element Type
type ArrayElement<T> = T extends (infer U)[] ? U : never;

// Runtime array operations
const fruits = ["apple", "banana", "orange"];
const firstFruit: ArrayElement<typeof fruits> = fruits[0] as string;
console.log("First fruit:", firstFruit);

// Example 9: Conditional Types for Error Handling
type Result<T, E = Error> =
	| { success: true; data: T }
	| { success: false; error: E };

type ExtractSuccess<T> = T extends { success: true; data: infer D } ? D : never;
type ExtractError<T> = T extends { success: false; error: infer E } ? E : never;

// Runtime result handling
function handleResult<T>(result: Result<T>): void {
	if (result.success) {
		const data: ExtractSuccess<typeof result> = result.data;
		console.log("Success:", data);
	} else {
		const error: ExtractError<typeof result> = result.error;
		console.log("Error:", error.message);
	}
}

const successResult: Result<string> = { success: true, data: "Hello" };
const errorResult: Result<string> = {
	success: false,
	error: new Error("Failed"),
};

handleResult(successResult);
handleResult(errorResult);

// Example 10: Advanced Union Filtering
type FilterByType<T, U> = T extends U ? T : never;

// Runtime filtering functions
function filterNumbers(arr: unknown[]): number[] {
	return arr.filter((item): item is number => typeof item === "number");
}

function filterStrings(arr: unknown[]): string[] {
	return arr.filter((item): item is string => typeof item === "string");
}

const mixed = [1, "hello", true, 42, "world"];
console.log("Numbers:", filterNumbers(mixed));
console.log("Strings:", filterStrings(mixed));

// End of Conditional Types examples in TypeScript
