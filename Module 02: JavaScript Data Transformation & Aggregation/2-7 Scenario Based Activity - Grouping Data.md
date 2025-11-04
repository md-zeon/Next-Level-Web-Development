# 2-7: Scenario Based Activity - Grouping Data

## Introduction

Welcome to the scenario-based activity for Module 2! In this activity, you'll apply all the data transformation and aggregation techniques you've learned to solve real-world data processing problems. The focus will be on **grouping data** - organizing data into meaningful categories and performing calculations on those groups.

Grouping is one of the most powerful data transformation patterns because it allows you to:

- Analyze data by categories (sales by region, products by category, etc.)
- Calculate aggregates per group (totals, averages, counts)
- Identify patterns and trends
- Generate reports and summaries

## Learning Objectives

By the end of this activity, you will be able to:

- Group data using various techniques (objects, Maps, reduce)
- Perform aggregations on grouped data
- Handle complex multi-level grouping
- Apply filtering and sorting to grouped results
- Create reusable grouping functions
- Optimize grouping operations for performance

## Scenario: E-Commerce Analytics Dashboard

You work for an e-commerce company that sells products across multiple regions. Your task is to build an analytics dashboard that provides insights into sales performance. You'll work with sales transaction data and need to group it in various ways to generate meaningful reports.

### Sample Data

```javascript
const salesTransactions = [
	{
		id: "T001",
		productId: "P001",
		customerId: "C001",
		region: "North",
		amount: 1200,
		quantity: 1,
		date: "2024-01-15",
	},
	{
		id: "T002",
		productId: "P002",
		customerId: "C002",
		region: "South",
		amount: 50,
		quantity: 2,
		date: "2024-01-15",
	},
	{
		id: "T003",
		productId: "P001",
		customerId: "C003",
		region: "North",
		amount: 1200,
		quantity: 1,
		date: "2024-01-16",
	},
	{
		id: "T004",
		productId: "P003",
		customerId: "C001",
		region: "North",
		amount: 300,
		quantity: 2,
		date: "2024-01-16",
	},
	{
		id: "T005",
		productId: "P002",
		customerId: "C004",
		region: "East",
		amount: 25,
		quantity: 1,
		date: "2024-01-17",
	},
	{
		id: "T006",
		productId: "P004",
		customerId: "C002",
		region: "South",
		amount: 800,
		quantity: 1,
		date: "2024-01-17",
	},
	{
		id: "T007",
		productId: "P003",
		customerId: "C005",
		region: "West",
		amount: 150,
		quantity: 1,
		date: "2024-01-18",
	},
	{
		id: "T008",
		productId: "P001",
		customerId: "C003",
		region: "North",
		amount: 2400,
		quantity: 2,
		date: "2024-01-18",
	},
	{
		id: "T009",
		productId: "P005",
		customerId: "C004",
		region: "East",
		amount: 75,
		quantity: 3,
		date: "2024-01-19",
	},
	{
		id: "T010",
		productId: "P004",
		customerId: "C001",
		region: "North",
		amount: 1600,
		quantity: 2,
		date: "2024-01-19",
	},
];

const products = [
	{ id: "P001", name: "Laptop", category: "Electronics", basePrice: 1200 },
	{ id: "P002", name: "Book", category: "Education", basePrice: 25 },
	{ id: "P003", name: "Headphones", category: "Electronics", basePrice: 150 },
	{ id: "P004", name: "Tablet", category: "Electronics", basePrice: 800 },
	{ id: "P005", name: "Notebook", category: "Education", basePrice: 5 },
];

const customers = [
	{
		id: "C001",
		name: "Alice Johnson",
		email: "alice@example.com",
		region: "North",
	},
	{ id: "C002", name: "Bob Smith", email: "bob@example.com", region: "South" },
	{
		id: "C003",
		name: "Carol Davis",
		email: "carol@example.com",
		region: "North",
	},
	{
		id: "C004",
		name: "David Wilson",
		email: "david@example.com",
		region: "East",
	},
	{ id: "C005", name: "Eva Brown", email: "eva@example.com", region: "West" },
];
```

## Activity Tasks

### Task 1: Basic Grouping by Region

**Objective**: Group sales transactions by region and calculate total sales and transaction count for each region.

**Requirements**:

- Group transactions by the `region` field
- For each region, calculate:
  - Total sales amount
  - Number of transactions
  - Total quantity sold
- Sort results by total sales (descending)

**Expected Output**:

```javascript
{
  "North": { totalAmount: 6700, transactionCount: 5, totalQuantity: 8 },
  "South": { totalAmount: 850, transactionCount: 2, totalQuantity: 3 },
  "East": { totalAmount: 100, transactionCount: 2, totalQuantity: 4 },
  "West": { totalAmount: 150, transactionCount: 1, totalQuantity: 1 }
}
```

### Task 2: Grouping by Product Category

**Objective**: Group products by category and analyze sales performance per category.

**Requirements**:

- Create product lookup table first
- Group transactions by product category (using product lookup)
- For each category, calculate:
  - Total sales amount
  - Total quantity sold
  - Average transaction amount
  - Number of unique products
- Include category name in results

**Expected Output**:

```javascript
{
  "Electronics": {
    categoryName: "Electronics",
    totalAmount: 7300,
    totalQuantity: 9,
    averageTransaction: 1460,
    uniqueProducts: 3
  },
  "Education": {
    categoryName: "Education",
    totalAmount: 200,
    totalQuantity: 6,
    averageTransaction: 40,
    uniqueProducts: 2
  }
}
```

### Task 3: Multi-Level Grouping (Region + Product)

**Objective**: Create a nested grouping structure showing sales by region and then by product within each region.

**Requirements**:

- Group by region first
- Within each region, group by product
- For each region-product combination, calculate:
  - Total sales amount
  - Total quantity
  - Transaction count
- Structure should be: `region -> product -> metrics`

**Expected Output**:

```javascript
{
  "North": {
    "P001": { totalAmount: 4800, totalQuantity: 4, transactionCount: 3 },
    "P003": { totalAmount: 300, totalQuantity: 2, transactionCount: 1 },
    "P004": { totalAmount: 1600, totalQuantity: 2, transactionCount: 1 }
  },
  "South": {
    "P002": { totalAmount: 50, totalQuantity: 2, transactionCount: 1 },
    "P004": { totalAmount: 800, totalQuantity: 1, transactionCount: 1 }
  },
  // ... other regions
}
```

### Task 4: Time-Based Grouping (Daily Sales)

**Objective**: Group sales by date and analyze daily performance trends.

**Requirements**:

- Group transactions by date
- For each date, calculate:
  - Total sales amount
  - Number of transactions
  - Average transaction value
  - Total quantity sold
- Sort results chronologically
- Identify the best and worst performing days

**Expected Output**:

```javascript
[
	{
		date: "2024-01-15",
		totalAmount: 1250,
		transactionCount: 2,
		averageTransaction: 625,
		totalQuantity: 3,
	},
	// ... other dates
];
```

### Task 5: Customer Analysis with Grouping

**Objective**: Analyze customer purchasing patterns using grouping.

**Requirements**:

- Group transactions by customer
- For each customer, calculate:
  - Total amount spent
  - Number of transactions
  - Average transaction value
  - Most purchased product category
  - Total quantity purchased
- Include customer details (name, email)
- Sort by total amount spent (descending)

**Expected Output**:

```javascript
[
	{
		customerId: "C001",
		customerName: "Alice Johnson",
		email: "alice@example.com",
		totalSpent: 3100,
		transactionCount: 3,
		averageTransaction: 1033.33,
		topCategory: "Electronics",
		totalQuantity: 5,
	},
	// ... other customers
];
```

### Task 6: Advanced Analytics - Product Performance Matrix

**Objective**: Create a comprehensive product performance analysis across regions.

**Requirements**:

- Group by product first, then by region within each product
- For each product-region combination, calculate:
  - Total sales
  - Total quantity
  - Transaction count
  - Average price per unit
- Calculate overall product totals
- Identify best-selling products per region

**Expected Output**:

```javascript
{
  "P001": {
    overall: { totalAmount: 4800, totalQuantity: 4, transactionCount: 3 },
    byRegion: {
      "North": { totalAmount: 4800, totalQuantity: 4, transactionCount: 3, avgPricePerUnit: 1200 }
    }
  },
  "P002": {
    overall: { totalAmount: 75, totalQuantity: 3, transactionCount: 2 },
    byRegion: {
      "South": { totalAmount: 50, totalQuantity: 2, transactionCount: 1, avgPricePerUnit: 25 },
      "East": { totalAmount: 25, totalQuantity: 1, transactionCount: 1, avgPricePerUnit: 25 }
    }
  },
  // ... other products
}
```

## Implementation Guide

### Step 1: Set Up Your Environment

Create a new JavaScript file for this activity:

```javascript
// M02-Grouping-Activity.js

// Import or define the sample data here
const salesTransactions = [
	/* ... */
];
const products = [
	/* ... */
];
const customers = [
	/* ... */
];

// Create lookup tables for efficient data access
const productLookup = products.reduce((acc, product) => {
	acc[product.id] = product;
	return acc;
}, {});

const customerLookup = customers.reduce((acc, customer) => {
	acc[customer.id] = customer;
	return acc;
}, {});
```

### Step 2: Implement Basic Grouping Function

Create a reusable grouping function using reduce:

```javascript
function groupBy(array, keyFn) {
	return array.reduce((groups, item) => {
		const key = keyFn(item);
		if (!groups[key]) {
			groups[key] = [];
		}
		groups[key].push(item);
		return groups;
	}, {});
}

// Usage example:
const salesByRegion = groupBy(
	salesTransactions,
	(transaction) => transaction.region,
);
```

### Step 3: Create Aggregation Functions

Build functions to calculate metrics for grouped data:

```javascript
function calculateGroupMetrics(transactions) {
	return {
		totalAmount: transactions.reduce((sum, t) => sum + t.amount, 0),
		transactionCount: transactions.length,
		totalQuantity: transactions.reduce((sum, t) => sum + t.quantity, 0),
		averageTransaction:
			transactions.length > 0
				? transactions.reduce((sum, t) => sum + t.amount, 0) /
				  transactions.length
				: 0,
	};
}
```

### Step 4: Implement Each Task

Work through each task systematically, applying the grouping and aggregation patterns you've learned.

### Step 5: Test and Validate

Create test functions to validate your implementations:

```javascript
function testGroupingResults() {
	// Test Task 1
	const regionGrouping = groupSalesByRegion(salesTransactions);
	console.log("Region Grouping:", regionGrouping);

	// Add validation logic here
	assertRegionGrouping(regionGrouping);
}
```

## Advanced Challenges

### Challenge 1: Dynamic Grouping Function

Create a flexible grouping function that can group by any field or combination of fields:

```javascript
function dynamicGroupBy(array, groupByFn, aggregateFn) {
	// Implementation here
}

// Usage:
const salesByRegionAndProduct = dynamicGroupBy(
	salesTransactions,
	(transaction) => `${transaction.region}-${transaction.productId}`,
	(transactions) => calculateGroupMetrics(transactions),
);
```

### Challenge 2: Performance Optimization

Compare the performance of different grouping approaches:

```javascript
function benchmarkGrouping() {
	const largeDataSet = Array.from({ length: 10000 }, (_, i) => ({
		region: ["North", "South", "East", "West"][i % 4],
		amount: Math.random() * 1000,
		// ... other fields
	}));

	console.time("Object-based grouping");
	// Implement object-based grouping
	console.timeEnd("Object-based grouping");

	console.time("Map-based grouping");
	// Implement Map-based grouping
	console.timeEnd("Map-based grouping");
}
```

### Challenge 3: Real-time Grouping

Implement a grouping system that can handle streaming data:

```javascript
class RealTimeGrouper {
	constructor(groupByFn, aggregateFn) {
		this.groups = new Map();
		this.groupByFn = groupByFn;
		this.aggregateFn = aggregateFn;
	}

	addDataItem(item) {
		// Implementation here
	}

	getGroupedResults() {
		// Implementation here
	}
}
```

## Best Practices for Grouping Data

### 1. Choose the Right Data Structure

- **Objects**: Best for simple string keys, most common
- **Maps**: Better for complex keys, large datasets, better performance
- **Arrays**: When you need ordered results

### 2. Optimize for Performance

- Create lookup tables once, reuse them
- Avoid recreating groups unnecessarily
- Use appropriate aggregation functions
- Consider memory usage for large datasets

### 3. Handle Edge Cases

- Empty arrays
- Missing keys
- Invalid data types
- Division by zero in averages

### 4. Make Code Reusable

- Create generic grouping functions
- Separate grouping logic from aggregation logic
- Use functional programming principles

## Solution Template

```javascript
// M02-Grouping-Activity.js

// Setup
const salesTransactions = [
	/* ... data ... */
];
const products = [
	/* ... data ... */
];
const customers = [
	/* ... data ... */
];

// Lookup tables
const productLookup = products.reduce((acc, p) => ((acc[p.id] = p), acc), {});
const customerLookup = customers.reduce((acc, c) => ((acc[c.id] = c), acc), {});

// Utility functions
function groupBy(array, keyFn) {
	return array.reduce((groups, item) => {
		const key = keyFn(item);
		(groups[key] || (groups[key] = [])).push(item);
		return groups;
	}, {});
}

function calculateMetrics(transactions) {
	return {
		totalAmount: transactions.reduce((sum, t) => sum + t.amount, 0),
		transactionCount: transactions.length,
		totalQuantity: transactions.reduce((sum, t) => sum + t.quantity, 0),
		averageTransaction: transactions.length
			? transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length
			: 0,
	};
}

// Task 1: Group by Region
function groupSalesByRegion(transactions) {
	const grouped = groupBy(transactions, (t) => t.region);
	const result = {};

	Object.keys(grouped).forEach((region) => {
		result[region] = calculateMetrics(grouped[region]);
	});

	return result;
}

// Task 2: Group by Category
function groupSalesByCategory(transactions) {
	const grouped = groupBy(
		transactions,
		(t) => productLookup[t.productId]?.category,
	);
	const result = {};

	Object.keys(grouped).forEach((category) => {
		const categoryTransactions = grouped[category];
		const metrics = calculateMetrics(categoryTransactions);
		const uniqueProducts = new Set(categoryTransactions.map((t) => t.productId))
			.size;

		result[category] = {
			categoryName: category,
			...metrics,
			uniqueProducts,
		};
	});

	return result;
}

// Add implementations for other tasks...

// Test functions
function runTests() {
	console.log("=== Task 1: Region Grouping ===");
	console.log(groupSalesByRegion(salesTransactions));

	console.log("=== Task 2: Category Grouping ===");
	console.log(groupSalesByCategory(salesTransactions));

	// Add tests for other tasks
}

// Run the activity
runTests();
```

## Expected Learning Outcomes

After completing this activity, you should be able to:

1. **Apply grouping patterns** to organize data by different criteria
2. **Use reduce effectively** for both grouping and aggregation
3. **Create lookup tables** for efficient data access during grouping
4. **Handle complex nested groupings** with multiple levels
5. **Optimize grouping operations** for performance and memory usage
6. **Build reusable grouping functions** that can be applied to different datasets
7. **Combine multiple transformation techniques** (map, filter, reduce) in grouping scenarios
