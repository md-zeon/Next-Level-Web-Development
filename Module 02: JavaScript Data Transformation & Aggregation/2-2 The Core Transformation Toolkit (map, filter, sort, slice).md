# 2-2: The Core Transformation Toolkit (map, filter, sort, slice)

## Introduction

JavaScript arrays come with powerful built-in methods for data transformation and manipulation. The core four methods - `map()`, `filter()`, `sort()`, and `slice()` - form the foundation of functional programming in JavaScript. These methods allow you to transform, filter, sort, and extract data from arrays without mutating the original array (except for `sort()`).

## Sample Data

Throughout this lesson, we'll work with these sample datasets:

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const products = [
	{ id: 1, name: "Laptop", price: 1200, category: "Electronics" },
	{ id: 2, name: "Book", price: 20, category: "Education" },
	{ id: 3, name: "Headphones", price: 150, category: "Electronics" },
	{ id: 4, name: "Coffee Mug", price: 15, category: "Kitchen" },
	{ id: 5, name: "Mouse", price: 25, category: "Electronics" },
];

const students = [
	{ name: "Alice", score: 85, grade: "A" },
	{ name: "Bob", score: 92, grade: "A" },
	{ name: "Charlie", score: 78, grade: "B" },
	{ name: "Diana", score: 95, grade: "A" },
	{ name: "Eve", score: 88, grade: "B" },
];
```

## 1. The `map()` Method

The `map()` method creates a new array by calling a function on every element of the original array. It transforms each element and returns a new array of the same length.

### Syntax

```javascript
array.map(callbackFunction(currentValue, index, array), thisArg);
```

### Parameters

- `callbackFunction`: Function called for each element
- `currentValue`: Current element being processed
- `index` (optional): Index of current element
- `array` (optional): Array being traversed
- `thisArg` (optional): Value to use as `this` in callback

### Examples

#### Basic Transformation

```javascript
// Double each number
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// Extract product names
const productNames = products.map((product) => product.name);
console.log(productNames); // ['Laptop', 'Book', 'Headphones', 'Coffee Mug', 'Mouse']
```

#### Object Transformation

```javascript
// Create price labels
const priceLabels = products.map(
	(product) => `${product.name}: $${product.price}`,
);
console.log(priceLabels);
// ['Laptop: $1200', 'Book: $20', 'Headphones: $150', 'Coffee Mug: $15', 'Mouse: $25']

// Transform student objects to include percentage
const studentsWithPercentage = students.map((student) => ({
	...student,
	percentage: `${student.score}%`,
}));
console.log(studentsWithPercentage);
// [{name: 'Alice', score: 85, grade: 'A', percentage: '85%'}, ...]
```

### Key Points

- **Returns**: New array with transformed elements
- **Length**: Same as original array
- **Mutation**: Does not mutate original array
- **Use case**: Transform each element in some way

## 2. The `filter()` Method

The `filter()` method creates a new array with all elements that pass a test implemented by the provided function.

### Syntax

```javascript
array.filter(callbackFunction(currentValue, index, array), thisArg);
```

### Parameters

- `callbackFunction`: Function that tests each element
- `currentValue`: Current element being processed
- `index` (optional): Index of current element
- `array` (optional): Array being filtered
- `thisArg` (optional): Value to use as `this` in callback

### Examples

#### Basic Filtering

```javascript
// Get even numbers
const evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log(evenNumbers); // [2, 4, 6, 8, 10]

// Get numbers greater than 5
const greaterThanFive = numbers.filter((num) => num > 5);
console.log(greaterThanFive); // [6, 7, 8, 9, 10]
```

#### Object Filtering

```javascript
// Get expensive products (> $100)
const expensiveProducts = products.filter((product) => product.price > 100);
console.log(expensiveProducts);
// [{id: 1, name: 'Laptop', price: 1200, ...}, {id: 3, name: 'Headphones', price: 150, ...}]

// Get electronics only
const electronics = products.filter(
	(product) => product.category === "Electronics",
);
console.log(electronics);
// [Laptop, Headphones, Mouse]

// Get students with A grade
const aGradeStudents = students.filter((student) => student.grade === "A");
console.log(aGradeStudents);
// [Alice, Bob, Diana]
```

### Key Points

- **Returns**: New array with elements that pass the test
- **Length**: Can be shorter than original array
- **Mutation**: Does not mutate original array
- **Use case**: Select elements that meet certain criteria

## 3. The `sort()` Method

The `sort()` method sorts the elements of an array in place and returns the sorted array. By default, it sorts elements as strings.

### Syntax

```javascript
array.sort(compareFunction);
```

### Parameters

- `compareFunction` (optional): Function that defines sort order

### Compare Function

The compare function should return:

- Negative value: `a` comes before `b`
- Zero: `a` and `b` are equal (order unchanged)
- Positive value: `a` comes after `b`

### Examples

#### Number Sorting

```javascript
// Sort numbers ascending
const sortedNumbersAsc = [...numbers].sort((a, b) => a - b);
console.log(sortedNumbersAsc); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Sort numbers descending
const sortedNumbersDesc = [...numbers].sort((a, b) => b - a);
console.log(sortedNumbersDesc); // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

#### Object Sorting

```javascript
// Sort products by price (ascending)
const productsByPrice = [...products].sort((a, b) => a.price - b.price);
console.log(productsByPrice.map((p) => `${p.name}: $${p.price}`));
// ['Coffee Mug: $15', 'Book: $20', 'Mouse: $25', 'Headphones: $150', 'Laptop: $1200']

// Sort products by price (descending)
const productsByPriceDesc = [...products].sort((a, b) => b.price - a.price);
console.log(productsByPriceDesc.map((p) => `${p.name}: $${p.price}`));
// ['Laptop: $1200', 'Headphones: $150', 'Mouse: $25', 'Book: $20', 'Coffee Mug: $15']

// Sort students by score (descending)
const studentsByScore = [...students].sort((a, b) => b.score - a.score);
console.log(studentsByScore.map((s) => `${s.name}: ${s.score}`));
// ['Diana: 95', 'Bob: 92', 'Eve: 88', 'Alice: 85', 'Charlie: 78']
```

#### String Sorting

```javascript
const fruits = ["banana", "Apple", "cherry", "Date"];

// Case-sensitive sort (default behavior)
const defaultSort = [...fruits].sort();
console.log(defaultSort); // ['Apple', 'Date', 'banana', 'cherry']

// Case-insensitive alphabetical sort
const sortedFruits = [...fruits].sort((a, b) =>
	a.toLowerCase().localeCompare(b.toLowerCase()),
);
console.log(sortedFruits); // ['Apple', 'banana', 'cherry', 'Date']
```

### Key Points

- **Returns**: The same array, sorted
- **Mutation**: Mutates the original array
- **Default behavior**: Converts elements to strings and sorts lexicographically
- **Use case**: Arrange elements in specific order

## 4. The `slice()` Method

The `slice()` method returns a shallow copy of a portion of an array into a new array object.

### Syntax

```javascript
array.slice(start, end);
```

### Parameters

- `start` (optional): Zero-based index to start extraction
- `end` (optional): Zero-based index to end extraction (not included)

### Examples

#### Basic Slicing

```javascript
// Get first 3 numbers
const firstThree = numbers.slice(0, 3);
console.log(firstThree); // [1, 2, 3]

// Get last 3 numbers
const lastThree = numbers.slice(-3);
console.log(lastThree); // [8, 9, 10]

// Get middle elements (index 2 to 7)
const middle = numbers.slice(2, 8);
console.log(middle); // [3, 4, 5, 6, 7, 8]

// Get all elements from index 5 onwards
const fromFifth = numbers.slice(5);
console.log(fromFifth); // [6, 7, 8, 9, 10]
```

#### Creating Copies

```javascript
// Shallow copy of entire array
const numbersCopy = numbers.slice();
console.log(numbersCopy); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Copy with spread operator (alternative)
const numbersCopy2 = [...numbers];
console.log(numbersCopy2); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

### Key Points

- **Returns**: New array with extracted elements
- **Mutation**: Does not mutate original array
- **Negative indices**: Count from end of array
- **Use case**: Extract portions of arrays

## Method Chaining

One of the most powerful features of these methods is that they can be chained together to create data processing pipelines.

### Examples

#### Complex Data Processing

```javascript
// Get expensive electronics, sort by price descending, format names
const expensiveElectronics = products
	.filter(
		(product) => product.category === "Electronics" && product.price > 100,
	)
	.sort((a, b) => b.price - a.price)
	.map((product) => `${product.name} ($${product.price})`);

console.log(expensiveElectronics);
// ['Laptop ($1200)', 'Headphones ($150)']

// Get students with score > 80, sort by score desc, get top 3 names
const topStudents = students
	.filter((student) => student.score > 80)
	.sort((a, b) => b.score - a.score)
	.slice(0, 3)
	.map((student) => student.name);

console.log(topStudents); // ['Diana', 'Bob', 'Eve']

// Transform numbers: filter even, double them, sort descending
const transformedNumbers = numbers
	.filter((num) => num % 2 === 0)
	.map((num) => num * 2)
	.sort((a, b) => b - a);

console.log(transformedNumbers); // [20, 16, 12, 8, 4]
```

## Practical Examples

### Data Processing Pipeline

```javascript
const salesData = [
	{ product: "Widget A", sales: 150, region: "North" },
	{ product: "Widget B", sales: 200, region: "South" },
	{ product: "Widget A", sales: 120, region: "East" },
	{ product: "Widget C", sales: 80, region: "West" },
	{ product: "Widget B", sales: 180, region: "North" },
];

// Process high-performing sales data
const salesByRegion = salesData
	.filter((item) => item.sales > 100) // Only high-performing sales
	.map((item) => ({ region: item.region, sales: item.sales }))
	.sort((a, b) => b.sales - a.sales);

console.log(salesByRegion);
```

### E-commerce Product Processing

```javascript
// Format product list with discounts
const productsWithDiscount = products
	.filter((product) => product.price > 50)
	.map((product) => ({
		...product,
		discountPrice: product.price * 0.9,
		savings: product.price * 0.1,
	}))
	.sort((a, b) => b.savings - a.savings);

console.log(
	productsWithDiscount.map(
		(p) =>
			`${p.name}: $${p.discountPrice.toFixed(2)} (save $${p.savings.toFixed(
				2,
			)})`,
	),
);
// ['Laptop: $1080.00 (save $120.00)', 'Headphones: $135.00 (save $15.00)']
```

## Performance Considerations

### Memory Usage

- `map()`, `filter()`, and `slice()` create new arrays
- `sort()` modifies the original array
- For large datasets, consider memory implications

### Multiple Iterations

```javascript
// Inefficient: Multiple iterations
const result1 = largeArray.filter((x) => x > 50000).map((x) => x * 2);

// Better: Single iteration with reduce
const result2 = largeArray.reduce((acc, num) => {
	if (num > 50000) {
		acc.push(num * 2);
	}
	return acc;
}, []);
```

### When to Use Each Method

| Method     | Use Case                          | Returns New Array | Mutates Original |
| ---------- | --------------------------------- | ----------------- | ---------------- |
| `map()`    | Transform each element            | ✅                | ❌               |
| `filter()` | Select elements matching criteria | ✅                | ❌               |
| `sort()`   | Arrange elements in order         | ❌ (same array)   | ✅               |
| `slice()`  | Extract portion of array          | ✅                | ❌               |

## Common Patterns

### 1. Data Validation and Cleaning

```javascript
const cleanData = rawData
	.filter((item) => item !== null && item !== undefined)
	.map((item) => item.trim())
	.filter((item) => item.length > 0);
```

### 2. Search and Transform

```javascript
const searchResults = products
	.filter((product) => product.name.toLowerCase().includes(searchTerm))
	.map((product) => ({
		id: product.id,
		displayName: product.name.toUpperCase(),
		price: product.price,
	}));
```

### 3. Statistical Operations

```javascript
const scores = students.map((student) => student.score);
const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
const highest = Math.max(...scores);
const lowest = Math.min(...scores);
```

## Summary

The core transformation toolkit provides powerful, declarative ways to work with arrays:

- **`map()`**: Transform each element
- **`filter()`**: Select elements based on conditions
- **`sort()`**: Arrange elements in specific order
- **`slice()`**: Extract portions of arrays

These methods can be chained together to create complex data processing pipelines. Understanding when to use each method and how to combine them effectively is crucial for writing clean, maintainable JavaScript code.

Remember:

- Use `map()` when you want to transform each element
- Use `filter()` when you want to select specific elements
- Use `sort()` when you need to arrange elements in order
- Use `slice()` when you need to extract a portion of the array
- Chain methods to create powerful data processing workflows
