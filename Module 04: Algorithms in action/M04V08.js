// Selection Sort
// [64, 25, 12, 22, 11] -> [11, 12, 22, 25, 64]

function selectionSort(arr) {
	const n = arr.length;
	for (let i = 0; i < n - 1; i++) {
		let minIndex = i;
		for (let j = i + 1; j < n; j++) {
			if (arr[j] < arr[minIndex]) {
				minIndex = j;
			}
		}
		// Swap
		if (minIndex !== i) {
			[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
		}
	}
	return arr;
}

// Test cases
const array1 = [64, 25, 12, 22, 11];
console.log("Original array:", array1);
const sorted1 = selectionSort([...array1]); // Copy to avoid mutation
console.log("Sorted array:", sorted1); // Output: [11, 12, 22, 25, 64]

const array2 = [29, 10, 14, 37, 13];
console.log("Original array:", array2);
const sorted2 = selectionSort([...array2]);
console.log("Sorted array:", sorted2); // Output: [10, 13, 14, 29, 37]

const array3 = [1];
console.log("Original array:", array3);
const sorted3 = selectionSort([...array3]);
console.log("Sorted array:", sorted3); // Output: [1]

const array4 = [];
console.log("Original array:", array4);
const sorted4 = selectionSort([...array4]);
console.log("Sorted array:", sorted4); // Output: []
