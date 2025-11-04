# 2-6: The Common Pattern - Normalizing using lookup table

## Introduction

Data normalization is a fundamental pattern in software development that involves organizing data to reduce redundancy and improve data integrity. In JavaScript, lookup tables are the primary tool for implementing normalization, allowing efficient data access and transformation. This lesson explores how to create and use lookup tables to normalize data, transforming raw, denormalized data into structured, relational formats.

## Why Data Normalization Matters

### Problems with Denormalized Data

```javascript
// Denormalized data (problematic)
const denormalizedOrders = [
	{
		orderId: "ORD001",
		customerName: "Alice Johnson", // Repeated
		customerEmail: "alice@example.com", // Repeated
		customerRegion: "North", // Repeated
		productName: "Laptop", // Repeated
		productCategory: "Electronics", // Repeated
		productPrice: 1200, // Repeated
		quantity: 1,
		orderDate: "2024-01-15",
	},
];
```

**Problems:**

- **Data redundancy**: Same information repeated across records
- **Update anomalies**: Changing customer name requires updating multiple records
- **Inconsistency**: Different representations of same data
- **Storage waste**: Unnecessary duplication
- **Maintenance nightmare**: Hard to keep data synchronized

### Benefits of Normalized Data

```javascript
// Normalized data (better)
const normalizedOrder = {
    orderId: 'ORD001',
    customerId: 'C001',    // Reference to customer entity
    productId: 'P001',     // Reference to product entity
    quantity: 1,
    orderDate: '2024-01-15'
};

// Separate entity tables
const customers = [{ id: 'C001', name: 'Alice Johnson', ... }];
const products = [{ id: 'P001', name: 'Laptop', ... }];
```

**Benefits:**

- **No redundancy**: Each piece of data stored once
- **Data integrity**: Single source of truth
- **Consistency**: Updates affect all references
- **Storage efficiency**: Less disk space used
- **Maintainability**: Easier to update and manage

## Sample Data

Throughout this lesson, we'll work with these datasets:

```javascript
const rawSalesData = [
	{ productId: "P001", customerId: "C001", amount: 150, date: "2024-01-15" },
	{ productId: "P002", customerId: "C002", amount: 200, date: "2024-01-16" },
	{ productId: "P001", customerId: "C001", amount: 75, date: "2024-01-17" },
];

const products = [
	{ id: "P001", name: "Laptop", category: "Electronics", price: 1200 },
	{ id: "P002", name: "Book", category: "Education", price: 25 },
	{ id: "P003", name: "Headphones", category: "Electronics", price: 150 },
];

const customers = [
	{
		id: "C001",
		name: "Alice Johnson",
		email: "alice@example.com",
		region: "North",
	},
	{ id: "C002", name: "Bob Smith", email: "bob@example.com", region: "South" },
];

const categories = [
	{ id: "Electronics", name: "Electronic Devices", taxRate: 0.08 },
	{ id: "Education", name: "Educational Materials", taxRate: 0.05 },
];

const regions = [
	{ id: "North", name: "Northern Region", manager: "John Doe" },
	{ id: "South", name: "Southern Region", manager: "Jane Smith" },
];
```

## 1. Creating Lookup Tables

Lookup tables provide O(1) access to data by ID, making normalization efficient.

### Basic Lookup Table Creation

```javascript
// Product lookup by ID
const productLookup = products.reduce((acc, product) => {
	acc[product.id] = product;
	return acc;
}, {});

// Result: { 'P001': {id: 'P001', name: 'Laptop', ...}, 'P002': {...}, ... }

// Customer lookup by ID
const customerLookup = customers.reduce((acc, customer) => {
	acc[customer.id] = customer;
	return acc;
}, {});

// Category lookup by ID
const categoryLookup = categories.reduce((acc, category) => {
	acc[category.id] = category;
	return acc;
}, {});
```

### Multiple Lookup Tables from Single Source

```javascript
// Create all lookups from API response
const apiLookups = {
	customers: apiResponse.customers.reduce((acc, c) => {
		acc[c.id] = c;
		return acc;
	}, {}),
	products: apiResponse.products.reduce((acc, p) => {
		acc[p.id] = p;
		return acc;
	}, {}),
	regions: apiResponse.regions.reduce((acc, r) => {
		acc[r.id] = r;
		return acc;
	}, {}),
	categories: apiResponse.categories.reduce((acc, cat) => {
		acc[cat.id] = cat;
		return acc;
	}, {}),
};
```

### Reverse Lookups

Sometimes you need to lookup by different fields:

```javascript
// Lookup products by name (case-insensitive)
const productByName = products.reduce((acc, product) => {
	acc[product.name.toLowerCase()] = product;
	return acc;
}, {});

// Lookup customers by email
const customerByEmail = customers.reduce((acc, customer) => {
	acc[customer.email] = customer;
	return acc;
}, {});
```

## 2. Data Normalization Techniques

### Basic Normalization

```javascript
const normalizedSales = rawSalesData.map((sale) => ({
	...sale,
	product: productLookup[sale.productId],
	customer: customerLookup[sale.customerId],
}));

// Result: Each sale now has full product and customer objects
console.log(normalizedSales[0]);
// {
//   productId: 'P001',
//   customerId: 'C001',
//   amount: 150,
//   date: '2024-01-15',
//   product: { id: 'P001', name: 'Laptop', category: 'Electronics', price: 1200 },
//   customer: { id: 'C001', name: 'Alice Johnson', email: 'alice@example.com', region: 'North' }
// }
```

### Multi-Level Normalization

```javascript
const fullyNormalizedSales = rawSalesData.map((sale) => {
	const product = productLookup[sale.productId];
	const customer = customerLookup[sale.customerId];
	const category = categoryLookup[product?.category];
	const region = regionLookup[customer?.region];

	return {
		saleId: `${sale.productId}-${sale.customerId}-${sale.date}`,
		entities: {
			product: {
				...product,
				category: category,
			},
			customer: {
				...customer,
				region: region,
			},
		},
		transaction: {
			amount: sale.amount,
			date: sale.date,
			tax: sale.amount * (category?.taxRate || 0),
		},
	};
});
```

### Converting Denormalized to Normalized

```javascript
// Start with denormalized data
const denormalizedOrders = [
	{
		orderId: "ORD001",
		customerName: "Alice Johnson",
		productName: "Laptop",
		quantity: 1,
	},
];

// Create reverse lookups
const productByName = products.reduce((acc, p) => {
	acc[p.name.toLowerCase()] = p;
	return acc;
}, {});

const customerByName = customers.reduce((acc, c) => {
	acc[c.name.toLowerCase()] = c;
	return acc;
}, {});

// Normalize
const normalizedOrders = denormalizedOrders.map((order) => ({
	orderId: order.orderId,
	customerId: customerByName[order.customerName.toLowerCase()]?.id,
	productId: productByName[order.productName.toLowerCase()]?.id,
	quantity: order.quantity,
}));
```

## 3. Advanced Normalization Patterns

### Conditional Normalization

```javascript
const conditionalNormalized = rawSalesData.map((sale) => {
	const baseNormalized = {
		id: `${sale.productId}-${sale.customerId}-${sale.date}`,
		amount: sale.amount,
		date: sale.date,
	};

	// Only normalize if references exist
	if (productLookup[sale.productId]) {
		baseNormalized.product = productLookup[sale.productId];
	} else {
		baseNormalized.productError = `Product ${sale.productId} not found`;
	}

	if (customerLookup[sale.customerId]) {
		baseNormalized.customer = customerLookup[sale.customerId];
	} else {
		baseNormalized.customerError = `Customer ${sale.customerId} not found`;
	}

	return baseNormalized;
});
```

### Normalization with Validation

```javascript
function normalizeWithValidation(sale, lookups) {
	const errors = [];
	const warnings = [];

	// Validate references exist
	if (!lookups.products[sale.productId]) {
		errors.push(`Product ${sale.productId} not found`);
	}
	if (!lookups.customers[sale.customerId]) {
		errors.push(`Customer ${sale.customerId} not found`);
	}

	// Validate data types and ranges
	if (typeof sale.amount !== "number" || sale.amount <= 0) {
		errors.push("Invalid amount");
	}

	// Business rule validation
	const product = lookups.products[sale.productId];
	if (product && sale.amount > product.price * 2) {
		warnings.push("Sale amount significantly higher than product price");
	}

	return {
		normalized:
			errors.length === 0
				? {
						...sale,
						product: product,
						customer: lookups.customers[sale.customerId],
				  }
				: null,
		errors,
		warnings,
		original: sale,
	};
}
```

### API Response Normalization

```javascript
function normalizeApiResponse(apiData) {
	// Create lookup tables
	const lookups = {
		customers: apiData.customers.reduce((acc, c) => {
			acc[c.id] = c;
			return acc;
		}, {}),
		products: apiData.products.reduce((acc, p) => {
			acc[p.id] = p;
			return acc;
		}, {}),
		regions: apiData.regions.reduce((acc, r) => {
			acc[r.id] = r;
			return acc;
		}, {}),
		categories: apiData.categories.reduce((acc, cat) => {
			acc[cat.id] = cat;
			return acc;
		}, {}),
	};

	// Normalize orders with full entity resolution
	const normalizedOrders = apiData.orders.map((order) => {
		const customer = lookups.customers[order.customer_id];
		const product = lookups.products[order.product_id];
		const region = lookups.regions[customer?.region_id];
		const category = lookups.categories[product?.category_id];

		return {
			id: order.id,
			customer: customer,
			product: product,
			region: region,
			category: category,
			quantity: order.qty,
			date: order.date,
			calculated: {
				subtotal: (product?.base_price || 0) * order.qty,
				tax: (product?.base_price || 0) * order.qty * (category?.tax_rate || 0),
				total:
					(product?.base_price || 0) *
					order.qty *
					(1 + (category?.tax_rate || 0)),
			},
		};
	});

	return {
		orders: normalizedOrders,
		lookups: lookups,
		summary: {
			totalOrders: normalizedOrders.length,
			totalValue: normalizedOrders.reduce(
				(sum, order) => sum + order.calculated.total,
				0,
			),
			regions: [
				...new Set(normalizedOrders.map((o) => o.region?.name).filter(Boolean)),
			],
		},
	};
}
```

## 4. Practical Examples

### E-commerce Order Processing

```javascript
function processOrder(orderData, lookups) {
	const { productId, customerId, quantity } = orderData;

	const product = lookups.products[productId];
	const customer = lookups.customers[customerId];
	const category = lookups.categories[product?.category];

	if (!product) throw new Error(`Product ${productId} not found`);
	if (!customer) throw new Error(`Customer ${customerId} not found`);

	const subtotal = product.price * quantity;
	const tax = subtotal * (category?.taxRate || 0);
	const total = subtotal + tax;

	return {
		orderId: `ORD-${Date.now()}`,
		customer: customer,
		items: [
			{
				product: product,
				quantity: quantity,
				unitPrice: product.price,
				subtotal: subtotal,
				tax: tax,
			},
		],
		totals: {
			subtotal: subtotal,
			tax: tax,
			total: total,
		},
		timestamp: new Date().toISOString(),
	};
}
```

### Data Migration

```javascript
function migrateData(legacyRecords, lookups) {
	return legacyRecords.map((record) => ({
		id: `${record.prod_id}-${record.cust_id}-${record.dt}`,
		productId: record.prod_id,
		customerId: record.cust_id,
		amount: parseFloat(record.amt),
		date: record.dt,
		// Normalized references
		product: lookups.products[record.prod_id],
		customer: lookups.customers[record.cust_id],
		// Migration metadata
		migrated: true,
		migrationDate: new Date().toISOString(),
		originalFormat: "legacy",
	}));
}
```

### Real-time Data Synchronization

```javascript
class DataNormalizer {
	constructor() {
		this.lookups = {
			products: new Map(),
			customers: new Map(),
			categories: new Map(),
		};
	}

	// Update lookup tables
	updateLookup(entityType, entities) {
		entities.forEach((entity) => {
			this.lookups[entityType].set(entity.id, entity);
		});
	}

	// Normalize data in real-time
	normalize(data) {
		return data.map((item) => ({
			...item,
			product: this.lookups.products.get(item.productId),
			customer: this.lookups.customers.get(item.customerId),
			category: this.lookups.categories.get(
				this.lookups.products.get(item.productId)?.category,
			),
		}));
	}
}
```

## 5. Performance Considerations

### Lookup Table Performance

```javascript
// Test with large dataset
const largeDataSet = Array.from({ length: 10000 }, (_, i) => ({
	productId: `P${String(i % 100).padStart(3, "0")}`,
	customerId: `C${String(i % 50).padStart(3, "0")}`,
	amount: Math.floor(Math.random() * 1000) + 1,
}));

// Create lookup tables
const largeProductLookup = Array.from({ length: 100 }, (_, i) => ({
	id: `P${String(i).padStart(3, "0")}`,
	name: `Product ${i}`,
})).reduce((acc, p) => {
	acc[p.id] = p;
	return acc;
}, {});

console.time("Normalizing 10,000 records");
const normalizedLargeData = largeDataSet.map((record) => ({
	...record,
	product: largeProductLookup[record.productId],
}));
console.timeEnd("Normalizing 10,000 records");
// Result: ~1-2ms for 10,000 records
```

### Memory Usage Analysis

| Approach         | Time Complexity | Space Complexity  | Use Case                      |
| ---------------- | --------------- | ----------------- | ----------------------------- |
| Object lookups   | O(1) lookup     | O(n) storage      | Small to medium datasets      |
| Map lookups      | O(1) lookup     | O(n) storage      | Large datasets, any key type  |
| Array.find()     | O(n) lookup     | O(1) extra space  | Small arrays, simple searches |
| Database queries | O(log n)        | O(1) client space | Very large datasets           |

### Optimization Strategies

#### 1. Lazy Loading

```javascript
class LazyNormalizer {
	constructor(dataFetcher) {
		this.lookups = new Map();
		this.dataFetcher = dataFetcher;
	}

	async getNormalized(id, type) {
		if (!this.lookups.has(`${type}:${id}`)) {
			const data = await this.dataFetcher(type, id);
			this.lookups.set(`${type}:${id}`, data);
		}
		return this.lookups.get(`${type}:${id}`);
	}
}
```

#### 2. Caching Strategies

```javascript
class CachedNormalizer {
	constructor(maxSize = 1000) {
		this.lookups = new Map();
		this.maxSize = maxSize;
	}

	set(key, value) {
		if (this.lookups.size >= this.maxSize) {
			// Remove oldest entry (simple LRU)
			const firstKey = this.lookups.keys().next().value;
			this.lookups.delete(firstKey);
		}
		this.lookups.set(key, value);
	}

	get(key) {
		return this.lookups.get(key);
	}
}
```

#### 3. Batch Processing

```javascript
function normalizeBatch(records, lookups) {
	// Pre-validate all references
	const missingProducts = new Set();
	const missingCustomers = new Set();

	records.forEach((record) => {
		if (!lookups.products[record.productId]) {
			missingProducts.add(record.productId);
		}
		if (!lookups.customers[record.customerId]) {
			missingCustomers.add(record.customerId);
		}
	});

	// Report missing references
	if (missingProducts.size > 0 || missingCustomers.size > 0) {
		console.warn("Missing references detected:", {
			products: Array.from(missingProducts),
			customers: Array.from(missingCustomers),
		});
	}

	// Normalize valid records
	return records
		.filter(
			(record) =>
				lookups.products[record.productId] &&
				lookups.customers[record.customerId],
		)
		.map((record) => ({
			...record,
			product: lookups.products[record.productId],
			customer: lookups.customers[record.customerId],
		}));
}
```

## 6. Common Patterns and Best Practices

### Pattern 1: Entity Resolution

```javascript
function resolveEntity(id, type, lookups, fetcher = null) {
	// Check cache first
	if (lookups[type][id]) {
		return lookups[type][id];
	}

	// Try to fetch if fetcher provided
	if (fetcher) {
		try {
			const entity = fetcher(id, type);
			lookups[type][id] = entity;
			return entity;
		} catch (error) {
			console.warn(`Failed to fetch ${type} ${id}:`, error.message);
		}
	}

	// Return null if not found
	return null;
}
```

### Pattern 2: Safe Normalization

```javascript
function safeNormalize(data, lookups) {
	return data.map((item) => {
		const normalized = { ...item };

		// Safe entity resolution
		Object.keys(lookups).forEach((entityType) => {
			const idField = `${entityType.slice(0, -1)}Id`; // Remove 's' and add 'Id'
			if (item[idField]) {
				normalized[entityType.slice(0, -1)] =
					lookups[entityType][item[idField]] || null;
			}
		});

		return normalized;
	});
}
```

### Pattern 3: Validation Pipeline

```javascript
function createValidationPipeline(validators) {
	return function validateAndNormalize(data, lookups) {
		const results = data.map((item) => {
			const errors = [];
			const warnings = [];

			// Run all validators
			validators.forEach((validator) => {
				const result = validator(item, lookups);
				if (result.error) errors.push(result.error);
				if (result.warning) warnings.push(result.warning);
			});

			return {
				item,
				errors,
				warnings,
				isValid: errors.length === 0,
			};
		});

		return {
			valid: results.filter((r) => r.isValid).map((r) => r.item),
			invalid: results.filter((r) => !r.isValid),
			summary: {
				total: results.length,
				valid: results.filter((r) => r.isValid).length,
				invalid: results.filter((r) => !r.isValid).length,
			},
		};
	};
}
```

## 7. Database Normalization vs. Application Normalization

### Database Normalization (1NF, 2NF, 3NF)

- **Purpose**: Eliminate redundancy in stored data
- **Scope**: Database schema design
- **Impact**: Affects how data is stored permanently
- **Trade-offs**: May require complex joins for queries

### Application Normalization

- **Purpose**: Optimize data for application use
- **Scope**: Runtime data processing
- **Impact**: Affects how data is used in memory
- **Trade-offs**: Memory usage for lookup tables vs. processing speed

## 8. When to Use Normalization

### Use Normalization When:

- **Data relationships exist**: Multiple records reference the same entities
- **Data integrity matters**: Need to ensure consistency across records
- **Memory is not a constraint**: Can afford lookup table storage
- **Performance is critical**: O(1) lookups are faster than O(n) searches
- **Data comes from external sources**: APIs, databases, files

### Don't Use Normalization When:

- **Data is small and simple**: Direct embedding is fine
- **Memory is limited**: Mobile apps, embedded systems
- **Data is write-once, read-many**: And relationships are simple
- **Real-time performance isn't critical**: And data volume is small
- **Data structure changes frequently**: Lookup tables need maintenance

## 9. Common Mistakes and Solutions

### Mistake 1: Not Handling Missing References

```javascript
// Wrong
const normalized = data.map((item) => ({
	...item,
	product: productLookup[item.productId], // Throws error if undefined
}));

// Right
const normalized = data.map((item) => ({
	...item,
	product: productLookup[item.productId] || null,
}));
```

### Mistake 2: Creating Lookup Tables Inefficiently

```javascript
// Wrong - recreates lookup on every access
function getProduct(id) {
	const lookup = products.reduce((acc, p) => {
		acc[p.id] = p;
		return acc;
	}, {});
	return lookup[id];
}

// Right - create lookup once
const productLookup = products.reduce((acc, p) => {
	acc[p.id] = p;
	return acc;
}, {});

function getProduct(id) {
	return productLookup[id];
}
```

### Mistake 3: Not Updating Lookup Tables

```javascript
// Wrong - lookup becomes stale
const productLookup = products.reduce((acc, p) => {
	acc[p.id] = p;
	return acc;
}, {});

// Add new product but forget to update lookup
products.push(newProduct);

// Right - update lookup when data changes
function addProduct(product) {
	products.push(product);
	productLookup[product.id] = product;
}
```

## 10. Advanced Lookup Table Patterns

### Composite Keys

```javascript
// Lookup by multiple fields
const orderLookup = orders.reduce((acc, order) => {
	const key = `${order.customerId}-${order.productId}`;
	acc[key] = order;
	return acc;
}, {});

// Usage
const specificOrder = orderLookup[`${customerId}-${productId}`];
```

### Hierarchical Lookups

```javascript
// Nested lookup structure
const hierarchicalLookup = {
	byCategory: categories.reduce((acc, category) => {
		acc[category.id] = {
			...category,
			products: products.filter((p) => p.category === category.id),
		};
		return acc;
	}, {}),
	byRegion: regions.reduce((acc, region) => {
		acc[region.id] = {
			...region,
			customers: customers.filter((c) => c.region === region.id),
		};
		return acc;
	}, {}),
};
```

### Indexed Lookups

```javascript
// Multiple indexes for different access patterns
class IndexedLookup {
	constructor(entities, indexes = []) {
		this.entities = entities;
		this.indexes = {};

		// Create primary index
		this.indexes.id = entities.reduce((acc, entity) => {
			acc[entity.id] = entity;
			return acc;
		}, {});

		// Create additional indexes
		indexes.forEach((indexField) => {
			this.indexes[indexField] = entities.reduce((acc, entity) => {
				const key = entity[indexField];
				if (key) {
					if (!acc[key]) acc[key] = [];
					acc[key].push(entity);
				}
				return acc;
			}, {});
		});
	}

	findById(id) {
		return this.indexes.id[id];
	}

	findBy(field, value) {
		return this.indexes[field]?.[value] || [];
	}
}

// Usage
const productIndex = new IndexedLookup(products, ["category", "name"]);
const electronics = productIndex.findBy("category", "Electronics");
const laptop = productIndex.findBy("name", "Laptop")[0];
```

## Summary

Data normalization using lookup tables is a cornerstone of efficient JavaScript data processing:

### Key Concepts:

- **Lookup tables**: O(1) access structures created with `reduce()`
- **Normalization**: Converting IDs to full objects for data integrity
- **Performance**: Trading memory for speed with lookup tables
- **Validation**: Ensuring data consistency during normalization

### Core Patterns:

- **Basic normalization**: ID-to-object resolution
- **Multi-level normalization**: Resolving nested relationships
- **Conditional normalization**: Handling missing references gracefully
- **Validation during normalization**: Ensuring data quality

### Best Practices:

- Create lookup tables once, reuse everywhere
- Handle missing references appropriately
- Update lookup tables when underlying data changes
- Consider memory vs. performance trade-offs
- Use appropriate data structures (Objects vs Maps)

### When to Apply:

- Working with relational data from APIs or databases
- Processing large datasets where performance matters
- Ensuring data consistency across multiple operations
- Building maintainable, scalable data processing pipelines

Lookup table normalization transforms chaotic, redundant data into structured, efficient, and maintainable information systems. It's a fundamental pattern that every JavaScript developer should master for building robust data-intensive applications.
