# 4-8 Selection Sort Visualization

## Problem Statement

Given an unsorted array of integers, sort the array in ascending order using the Selection Sort algorithm.

### Example 1

```text
Input: [64, 25, 12, 22, 11]
Output: [11, 12, 22, 25, 64]
```

### Example 2

```text
Input: [29, 10, 14, 37, 13]
Output: [10, 13, 14, 29, 37]
```

### Constraints

- 1 <= arr.length <= 10^4
- -10^4 <= arr[i] <= 10^4

## Approach: Selection Sort

Selection Sort is an in-place comparison sorting algorithm. It divides the input list into two parts: a sorted sublist of items which is built up from left to right at the front (left) of the list and a sublist of the remaining unsorted items that occupy the rest of the list.

### Algorithm

1. Start with the first element as the minimum.
2. Compare the minimum with the next element.
3. If the next element is smaller, update the minimum index.
4. After checking all elements, swap the minimum with the first unsorted element.
5. Repeat for the remaining unsorted portion.

### Visualization

Let's visualize Selection Sort with the array [64, 25, 12, 22, 11]:

**Initial array:** [64, 25, 12, 22, 11]

**Pass 1:**

- Find minimum in [64, 25, 12, 22, 11] → 11 at index 4
- Swap 64 and 11 → [11, 25, 12, 22, 64]

**Pass 2:**

- Find minimum in [25, 12, 22, 64] → 12 at index 2
- Swap 25 and 12 → [11, 12, 25, 22, 64]

**Pass 3:**

- Find minimum in [25, 22, 64] → 22 at index 3
- Swap 25 and 22 → [11, 12, 22, 25, 64]

**Pass 4:**

- Find minimum in [25, 64] → 25 at index 3
- Already in place → [11, 12, 22, 25, 64]

**Pass 5:**

- Only one element left → [11, 12, 22, 25, 64]

**Sorted array:** [11, 12, 22, 25, 64]

### Code

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
		// Swap
		if (minIndex !== i) {
			[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
		}
	}
	return arr;
}
```

### Time Complexity: O(n²)

- Two nested loops: outer loop runs n times, inner loop runs n-i times.
- Total comparisons: n(n-1)/2 ≈ n²/2

### Space Complexity: O(1)

- In-place sorting, no extra space required.

## Summary

- Selection Sort is simple but inefficient for large lists.
- It performs well on small lists or when memory is limited.
- Not stable (relative order of equal elements may change).
- Useful for educational purposes and understanding sorting fundamentals.
