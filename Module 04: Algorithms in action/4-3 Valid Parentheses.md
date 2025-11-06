# 4-3 Valid Parentheses

## Introduction to Valid Parentheses Problem

The Valid Parentheses problem is a classic algorithmic challenge that involves checking whether a string containing parentheses (and possibly other bracket types) is properly balanced and nested. This problem is commonly encountered in parsing expressions, validating code syntax, and ensuring structural integrity in various programming contexts.

## Problem Statement

Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:

1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

## Why Use Stack for Valid Parentheses?

A stack is the ideal data structure for this problem because:

- **LIFO (Last In, First Out)**: The most recently opened bracket should be the first one closed, which matches stack behavior perfectly.
- **Order Tracking**: Stacks naturally maintain the order of operations, allowing us to verify correct nesting.
- **Efficient Operations**: Push and pop operations are O(1), making the solution efficient.
- **Memory Management**: We only need to store opening brackets temporarily.

## Stack-Based Implementation

Here's a solution using a stack to validate parentheses:

```javascript
function isValid(s) {
	const stack = [];
	const bracketMap = {
		")": "(",
		"}": "{",
		"]": "[",
	};

	for (let char of s) {
		if (char === "(" || char === "{" || char === "[") {
			// Push opening brackets onto the stack
			stack.push(char);
		} else if (char === ")" || char === "}" || char === "]") {
			// For closing brackets, check if stack is empty or top doesn't match
			if (stack.length === 0 || stack.pop() !== bracketMap[char]) {
				return false;
			}
		}
	}

	// If stack is empty, all brackets were properly closed
	return stack.length === 0;
}
```

## Usage Example

```javascript
console.log(isValid("()")); // true
console.log(isValid("()[]{}")); // true
console.log(isValid("(]")); // false - mismatched brackets
console.log(isValid("([)]")); // false - wrong order
console.log(isValid("{[]}")); // true
console.log(isValid("")); // true - empty string
console.log(isValid("(")); // false - unclosed bracket
console.log(isValid(")")); // false - no matching open bracket
```

## Time Complexity Analysis

- **Time Complexity**: O(n) - We iterate through each character in the string exactly once
- **Space Complexity**: O(n) - In the worst case (all opening brackets), the stack could hold up to n/2 elements

## Edge Cases and Considerations

1. **Empty String**: Should return true (no brackets to validate)
2. **Single Bracket**: Either opening or closing should return false
3. **Mismatched Types**: `([)]` - opening and closing don't match in order
4. **Unclosed Brackets**: `((` - more opening than closing
5. **Extra Closing Brackets**: `())` - more closing than opening
6. **Nested Structures**: `{[()]}` - correctly nested different types

## Alternative Approaches

While the stack-based approach is optimal, other methods exist:

- **Counter Method**: Works only for single bracket type `()` but fails for mixed types
- **Recursive Approach**: Can work but is less efficient and more complex
- **Regular Expressions**: Not suitable due to nesting requirements

The stack-based solution remains the most elegant and efficient approach for this problem.
