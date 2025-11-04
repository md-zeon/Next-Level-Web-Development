# 2-9: Scenario Based Activity - Denormalizing Data (Client-Side Join)

## Introduction

Welcome to the final scenario-based activity for Module 2! This session focuses on **denormalizing data** - the process of transforming normalized, relational data back into more convenient, denormalized structures for client-side consumption.

While normalization is crucial for data integrity and storage efficiency, denormalization is essential for performance and usability in client applications. When data reaches the client, we often need to "join" related information back together to create rich, interconnected data structures that are easy to work with in UI components and business logic.

## Learning Objectives

By the end of this activity, you will be able to:

- Implement client-side joins to denormalize normalized data
- Handle complex multi-level relationships and nested data structures
- Optimize denormalization performance for large datasets
- Create reusable denormalization functions and pipelines
- Choose appropriate denormalization strategies for different use cases
- Handle edge cases like missing references and circular dependencies

## Scenario: E-Commerce Product Catalog System

You work for a modern e-commerce platform that uses a normalized database structure for optimal storage and data integrity. However, your client-side application needs rich, denormalized data structures to efficiently render product catalogs, shopping carts, order histories, and user dashboards.

Your task is to build a comprehensive denormalization layer that transforms normalized API responses into client-friendly data structures.

### Sample Data

```javascript
// Normalized data from API
const products = [
	{
		id: "P001",
		name: "Wireless Headphones",
		categoryId: "C001",
		brandId: "B001",
		basePrice: 199.99,
	},
	{
		id: "P002",
		name: "Bluetooth Speaker",
		categoryId: "C001",
		brandId: "B002",
		basePrice: 79.99,
	},
	{
		id: "P003",
		name: "Laptop Stand",
		categoryId: "C002",
		brandId: "B003",
		basePrice: 49.99,
	},
];

const categories = [
	{
		id: "C001",
		name: "Audio",
		parentId: null,
		description: "Audio equipment and accessories",
	},
	{
		id: "C002",
		name: "Computer Accessories",
		parentId: null,
		description: "Computer peripherals and accessories",
	},
	{
		id: "C003",
		name: "Smart Home",
		parentId: null,
		description: "Smart home devices",
	},
];

const brands = [
	{ id: "B001", name: "AudioTech", country: "USA", founded: 2010 },
	{ id: "B002", name: "SoundWave", country: "Canada", founded: 2015 },
	{ id: "B003", name: "TechPro", country: "Germany", founded: 2008 },
];

const orders = [
	{
		id: "O001",
		userId: "U001",
		status: "completed",
		orderDate: "2024-01-15",
		total: 279.98,
	},
	{
		id: "O002",
		userId: "U002",
		status: "pending",
		orderDate: "2024-01-16",
		total: 129.98,
	},
];

const orderItems = [
	{
		id: "OI001",
		orderId: "O001",
		productId: "P001",
		quantity: 1,
		unitPrice: 199.99,
		discount: 0,
	},
	{
		id: "OI002",
		orderId: "O001",
		productId: "P002",
		quantity: 1,
		unitPrice: 79.99,
		discount: 0,
	},
	{
		id: "OI003",
		orderId: "O002",
		productId: "P003",
		quantity: 2,
		unitPrice: 49.99,
		discount: 5.0,
	},
];

const users = [
	{
		id: "U001",
		name: "Alice Johnson",
		email: "alice@example.com",
		memberSince: "2023-06-15",
	},
	{
		id: "U002",
		name: "Bob Smith",
		email: "bob@example.com",
		memberSince: "2023-08-22",
	},
];

const reviews = [
	{
		id: "R001",
		productId: "P001",
		userId: "U001",
		rating: 5,
		comment: "Excellent sound quality!",
		date: "2024-01-10",
	},
	{
		id: "R002",
		productId: "P001",
		userId: "U002",
		rating: 4,
		comment: "Good value for money",
		date: "2024-01-12",
	},
	{
		id: "R003",
		productId: "P002",
		userId: "U001",
		rating: 4,
		comment: "Clear sound, good battery life",
		date: "2024-01-14",
	},
];

const inventory = [
	{
		productId: "P001",
		warehouseId: "W001",
		quantity: 150,
		lastUpdated: "2024-01-20",
	},
	{
		productId: "P001",
		warehouseId: "W002",
		quantity: 75,
		lastUpdated: "2024-01-20",
	},
	{
		productId: "P002",
		warehouseId: "W001",
		quantity: 200,
		lastUpdated: "2024-01-20",
	},
	{
		productId: "P003",
		warehouseId: "W002",
		quantity: 50,
		lastUpdated: "2024-01-20",
	},
];

const warehouses = [
	{ id: "W001", name: "Main Warehouse", location: "New York, NY" },
	{ id: "W002", name: "West Coast Hub", location: "Los Angeles, CA" },
];
```

## Activity Tasks

### Task 1: Basic Product Denormalization

**Objective**: Create denormalized product objects that include category and brand information for display in product listings.

**Requirements**:

- Join products with categories and brands
- Handle missing references gracefully
- Create a denormalized product catalog
- Include computed fields like full category path

**Expected Output**:

```javascript
{
  "P001": {
    id: "P001",
    name: "Wireless Headphones",
    basePrice: 199.99,
    category: {
      id: "C001",
      name: "Audio",
      description: "Audio equipment and accessories"
    },
    brand: {
      id: "B001",
      name: "AudioTech",
      country: "USA",
      founded: 2010
    },
    categoryPath: "Audio"
  },
  // ... other products
}
```

### Task 2: Order History Denormalization

**Objective**: Create complete order history views that include user details, order items with product information, and computed totals.

**Requirements**:

- Join orders with users
- Join order items with products
- Calculate order totals and item subtotals
- Handle discounts and taxes

**Expected Output**:

```javascript
[
	{
		id: "O001",
		status: "completed",
		orderDate: "2024-01-15",
		user: {
			id: "U001",
			name: "Alice Johnson",
			email: "alice@example.com",
		},
		items: [
			{
				productId: "P001",
				productName: "Wireless Headphones",
				quantity: 1,
				unitPrice: 199.99,
				discount: 0,
				subtotal: 199.99,
			},
			{
				productId: "P002",
				productName: "Bluetooth Speaker",
				quantity: 1,
				unitPrice: 79.99,
				discount: 0,
				subtotal: 79.99,
			},
		],
		calculatedTotals: {
			subtotal: 279.98,
			discount: 0,
			tax: 22.4,
			total: 302.38,
		},
	},
	// ... other orders
];
```

### Task 3: Product Reviews Denormalization

**Objective**: Create rich product review displays that include user information and aggregated review statistics.

**Requirements**:

- Join reviews with users and products
- Calculate review statistics (average rating, total reviews)
- Group reviews by product
- Include helpfulness scores and review metadata

**Expected Output**:

```javascript
{
  "P001": {
    productId: "P001",
    productName: "Wireless Headphones",
    reviewStats: {
      totalReviews: 2,
      averageRating: 4.5,
      ratingDistribution: { 4: 1, 5: 1 },
      recommendedPercentage: 100
    },
    reviews: [
      {
        id: "R001",
        rating: 5,
        comment: "Excellent sound quality!",
        date: "2024-01-10",
        user: {
          id: "U001",
          name: "Alice Johnson"
        },
        helpful: 12,
        verified: true
      },
      // ... other reviews
    ]
  },
  // ... other products
}
```

### Task 4: Inventory Management Denormalization

**Objective**: Create comprehensive inventory views that combine product, warehouse, and stock information.

**Requirements**:

- Join inventory with products and warehouses
- Calculate total stock across all warehouses
- Identify low-stock alerts and out-of-stock items
- Create warehouse-specific inventory reports

**Expected Output**:

```javascript
{
  products: {
    "P001": {
      id: "P001",
      name: "Wireless Headphones",
      totalStock: 225,
      stockByWarehouse: {
        "W001": { quantity: 150, warehouse: "Main Warehouse" },
        "W002": { quantity: 75, warehouse: "West Coast Hub" }
      },
      stockStatus: "In Stock",
      lowStockThreshold: 50
    },
    // ... other products
  },
  warehouses: {
    "W001": {
      id: "W001",
      name: "Main Warehouse",
      location: "New York, NY",
      totalProducts: 2,
      totalValue: 35997.00,
      products: [
        {
          productId: "P001",
          productName: "Wireless Headphones",
          quantity: 150,
          value: 29998.50
        },
        // ... other products
      ]
    },
    // ... other warehouses
  }
}
```

### Task 5: User Dashboard Denormalization

**Objective**: Create personalized user dashboard data that combines order history, preferences, and recommendations.

**Requirements**:

- Join user data with orders, reviews, and preferences
- Calculate user lifetime value and engagement metrics
- Generate personalized product recommendations
- Include user activity timeline

**Expected Output**:

```javascript
{
  "U001": {
    id: "U001",
    name: "Alice Johnson",
    email: "alice@example.com",
    memberSince: "2023-06-15",
    profile: {
      totalOrders: 1,
      totalSpent: 302.38,
      averageOrderValue: 302.38,
      favoriteCategory: "Audio",
      loyaltyTier: "Gold"
    },
    recentOrders: [
      {
        id: "O001",
        date: "2024-01-15",
        status: "completed",
        total: 302.38,
        itemsCount: 2
      }
    ],
    reviews: [
      {
        productId: "P001",
        productName: "Wireless Headphones",
        rating: 5,
        date: "2024-01-10"
      },
      // ... other reviews
    ],
    recommendations: [
      {
        productId: "P004",
        name: "Wireless Earbuds",
        reason: "Similar to your purchase",
        score: 0.85
      },
      // ... other recommendations
    ],
    activityTimeline: [
      { type: "order", date: "2024-01-15", description: "Placed order O001" },
      { type: "review", date: "2024-01-10", description: "Reviewed Wireless Headphones" }
    ]
  },
  // ... other users
}
```

### Task 6: Advanced Analytics Denormalization

**Objective**: Create complex analytical views that combine multiple data sources for business intelligence.

**Requirements**:

- Generate sales analytics by category and time period
- Calculate product performance metrics across multiple dimensions
- Create customer segmentation data
- Build recommendation engine data structures

**Expected Output**:

```javascript
{
  salesAnalytics: {
    byCategory: {
      "Audio": {
        totalRevenue: 479.96,
        totalOrders: 2,
        totalUnits: 3,
        avgOrderValue: 239.98,
        topProducts: ["P001", "P002"],
        growthRate: 15.2
      },
      "Computer Accessories": {
        totalRevenue: 94.98,
        totalOrders: 1,
        totalUnits: 2,
        avgOrderValue: 94.98,
        topProducts: ["P003"],
        growthRate: null
      }
    },
    byTimePeriod: {
      "2024-01-15": {
        totalRevenue: 302.38,
        orderCount: 1,
        avgOrderValue: 302.38,
        topCategory: "Audio"
      },
      "2024-01-16": {
        totalRevenue: 94.98,
        orderCount: 1,
        avgOrderValue: 94.98,
        topCategory: "Computer Accessories"
      }
    }
  },
  productPerformance: {
    "P001": {
      revenue: 199.99,
      unitsSold: 1,
      avgRating: 4.5,
      reviewCount: 2,
      stockLevel: 225,
      performanceScore: 8.7,
      trends: {
        salesVelocity: "High",
        ratingTrend: "Stable",
        stockTrend: "Increasing"
      }
    },
    // ... other products
  },
  customerSegments: {
    "High Value": {
      customers: ["U001"],
      avgLifetimeValue: 302.38,
      avgOrderFrequency: 1.0,
      preferredCategories: ["Audio"],
      retentionRate: 100
    },
    "New Customers": {
      customers: ["U002"],
      avgLifetimeValue: 94.98,
      avgOrderFrequency: 1.0,
      preferredCategories: ["Computer Accessories"],
      retentionRate: 100
    }
  }
}
```

## Implementation Guide

### Step 1: Set Up Your Environment

Create a new JavaScript file for this activity:

```javascript
// M02-Denormalization-Activity.js

// Import sample data
const products = [
	/* ... */
];
const categories = [
	/* ... */
];
const brands = [
	/* ... */
];
const orders = [
	/* ... */
];
const orderItems = [
	/* ... */
];
const users = [
	/* ... */
];
const reviews = [
	/* ... */
];
const inventory = [
	/* ... */
];
const warehouses = [
	/* ... */
];

// Create lookup tables
const categoryLookup = categories.reduce(
	(acc, cat) => ((acc[cat.id] = cat), acc),
	{},
);
const brandLookup = brands.reduce(
	(acc, brand) => ((acc[brand.id] = brand), acc),
	{},
);
const userLookup = users.reduce(
	(acc, user) => ((acc[user.id] = user), acc),
	{},
);
const warehouseLookup = warehouses.reduce(
	(acc, wh) => ((acc[wh.id] = wh), acc),
	{},
);
```

### Step 2: Implement Basic Denormalization Functions

Create reusable denormalization functions:

```javascript
// Basic join function
function leftJoin(mainArray, lookupTable, joinKey, resultKey) {
	return mainArray.map((item) => ({
		...item,
		[resultKey]: lookupTable[item[joinKey]] || null,
	}));
}

// Multi-level join function
function multiJoin(mainArray, joinConfigs) {
	return mainArray.map((item) => {
		const result = { ...item };
		joinConfigs.forEach((config) => {
			const { lookupTable, joinKey, resultKey, required = false } = config;
			const joinedData = lookupTable[item[joinKey]];

			if (required && !joinedData) {
				throw new Error(
					`Required join failed: ${joinKey} not found in ${resultKey}`,
				);
			}

			result[resultKey] = joinedData || null;
		});
		return result;
	});
}

// Safe accessor for nested properties
function safeGet(obj, path, defaultValue = null) {
	return path
		.split(".")
		.reduce(
			(current, key) =>
				current && current[key] !== undefined ? current[key] : defaultValue,
			obj,
		);
}
```

### Step 3: Create Denormalization Pipelines

Build complex denormalization pipelines:

```javascript
function createDenormalizationPipeline(steps) {
	return function (data) {
		return steps.reduce((result, step) => step(result), data);
	};
}

// Usage example
const productDenormalizationPipeline = createDenormalizationPipeline([
	(products) =>
		multiJoin(products, [
			{
				lookupTable: categoryLookup,
				joinKey: "categoryId",
				resultKey: "category",
			},
			{ lookupTable: brandLookup, joinKey: "brandId", resultKey: "brand" },
		]),
	(products) =>
		products.map((product) => ({
			...product,
			categoryPath: product.category ? product.category.name : "Uncategorized",
		})),
]);
```

### Step 4: Implement Each Task

Work through each task systematically, applying the denormalization patterns you've learned.

### Step 5: Test and Validate

Create comprehensive test functions:

```javascript
function validateDenormalizations() {
	const results = {};

	// Test Task 1
	results.productCatalog = denormalizeProductCatalog(products);

	// Test Task 2
	results.orderHistory = denormalizeOrderHistory(orders);

	// Validate results
	console.log("Denormalization Validation Results:", validateResults(results));

	return results;
}
```

## Advanced Challenges

### Challenge 1: Lazy Denormalization

Create a lazy denormalization system that only joins data when accessed:

```javascript
class LazyDenormalizer {
	constructor(dataSources) {
		this.dataSources = dataSources;
		this.cache = new Map();
	}

	getDenormalized(key, denormalizationFn) {
		if (!this.cache.has(key)) {
			this.cache.set(key, denormalizationFn(this.dataSources));
		}
		return this.cache.get(key);
	}

	invalidateCache(pattern) {
		// Invalidate cache entries matching pattern
		for (const [key] of this.cache) {
			if (key.includes(pattern)) {
				this.cache.delete(key);
			}
		}
	}
}
```

### Challenge 2: Circular Reference Handling

Implement circular reference detection and resolution:

```javascript
function detectCircularReferences(obj, visited = new Set(), path = []) {
	if (typeof obj !== "object" || obj === null) return false;

	if (visited.has(obj)) {
		console.warn("Circular reference detected:", path.join(" -> "));
		return true;
	}

	visited.add(obj);

	for (const [key, value] of Object.entries(obj)) {
		if (detectCircularReferences(value, visited, [...path, key])) {
			return true;
		}
	}

	visited.delete(obj);
	return false;
}

function resolveCircularReferences(obj, maxDepth = 3, currentDepth = 0) {
	if (currentDepth >= maxDepth || typeof obj !== "object" || obj === null) {
		return obj;
	}

	const result = Array.isArray(obj) ? [] : {};

	for (const [key, value] of Object.entries(obj)) {
		if (typeof value === "object" && value !== null) {
			result[key] = resolveCircularReferences(
				value,
				maxDepth,
				currentDepth + 1,
			);
		} else {
			result[key] = value;
		}
	}

	return result;
}
```

### Challenge 3: Performance-Optimized Denormalization

Implement performance optimizations for large datasets:

```javascript
function optimizedDenormalize(mainData, joinConfigs, options = {}) {
	const { batchSize = 1000, parallel = false, cacheResults = true } = options;

	// Pre-compute lookup tables for faster access
	const optimizedLookups = joinConfigs.reduce((acc, config) => {
		acc[config.resultKey] = config.lookupTable;
		return acc;
	}, {});

	if (parallel && mainData.length > batchSize) {
		// Process in parallel batches
		return processInParallel(mainData, batchSize, (batch) =>
			batch.map((item) => performJoins(item, joinConfigs, optimizedLookups)),
		);
	} else {
		// Process sequentially
		return mainData.map((item) =>
			performJoins(item, joinConfigs, optimizedLookups),
		);
	}
}

function performJoins(item, joinConfigs, optimizedLookups) {
	const result = { ...item };
	joinConfigs.forEach((config) => {
		const lookupTable = optimizedLookups[config.resultKey];
		result[config.resultKey] = lookupTable[item[config.joinKey]] || null;
	});
	return result;
}
```

## Denormalization Strategies

### 1. When to Denormalize

**Denormalize when:**

- Data is primarily read, rarely updated
- Client needs rich, interconnected data structures
- Performance is critical for user experience
- API responses need to be self-contained
- UI components require nested data

**Keep normalized when:**

- Data integrity is paramount
- Updates are frequent and complex
- Storage efficiency is critical
- Data relationships are dynamic

### 2. Join Types

#### Inner Join

```javascript
function innerJoin(mainArray, lookupTable, joinKey) {
	return mainArray
		.filter((item) => lookupTable[item[joinKey]])
		.map((item) => ({
			...item,
			joinedData: lookupTable[item[joinKey]],
		}));
}
```

#### Left Join

```javascript
function leftJoin(mainArray, lookupTable, joinKey) {
	return mainArray.map((item) => ({
		...item,
		joinedData: lookupTable[item[joinKey]] || null,
	}));
}
```

#### Full Outer Join

```javascript
function fullOuterJoin(array1, array2, joinKey1, joinKey2) {
	const result = [];
	const processed = new Set();

	// Add all items from array1
	array1.forEach((item1) => {
		const match = array2.find((item2) => item1[joinKey1] === item2[joinKey2]);
		result.push({
			...item1,
			joinedData: match || null,
		});
		processed.add(item1[joinKey1]);
	});

	// Add unmatched items from array2
	array2.forEach((item2) => {
		if (!processed.has(item2[joinKey2])) {
			result.push({
				joinedData: item2,
				// Original data is null for right-only joins
			});
		}
	});

	return result;
}
```

## Best Practices for Denormalization

### 1. Performance Considerations

- Create lookup tables once, reuse them
- Use appropriate join strategies for data size
- Consider memory usage for large datasets
- Implement caching for frequently accessed data

### 2. Data Integrity

- Handle missing references gracefully
- Validate data before denormalization
- Implement error boundaries for failed joins
- Log denormalization errors for debugging

### 3. Memory Management

- Avoid deep copying large objects unnecessarily
- Use lazy loading for optional relationships
- Clean up unused denormalized data
- Monitor memory usage in client applications

### 4. Code Organization

- Create reusable denormalization functions
- Separate business logic from join logic
- Use descriptive names for denormalized fields
- Document complex denormalization logic

## Solution Template

```javascript
// M02-Denormalization-Activity.js

// Setup
const products = [
	/* ... */
];
const categories = [
	/* ... */
];
const brands = [
	/* ... */
];
const orders = [
	/* ... */
];
const orderItems = [
	/* ... */
];
const users = [
	/* ... */
];

// Lookup tables
const categoryLookup = categories.reduce(
	(acc, cat) => ((acc[cat.id] = cat), acc),
	{},
);
const brandLookup = brands.reduce(
	(acc, brand) => ((acc[brand.id] = brand), acc),
	{},
);
const userLookup = users.reduce(
	(acc, user) => ((acc[user.id] = user), acc),
	{},
);

// Utility functions
function leftJoin(mainArray, lookupTable, joinKey, resultKey) {
	return mainArray.map((item) => ({
		...item,
		[resultKey]: lookupTable[item[joinKey]] || null,
	}));
}

function multiJoin(mainArray, joinConfigs) {
	return mainArray.map((item) => {
		const result = { ...item };
		joinConfigs.forEach((config) => {
			const { lookupTable, joinKey, resultKey } = config;
			result[resultKey] = lookupTable[item[joinKey]] || null;
		});
		return result;
	});
}

// Task 1: Basic Product Denormalization
function denormalizeProductCatalog(products) {
	return multiJoin(products, [
		{
			lookupTable: categoryLookup,
			joinKey: "categoryId",
			resultKey: "category",
		},
		{ lookupTable: brandLookup, joinKey: "brandId", resultKey: "brand" },
	]).reduce((acc, product) => {
		acc[product.id] = {
			...product,
			categoryPath: product.category?.name || "Uncategorized",
		};
		return acc;
	}, {});
}

// Task 2: Order History Denormalization
function denormalizeOrderHistory(orders) {
	return orders.map((order) => {
		const user = userLookup[order.userId];
		const items = orderItems
			.filter((item) => item.orderId === order.id)
			.map((item) => {
				const product = products.find((p) => p.id === item.productId);
				return {
					productId: item.productId,
					productName: product?.name || "Unknown Product",
					quantity: item.quantity,
					unitPrice: item.unitPrice,
					discount: item.discount,
					subtotal: item.unitPrice * item.quantity - item.discount,
				};
			});

		const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
		const discount = items.reduce((sum, item) => sum + item.discount, 0);
		const tax = subtotal * 0.08; // 8% tax
		const total = subtotal + tax;

		return {
			...order,
			user: user ? { id: user.id, name: user.name, email: user.email } : null,
			items,
			calculatedTotals: {
				subtotal: Math.round(subtotal * 100) / 100,
				discount: Math.round(discount * 100) / 100,
				tax: Math.round(tax * 100) / 100,
				total: Math.round(total * 100) / 100,
			},
		};
	});
}

// Add implementations for other tasks...

// Test functions
function runAllTasks() {
	console.log("=".repeat(60));
	console.log("SCENARIO BASED ACTIVITY: DENORMALIZING DATA");
	console.log("=".repeat(60));

	console.log("\n📦 TASK 1: Basic Product Denormalization");
	console.log(JSON.stringify(denormalizeProductCatalog(products), null, 2));

	console.log("\n📦 TASK 2: Order History Denormalization");
	console.log(JSON.stringify(denormalizeOrderHistory(orders), null, 2));

	// Add tests for other tasks
}

// Run the activity
runAllTasks();
```

## Expected Learning Outcomes

After completing this activity, you should be able to:

1. **Implement client-side joins** to denormalize normalized data structures
2. **Handle complex multi-level relationships** with nested joins and lookups
3. **Create reusable denormalization functions** for different data scenarios
4. **Optimize denormalization performance** for large-scale applications
5. **Choose appropriate join strategies** based on data requirements and constraints
6. **Build rich client-side data structures** that enhance user experience
7. **Apply denormalization patterns** in real-world JavaScript applications

## Next Steps

- Apply denormalization techniques to your own API data
- Explore server-side denormalization with GraphQL
- Learn about database denormalization strategies
- Study advanced data modeling patterns

This activity demonstrates the critical role of denormalization in modern client-side applications. Mastering these patterns will enable you to efficiently transform normalized API data into rich, interconnected structures that power exceptional user experiences.

Happy coding! 🔗
