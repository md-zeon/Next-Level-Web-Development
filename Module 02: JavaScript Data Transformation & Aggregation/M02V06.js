/*
 * 2-6: The Common Pattern - Normalizing using lookup table
 * Data normalization techniques and lookup table patterns
 */

// Sample data for demonstrations
const rawSalesData = [
	{ productId: "P001", customerId: "C001", amount: 150, date: "2024-01-15" },
	{ productId: "P002", customerId: "C002", amount: 200, date: "2024-01-16" },
	{ productId: "P001", customerId: "C001", amount: 75, date: "2024-01-17" },
	{ productId: "P003", customerId: "C003", amount: 300, date: "2024-01-18" },
	{ productId: "P002", customerId: "C002", amount: 125, date: "2024-01-19" },
];

const products = [
	{ id: "P001", name: "Laptop", category: "Electronics", price: 1200 },
	{ id: "P002", name: "Book", category: "Education", price: 25 },
	{ id: "P003", name: "Headphones", category: "Electronics", price: 150 },
	{ id: "P004", name: "Coffee Mug", category: "Kitchen", price: 15 },
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
		name: "Charlie Brown",
		email: "charlie@example.com",
		region: "East",
	},
	{
		id: "C004",
		name: "Diana Prince",
		email: "diana@example.com",
		region: "West",
	},
];

const categories = [
	{ id: "Electronics", name: "Electronic Devices", taxRate: 0.08 },
	{ id: "Education", name: "Educational Materials", taxRate: 0.05 },
	{ id: "Kitchen", name: "Kitchenware", taxRate: 0.06 },
	{ id: "Clothing", name: "Apparel", taxRate: 0.07 },
];

const regions = [
	{
		id: "North",
		name: "Northern Region",
		manager: "John Doe",
		timezone: "EST",
	},
	{
		id: "South",
		name: "Southern Region",
		manager: "Jane Smith",
		timezone: "CST",
	},
	{
		id: "East",
		name: "Eastern Region",
		manager: "Bob Johnson",
		timezone: "EST",
	},
	{
		id: "West",
		name: "Western Region",
		manager: "Alice Brown",
		timezone: "PST",
	},
];

// Denormalized data (problematic)
const denormalizedOrders = [
	{
		orderId: "ORD001",
		customerName: "Alice Johnson",
		customerEmail: "alice@example.com",
		customerRegion: "North",
		productName: "Laptop",
		productCategory: "Electronics",
		productPrice: 1200,
		quantity: 1,
		orderDate: "2024-01-15",
	},
	{
		orderId: "ORD002",
		customerName: "Bob Smith",
		customerEmail: "bob@example.com",
		customerRegion: "South",
		productName: "Book",
		productCategory: "Education",
		productPrice: 25,
		quantity: 3,
		orderDate: "2024-01-16",
	},
];

// API response data that needs normalization
const apiResponse = {
	orders: [
		{
			id: "ORD001",
			customer_id: "C001",
			product_id: "P001",
			qty: 1,
			date: "2024-01-15",
		},
		{
			id: "ORD002",
			customer_id: "C002",
			product_id: "P002",
			qty: 3,
			date: "2024-01-16",
		},
		{
			id: "ORD003",
			customer_id: "C001",
			product_id: "P003",
			qty: 2,
			date: "2024-01-17",
		},
	],
	customers: [
		{ id: "C001", name: "Alice Johnson", region_id: "R001" },
		{ id: "C002", name: "Bob Smith", region_id: "R002" },
	],
	products: [
		{ id: "P001", name: "Laptop", category_id: "CAT001", base_price: 1200 },
		{ id: "P002", name: "Book", category_id: "CAT002", base_price: 25 },
		{ id: "P003", name: "Headphones", category_id: "CAT001", base_price: 150 },
	],
	regions: [
		{ id: "R001", name: "North America", code: "NA" },
		{ id: "R002", name: "Europe", code: "EU" },
	],
	categories: [
		{ id: "CAT001", name: "Electronics", tax_rate: 0.08 },
		{ id: "CAT002", name: "Education", tax_rate: 0.05 },
	],
};

console.log("=== Original Data ===");
console.log("Raw Sales Data:", rawSalesData);
console.log(
	"Products:",
	products.map((p) => `${p.id}: ${p.name}`),
);
console.log(
	"Customers:",
	customers.map((c) => `${c.id}: ${c.name}`),
);
console.log(
	"Categories:",
	categories.map((cat) => `${cat.id}: ${cat.name}`),
);
console.log(
	"Regions:",
	regions.map((r) => `${r.id}: ${r.name}`),
);

// ==========================================
// CREATING LOOKUP TABLES
// ==========================================
console.log("\n=== CREATING LOOKUP TABLES ===");

// 1. Basic lookup table creation
console.log("\n--- BASIC LOOKUP TABLES ---");

// Product lookup by ID
const productLookup = products.reduce((acc, product) => {
	acc[product.id] = product;
	return acc;
}, {});

console.log("Product lookup table:");
Object.entries(productLookup).forEach(([id, product]) => {
	console.log(`  ${id}: ${product.name} ($${product.price})`);
});

// Customer lookup by ID
const customerLookup = customers.reduce((acc, customer) => {
	acc[customer.id] = customer;
	return acc;
}, {});

console.log("Customer lookup table:");
Object.entries(customerLookup).forEach(([id, customer]) => {
	console.log(`  ${id}: ${customer.name} (${customer.region})`);
});

// Category lookup by ID
const categoryLookup = categories.reduce((acc, category) => {
	acc[category.id] = category;
	return acc;
}, {});

// Region lookup by ID
const regionLookup = regions.reduce((acc, region) => {
	acc[region.id] = region;
	return acc;
}, {});

// 2. Multiple lookup tables from single data source
console.log("\n--- MULTIPLE LOOKUP TABLES ---");

// Create lookups for API response data
const apiLookups = {
	customers: apiResponse.customers.reduce((acc, customer) => {
		acc[customer.id] = customer;
		return acc;
	}, {}),
	products: apiResponse.products.reduce((acc, product) => {
		acc[product.id] = product;
		return acc;
	}, {}),
	regions: apiResponse.regions.reduce((acc, region) => {
		acc[region.id] = region;
		return acc;
	}, {}),
	categories: apiResponse.categories.reduce((acc, category) => {
		acc[category.id] = category;
		return acc;
	}, {}),
};

console.log("API lookup tables created for:", Object.keys(apiLookups));

// ==========================================
// DATA NORMALIZATION TECHNIQUES
// ==========================================
console.log("\n=== DATA NORMALIZATION TECHNIQUES ===");

// 1. Normalizing raw sales data
console.log("\n--- NORMALIZING RAW SALES DATA ---");

const normalizedSales = rawSalesData.map((sale) => ({
	...sale,
	product: productLookup[sale.productId],
	customer: customerLookup[sale.customerId],
}));

console.log("Normalized sales data:");
normalizedSales.forEach((sale) => {
	console.log(
		`  ${sale.customer.name} bought ${sale.product.name} for $${sale.amount}`,
	);
});

// 2. Normalizing API response data
console.log("\n--- NORMALIZING API RESPONSE DATA ---");

const normalizedOrders = apiResponse.orders.map((order) => {
	const customer = apiLookups.customers[order.customer_id];
	const product = apiLookups.products[order.product_id];
	const region = apiLookups.regions[customer?.region_id];
	const category = apiLookups.categories[product?.category_id];

	return {
		orderId: order.id,
		customer: {
			id: customer?.id,
			name: customer?.name,
			region: region?.name,
		},
		product: {
			id: product?.id,
			name: product?.name,
			category: category?.name,
			basePrice: product?.base_price,
			taxRate: category?.tax_rate,
		},
		quantity: order.qty,
		orderDate: order.date,
		totalAmount: (product?.base_price || 0) * order.qty,
		taxAmount:
			(product?.base_price || 0) * order.qty * (category?.tax_rate || 0),
	};
});

console.log("Normalized orders:");
normalizedOrders.forEach((order) => {
	console.log(
		`  Order ${order.orderId}: ${order.customer.name} ordered ${order.quantity}x ${order.product.name}`,
	);
	console.log(
		`    Total: $${order.totalAmount}, Tax: $${order.taxAmount.toFixed(2)}`,
	);
});

// 3. Converting denormalized data to normalized
console.log("\n--- CONVERTING DENORMALIZED TO NORMALIZED ---");

// Create reverse lookups (by name)
const productByName = products.reduce((acc, product) => {
	acc[product.name.toLowerCase()] = product;
	return acc;
}, {});

const customerByName = customers.reduce((acc, customer) => {
	acc[customer.name.toLowerCase()] = customer;
	return acc;
}, {});

const categoryByName = categories.reduce((acc, category) => {
	acc[category.name.toLowerCase()] = category;
	return acc;
}, {});

const regionByName = regions.reduce((acc, region) => {
	acc[region.name.toLowerCase()] = region;
	return acc;
}, {});

// Normalize denormalized orders
const normalizedFromDenormalized = denormalizedOrders.map((order) => ({
	orderId: order.orderId,
	customerId: customerByName[order.customerName.toLowerCase()]?.id,
	productId: productByName[order.productName.toLowerCase()]?.id,
	quantity: order.quantity,
	orderDate: order.orderDate,
	// Additional computed fields
	totalAmount: order.productPrice * order.quantity,
	categoryId: categoryByName[order.productCategory.toLowerCase()]?.id,
	regionId: regionByName[order.customerRegion.toLowerCase()]?.id,
}));

console.log("Normalized from denormalized data:");
normalizedFromDenormalized.forEach((order) => {
	console.log(
		`  Order ${order.orderId}: Customer ${order.customerId}, Product ${order.productId}, Total $${order.totalAmount}`,
	);
});

// ==========================================
// ADVANCED NORMALIZATION PATTERNS
// ==========================================
console.log("\n=== ADVANCED NORMALIZATION PATTERNS ===");

// 1. Multi-level normalization
console.log("\n--- MULTI-LEVEL NORMALIZATION ---");

const fullyNormalizedSales = rawSalesData.map((sale) => {
	const product = productLookup[sale.productId];
	const customer = customerLookup[sale.customerId];
	const category = categoryLookup[product?.category];
	const region = regionLookup[customer?.region];

	return {
		saleId: `${sale.productId}-${sale.customerId}-${sale.date}`,
		timestamp: new Date(sale.date).getTime(),
		entities: {
			product: {
				id: product?.id,
				name: product?.name,
				price: product?.price,
				category: {
					id: category?.id,
					name: category?.name,
					taxRate: category?.taxRate,
				},
			},
			customer: {
				id: customer?.id,
				name: customer?.name,
				email: customer?.email,
				region: {
					id: region?.id,
					name: region?.name,
					manager: region?.manager,
					timezone: region?.timezone,
				},
			},
		},
		transaction: {
			amount: sale.amount,
			date: sale.date,
			computed: {
				tax: sale.amount * (category?.taxRate || 0),
				netAmount: sale.amount * (1 - (category?.taxRate || 0)),
			},
		},
	};
});

console.log("Fully normalized sales (first one):");
console.log(JSON.stringify(fullyNormalizedSales[0], null, 2));

// 2. Conditional normalization
console.log("\n--- CONDITIONAL NORMALIZATION ---");

const conditionalNormalized = rawSalesData.map((sale) => {
	const baseNormalized = {
		id: `${sale.productId}-${sale.customerId}-${sale.date}`,
		amount: sale.amount,
		date: sale.date,
	};

	// Only normalize if product exists
	if (productLookup[sale.productId]) {
		baseNormalized.product = productLookup[sale.productId];
	} else {
		baseNormalized.productError = `Product ${sale.productId} not found`;
	}

	// Only normalize if customer exists
	if (customerLookup[sale.customerId]) {
		baseNormalized.customer = customerLookup[sale.customerId];
	} else {
		baseNormalized.customerError = `Customer ${sale.customerId} not found`;
	}

	return baseNormalized;
});

console.log("Conditional normalization results:");
conditionalNormalized.forEach((item) => {
	if (item.productError || item.customerError) {
		console.log(
			`  ${item.id}: ${item.productError || ""} ${
				item.customerError || ""
			}`.trim(),
		);
	} else {
		console.log(
			`  ${item.id}: ${item.product.name} sold to ${item.customer.name}`,
		);
	}
});

// 3. Normalization with data validation
console.log("\n--- NORMALIZATION WITH VALIDATION ---");

function normalizeWithValidation(sale, lookups) {
	const errors = [];
	const warnings = [];

	// Validate product
	if (!lookups.products[sale.productId]) {
		errors.push(`Product ${sale.productId} not found`);
	}

	// Validate customer
	if (!lookups.customers[sale.customerId]) {
		errors.push(`Customer ${sale.customerId} not found`);
	}

	// Validate amount
	if (typeof sale.amount !== "number" || sale.amount <= 0) {
		errors.push("Invalid amount");
	}

	// Check for data consistency
	const product = lookups.products[sale.productId];
	const customer = lookups.customers[sale.customerId];

	if (product && customer && sale.amount > product.price * 2) {
		warnings.push("Sale amount significantly higher than product price");
	}

	return {
		normalized:
			errors.length === 0
				? {
						...sale,
						product: product,
						customer: customer,
				  }
				: null,
		errors,
		warnings,
		original: sale,
	};
}

const validationResults = rawSalesData.map((sale) =>
	normalizeWithValidation(sale, {
		products: productLookup,
		customers: customerLookup,
	}),
);

console.log("Validation results:");
validationResults.forEach((result, index) => {
	const sale = result.original;
	console.log(`  Sale ${index + 1} (${sale.productId}-${sale.customerId}):`);
	if (result.errors.length > 0) {
		console.log(`    Errors: ${result.errors.join(", ")}`);
	}
	if (result.warnings.length > 0) {
		console.log(`    Warnings: ${result.warnings.join(", ")}`);
	}
	if (result.normalized) {
		console.log(
			`    ✓ Validated: ${result.normalized.product.name} → ${result.normalized.customer.name}`,
		);
	}
});

// ==========================================
// PRACTICAL EXAMPLES
// ==========================================
console.log("\n=== PRACTICAL EXAMPLES ===");

// 1. E-commerce order processing
console.log("\n--- E-COMMERCE ORDER PROCESSING ---");

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

try {
	const order = processOrder(
		{ productId: "P001", customerId: "C001", quantity: 2 },
		{
			products: productLookup,
			customers: customerLookup,
			categories: categoryLookup,
		},
	);
	console.log("Processed order:", order.orderId);
	console.log(`  Customer: ${order.customer.name}`);
	console.log(
		`  Product: ${order.items[0].product.name} x${order.items[0].quantity}`,
	);
	console.log(`  Total: $${order.totals.total}`);
} catch (error) {
	console.log("Order processing error:", error.message);
}

// 2. Data migration and transformation
console.log("\n--- DATA MIGRATION ---");

const legacyData = [
	{ prod_id: "P001", cust_id: "C001", amt: "150.00", dt: "2024-01-15" },
	{ prod_id: "P002", cust_id: "C002", amt: "200.00", dt: "2024-01-16" },
];

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

const migratedData = migrateData(legacyData, {
	products: productLookup,
	customers: customerLookup,
});
console.log("Migrated data:");
migratedData.forEach((record) => {
	console.log(
		`  ${record.id}: ${record.product?.name} → ${record.customer?.name} ($${record.amount})`,
	);
});

// 3. API response normalization
console.log("\n--- API RESPONSE NORMALIZATION ---");

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

	// Normalize orders
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

const normalizedApiData = normalizeApiResponse(apiResponse);
console.log("API normalization summary:");
console.log(`  Orders: ${normalizedApiData.summary.totalOrders}`);
console.log(
	`  Total value: $${normalizedApiData.summary.totalValue.toFixed(2)}`,
);
console.log(`  Regions: ${normalizedApiData.summary.regions.join(", ")}`);

// ==========================================
// PERFORMANCE CONSIDERATIONS
// ==========================================
console.log("\n=== PERFORMANCE CONSIDERATIONS ===");

// Test lookup table performance
const largeDataSet = Array.from({ length: 10000 }, (_, i) => ({
	productId: `P${String(i % 100).padStart(3, "0")}`,
	customerId: `C${String(i % 50).padStart(3, "0")}`,
	amount: Math.floor(Math.random() * 1000) + 1,
	date: "2024-01-01",
}));

const largeProductLookup = Array.from({ length: 100 }, (_, i) => ({
	id: `P${String(i).padStart(3, "0")}`,
	name: `Product ${i}`,
	price: Math.floor(Math.random() * 1000) + 1,
})).reduce((acc, p) => {
	acc[p.id] = p;
	return acc;
}, {});

const largeCustomerLookup = Array.from({ length: 50 }, (_, i) => ({
	id: `C${String(i).padStart(3, "0")}`,
	name: `Customer ${i}`,
	region: ["North", "South", "East", "West"][i % 4],
})).reduce((acc, c) => {
	acc[c.id] = c;
	return acc;
}, {});

console.time("Normalizing 10,000 records with lookups");
const normalizedLargeData = largeDataSet.map((record) => ({
	...record,
	product: largeProductLookup[record.productId],
	customer: largeCustomerLookup[record.customerId],
}));
console.timeEnd("Normalizing 10,000 records with lookups");

console.log(`Normalized ${normalizedLargeData.length} records successfully`);

// Memory usage comparison
console.log("\n--- Memory Usage Notes ---");
console.log("• Lookup tables use O(n) memory for n unique items");
console.log("• Normalization is O(m) time for m records to normalize");
console.log("• Lookup table creation is O(n) time and space");
console.log("• Consider memory vs performance trade-offs for large datasets");

console.log("\n=== Lesson Complete ===");
console.log("Data normalization with lookup tables is a powerful pattern!");
console.log("Key takeaways:");
console.log("• Create lookup tables for O(1) data access");
console.log("• Normalize data to reduce redundancy and improve consistency");
console.log("• Use validation during normalization");
console.log("• Consider performance implications for large datasets");

// module tasks

// generate lookup table

//? Input
const postsArray = [
	{ id: "p-101", title: "Intro to JavaScript", author: "Alex" },
	{ id: "p-102", title: "Advanced CSS Techniques", author: "Maria" },
	{ id: "p-103", title: "Understanding HTML5", author: "John" },
];

const lookupTable = postsArray.reduce((table, post) => {
	table[post.id] = post;
	return table;
}, {});

console.log(lookupTable);

//? Output
/*
{
	"p-101": { id: "p-101", title: "Intro to JavaScript", author: "Alex" },
	"p-102": { id: "p-102", title: "Advanced CSS Techniques", author: "Maria" },
	"p-103": { id: "p-103", title: "Understanding HTML5", author: "John" },
}
*/

// const post = postsArray.find((post) => post.id === "p-103"); // O(n)

const post = lookupTable["p-103"]; // O(1)
console.log(post);

for (let postId in lookupTable) {
	console.log(lookupTable[postId]);
}
