// Problem Statement

// Given an array of integers numbers and an integer target,
// return the indices of two numbers such that they add up to target.
// If there is no solution then return undefined

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// Time Complexity => O(n)

//? Input
// [2, 11, 7, 15] and 9

//? Output
// [0, 2] (because 2 + 7 = 9)

// O(n) Solution using Hash Map
function twoSum(numbers, target) {
	const numMap = new Map();

	for (let i = 0; i < numbers.length; i++) {
		if (numMap.has(target - numbers[i])) {
			return [numMap.get(target - numbers[i]), i];
		}
		numMap.set(numbers[i], i);
	}

	return undefined; // Return undefined if no solution is found
}

// Instructor's Solution
function twoSumInstructor(arr, target) {
	const numMap = new Map();

	for (let i = 0; i < arr.length; i++) {
		const currentNum = arr[i];
		const complement = target - currentNum;

		if (numMap.has(complement)) {
			return [numMap.get(complement), i];
		}

		numMap.set(currentNum, i);
	}

	return undefined; // Return undefined if no solution is found
}

// Example usage:
console.log("My Solution:");
const numbers = [2, 11, 7, 15];
const target = 9;
const result = twoSum(numbers, target);
console.log(result); // Output: [0, 2]

console.log("Instructor's Solution:");
console.log(twoSumInstructor(numbers, target)); // Output: [0, 2]
