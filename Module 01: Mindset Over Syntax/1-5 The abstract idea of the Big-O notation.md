# 1-5 The abstract idea of the Big-O notation

## What is Big-O notation?

Big-O notation is a mathematical concept used in computer science to describe the performance or complexity of an algorithm. Specifically, it characterizes the upper bound of an algorithm's running time or space requirements in terms of the size of the input data. This notation helps us understand how an algorithm scales as the input size increases.

## Measuring performance

When analyzing an algorithm, we often look at how the time it takes to complete (time complexity) or the amount of memory it uses (space complexity) grows as the input size (n) increases. Big-O notation provides a way to express this growth in a simplified manner, focusing on the most significant factors that affect performance.

## Big-O notation

- **Time Complexity**: This refers to how the execution time of an algorithm changes with the size of the input. For example, an algorithm with a time complexity of O(n) means that the time it takes to complete grows linearly with the input size.
- **Space Complexity**: This refers to how the memory usage of an algorithm changes with the size of the input. An algorithm with a space complexity of O(1) means that it uses a constant amount of memory, regardless of the input size.

## Common Big-O Notations

Here are some common Big-O notations and their meanings:

- O(1): Constant time/space complexity
- O(log n): Logarithmic time/space complexity
- O(n): Linear time/space complexity
- O(n log n): Linearithmic time/space complexity
- O(n^2): Quadratic time/space complexity
- O(2^n): Exponential time/space complexity
- O(n!): Factorial time/space complexity

## O(1): Constant Time/Space Complexity

An algorithm is said to have O(1) complexity if its performance remains constant regardless of the input size. For example, accessing an element in an array by its index takes the same amount of time no matter how large the array is.

```javascript
function getFirstElement(arr) {
	return arr[0]; // This operation takes constant time O(1)
}
```

## O(n): Linear Time/Space Complexity

An algorithm has O(n) complexity if its performance grows linearly with the input size. For example, iterating through an array to find a specific value requires checking each element, resulting in linear time complexity.

```javascript
function findElement(arr, target) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === target) {
			return i; // Found the target
		}
	}
	return -1; // Target not found
}
```

In this example, the time it takes to find the target grows linearly with the size of the array, resulting in O(n) time complexity.

## O(log n): Logarithmic Time/Space Complexity

An algorithm has O(log n) complexity if its performance grows logarithmically with the input size. This often occurs in algorithms that divide the problem in half at each step, such as binary search.

```javascript
function binarySearch(arr, target) {
	let left = 0;
	let right = arr.length - 1;
	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		if (arr[mid] === target) {
			return mid; // Found the target
		} else if (arr[mid] < target) {
			left = mid + 1; // Search in the right half
		} else {
			right = mid - 1; // Search in the left half
		}
	}
	return -1; // Target not found
}
```

In this example, the time it takes to find the target grows logarithmically with the size of the array, resulting in O(log n) time complexity.

## O(n log n): Linearithmic Time/Space Complexity

An algorithm has O(n log n) complexity if its performance grows in proportion to n multiplied by log n. This is common in efficient sorting algorithms like mergesort and heapsort.

```javascript
function mergeSort(arr) {
	if (arr.length <= 1) {
		return arr;
	}
	const mid = Math.floor(arr.length / 2);
	const left = mergeSort(arr.slice(0, mid));
	const right = mergeSort(arr.slice(mid));
	return merge(left, right);
}

function merge(left, right) {
	const merged = [];
	let i = 0;
	let j = 0;
	while (i < left.length && j < right.length) {
		if (left[i] < right[j]) {
			merged.push(left[i]);
			i++;
		} else {
			merged.push(right[j]);
			j++;
		}
	}
	return merged.concat(left.slice(i)).concat(right.slice(j));
}
```

In this example, the time it takes to sort the array grows in proportion to n log n, resulting in O(n log n) time complexity.

## O(n^2): Quadratic Time/Space Complexity

An algorithm has O(n^2) complexity if its performance grows quadratically with the input size. This often occurs in algorithms that involve nested loops, such as bubble sort.

```javascript
function bubbleSort(arr) {
	const n = arr.length;
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				// Swap arr[j] and arr[j + 1]
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
			}
		}
	}
	return arr;
}
```

In this example, the time it takes to sort the array grows quadratically with the size of the array, resulting in O(n^2) time complexity.

## Visualizing Big-O Notation

To better understand how different Big-O notations compare, consider the following graph that illustrates the growth rates of various complexities as the input size (n) increases:

![Big-O Notation Graph](https://miro.medium.com/v2/resize:fit:720/format:webp/1*dWet_YU-5072Kcko7LzsuQ.jpeg)

This graph shows how algorithms with different complexities scale as the input size increases. As you can see, algorithms with lower complexity (like O(1) and O(log n)) grow much more slowly compared to those with higher complexity (like O(n^2) and O(2^n)).
