# 4-5 Palindrome Checker

## Problem Statement

Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.

A string is a palindrome if it reads the same backward as forward. For this problem, we consider only alphanumeric characters and ignore cases.

### Example 1:

```
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
```

### Example 2:

```
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
```

### Example 3:

```
Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
```

### Constraints:

- 1 <= s.length <= 2 \* 10^5
- s consists only of printable ASCII characters.

## Approach 1: Two Pointers

Use two pointers starting from the beginning and end of the string, moving towards the center while skipping non-alphanumeric characters.

### Algorithm:

1. Convert the string to lowercase.
2. Initialize two pointers: left at 0, right at length-1.
3. While left < right:
   - Move left pointer right until it points to an alphanumeric character.
   - Move right pointer left until it points to an alphanumeric character.
   - If the characters at left and right don't match, return false.
   - Move both pointers inward.
4. Return true if all checks pass.

### Code:

```javascript
function isPalindrome(s) {
	s = s.toLowerCase();
	let left = 0;
	let right = s.length - 1;
	while (left < right) {
		while (left < right && !isAlphanumeric(s[left])) {
			left++;
		}
		while (left < right && !isAlphanumeric(s[right])) {
			right--;
		}
		if (s[left] !== s[right]) {
			return false;
		}
		left++;
		right--;
	}
	return true;
}

function isAlphanumeric(char) {
	return (char >= "a" && char <= "z") || (char >= "0" && char <= "9");
}
```

### Time Complexity: O(n)

- We traverse the string once.

### Space Complexity: O(1)

- We use constant extra space.

## Approach 2: Reverse String

Clean the string by removing non-alphanumeric characters and converting to lowercase, then compare with its reverse.

### Algorithm:

1. Convert the string to lowercase.
2. Build a new string with only alphanumeric characters.
3. Reverse the cleaned string.
4. Compare the cleaned string with its reverse.

### Code:

```javascript
function isPalindrome(s) {
	s = s.toLowerCase();
	let cleaned = "";
	for (let char of s) {
		if (isAlphanumeric(char)) {
			cleaned += char;
		}
	}
	let reversed = cleaned.split("").reverse().join("");
	return cleaned === reversed;
}

function isAlphanumeric(char) {
	return (char >= "a" && char <= "z") || (char >= "0" && char <= "9");
}
```

### Time Complexity: O(n)

- Building cleaned string and reversing take O(n).

### Space Complexity: O(n)

- We create a new string for cleaned and reversed.

## Approach 3: Recursive

Use recursion to check if the string is a palindrome, skipping non-alphanumeric characters.

### Algorithm:

1. Helper function that takes start and end indices.
2. Skip non-alphanumeric from start and end.
3. If start >= end, return true.
4. If characters match, recurse with start+1, end-1.
5. Else, return false.

### Code:

```javascript
function isPalindrome(s) {
	s = s.toLowerCase();
	return helper(s, 0, s.length - 1);
}

function helper(s, start, end) {
	while (start < end && !isAlphanumeric(s[start])) {
		start++;
	}
	while (start < end && !isAlphanumeric(s[end])) {
		end--;
	}
	if (start >= end) {
		return true;
	}
	if (s[start] !== s[end]) {
		return false;
	}
	return helper(s, start + 1, end - 1);
}

function isAlphanumeric(char) {
	return (char >= "a" && char <= "z") || (char >= "0" && char <= "9");
}
```

### Time Complexity: O(n)

- Each character is processed once.

### Space Complexity: O(n)

- Recursion stack can go up to O(n) in worst case.

## Summary

- **Two Pointers**: Efficient and optimal, uses O(1) extra space.
- **Reverse String**: Simple but uses O(n) space.
- **Recursive**: Functional approach, but may have stack overflow for very long strings.

The two pointers approach is the most efficient and commonly used.
