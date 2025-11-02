# 2-5: From Simple Totals to Powerful Aggregation (reduce)

## Introduction

The `reduce()` method is one of the most powerful and versatile array methods in JavaScript. It allows you to transform an array into a single value, object, or even a new array through iterative accumulation. Unlike `map()` and `filter()` which return arrays of the same or smaller size, `reduce()` can return any type of value, making it incredibly flexible for data aggregation, transformation, and analysis.

## Syntax

```javascript
array.reduce(
	callback(accumulator, currentValue, currentIndex, array),
	initialValue,
);
```

### Parameters

- **callback**: Function executed on each element
  - **accumulator**: Accumulated value from previous iterations
  - **currentValue**: Current element being processed
  - **currentIndex** (optional): Index of current element
  - **array** (optional): Array being traversed
- **initialValue** (optional): Initial value for the accumulator

## Sample Data

Throughout this lesson, we'll work with these datasets:

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const prices = [29.99, 15.5, 89.99, 45.0, 12.99, 67.5];

const products = [
	{ id: 1, name: "Laptop", price: 1200, category: "Electronics", stock: 15 },
	{ id: 2, name: "Book", price: 20, category: "Education", stock: 50 },
	{ id: 3, name: "Headphones", price: 150, category: "Electronics", stock: 25 },
	{ id: 4, name: "Coffee Mug", price: 15, category: "Kitchen", stock: 100 },
	{ id: 5, name: "Mouse", price: 25, category: "Electronics", stock: 30 },
	{ id: 6, name: "Notebook", price: 8, category: "Education", stock: 75 },
];

const employees = [
	{ name: "Alice", department: "Engineering", salary: 75000, experience: 5 },
	{ name: "Bob", department: "Marketing", salary: 65000, experience: 3 },
	{ name: "Charlie", department: "Engineering", salary: 80000, experience: 7 },
	{ name: "Diana", department: "HR", salary: 55000, experience: 4 },
	{ name: "Eve", department: "Engineering", salary: 72000, experience: 6 },
	{ name: "Frank", department: "Marketing", salary: 58000, experience: 2 },
];

const sales = [
	{ product: "Laptop", amount: 1200, date: "2024-01-15", region: "North" },
	{ product: "Mouse", amount: 25, date: "2024-01-16", region: "South" },
	{ product: "Headphones", amount: 150, date: "2024-01-16", region: "North" },
	{ product: "Laptop", amount: 1200, date: "2024-01-17", region: "East" },
	{ product: "Book", amount: 20, date: "2024-01-18", region: "West" },
	{ product: "Coffee Mug", amount: 15, date: "2024-01-19", region: "North" },
];

const transactions = [
	{ id: 1, type: "credit", amount: 1000, description: "Salary" },
	{ id: 2, type: "debit", amount: 50, description: "Groceries" },
	{ id: 3, type: "debit", amount: 25, description: "Coffee" },
	{ id: 4, type: "credit", amount: 500, description: "Freelance" },
	{ id: 5, type: "debit", amount: 150, description: "Utilities" },
	{ id: 6, type: "credit", amount: 200, description: "Refund" },
];
```

## 1. Basic Reduce Operations

### Sum

The most common use of `reduce()` is calculating totals:

```javascript
// Sum of numbers
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 55

// Sum of prices
const totalPrices = prices.reduce((acc, price) => acc + price, 0);
console.log(totalPrices.toFixed(2)); // 260.97
```

### Product

```javascript
const product = numbers.slice(1, 6).reduce((acc, num) => acc * num, 1);
console.log(product); // 720 (2*3*4*5*6)
```

### Count

```javascript
// Total count
const count = products.reduce((acc) => acc + 1, 0);
console.log(count); // 6

// Conditional count
const electronicsCount = products.reduce(
	(acc, product) => (product.category === "Electronics" ? acc + 1 : acc),
	0,
);
console.log(electronicsCount); // 3
```

### Maximum and Minimum

```javascript
// Maximum
const max = numbers.reduce((acc, num) => Math.max(acc, num), -Infinity);
console.log(max); // 10

// Minimum
const min = numbers.reduce((acc, num) => Math.min(acc, num), Infinity);
console.log(min); // 1

// Maximum object by property
const highestPrice = products.reduce(
	(acc, product) => (product.price > acc.price ? product : acc),
	{ price: -Infinity },
);
console.log(highestPrice.name, `$${highestPrice.price}`); // Laptop $1200
```

### Concatenation

```javascript
// String concatenation
const words = ["Hello", "world", "from", "reduce"];
const sentence = words.reduce((acc, word) => acc + " " + word, "").trim();
console.log(sentence); // 'Hello world from reduce'

// Array concatenation with uniqueness
const allCategories = products.reduce((acc, product) => {
	if (!acc.includes(product.category)) {
		acc.push(product.category);
	}
	return acc;
}, []);
console.log(allCategories); // ['Electronics', 'Education', 'Kitchen']
```

## 2. Advanced Aggregation Patterns

### Grouping

Group data by a common property:

```javascript
// Group products by category
const productsByCategory = products.reduce((acc, product) => {
	if (!acc[product.category]) {
		acc[product.category] = [];
	}
	acc[product.category].push(product);
	return acc;
}, {});

console.log(productsByCategory);
// {
//   Electronics: [Laptop, Headphones, Mouse],
//   Education: [Book, Notebook],
//   Kitchen: [Coffee Mug]
// }

// Group employees by department
const employeesByDept = employees.reduce((acc, employee) => {
	if (!acc[employee.department]) {
		acc[employee.department] = [];
	}
	acc[employee.department].push(employee);
	return acc;
}, {});
```

### Statistics Calculation

Calculate multiple statistics in a single pass:

```javascript
// Comprehensive statistics
const stats = numbers.reduce(
	(acc, num) => {
		acc.sum += num;
		acc.count++;
		acc.min = Math.min(acc.min, num);
		acc.max = Math.max(acc.max, num);
		return acc;
	},
	{ sum: 0, count: 0, min: Infinity, max: -Infinity },
);

stats.average = stats.sum / stats.count;
console.log(stats);
// { sum: 55, count: 10, min: 1, max: 10, average: 5.5 }

// Price statistics
const priceStats = products.reduce(
	(acc, product) => {
		acc.sum += product.price;
		acc.count++;
		acc.min = Math.min(acc.min, product.price);
		acc.max = Math.max(acc.max, product.price);
		return acc;
	},
	{ sum: 0, count: 0, min: Infinity, max: -Infinity },
);

priceStats.average = priceStats.sum / priceStats.count;
```

### Complex Object Building

Build complex data structures:

```javascript
// Inventory summary
const inventorySummary = products.reduce(
	(acc, product) => {
		acc.totalValue += product.price * product.stock;
		acc.totalItems += product.stock;
		acc.categories.add(product.category);
		acc.priceRanges[
			product.price < 50
				? "under50"
				: product.price < 100
				? "50to100"
				: "over100"
		]++;
		return acc;
	},
	{
		totalValue: 0,
		totalItems: 0,
		categories: new Set(),
		priceRanges: { under50: 0, "50to100": 0, over100: 0 },
	},
);

console.log(inventorySummary);
// {
//   totalValue: 39750,
//   totalItems: 295,
//   categories: Set(3) {'Electronics', 'Education', 'Kitchen'},
//   priceRanges: { under50: 4, '50to100': 1, over100: 1 }
// }
```

### Data Transformation Pipelines

Create comprehensive data summaries:

```javascript
// Sales data aggregation
const salesSummary = sales.reduce(
	(acc, sale) => {
		// Total sales
		acc.totalSales += sale.amount;

		// Sales by region
		acc.salesByRegion[sale.region] =
			(acc.salesByRegion[sale.region] || 0) + sale.amount;

		// Sales by product
		acc.salesByProduct[sale.product] =
			(acc.salesByProduct[sale.product] || 0) + sale.amount;

		// Daily sales
		acc.dailySales[sale.date] = (acc.dailySales[sale.date] || 0) + sale.amount;

		return acc;
	},
	{
		totalSales: 0,
		salesByRegion: {},
		salesByProduct: {},
		dailySales: {},
	},
);

console.log(salesSummary);
// {
//   totalSales: 2610,
//   salesByRegion: { North: 1365, South: 25, East: 1200, West: 20 },
//   salesByProduct: { Laptop: 2400, Mouse: 25, Headphones: 150, Book: 20, 'Coffee Mug': 15 },
//   dailySales: { '2024-01-15': 1200, '2024-01-16': 175, '2024-01-17': 1200, '2024-01-18': 20, '2024-01-19': 15 }
// }
```

## 3. Financial Calculations

### Account Balance

```javascript
const balance = transactions.reduce((acc, transaction) => {
	return transaction.type === "credit"
		? acc + transaction.amount
		: acc - transaction.amount;
}, 0);

console.log(balance); // 1475
```

### Transaction Summary

```javascript
const transactionSummary = transactions.reduce(
	(acc, transaction) => {
		if (transaction.type === "credit") {
			acc.totalCredits += transaction.amount;
			acc.creditCount++;
		} else {
			acc.totalDebits += transaction.amount;
			acc.debitCount++;
		}

		// Track largest transaction
		if (
			Math.abs(transaction.amount) > Math.abs(acc.largestTransaction.amount)
		) {
			acc.largestTransaction = transaction;
		}

		return acc;
	},
	{
		totalCredits: 0,
		totalDebits: 0,
		creditCount: 0,
		debitCount: 0,
		largestTransaction: { amount: 0 },
	},
);

console.log(transactionSummary);
// {
//   totalCredits: 1700,
//   totalDebits: 225,
//   creditCount: 3,
//   debitCount: 3,
//   largestTransaction: { id: 1, type: 'credit', amount: 1000, description: 'Salary' }
// }
```

## 4. Advanced Patterns and Techniques

### Running Totals

```javascript
const runningTotals = numbers.reduce((acc, num, index) => {
	const runningTotal = (acc[acc.length - 1] || 0) + num;
	acc.push(runningTotal);
	return acc;
}, []);

console.log(runningTotals); // [1, 3, 6, 10, 15, 21, 28, 36, 45, 55]
```

### Frequency Analysis

```javascript
const wordList = [
	"apple",
	"banana",
	"apple",
	"cherry",
	"banana",
	"apple",
	"date",
];
const wordFrequency = wordList.reduce((acc, word) => {
	acc[word] = (acc[word] || 0) + 1;
	return acc;
}, {});

console.log(wordFrequency); // { apple: 3, banana: 2, cherry: 1, date: 1 }

// Department salary analysis
const deptSalaryAnalysis = employees.reduce((acc, employee) => {
	if (!acc[employee.department]) {
		acc[employee.department] = { total: 0, count: 0, employees: [] };
	}
	acc[employee.department].total += employee.salary;
	acc[employee.department].count++;
	acc[employee.department].employees.push(employee.name);
	return acc;
}, {});

console.log(deptSalaryAnalysis);
// {
//   Engineering: { total: 227000, count: 3, employees: ['Alice', 'Charlie', 'Eve'] },
//   Marketing: { total: 123000, count: 2, employees: ['Bob', 'Frank'] },
//   HR: { total: 55000, count: 1, employees: ['Diana'] }
// }
```

### Nested Reductions

```javascript
// Calculate average salary by department using nested reduce
const avgSalaryByDept = Object.entries(
	employees.reduce((acc, emp) => {
		if (!acc[emp.department]) acc[emp.department] = [];
		acc[emp.department].push(emp.salary);
		return acc;
	}, {}),
).reduce((acc, [dept, salaries]) => {
	acc[dept] =
		salaries.reduce((sum, salary) => sum + salary, 0) / salaries.length;
	return acc;
}, {});

console.log(avgSalaryByDept);
// { Engineering: 75666.67, Marketing: 61500, HR: 55000 }
```

### Conditional Accumulation

```javascript
// Build different arrays based on conditions
const categorizedProducts = products.reduce(
	(acc, product) => {
		if (product.price > 100) {
			acc.expensive.push(product);
		} else if (product.price > 25) {
			acc.medium.push(product);
		} else {
			acc.cheap.push(product);
		}

		if (product.stock < 30) {
			acc.lowStock.push(product);
		}

		return acc;
	},
	{ expensive: [], medium: [], cheap: [], lowStock: [] },
);

console.log(categorizedProducts);
// {
//   expensive: [Laptop, Headphones],
//   medium: [Mouse],
//   cheap: [Book, Coffee Mug, Notebook],
//   lowStock: [Laptop, Headphones]
// }
```

## 5. Practical Examples

### Shopping Cart Total

```javascript
const cart = [
	{ item: "Laptop", price: 1200, quantity: 1 },
	{ item: "Mouse", price: 25, quantity: 2 },
	{ item: "Headphones", price: 150, quantity: 1 },
];

const cartTotal = cart.reduce(
	(total, item) => total + item.price * item.quantity,
	0,
);
const cartItems = cart.reduce((count, item) => count + item.quantity, 0);

console.log(`Cart total: $${cartTotal} (${cartItems} items)`); // Cart total: $1400 (4 items)
```

### Student Grade Analysis

```javascript
const students = [
	{ name: "Alice", grades: [85, 92, 88] },
	{ name: "Bob", grades: [78, 85, 91] },
	{ name: "Charlie", grades: [95, 88, 92] },
];

const gradeAnalysis = students.reduce(
	(acc, student) => {
		const avg =
			student.grades.reduce((sum, grade) => sum + grade, 0) /
			student.grades.length;
		acc.averages.push({ name: student.name, average: avg });
		acc.classAverage = (acc.classAverage * acc.count + avg) / (acc.count + 1);
		acc.count++;
		return acc;
	},
	{ averages: [], classAverage: 0, count: 0 },
);

console.log("Grade analysis:");
gradeAnalysis.averages.forEach((student) => {
	console.log(`  ${student.name}: ${student.average.toFixed(1)}`);
});
//   Alice: 88.3
//   Bob: 84.7
//   Charlie: 91.7
console.log(`  Class average: ${gradeAnalysis.classAverage.toFixed(1)}`); // Class average: 88.2
```

### Data Validation and Cleaning

```javascript
const rawData = [10, "invalid", 20, null, 30, undefined, 40, "", 50];

const cleanedData = rawData.reduce(
	(acc, value) => {
		if (typeof value === "number" && !isNaN(value) && value > 0) {
			acc.valid.push(value);
			acc.sum += value;
		} else {
			acc.invalid.push(value);
		}
		return acc;
	},
	{ valid: [], invalid: [], sum: 0 },
);

console.log(cleanedData);
// {
//   valid: [10, 20, 30, 40, 50],
//   invalid: ['invalid', null, undefined, ''],
//   sum: 150
// }
```

## 6. Common Patterns

### 1. Object Property Aggregation

```javascript
const result = array.reduce((acc, item) => {
	acc[item.property] = (acc[item.property] || 0) + item.value;
	return acc;
}, {});
```

### 2. Array Flattening with Reduce

```javascript
const flattened = nestedArray.reduce((acc, item) => {
	return Array.isArray(item) ? acc.concat(item) : acc.concat([item]);
}, []);
```

### 3. Finding Unique Values

```javascript
const unique = array.reduce((acc, item) => {
	if (!acc.includes(item)) acc.push(item);
	return acc;
}, []);
```

### 4. Building Complex Data Structures

```javascript
const complex = array.reduce(
	(acc, item) => {
		// Multiple accumulations
		acc.totals[item.category] = (acc.totals[item.category] || 0) + item.amount;
		acc.items.push(item);
		acc.count++;
		return acc;
	},
	{ totals: {}, items: [], count: 0 },
);
```

### 5. Conditional Reductions

```javascript
const result = array.reduce((acc, item) => {
	if (condition(item)) {
		// Apply transformation
		return acc + item.value;
	}
	return acc;
}, initialValue);
```

## 7. Performance Considerations

### Algorithm Complexity

| Operation               | Time Complexity | Notes                     |
| ----------------------- | --------------- | ------------------------- |
| `reduce()`              | O(n)            | Single pass through array |
| Nested `reduce()`       | O(n²)           | Avoid for large datasets  |
| Object property access  | O(1)            | Efficient for grouping    |
| Array methods in reduce | O(n) per call   | Can become expensive      |

### Memory Usage

- **`reduce()`**: Processes elements one by one (memory efficient)
- **Accumulator objects**: Keep them lightweight
- **Avoid creating large intermediate arrays** inside reduce
- **Use appropriate initial values** to avoid undefined errors

### Performance Testing

```javascript
// Test with large arrays
const largeArray = Array.from({ length: 100000 }, (_, i) => i + 1);

console.time("Reduce sum (100k elements)");
const largeSum = largeArray.reduce((acc, num) => acc + num, 0);
console.timeEnd("Reduce sum (100k elements)");
// ~1-2ms

console.time("Reduce average (100k elements)");
const largeAvg = largeArray.reduce(
	(acc, num, _, arr) => {
		acc.sum += num;
		acc.count = arr.length;
		return acc;
	},
	{ sum: 0, count: 0 },
);
console.timeEnd("Reduce average (100k elements)");
// ~2-3ms
```

## 8. Best Practices

### 1. Always Provide Initial Value

```javascript
// Good
const sum = array.reduce((acc, num) => acc + num, 0);

// Avoid (can cause errors with empty arrays)
const sum = array.reduce((acc, num) => acc + num);
```

### 2. Use Descriptive Accumulator Names

```javascript
// Good
const total = numbers.reduce((sum, number) => sum + number, 0);

// Less clear
const x = numbers.reduce((a, b) => a + b, 0);
```

### 3. Handle Edge Cases

```javascript
const result = array.reduce(
	(acc, item) => {
		// Handle null/undefined items
		if (!item) return acc;

		// Handle different data types
		if (typeof item === "number") {
			acc.numbers.push(item);
		} else if (typeof item === "string") {
			acc.strings.push(item);
		}

		return acc;
	},
	{ numbers: [], strings: [] },
);
```

### 4. Combine with Other Methods

```javascript
// Powerful data processing pipelines
const result = data
	.filter((item) => item.active)
	.map((item) => ({ ...item, processed: true }))
	.reduce((acc, item) => {
		acc[item.category] = (acc[item.category] || 0) + item.value;
		return acc;
	}, {});
```

### 5. Avoid Complex Logic in Reducer

```javascript
// Prefer this (simple reducer)
const result = data.reduce(
	(acc, item) => {
		acc.total += item.value;
		return acc;
	},
	{ total: 0 },
);

// Over this (complex reducer)
const result = data.reduce(
	(acc, item) => {
		if (item.type === "A") {
			acc.aTotal += item.value;
			acc.aCount++;
			if (item.value > acc.aMax) acc.aMax = item.value;
		} else {
			acc.bTotal += item.value;
			acc.bCount++;
			if (item.value > acc.bMax) acc.bMax = item.value;
		}
		return acc;
	},
	{ aTotal: 0, aCount: 0, aMax: 0, bTotal: 0, bCount: 0, bMax: 0 },
);
```

## 9. Common Mistakes to Avoid

### 1. Forgetting Initial Value

```javascript
// Wrong - will fail on empty arrays
const result = [].reduce((acc, item) => acc + item);

// Right
const result = [].reduce((acc, item) => acc + item, 0);
```

### 2. Mutating the Accumulator Incorrectly

```javascript
// Wrong - mutating original array
const result = array.reduce((acc, item) => {
	acc.push(item * 2); // Modifies the accumulator array
	return acc;
}, []);

// Right - return new accumulator
const result = array.reduce((acc, item) => {
	return [...acc, item * 2];
}, []);
```

### 3. Not Returning the Accumulator

```javascript
// Wrong - doesn't return accumulator
const result = array.reduce(
	(acc, item) => {
		acc.total += item.value;
		// Missing return statement
	},
	{ total: 0 },
);

// Right
const result = array.reduce(
	(acc, item) => {
		acc.total += item.value;
		return acc; // Don't forget to return!
	},
	{ total: 0 },
);
```

## Summary

The `reduce()` method is incredibly powerful for data aggregation and transformation:

### Key Concepts:

- **Accumulator pattern**: Build up a result through iterative accumulation
- **Initial value**: Always provide an appropriate starting value
- **Return value**: Can be any type (number, object, array, etc.)
- **Single pass**: Processes all elements in one iteration

### Common Use Cases:

- **Totals and sums**: Calculate totals, averages, counts
- **Grouping**: Organize data by categories or properties
- **Statistics**: Compute multiple metrics simultaneously
- **Object building**: Create complex data structures
- **Data pipelines**: Combine with filter/map for powerful transformations

### Performance Characteristics:

- **Time complexity**: O(n) - linear time
- **Memory efficient**: Processes elements one by one
- **Versatile**: Can replace many other array operations
- **Composable**: Works well with other array methods

### When to Use Reduce:

- When you need to transform an array into a single value
- When building complex objects or data structures
- When performing multiple aggregations in one pass
- When you need more control than map/filter provides

The `reduce()` method is a cornerstone of functional programming in JavaScript, offering unparalleled flexibility for data manipulation and aggregation tasks.
