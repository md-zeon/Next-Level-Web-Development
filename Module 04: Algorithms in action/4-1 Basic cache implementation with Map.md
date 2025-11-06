# 4-1 Basic Cache Implementation with Map

## Introduction to Caching

Caching is a technique used to store frequently accessed data in a temporary storage area (cache) to improve performance by reducing the time needed to access the data. Instead of fetching data from a slower source (like a database or API) every time, we can retrieve it from the cache if it's available.

## Why Use Map for Cache Implementation?

JavaScript's `Map` is an ideal data structure for implementing a cache because:

- **Key-Value Storage**: Maps store data as key-value pairs, perfect for caching where we associate keys (like IDs or URLs) with values (the cached data).
- **Order Preservation**: Maps maintain insertion order, which can be useful for cache eviction policies like LRU (Least Recently Used).
- **Any Data Type as Keys**: Unlike objects, Maps can use any data type as keys (strings, numbers, objects, etc.).
- **Built-in Methods**: Provides efficient methods like `set()`, `get()`, `has()`, and `delete()`.
- **Performance**: Average O(1) time complexity for most operations.

## Basic Cache Implementation

Here's a simple cache implementation using JavaScript's Map:

```javascript
class BasicCache {
	constructor() {
		this.cache = new Map();
	}

	// Store a value in the cache
	set(key, value) {
		this.cache.set(key, value);
	}

	// Retrieve a value from the cache
	get(key) {
		return this.cache.get(key);
	}

	// Check if a key exists in the cache
	has(key) {
		return this.cache.has(key);
	}

	// Remove a specific key from the cache
	delete(key) {
		return this.cache.delete(key);
	}

	// Clear all entries from the cache
	clear() {
		this.cache.clear();
	}

	// Get the number of entries in the cache
	size() {
		return this.cache.size;
	}
}
```

## Usage Example

```javascript
const cache = new BasicCache();

// Store some data
cache.set("user:123", { name: "John Doe", age: 30 });
cache.set("product:456", { name: "Laptop", price: 999 });

// Retrieve data
console.log(cache.get("user:123")); // { name: 'John Doe', age: 30 }
console.log(cache.has("product:456")); // true
console.log(cache.has("nonexistent")); // false

// Remove data
cache.delete("user:123");
console.log(cache.has("user:123")); // false

console.log(cache.size()); // 1
```

## Time Complexity Analysis

- **set(key, value)**: O(1) - Constant time insertion
- **get(key)**: O(1) - Constant time lookup
- **has(key)**: O(1) - Constant time check
- **delete(key)**: O(1) - Constant time deletion
- **clear()**: O(n) - Linear time to clear all entries
- **size()**: O(1) - Constant time to get size

## Limitations of This Basic Implementation

This basic cache implementation lacks some important features found in production caches:

1. **No Expiration**: Cached items never expire automatically
2. **No Size Limits**: Cache can grow indefinitely, potentially causing memory issues
3. **No Eviction Policy**: No strategy for removing old items when cache is full
4. **No TTL (Time To Live)**: No way to set expiration times for individual items

These features would be important additions for a more robust cache implementation, but this basic version demonstrates the core concept using JavaScript's Map.
