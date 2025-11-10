// Exponentiation by Squaring - O(log n) example
// Computes x^n efficiently

// Iterative version O(log n)
const power = (x, n) => {
	if (n === 0) return 1;
	if (n === 1) return x;

	let result = 1;
	while (n > 0) {
		// If n is odd, multiply the result by x
		if (n % 2 === 1) {
			result *= x;
		}
		// Square x and halve n
		x *= x;
		n = Math.floor(n / 2);
	}

	return result;
};

// Test cases
console.log(power(2, 10)); // 1024
console.log(power(3, 5)); // 243
console.log(power(5, 0)); // 1
console.log(power(7, 3)); // 343

// Recursive version O(log n)
const powerRecursive = (x, n) => {
	if (n === 0) return 1;
	if (n === 1) return x;

	// Divide
	let half = powerRecursive(x, Math.floor(n / 2));
	// Conquer
	if (n % 2 === 0) {
		return half * half;
	} else {
		return half * half * x;
	}
};

console.log(powerRecursive(2, 10)); // 1024
console.log(powerRecursive(3, 5)); // 243

// Binary Search with Visualization
const binarySearchWithLogs = (arr, target) => {
	console.log(`Searching for ${target} in array: [${arr.join(", ")}]`);
	let left = 0;
	let right = arr.length - 1;
	let step = 1;

	while (left <= right) {
		let mid = Math.floor((left + right) / 2);
		console.log(
			`Step ${step}: left=${left}, right=${right}, mid=${mid}, arr[mid]=${arr[mid]}`,
		);

		if (arr[mid] === target) {
			console.log(`Found ${target} at index ${mid}`);
			return mid;
		} else if (arr[mid] > target) {
			console.log(`${arr[mid]} > ${target}, searching left half`);
			right = mid - 1;
		} else {
			console.log(`${arr[mid]} < ${target}, searching right half`);
			left = mid + 1;
		}
		step++;
	}

	console.log(`${target} not found in array`);
	return -1;
};

// Test binary search visualization
const testArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log("\n--- Binary Search Visualization ---");
binarySearchWithLogs(testArray, 13);
console.log("\n--- Searching for non-existent element ---");
binarySearchWithLogs(testArray, 14);

const generateLargeArray = (size) => {
	const arr = [];
	for (let i = 0; i < size; i++) {
		// Generate random integers between 0 and size * 10
		arr.push(Math.floor(Math.random() * size * 10));
	}
	return arr;
};

// Generate a large sorted array
const largeArray = generateLargeArray(1000).sort((a, b) => a - b);

// Test binary search on large array
console.log("\n--- Binary Search on Large Array ---");
binarySearchWithLogs(largeArray, largeArray[30]);
