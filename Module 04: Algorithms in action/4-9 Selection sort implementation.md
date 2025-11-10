# 4-9 Selection Sort Implementation

## Problem Statement

Implement the Selection Sort algorithm to sort an array of integers in ascending order.

### Example 1:

```
Input: [64, 25, 12, 22, 11]
Output: [11, 12, 22, 25, 64]
```

### Example 2:

```
Input: [29, 10, 14, 37, 13]
Output: [10, 13, 14, 29, 37]
```

### Constraints:

- 1 <= arr.length <= 10^4
- -10^4 <= arr[i] <= 10^4

## Approach 1: Standard Selection Sort

### Algorithm:

1. Iterate through the array from index 0 to n-2
2. For each position i, find the minimum element in the subarray from i to n-1
3. Swap the found minimum element with the element at position i
4. Repeat until the entire array is sorted

### Code:

```javascript
function selectionSort(arr) {
	const n = arr.length;
	for (let i = 0; i < n - 1; i++) {
		let minIndex = i;
		for (let j = i + 1; j < n; j++) {
			if (arr[j] < arr[minIndex]) {
				minIndex = j;
			}
		}
		// Swap elements
		if (minIndex !== i) {
			[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
		}
	}
	return arr;
}
```

### Time Complexity: O(n²)

- Best case: O(n²) - always performs the same number of comparisons
- Worst case: O(n²)
- Average case: O(n²)

### Space Complexity: O(1)

- In-place sorting algorithm

## Approach 2: Selection Sort with Early Termination (Optimized)

### Algorithm:

Same as Approach 1, but we can add a flag to check if any swaps occurred. However, this doesn't improve time complexity significantly.

### Code:

```javascript
function selectionSortOptimized(arr) {
	const n = arr.length;
	for (let i = 0; i < n - 1; i++) {
		let minIndex = i;
		let swapped = false;
		for (let j = i + 1; j < n; j++) {
			if (arr[j] < arr[minIndex]) {
				minIndex = j;
				swapped = true;
			}
		}
		if (swapped && minIndex !== i) {
			[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
		}
	}
	return arr;
}
```

### Time Complexity: O(n²)

- Same as standard implementation

### Space Complexity: O(1)

## Approach 3: Recursive Selection Sort

### Algorithm:

1. Base case: if array length <= 1, return
2. Find minimum element in the array
3. Swap minimum with first element
4. Recursively sort the remaining array

### Code:

```javascript
function selectionSortRecursive(arr, n = arr.length, index = 0) {
	if (index >= n - 1) {
		return arr;
	}

	let minIndex = index;
	for (let j = index + 1; j < n; j++) {
		if (arr[j] < arr[minIndex]) {
			minIndex = j;
		}
	}

	if (minIndex !== index) {
		[arr[index], arr[minIndex]] = [arr[minIndex], arr[index]];
	}

	return selectionSortRecursive(arr, n, index + 1);
}
```

### Time Complexity: O(n²)

### Space Complexity: O(n)

- Due to recursion stack

## Implementation Notes

- Selection Sort is not stable (does not preserve relative order of equal elements)
- Performs well when memory writes are expensive (minimizes swaps)
- Simple to implement and understand
- Not suitable for large datasets due to O(n²) time complexity

## Testing

```javascript
// Test cases
console.log(selectionSort([64, 25, 12, 22, 11])); // [11, 12, 22, 25, 64]
console.log(selectionSort([29, 10, 14, 37, 13])); // [10, 13, 14, 29, 37]
console.log(selectionSort([1])); // [1]
console.log(selectionSort([])); // []
```
