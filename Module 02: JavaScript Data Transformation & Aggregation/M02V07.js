// M02V07.js - Solution for Scenario Based Activity - Grouping Data

// Sample Data
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

// Create lookup tables for efficient data access
const productLookup = products.reduce((acc, product) => {
	acc[product.id] = product;
	return acc;
}, {});

const customerLookup = customers.reduce((acc, customer) => {
	acc[customer.id] = customer;
	return acc;
}, {});

// Utility Functions
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

function calculateMetrics(transactions) {
	const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
	const transactionCount = transactions.length;
	const totalQuantity = transactions.reduce((sum, t) => sum + t.quantity, 0);
	const averageTransaction =
		transactionCount > 0 ? totalAmount / transactionCount : 0;

	return {
		totalAmount,
		transactionCount,
		totalQuantity,
		averageTransaction,
	};
}

// Task 1: Basic Grouping by Region
function groupSalesByRegion(transactions) {
	const grouped = groupBy(transactions, (t) => t.region);
	const result = {};

	// Sort regions by total sales (descending)
	const sortedRegions = Object.keys(grouped).sort((a, b) => {
		const totalA = grouped[a].reduce((sum, t) => sum + t.amount, 0);
		const totalB = grouped[b].reduce((sum, t) => sum + t.amount, 0);
		return totalB - totalA;
	});

	sortedRegions.forEach((region) => {
		result[region] = calculateMetrics(grouped[region]);
	});

	return result;
}

// Task 2: Grouping by Product Category
function groupSalesByCategory(transactions) {
	const grouped = groupBy(transactions, (t) => {
		const product = productLookup[t.productId];
		return product ? product.category : "Unknown";
	});

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

// Task 3: Multi-Level Grouping (Region + Product)
function groupSalesByRegionAndProduct(transactions) {
	const result = {};

	// First group by region
	const byRegion = groupBy(transactions, (t) => t.region);

	Object.keys(byRegion).forEach((region) => {
		result[region] = {};

		// Then group by product within each region
		const byProduct = groupBy(byRegion[region], (t) => t.productId);

		Object.keys(byProduct).forEach((productId) => {
			result[region][productId] = calculateMetrics(byProduct[productId]);
		});
	});

	return result;
}

// Task 4: Time-Based Grouping (Daily Sales)
function groupSalesByDate(transactions) {
	const grouped = groupBy(transactions, (t) => t.date);
	const result = [];

	// Sort dates chronologically
	const sortedDates = Object.keys(grouped).sort();

	sortedDates.forEach((date) => {
		const dayTransactions = grouped[date];
		const metrics = calculateMetrics(dayTransactions);

		result.push({
			date,
			...metrics,
		});
	});

	return result;
}

// Task 5: Customer Analysis with Grouping
function analyzeCustomerPurchasing(transactions) {
	const grouped = groupBy(transactions, (t) => t.customerId);
	const result = [];

	Object.keys(grouped).forEach((customerId) => {
		const customerTransactions = grouped[customerId];
		const customer = customerLookup[customerId];
		const metrics = calculateMetrics(customerTransactions);

		// Find most purchased category
		const categoryCounts = customerTransactions.reduce((acc, t) => {
			const category = productLookup[t.productId]?.category || "Unknown";
			acc[category] = (acc[category] || 0) + t.quantity;
			return acc;
		}, {});

		const topCategory = Object.keys(categoryCounts).reduce((a, b) =>
			categoryCounts[a] > categoryCounts[b] ? a : b,
		);

		result.push({
			customerId,
			customerName: customer?.name || "Unknown",
			email: customer?.email || "Unknown",
			totalSpent: metrics.totalAmount,
			transactionCount: metrics.transactionCount,
			averageTransaction: Math.round(metrics.averageTransaction * 100) / 100,
			topCategory,
			totalQuantity: metrics.totalQuantity,
		});
	});

	// Sort by total spent (descending)
	return result.sort((a, b) => b.totalSpent - a.totalSpent);
}

// Task 6: Advanced Analytics - Product Performance Matrix
function createProductPerformanceMatrix(transactions) {
	const result = {};

	// First group by product
	const byProduct = groupBy(transactions, (t) => t.productId);

	Object.keys(byProduct).forEach((productId) => {
		const productTransactions = byProduct[productId];
		const overallMetrics = calculateMetrics(productTransactions);

		// Then group by region within each product
		const byRegion = groupBy(productTransactions, (t) => t.region);
		const regionMetrics = {};

		Object.keys(byRegion).forEach((region) => {
			const regionTransactions = byRegion[region];
			const metrics = calculateMetrics(regionTransactions);
			const avgPricePerUnit =
				regionTransactions.length > 0
					? metrics.totalAmount / metrics.totalQuantity
					: 0;

			regionMetrics[region] = {
				...metrics,
				avgPricePerUnit: Math.round(avgPricePerUnit * 100) / 100,
			};
		});

		result[productId] = {
			overall: overallMetrics,
			byRegion: regionMetrics,
		};
	});

	return result;
}

// Advanced Challenge 1: Dynamic Grouping Function
function dynamicGroupBy(array, groupByFn, aggregateFn = calculateMetrics) {
	const grouped = groupBy(array, groupByFn);
	const result = {};

	Object.keys(grouped).forEach((key) => {
		result[key] = aggregateFn(grouped[key]);
	});

	return result;
}

// Test Functions
function runAllTasks() {
	console.log("=".repeat(60));
	console.log("SCENARIO BASED ACTIVITY: GROUPING DATA");
	console.log("=".repeat(60));

	console.log("\n📊 TASK 1: Basic Grouping by Region");
	console.log(JSON.stringify(groupSalesByRegion(salesTransactions), null, 2));

	console.log("\n📊 TASK 2: Grouping by Product Category");
	console.log(JSON.stringify(groupSalesByCategory(salesTransactions), null, 2));

	console.log("\n📊 TASK 3: Multi-Level Grouping (Region + Product)");
	console.log(
		JSON.stringify(groupSalesByRegionAndProduct(salesTransactions), null, 2),
	);

	console.log("\n📊 TASK 4: Time-Based Grouping (Daily Sales)");
	const dailySales = groupSalesByDate(salesTransactions);
	console.log(JSON.stringify(dailySales, null, 2));

	// Identify best and worst performing days
	const bestDay = dailySales.reduce((best, day) =>
		day.totalAmount > best.totalAmount ? day : best,
	);
	const worstDay = dailySales.reduce((worst, day) =>
		day.totalAmount < worst.totalAmount ? day : worst,
	);

	console.log(
		`\n🏆 Best performing day: ${bestDay.date} ($${bestDay.totalAmount})`,
	);
	console.log(
		`📉 Worst performing day: ${worstDay.date} ($${worstDay.totalAmount})`,
	);

	console.log("\n📊 TASK 5: Customer Analysis");
	console.log(
		JSON.stringify(analyzeCustomerPurchasing(salesTransactions), null, 2),
	);

	console.log("\n📊 TASK 6: Product Performance Matrix");
	console.log(
		JSON.stringify(createProductPerformanceMatrix(salesTransactions), null, 2),
	);

	console.log("\n🚀 CHALLENGE 1: Dynamic Grouping");
	const salesByRegionAndCategory = dynamicGroupBy(
		salesTransactions,
		(t) => `${t.region}-${productLookup[t.productId]?.category || "Unknown"}`,
		(transactions) => ({
			totalAmount: transactions.reduce((sum, t) => sum + t.amount, 0),
			count: transactions.length,
		}),
	);
	console.log("Sales by Region-Category combination:");
	console.log(JSON.stringify(salesByRegionAndCategory, null, 2));
}

// Performance Benchmarking Challenge
function benchmarkGrouping() {
	console.log("\n⚡ PERFORMANCE BENCHMARK");

	// Create a larger dataset for benchmarking
	const largeDataSet = Array.from({ length: 10000 }, (_, i) => ({
		id: `T${String(i + 1).padStart(5, "0")}`,
		productId: `P${String((i % 5) + 1).padStart(3, "0")}`,
		customerId: `C${String((i % 5) + 1).padStart(3, "0")}`,
		region: ["North", "South", "East", "West"][i % 4],
		amount: Math.floor(Math.random() * 1000) + 1,
		quantity: Math.floor(Math.random() * 5) + 1,
		date: `2024-01-${String((i % 28) + 1).padStart(2, "0")}`,
	}));

	// Benchmark Object-based grouping
	console.time("Object-based grouping (10,000 records)");
	const objectGrouped = largeDataSet.reduce((groups, item) => {
		const key = item.region;
		if (!groups[key]) groups[key] = [];
		groups[key].push(item);
		return groups;
	}, {});
	Object.keys(objectGrouped).forEach((region) => {
		calculateMetrics(objectGrouped[region]);
	});
	console.timeEnd("Object-based grouping (10,000 records)");

	// Benchmark Map-based grouping
	console.time("Map-based grouping (10,000 records)");
	const mapGrouped = new Map();
	largeDataSet.forEach((item) => {
		const key = item.region;
		if (!mapGrouped.has(key)) mapGrouped.set(key, []);
		mapGrouped.get(key).push(item);
	});
	mapGrouped.forEach((transactions) => {
		calculateMetrics(transactions);
	});
	console.timeEnd("Map-based grouping (10,000 records)");
}

// Real-time Grouping Challenge
class RealTimeGrouper {
	constructor(groupByFn, aggregateFn = calculateMetrics) {
		this.groups = new Map();
		this.groupByFn = groupByFn;
		this.aggregateFn = aggregateFn;
	}

	addDataItem(item) {
		const key = this.groupByFn(item);
		if (!this.groups.has(key)) {
			this.groups.set(key, []);
		}
		this.groups.get(key).push(item);
	}

	getGroupedResults() {
		const result = {};
		this.groups.forEach((items, key) => {
			result[key] = this.aggregateFn(items);
		});
		return result;
	}

	getGroupSize(groupKey) {
		return this.groups.get(groupKey)?.length || 0;
	}

	clear() {
		this.groups.clear();
	}
}

// Demonstration of Real-time Grouping
function demonstrateRealTimeGrouping() {
	console.log("\n🔄 REAL-TIME GROUPING DEMONSTRATION");

	const realTimeGrouper = new RealTimeGrouper(
		(transaction) => transaction.region,
		calculateMetrics,
	);

	// Simulate streaming data
	const streamingData = salesTransactions.slice(); // Copy the array

	console.log("Processing transactions in real-time...");
	streamingData.forEach((transaction, index) => {
		realTimeGrouper.addDataItem(transaction);

		// Log progress every 3 transactions
		if ((index + 1) % 3 === 0) {
			console.log(`Processed ${index + 1} transactions:`);
			console.log(JSON.stringify(realTimeGrouper.getGroupedResults(), null, 2));
		}
	});

	console.log("\nFinal grouped results:");
	console.log(JSON.stringify(realTimeGrouper.getGroupedResults(), null, 2));
}

// Validation Functions
function validateTask1() {
	const result = groupSalesByRegion(salesTransactions);
	const expected = {
		North: { totalAmount: 6500, transactionCount: 5, totalQuantity: 8 },
		South: { totalAmount: 850, transactionCount: 2, totalQuantity: 3 },
		East: { totalAmount: 100, transactionCount: 2, totalQuantity: 4 },
		West: { totalAmount: 150, transactionCount: 1, totalQuantity: 1 },
	};

	console.log("\n✅ TASK 1 VALIDATION:");
	console.log("Expected North total:", expected.North.totalAmount);
	console.log("Actual North total:", result.North?.totalAmount);
	console.log(
		"Match:",
		result.North?.totalAmount === expected.North.totalAmount ? "✅" : "❌",
	);
}

// Main execution
if (require.main === module) {
	runAllTasks();
	benchmarkGrouping();
	demonstrateRealTimeGrouping();
	validateTask1();
}

module.exports = {
	salesTransactions,
	products,
	customers,
	productLookup,
	customerLookup,
	groupBy,
	calculateMetrics,
	groupSalesByRegion,
	groupSalesByCategory,
	groupSalesByRegionAndProduct,
	groupSalesByDate,
	analyzeCustomerPurchasing,
	createProductPerformanceMatrix,
	dynamicGroupBy,
	RealTimeGrouper,
};

// Module video Task

//* Grouping and Aggregating Data

// Scenario: Count every survey and group by response

//? input
const surveyResponses = [
	"A",
	"C",
	"B",
	"A",
	"B",
	"B",
	"C",
	"A",
	"B",
	"D",
	"A",
	"C",
	"B",
	"A",
];

//TODO: Initiate Empty Object
//TODO: Check if the response already exists or not
//TODO: If it exists then increment the count
//TODO: Otherwise initialize it with 1

// my solution
const freq = surveyResponses.reduce((acc, survey) => {
	if (acc[survey]) {
		acc[survey]++;
	} else {
		acc[survey] = 1;
	}
	return acc;
}, {});

// instructor solution

const count = surveyResponses.reduce((table, response) => {
	// console.log(table, " : ", response);
	// if (table[response]) {
	// 	table[response] = table[response] + 1;
	// } else {
	// 	table[response] = 1;
	// }

	table[response] = (table[response] || 0) + 1;
	return table;
}, {});

//? Output
// { A: 5, C: 3, B: 5, D: 1 }

console.log("Frequency Count:", freq);
console.log("Count: ", count);
