// ? : ternary operator : decision making operator
// ?? : nullish coalescing operator: null or undefined
// ?. : optional chaining operator: to access nested object properties safely

const eligibleForVote = (age: number): string => {
	const message =
		age >= 18 ? "You are eligible to vote." : "You are not eligible to vote.";
	return message;
};

console.log(eligibleForVote(20)); // Output: You are eligible to vote.

const userTheme = undefined;

const selectedTheme = userTheme ?? "light mode";
console.log(`Selected Theme: ${selectedTheme}`); // Output: Selected Theme: light mode
// ? Note: If userTheme were null or undefined, selectedTheme would be "light mode".
//* Otherwise, it would take the value of userTheme.

const isAuthenticated = "";

const resultWithTernary = isAuthenticated ? "Access Granted" : "Access Denied";
console.log(`Ternary Result: ${resultWithTernary}`); // Output: Ternary Result: Access Denied
// ? Note: If isAuthenticated were truthy, resultWithTernary would be "Access Granted".

const resultWithNullish = isAuthenticated ?? "Access Denied";
console.log(`Nullish Coalescing Result: ${resultWithNullish}`); // Output: Nullish Coalescing Result:
// ? Note: If isAuthenticated were null or undefined, resultWithNullish would be "Access Denied".
//* Otherwise, it would take the value of isAuthenticated.

interface Address {
	street?: string;
	city?: string;
	country?: string;
}
interface User {
	name: string;
	address?: Address;
}

const user: User = {
	name: "Alice",
	// address is optional and may not be present
};

const userStreet = user.address?.street ?? "Street not available";
console.log(`User Street: ${userStreet}`); // Output: User Street: Street not available
// ? Note: If address or street were undefined, userStreet would be "Street not available".
//* Otherwise, it would take the value of user.address.street.
