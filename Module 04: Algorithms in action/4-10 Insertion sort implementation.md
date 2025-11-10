# 4-10 Insertion Sort Implementation

## Problem Statement

Implement the Insertion Sort algorithm to sort an array of integers in ascending order.

### Example 1:

```
Input: [12, 11, 13, 5, 6]
Output: [5, 6, 11, 12, 13]
```

### Example 2:

```
Input: [29, 10, 14, 37, 13]
Output: [10, 13, 14, 29, 37]
```

### Constraints:

- 1 <= arr.length <= 10^4
- -10^4 <= arr[i] <= 10^4

## Approach 1: Standard Insertion Sort

### Algorithm:

1. Start from the second element (index 1)
2. Compare it with the previous elements
3. Shift all larger elements to the right
4. Insert the current element in its correct position
5. Repeat for all elements

### Code:

```javascript
function insertionSort(arr) {
	const n = arr.length;
	for (let i = 1; i < n; i++) {
		let key = arr[i];
		let j = i - 1;

		// Move elements of arr[0..i-1] that are greater than key
		// to one position ahead of their current position
		while (j >= 0 && arr[j] > key) {
			arr[j + 1] = arr[j];
			j--;
		}
		arr[j + 1] = key;
	}
	return arr;
}
```

### Time Complexity: O(n²)

- Best case: O(n) - when array is already sorted
- Worst case: O(n²) - when array is reverse sorted
- Average case: O(n²)

### Space Complexity: O(1)

- In-place sorting algorithm

## Approach 2: Insertion Sort with Binary Search

### Algorithm:

Use binary search to find the correct position for insertion, then shift elements.

### Code:

```javascript
function insertionSortBinary(arr) {
	const n = arr.length;
	for (let i = 1; i < n; i++) {
		let key = arr[i];
		let left = 0;
		let right = i - 1;

		// Binary search to find insertion point
		while (left <= right) {
			let mid = Math.floor((left + right) / 2);
			if (arr[mid] > key) {
				right = mid - 1;
			} else {
				left = mid + 1;
			}
		}

		// Shift elements to make space
		for (let j = i - 1; j >= left; j--) {
			arr[j + 1] = arr[j];
		}
		arr[left] = key;
	}
	return arr;
}
```

### Time Complexity: O(n²)

- Binary search reduces comparisons but shifting still takes O(n) time

### Space Complexity: O(1)

## Approach 3: Recursive Insertion Sort

### Algorithm:

1. Base case: if array size <= 1, return
2. Recursively sort first n-1 elements
3. Insert the last element into the sorted array

### Code:

```javascript
function insertionSortRecursive(arr, n = arr.length) {
	if (n <= 1) {
		return arr;
	}

	// Recursively sort first n-1 elements
	insertionSortRecursive(arr, n - 1);

	// Insert last element at its correct position
	let last = arr[n - 1];
	let j = n - 2;

	while (j >= 0 && arr[j] > last) {
		arr[j + 1] = arr[j];
		j--;
	}
	arr[j + 1] = last;

	return arr;
}
```

### Time Complexity: O(n²)

### Space Complexity: O(n)

- Due to recursion stack

## Implementation Notes

- Insertion Sort is stable (preserves relative order of equal elements)
- Efficient for small datasets or nearly sorted arrays
- Adaptive algorithm - performs well when array is partially sorted
- Online algorithm - can sort a list as it receives it
- Used in practice for small arrays (typically < 10 elements)

## Comparison with Other Sorts

- **vs Selection Sort**: Insertion sort is stable, adaptive, and often faster in practice for small arrays
- **vs Bubble Sort**: Similar performance but Insertion sort performs fewer swaps
- **vs Quick Sort**: Insertion sort is better for small arrays, often used as base case in hybrid algorithms

## Testing

```javascript
// Test cases
console.log(insertionSort([12, 11, 13, 5, 6])); // [5, 6, 11, 12, 13]
console.log(insertionSort([29, 10, 14, 37, 13])); // [10, 13, 14, 29, 37]
console.log(insertionSort([1, 2, 3, 4, 5])); // [1, 2, 3, 4, 5] (already sorted)
console.log(insertionSort([5, 4, 3, 2, 1])); // [1, 2, 3, 4, 5] (reverse sorted)
console.log(insertionSort([1])); // [1]
console.log(insertionSort([])); // []
```
