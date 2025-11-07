import Stack from "./lib/Stack.js";

// Problem Statement

// Given a string s containing just the characters "(", ")", "{", "}", "[" and "]",
// determine if the input string is valid.
// An input string is valid if:
//     Open brackets must be closed by the same type of brackets.
//     Open brackets must be closed in the correct order.
//     Every close bracket has a corresponding open bracket of the same type.

//? Input and Output
//? "()[]{}" -> true
//? "([{}])" -> true
//? "(]" -> false
//? "(()" -> false

const isValid = (str) => {
	const stack = new Stack();
	for (let char of str) {
		if (char === "(" || char === "{" || char === "[") {
			stack.push(char);
		} else {
			if (stack.isEmpty()) return false;
			const top = stack.pop();
			if (
				(char === ")" && top !== "(") ||
				(char === "}" && top !== "{") ||
				(char === "]" && top !== "[")
			) {
				return false;
			}
		}
	}
	return stack.isEmpty();
};

console.log(isValid("()[]{}")); // true
console.log(isValid("([{}])")); // true
console.log(isValid("(]")); // false
console.log(isValid("(()")); // false
console.log(isValid("((()))")); // true
