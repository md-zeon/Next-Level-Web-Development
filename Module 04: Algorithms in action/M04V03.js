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

const isValid = (char, top) => {
	if (
		(char === ")" && top !== "(") ||
		(char === "}" && top !== "{") ||
		(char === "]" && top !== "[")
	) {
		return false;
	}
	return true;
};

const isValidParentheses = (str) => {
	const stack = new Stack();
	for (let char of str) {
		if (char === "(" || char === "{" || char === "[") {
			stack.push(char);
		} else {
			if (stack.isEmpty()) return false;
			const top = stack.pop();
			if (!isValid(char, top)) {
				return false;
			}
		}
	}
	return stack.isEmpty();
};

console.log("My Solution:");
console.log(isValidParentheses("()[]{}")); // true
console.log(isValidParentheses("([{}])")); // true
console.log(isValidParentheses("(]")); // false
console.log(isValidParentheses("(()")); // false
console.log(isValidParentheses("((()))")); // true
console.log(isValidParentheses("{[([][{}])]}")); // true
console.log(isValidParentheses("{{[[(())]]}}{")); // false

// Instructor's Solution
const bracketChecker = (str) => {
	const stack = new Stack();

	const bracketMap = {
		")": "(",
		"}": "{",
		"]": "[",
	};
	// Traverse through each character in the string
	for (let i = 0; i < str.length; i++) {
		const char = str[i];
		// If it's an opening bracket, push it onto the stack
		if (char === "(" || char === "{" || char === "[") {
			stack.push(char);
		} else if (char === ")" || char === "}" || char === "]") {
			// If it's a closing bracket, check for matching opening bracket
			if (stack.isEmpty() || stack.pop() !== bracketMap[char]) {
				return false;
			}
		}
	}
	// If stack is empty, all opening brackets were properly closed
	return stack.isEmpty();
};

console.log("Instructor's Solution:");

console.log(bracketChecker("()[]{}")); // true
console.log(bracketChecker("([{}])")); // true
console.log(bracketChecker("(]")); // false
console.log(bracketChecker("(()")); // false
console.log(bracketChecker("((()))")); // true
