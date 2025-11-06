# 4-2 Mutual Friends Counter with Set

## Introduction to Mutual Friends Problem

The mutual friends problem involves finding users who are common between two different friend lists or user collections. This is a common scenario in social networks where you want to find friends that two people have in common, or find overlapping users between different groups.

Given two arrays of user objects, we need to efficiently count how many users appear in both lists. Each user has a unique ID that we can use for comparison.

## Why Use Set for Mutual Friends Counter?

JavaScript's `Set` is the ideal data structure for this problem because:

- **Fast Lookup**: Sets provide O(1) average time complexity for lookup operations using the `has()` method
- **Unique Values**: Sets automatically handle uniqueness, eliminating the need for manual deduplication
- **Memory Efficient**: Stores only the keys (user IDs) without the full user objects during the lookup phase
- **Simple API**: Easy to construct from an array using the `Set` constructor or `add()` method
- **No Index Management**: Unlike arrays, Sets don't require index management for fast lookups

## Problem Setup

Consider two arrays of user objects where each user has a unique ID:

```javascript
const usersA = [
	{ id: "user_1", name: "Alice", email: "alice@example.com" },
	{ id: "user_2", name: "Bob", email: "bob@example.com" },
	{ id: "user_3", name: "Charlie", email: "charlie@example.com" },
];

const usersB = [
	{ id: "user_2", name: "Bob", email: "bob@example.com" },
	{ id: "user_3", name: "Charlie", email: "charlie@example.com" },
	{ id: "user_4", name: "David", email: "david@example.com" },
];

// Expected result: 2 mutual friends (Bob and Charlie)
```

## Naive Approach (O(n²) Time Complexity)

The straightforward approach uses nested loops to compare each user from the first list with every user from the second list:

```javascript
const findMutualFriendsSlow = (usersA, usersB) => {
	const mutualFriends = [];

	usersA.forEach((userA) => {
		usersB.forEach((userB) => {
			if (userA.id === userB.id) {
				mutualFriends.push(userA);
				return; // Exit inner loop once match found
			}
		});
	});

	return mutualFriends.length;
};
```

This approach has O(n²) time complexity because for each of the n users in list A, we potentially check all m users in list B.

## Optimized Approach Using Set (O(n) Time Complexity)

Using a Set for fast lookups reduces the time complexity to O(n):

```javascript
const findMutualFriendsFast = (usersA, usersB) => {
	const mutualFriends = [];

	// Step 1: Create a Set of user IDs from the first list - O(n) time
	const userIdsA = new Set(usersA.map((user) => user.id));

	// Step 2: Iterate through second list and check for matches - O(m) time
	usersB.forEach((userB) => {
		if (userIdsA.has(userB.id)) {
			mutualFriends.push(userB);
		}
	});

	return mutualFriends.length;
};
```

## Complete Implementation with Performance Comparison

```javascript
const findMutualFriends = (usersA, usersB) => {
	const startTime = performance.now();
	const mutualFriends = [];

	// Create Set from first list's IDs
	const userIdsA = new Set(usersA.map((user) => user.id));

	// Find matches in second list
	usersB.forEach((userB) => {
		if (userIdsA.has(userB.id)) {
			mutualFriends.push(userB);
		}
	});

	const endTime = performance.now();
	const executionTime = endTime - startTime;

	return {
		count: mutualFriends.length,
		mutualFriends: mutualFriends,
		executionTime: executionTime,
	};
};

// Usage example
const result = findMutualFriends(usersA, usersB);
console.log(
	`Found ${result.count} mutual friends in ${result.executionTime} ms`,
);
```

## Time Complexity Analysis

### Naive Approach:

- **Time Complexity**: O(n × m) where n and m are the lengths of the two arrays
- **Space Complexity**: O(min(n, m)) for storing the result array
- **Performance**: Quadratic time - becomes very slow with large datasets

### Set-Based Approach:

- **Time Complexity**: O(n + m) - linear time
- **Space Complexity**: O(n) for the Set storage
- **Performance**: Linear time - scales well with large datasets

## Real-World Performance Impact

For large social networks:

- With 10,000 users in each list:
  - Naive approach: ~100,000,000 operations
  - Set approach: ~20,000 operations
- With 100,000 users in each list:
  - Naive approach: ~10,000,000,000 operations (potentially hours)
  - Set approach: ~200,000 operations (milliseconds)

## Alternative Set Operations

The Set data structure also provides other useful operations for friend analysis:

```javascript
// Find users only in list A (not in B)
const onlyInA = usersA.filter((user) => !userIdsB.has(user.id));

// Find users only in list B (not in A)
const onlyInB = usersB.filter((user) => !userIdsA.has(user.id));

// Find all unique users from both lists
const allUniqueUsers = new Set([
	...usersA.map((u) => u.id),
	...usersB.map((u) => u.id),
]);
```

## Best Practices

1. **Choose the Smaller Set for Lookup**: If one list is significantly smaller, use it to create the Set
2. **Consider Memory Constraints**: For extremely large datasets, consider streaming or chunked processing
3. **Handle Edge Cases**: Check for empty arrays, null/undefined values, and invalid user objects
4. **Use Appropriate Data Types**: Ensure user IDs are hashable (strings, numbers) for Set compatibility

## Limitations

- **Memory Usage**: Requires additional memory for the Set (O(n) space)
- **Not Suitable for Small Datasets**: For very small lists (< 10 items), the overhead of creating a Set may not be worth the performance gain
- **Single Key Lookup**: Sets only work well when you have a single unique identifier to match on

This Set-based approach is fundamental to many algorithms in social network analysis, recommendation systems, and data deduplication tasks.
