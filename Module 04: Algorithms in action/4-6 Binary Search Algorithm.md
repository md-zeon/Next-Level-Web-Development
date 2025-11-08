# 4-6 Binary Search Algorithm

## Problem Statement

Given a sorted array of integers `nums` and an integer `target`, return the index of `target` if it is in `nums`, or -1 if it is not present.

### Example 1:

```
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
```

### Example 2:

```
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1
```

### Constraints:

- 1 <= nums.length <= 10^4
- -10^4 < nums[i], target < 10^4
- All the integers in nums are unique.
- nums is sorted in ascending order.

## Approach 1: Iterative Binary Search

Use a loop to repeatedly divide the search interval in half.

### Algorithm:

1. Initialize left = 0, right = nums.length - 1
2. While left <= right:
   - Calculate mid = left + Math.floor((right - left) / 2)
   - If nums[mid] == target, return mid
   - If nums[mid] < target, set left = mid + 1
   - Else, set right = mid - 1
3. Return -1 if not found

### Code:

```javascript
function binarySearch(nums, target) {
	let left = 0;
	let right = nums.length - 1;
	while (left <= right) {
		const mid = left + Math.floor((right - left) / 2);
		if (nums[mid] === target) {
			return mid;
		} else if (nums[mid] < target) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}
	return -1;
}
```

### Time Complexity: O(log n)

- The search space is halved each time.

### Space Complexity: O(1)

- Constant extra space.

## Approach 2: Recursive Binary Search

Use recursion to divide the search interval.

### Algorithm:

1. Helper function that takes left and right indices.
2. Base case: if left > right, return -1
3. Calculate mid = left + Math.floor((right - left) / 2)
4. If nums[mid] == target, return mid
5. If nums[mid] < target, recurse on right half: helper(mid + 1, right)
6. Else, recurse on left half: helper(left, mid - 1)

### Code:

```javascript
function binarySearch(nums, target) {
	return helper(nums, target, 0, nums.length - 1);
}

function helper(nums, target, left, right) {
	if (left > right) {
		return -1;
	}
	const mid = left + Math.floor((right - left) / 2);
	if (nums[mid] === target) {
		return mid;
	} else if (nums[mid] < target) {
		return helper(nums, target, mid + 1, right);
	} else {
		return helper(nums, target, left, mid - 1);
	}
}
```

### Time Complexity: O(log n)

- Same as iterative.

### Space Complexity: O(log n)

- Recursion stack depth is log n.

## Approach 3: Binary Search for First Occurrence (if duplicates allowed)

If the array can have duplicates, find the first index of target.

### Algorithm:

1. Use iterative approach.
2. When nums[mid] == target, don't return immediately.
3. Set right = mid - 1 to search left half for earlier occurrences.
4. Continue until left > right, then check if nums[left] == target.

### Code:

```javascript
function binarySearchFirst(nums, target) {
	let left = 0;
	let right = nums.length - 1;
	let result = -1;
	while (left <= right) {
		const mid = left + Math.floor((right - left) / 2);
		if (nums[mid] === target) {
			result = mid;
			right = mid - 1; // Search left for first occurrence
		} else if (nums[mid] < target) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}
	return result;
}
```

### Time Complexity: O(log n)

### Space Complexity: O(1)

## Approach 4: Binary Search for Last Occurrence

Find the last index of target in a sorted array with duplicates.

### Algorithm:

1. Similar to first occurrence, but when found, set left = mid + 1 to search right.

### Code:

```javascript
function binarySearchLast(nums, target) {
	let left = 0;
	let right = nums.length - 1;
	let result = -1;
	while (left <= right) {
		const mid = left + Math.floor((right - left) / 2);
		if (nums[mid] === target) {
			result = mid;
			left = mid + 1; // Search right for last occurrence
		} else if (nums[mid] < target) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}
	return result;
}
```

### Time Complexity: O(log n)

### Space Complexity: O(1)

## Summary

- **Iterative**: Most common, efficient, no recursion overhead.
- **Recursive**: Clean code, but uses stack space.
- **First/Last Occurrence**: Useful for arrays with duplicates.

Binary search is fundamental for searching in sorted data and forms the basis for many other algorithms.
