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

// O(n^2) Solution using Brute Force

function twoSumBruteForce(numbers, target) {
	for (let i = 0; i < numbers.length; i++) {
		for (let j = i + 1; j < numbers.length; j++) {
			if (numbers[i] + numbers[j] === target) {
				return [i, j];
			}
		}
	}
	return undefined; // Return undefined if no solution is found
}

// O(n log n) Solution using Sorting and Two Pointers

function twoSumSorting(numbers, target) {
	const indexedNumbers = numbers.map((num, index) => ({ num, index }));
	indexedNumbers.sort((a, b) => a.num - b.num);

	let left = 0;
	let right = indexedNumbers.length - 1;

	while (left < right) {
		const sum = indexedNumbers[left].num + indexedNumbers[right].num;

		if (sum === target) {
			return [indexedNumbers[left].index, indexedNumbers[right].index];
		} else if (sum < target) {
			left++;
		} else {
			right--;
		}
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
console.log("O(n): ", twoSum(numbers, target)); // Output: [0, 2]
console.log("O(n^2): ", twoSumBruteForce(numbers, target)); // Output: [0, 2]
console.log("O(n log n): ", twoSumSorting(numbers, target)); // Output: [0, 2]

console.log("Instructor's Solution:");
console.log("O(n): ", twoSumInstructor(numbers, target)); // Output: [0, 2]
