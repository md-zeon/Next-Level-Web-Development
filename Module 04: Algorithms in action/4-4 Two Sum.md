# 4-4 Two Sum

## Problem Statement

Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

### Example 1:

```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

### Example 2:

```
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

### Example 3:

```
Input: nums = [3,3], target = 6
Output: [0,1]
```

### Constraints:

- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.

## Approach 1: Brute Force

The simplest way is to check every possible pair of numbers in the array.

### Algorithm:

1. Iterate through each element in the array.
2. For each element, iterate through the remaining elements.
3. Check if the sum of the current pair equals the target.
4. If yes, return their indices.

### Code:

```javascript
function twoSum(nums, target) {
	for (let i = 0; i < nums.length; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			if (nums[i] + nums[j] === target) {
				return [i, j];
			}
		}
	}
	return [];
}
```

### Time Complexity: O(n^2)

- We have two nested loops, each running up to n times.

### Space Complexity: O(1)

- We only use a constant amount of extra space.

## Approach 2: Hash Map (Optimal)

We can use a hash map to store the complement of each number (target - nums[i]) and its index.

### Algorithm:

1. Create a hash map to store numbers and their indices.
2. Iterate through the array.
3. For each number, calculate the complement (target - nums[i]).
4. Check if the complement exists in the hash map.
5. If yes, return the current index and the index from the map.
6. If not, store the current number and its index in the map.

### Code:

```javascript
function twoSum(nums, target) {
	const map = new Map();
	for (let i = 0; i < nums.length; i++) {
		const complement = target - nums[i];
		if (map.has(complement)) {
			return [map.get(complement), i];
		}
		map.set(nums[i], i);
	}
	return [];
}
```

### Time Complexity: O(n)

- We traverse the array once, and each map operation is O(1) on average.

### Space Complexity: O(n)

- We store up to n elements in the hash map.

## Approach 3: Two Pointers (If Array is Sorted)

If the array is sorted, we can use two pointers.

### Algorithm:

1. Sort the array (but this changes indices, so we need to keep track of original indices).
2. Use two pointers: left at start, right at end.
3. If sum > target, move right pointer left.
4. If sum < target, move left pointer right.
5. If sum == target, return indices (but need original indices).

Note: This approach requires sorting, which changes the problem since indices matter. For the standard Two Sum problem, this is not directly applicable without additional work to track original indices.

### Code (Modified for Sorted Array):

```javascript
function twoSum(nums, target) {
	// This assumes nums is sorted
	let left = 0;
	let right = nums.length - 1;
	while (left < right) {
		const sum = nums[left] + nums[right];
		if (sum === target) {
			return [left, right]; // Note: these are sorted indices, not original
		} else if (sum < target) {
			left++;
		} else {
			right--;
		}
	}
	return [];
}
```

### Time Complexity: O(n log n) due to sorting, then O(n) for two pointers.

### Space Complexity: O(1) if we sort in place.

For the exact problem with original indices, the hash map approach is preferred.

## Summary

- **Brute Force**: Simple but inefficient for large arrays.
- **Hash Map**: Efficient and optimal for the standard problem.
- **Two Pointers**: Useful if array is sorted and indices don't matter, but not ideal for this problem.

The hash map approach is the most commonly used and efficient solution.
