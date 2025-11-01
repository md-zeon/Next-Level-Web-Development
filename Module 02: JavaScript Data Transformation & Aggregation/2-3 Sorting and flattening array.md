# 2-3: Sorting and Flattening Arrays

## Introduction

This lesson covers advanced array manipulation techniques in JavaScript, focusing on sophisticated sorting methods and array flattening operations. These techniques are essential for handling complex data structures and performing advanced data transformations.

## Sample Data

Throughout this lesson, we'll work with these datasets:

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const unsortedNumbers = [42, 17, 89, 23, 56, 12, 78, 34, 91, 5];

const products = [
	{ id: 1, name: "Laptop", price: 1200, category: "Electronics", rating: 4.5 },
	{ id: 2, name: "Book", price: 20, category: "Education", rating: 4.8 },
	{
		id: 3,
		name: "Headphones",
		price: 150,
		category: "Electronics",
		rating: 4.2,
	},
	{ id: 4, name: "Coffee Mug", price: 15, category: "Kitchen", rating: 4.0 },
	{ id: 5, name: "Mouse", price: 25, category: "Electronics", rating: 3.9 },
];

const employees = [
	{ name: "Alice", department: "Engineering", salary: 75000, experience: 5 },
	{ name: "Bob", department: "Marketing", salary: 65000, experience: 3 },
	{ name: "Charlie", department: "Engineering", salary: 80000, experience: 7 },
	{ name: "Diana", department: "HR", salary: 55000, experience: 4 },
	{ name: "Eve", department: "Engineering", salary: 72000, experience: 6 },
];

const nestedArray = [1, 2, [3, 4], [5, [6, 7]], 8];
const deeplyNested = [1, [2, [3, [4, [5]]]]];
const matrix = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];
```

## 1. Advanced Sorting Techniques

### Basic Number Sorting

```javascript
// Ascending order
const ascending = [...unsortedNumbers].sort((a, b) => a - b);
console.log(ascending); // [5, 12, 17, 23, 34, 42, 56, 78, 89, 91]

// Descending order
const descending = [...unsortedNumbers].sort((a, b) => b - a);
console.log(descending); // [91, 89, 78, 56, 42, 34, 23, 17, 12, 5]
```

**Important**: Always spread (`...`) arrays before sorting to avoid mutating the original array.

### String Sorting

```javascript
const fruits = ["banana", "Apple", "cherry", "Date"];

// Case-insensitive alphabetical sort
const caseInsensitive = [...fruits].sort((a, b) =>
	a.toLowerCase().localeCompare(b.toLowerCase()),
);
console.log(caseInsensitive); // ['Apple', 'banana', 'cherry', 'Date']

// Sort by string length
const byLength = [...fruits].sort((a, b) => a.length - b.length);
console.log(byLength); // ['Date', 'Apple', 'banana', 'cherry']
```

### Sorting Objects by Multiple Criteria

```javascript
// Sort by department, then by salary within department
const byDeptThenSalary = [...employees].sort((a, b) => {
	if (a.department !== b.department) {
		return a.department.localeCompare(b.department);
	}
	return b.salary - a.salary; // Higher salary first within same department
});

console.log("Employees by department then salary:");
byDeptThenSalary.forEach((emp) =>
	console.log(`  ${emp.name} (${emp.department}): $${emp.salary}`),
);
// Output:
//   Alice (Engineering): $75000
//   Charlie (Engineering): $80000
//   Eve (Engineering): $72000
//   Bob (Marketing): $65000
//   Diana (HR): $55000
```

### Custom Sorting Functions

#### Sort by Absolute Value

```javascript
const mixedNumbers = [-5, 3, -8, 1, -2, 7];
const byAbsoluteValue = [...mixedNumbers].sort(
	(a, b) => Math.abs(a) - Math.abs(b),
);
console.log(byAbsoluteValue); // [1, -2, 3, -5, 7, -8]
```

#### Sort by Distance from Target

```javascript
const target = 50;
const byDistanceFromTarget = [...unsortedNumbers].sort((a, b) => {
	const distA = Math.abs(a - target);
	const distB = Math.abs(b - target);
	return distA - distB;
});
console.log(`Numbers closest to ${target}:`, byDistanceFromTarget);
// [42, 56, 34, 23, 17, 12, 5, 78, 89, 91]
```

### Stable Sort

A stable sort maintains the relative order of equal elements. JavaScript's `sort()` is stable in modern engines.

```javascript
const people = [
	{ name: "Alice", age: 25, priority: 2 },
	{ name: "Bob", age: 30, priority: 1 },
	{ name: "Charlie", age: 25, priority: 3 },
	{ name: "Diana", age: 30, priority: 2 },
];

// Sort by age first, then by priority (stable)
const stableSort = [...people].sort((a, b) => {
	if (a.age !== b.age) {
		return a.age - b.age;
	}
	return a.priority - b.priority;
});

console.log("Stable sort (age then priority):");
stableSort.forEach((person) =>
	console.log(
		`  ${person.name}: age ${person.age}, priority ${person.priority}`,
	),
);
// Alice (25, pri:2) comes before Charlie (25, pri:3)
// Bob (30, pri:1) comes before Diana (30, pri:2)
```

## 2. Array Flattening Methods

### The `flat()` Method

The `flat()` method creates a new array with all sub-array elements concatenated recursively up to the specified depth.

```javascript
// Syntax: array.flat(depth)
```

#### Basic Usage

```javascript
const nestedArray = [1, 2, [3, 4], [5, [6, 7]], 8];

console.log("Original:", nestedArray);
// [1, 2, [3, 4], [5, [6, 7]], 8]

console.log("Flat (depth 1):", nestedArray.flat());
// [1, 2, 3, 4, 5, [6, 7], 8]

console.log("Flat (depth 2):", nestedArray.flat(2));
// [1, 2, 3, 4, 5, 6, 7, 8]

console.log("Flat (Infinity):", nestedArray.flat(Infinity));
// [1, 2, 3, 4, 5, 6, 7, 8]
```

#### Deep Nesting

```javascript
const deeplyNested = [1, [2, [3, [4, [5]]]]];

console.log("Deeply nested:", deeplyNested);
console.log("Flat (depth 1):", deeplyNested.flat()); // [1, 2, [3, [4, [5]]]]
console.log("Flat (depth 2):", deeplyNested.flat(2)); // [1, 2, 3, [4, [5]]]
console.log("Flat (depth 3):", deeplyNested.flat(3)); // [1, 2, 3, 4, [5]]
console.log("Flat (Infinity):", deeplyNested.flat(Infinity)); // [1, 2, 3, 4, 5]
```

### The `flatMap()` Method

The `flatMap()` method first maps each element using a mapping function, then flattens the result into a new array. It's equivalent to `map()` followed by `flat()` with depth 1.

```javascript
// Syntax: array.flatMap(callbackFunction(currentValue, index, array), thisArg)
```

#### Basic Usage

```javascript
const numbers = [1, 2, 3, 4, 5];

// Traditional approach: map then flat
const traditional = numbers.map((x) => [x, x * 2]);
console.log("Map to arrays:", traditional);
// [[1, 2], [2, 4], [3, 6], [4, 8], [5, 10]]

// Using flatMap
const flattened = numbers.flatMap((x) => [x, x * 2]);
console.log("FlatMap result:", flattened);
// [1, 2, 2, 4, 3, 6, 4, 8, 5, 10]
```

#### Practical Examples

**Split sentences into words:**

```javascript
const sentences = ["Hello world", "How are you", "JavaScript is fun"];

const wordsTraditional = sentences.map((sentence) => sentence.split(" "));
console.log(wordsTraditional);
// [['Hello', 'world'], ['How', 'are', 'you'], ['JavaScript', 'is', 'fun']]

const wordsFlatMap = sentences.flatMap((sentence) => sentence.split(" "));
console.log(wordsFlatMap);
// ['Hello', 'world', 'How', 'are', 'you', 'JavaScript', 'is', 'fun']
```

**Create coordinate pairs:**

```javascript
const xCoords = [1, 2, 3];
const yCoords = [4, 5, 6];

const coordinates = xCoords.flatMap((x) => yCoords.map((y) => [x, y]));
console.log(coordinates);
// [[1, 4], [1, 5], [1, 6], [2, 4], [2, 5], [2, 6], [3, 4], [3, 5], [3, 6]]
```

### Matrix Operations

```javascript
const matrix = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];

// Transpose matrix
const transposed = matrix[0].map((_, colIndex) =>
	matrix.map((row) => row[colIndex]),
);
console.log("Transposed:", transposed);
// [[1, 4, 7], [2, 5, 8], [3, 6, 9]]

// Flatten entire matrix
const flattenedMatrix = matrix.flat();
console.log("Flattened:", flattenedMatrix);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Get diagonal elements
const diagonal = matrix.map((row, index) => row[index]);
console.log("Diagonal:", diagonal);
// [1, 5, 9]
```

## 3. Combining Sorting and Flattening

### Sort Nested Arrays Then Flatten

```javascript
const nestedNumbers = [
	[3, 1, 4],
	[1, 5, 9],
	[2, 6, 5],
];

// Sort each subarray, then flatten
const sortedThenFlattened = nestedNumbers
	.map((arr) => [...arr].sort((a, b) => a - b))
	.flat();

console.log(sortedThenFlattened); // [1, 3, 4, 1, 5, 9, 2, 5, 6]

// Flatten first, then sort
const flattenedThenSorted = nestedNumbers.flat().sort((a, b) => a - b);

console.log(flattenedThenSorted); // [1, 1, 2, 3, 4, 5, 5, 6, 9]
```

### Complex Data Processing

```javascript
const departmentData = [
	{
		department: "Engineering",
		employees: [
			{ name: "Alice", salary: 75000 },
			{ name: "Charlie", salary: 80000 },
			{ name: "Eve", salary: 72000 },
		],
	},
	{
		department: "Marketing",
		employees: [
			{ name: "Bob", salary: 65000 },
			{ name: "Diana", salary: 55000 },
		],
	},
];

// Get all employees sorted by salary across departments
const allEmployeesBySalary = departmentData
	.flatMap((dept) => dept.employees)
	.sort((a, b) => b.salary - a.salary);

console.log("All employees by salary (desc):");
allEmployeesBySalary.forEach((emp) =>
	console.log(`  ${emp.name}: $${emp.salary}`),
);

// Get top 3 highest paid employees
const topEarners = departmentData
	.flatMap((dept) => dept.employees)
	.sort((a, b) => b.salary - a.salary)
	.slice(0, 3);
```

## 4. Practical Examples

### Multi-Criteria Sorting Function

```javascript
const sortProducts = (products, criteria) => {
	return [...products].sort((a, b) => {
		for (const criterion of criteria) {
			const { field, direction = "asc" } = criterion;
			let aVal = a[field];
			let bVal = b[field];

			// Handle string comparison
			if (typeof aVal === "string") {
				const comparison = aVal.localeCompare(bVal);
				if (comparison !== 0) {
					return direction === "desc" ? -comparison : comparison;
				}
			} else {
				// Numeric comparison
				if (aVal !== bVal) {
					return direction === "desc" ? bVal - aVal : aVal - bVal;
				}
			}
		}
		return 0;
	});
};

// Usage
const sortedProducts = sortProducts(products, [
	{ field: "category", direction: "asc" },
	{ field: "rating", direction: "desc" },
]);
```

### Data Aggregation with Flattening

```javascript
const salesByQuarter = [
	[12000, 15000, 18000], // Q1 months
	[14000, 16000, 19000], // Q2 months
	[13000, 17000, 20000], // Q3 months
];

// Calculate total sales across all quarters
const totalSales = salesByQuarter.flat().reduce((sum, sale) => sum + sale, 0);
console.log("Total sales:", totalSales); // 135000

// Find best performing month in each quarter
const bestMonths = salesByQuarter.map((quarter) => Math.max(...quarter));
console.log("Best month in each quarter:", bestMonths); // [18000, 19000, 20000]

// Sort all monthly sales
const allMonthlySales = salesByQuarter.flat().sort((a, b) => b - a);
console.log("All monthly sales (sorted desc):", allMonthlySales);
```

### Tree Structure Flattening

```javascript
const fileSystem = [
	{
		name: "Documents",
		type: "folder",
		children: [
			{ name: "resume.pdf", type: "file", size: 245760 },
			{
				name: "Projects",
				type: "folder",
				children: [
					{ name: "project1.js", type: "file", size: 1536 },
					{ name: "project2.js", type: "file", size: 2048 },
				],
			},
		],
	},
	{
		name: "Pictures",
		type: "folder",
		children: [
			{ name: "vacation.jpg", type: "file", size: 1048576 },
			{ name: "family.png", type: "file", size: 524288 },
		],
	},
];

// Flatten file system to get all files
function flattenFileSystem(items, path = "") {
	return items.flatMap((item) => {
		const currentPath = path ? `${path}/${item.name}` : item.name;
		if (item.type === "file") {
			return [{ ...item, path: currentPath }];
		} else {
			return [
				{ ...item, path: currentPath },
				...flattenFileSystem(item.children || [], currentPath),
			];
		}
	});
}

const allFiles = flattenFileSystem(fileSystem).filter(
	(item) => item.type === "file",
);
console.log("All files:");
allFiles.forEach((file) => console.log(`  ${file.path} (${file.size} bytes)`));

// Sort files by size
const filesBySize = [...allFiles].sort((a, b) => b.size - a.size);
console.log("Files by size (largest first):");
filesBySize.forEach((file) =>
	console.log(`  ${file.name}: ${file.size} bytes`),
);
```

## 5. Performance Considerations

### Sorting Performance

```javascript
// Large array sorting
const largeArray = Array.from({ length: 10000 }, (_, i) =>
	Math.floor(Math.random() * 10000),
);
console.time("Sorting 10,000 elements");
const sortedLargeArray = [...largeArray].sort((a, b) => a - b);
console.timeEnd("Sorting 10,000 elements");
// Output: Sorting 10,000 elements: ~2-5ms (depending on system)
```

### Flattening Performance

```javascript
// Deep flattening performance
const veryDeepArray = Array.from({ length: 100 }, () =>
	Array.from({ length: 10 }, () =>
		Array.from({ length: 10 }, () => Math.random()),
	),
);

console.time("Deep flattening (100x10x10)");
const flattenedDeep = veryDeepArray.flat(2);
console.timeEnd("Deep flattening (100x10x10)");
// Output: Deep flattening (100x10x10): ~5-15ms (depending on system)
```

### Memory Usage Notes

- **`sort()`**: Modifies original array (memory efficient)
- **`flat()`**: Creates new arrays (memory intensive for deep nesting)
- **`flatMap()`**: Combines map and flat operations efficiently
- **Deep structures**: Use `Infinity` depth carefully with very deep structures

## Method Comparison

| Method      | Purpose                   | Returns New Array | Mutates Original | Performance   |
| ----------- | ------------------------- | ----------------- | ---------------- | ------------- |
| `sort()`    | Arrange elements in order | ❌ (same array)   | ✅               | O(n log n)    |
| `flat()`    | Flatten nested arrays     | ✅                | ❌               | O(n) to O(n²) |
| `flatMap()` | Map then flatten          | ✅                | ❌               | O(n)          |

## Common Patterns

### 1. Multi-level Sorting

```javascript
const sorted = data.sort((a, b) => {
	// Primary sort
	if (a.primary !== b.primary) {
		return a.primary - b.primary;
	}
	// Secondary sort
	if (a.secondary !== b.secondary) {
		return a.secondary.localeCompare(b.secondary);
	}
	// Tertiary sort
	return a.tertiary - b.tertiary;
});
```

### 2. Conditional Sorting

```javascript
const sorted = data.sort((a, b) => {
	const aVal = condition ? a.field1 : a.field2;
	const bVal = condition ? b.field1 : b.field2;
	return aVal - bVal;
});
```

### 3. Custom Distance Sorting

```javascript
const sortedByDistance = points.sort((a, b) => {
	const distA = Math.sqrt(a.x * a.x + a.y * a.y);
	const distB = Math.sqrt(b.x * b.x + b.y * b.y);
	return distA - distB;
});
```

### 4. Recursive Flattening

```javascript
function deepFlatten(arr) {
	return arr.flatMap((item) =>
		Array.isArray(item) ? deepFlatten(item) : item,
	);
}
```

## Summary

Advanced sorting and array flattening are powerful techniques for complex data manipulation:

### Key Sorting Concepts:

- **Compare functions**: Return negative (a before b), zero (equal), positive (a after b)
- **Multi-criteria sorting**: Sort by primary field, then secondary, etc.
- **Stable sorting**: Maintains relative order of equal elements
- **Custom sorting**: Distance, absolute value, case-insensitive, etc.

### Key Flattening Concepts:

- **`flat(depth)`**: Flatten to specified depth (default 1, Infinity for all)
- **`flatMap()`**: Map then flatten in one operation
- **Performance**: Consider memory usage with deep nesting
- **Matrix operations**: Transpose, diagonal extraction, etc.

### Best Practices:

- Always spread arrays before sorting to avoid mutation
- Use appropriate depth for `flat()` to avoid unnecessary work
- Consider performance implications for large datasets
- Combine sorting and flattening for complex data transformations
- Use stable sorting when order of equal elements matters

These techniques form the foundation for advanced data processing and transformation in JavaScript applications.
