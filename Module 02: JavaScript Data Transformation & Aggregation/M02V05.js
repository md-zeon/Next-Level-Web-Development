/*
 * 2-5: From Simple Totals to Powerful Aggregation (reduce)
 * Mastering the reduce method for data aggregation and transformation
 */

// Sample data for demonstrations
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const prices = [29.99, 15.5, 89.99, 45.0, 12.99, 67.5];
const scores = [85, 92, 78, 95, 88, 76, 91, 84];

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

console.log("=== Original Data ===");
console.log("Numbers:", numbers);
console.log("Prices:", prices);
console.log(
	"Products:",
	products.map((p) => `${p.name} ($${p.price})`),
);
console.log(
	"Employees:",
	employees.map((e) => `${e.name} (${e.department})`),
);

// ==========================================
// BASIC REDUCE OPERATIONS
// ==========================================
console.log("\n=== BASIC REDUCE OPERATIONS ===");

// Syntax: array.reduce(callback(accumulator, currentValue, currentIndex, array), initialValue)

// 1. Sum - The classic reduce example
console.log("\n--- SUM ---");
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log("Sum of numbers:", sum); // 55

const totalPrices = prices.reduce((acc, price) => acc + price, 0);
console.log("Total prices:", totalPrices.toFixed(2)); // 260.97

// 2. Product
console.log("\n--- PRODUCT ---");
const product = numbers.slice(1, 6).reduce((acc, num) => acc * num, 1); // Skip 1 to avoid multiplying by 1
console.log("Product of 2-6:", product); // 720

// 3. Count
console.log("\n--- COUNT ---");
const count = products.reduce((acc) => acc + 1, 0);
console.log("Total products:", count);

const electronicsCount = products.reduce(
	(acc, product) => (product.category === "Electronics" ? acc + 1 : acc),
	0,
);
console.log("Electronics count:", electronicsCount);

// 4. Maximum and Minimum
console.log("\n--- MAXIMUM AND MINIMUM ---");
const max = numbers.reduce((acc, num) => Math.max(acc, num), -Infinity);
console.log("Maximum number:", max);

const min = numbers.reduce((acc, num) => Math.min(acc, num), Infinity);
console.log("Minimum number:", min);

const highestPrice = products.reduce(
	(acc, product) => (product.price > acc.price ? product : acc),
	{ price: -Infinity },
);
console.log(
	"Highest priced product:",
	highestPrice.name,
	`$${highestPrice.price}`,
);

// 5. Concatenation
console.log("\n--- CONCATENATION ---");
const words = ["Hello", "world", "from", "reduce"];
const sentence = words.reduce((acc, word) => acc + " " + word, "").trim();
console.log("Concatenated sentence:", sentence);

const allCategories = products.reduce((acc, product) => {
	if (!acc.includes(product.category)) {
		acc.push(product.category);
	}
	return acc;
}, []);
console.log("Unique categories:", allCategories);

// ==========================================
// ADVANCED AGGREGATION PATTERNS
// ==========================================
console.log("\n=== ADVANCED AGGREGATION PATTERNS ===");

// 1. Grouping
console.log("\n--- GROUPING ---");

// Group products by category
const productsByCategory = products.reduce((acc, product) => {
	if (!acc[product.category]) {
		acc[product.category] = [];
	}
	acc[product.category].push(product);
	return acc;
}, {});

console.log("Products by category:");
Object.entries(productsByCategory).forEach(([category, products]) => {
	console.log(`  ${category}: ${products.map((p) => p.name).join(", ")}`);
});

// Group employees by department
const employeesByDept = employees.reduce((acc, employee) => {
	if (!acc[employee.department]) {
		acc[employee.department] = [];
	}
	acc[employee.department].push(employee);
	return acc;
}, {});

console.log("Employees by department:");
Object.entries(employeesByDept).forEach(([dept, emps]) => {
	console.log(`  ${dept}: ${emps.map((e) => e.name).join(", ")}`);
});

// 2. Statistics Calculation
console.log("\n--- STATISTICS CALCULATION ---");

// Calculate comprehensive statistics
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
console.log("Number statistics:", stats);

// Product price statistics
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
console.log("Price statistics:", {
	...priceStats,
	sum: priceStats.sum.toFixed(2),
	average: priceStats.average.toFixed(2),
	min: priceStats.min.toFixed(2),
	max: priceStats.max.toFixed(2),
});

// 3. Complex Object Building
console.log("\n--- COMPLEX OBJECT BUILDING ---");

// Build inventory summary
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

console.log("Inventory summary:");
console.log(`  Total value: $${inventorySummary.totalValue.toFixed(2)}`);
console.log(`  Total items: ${inventorySummary.totalItems}`);
console.log(
	`  Categories: ${Array.from(inventorySummary.categories).join(", ")}`,
);
console.log(`  Price ranges:`, inventorySummary.priceRanges);

// 4. Data Transformation Pipelines
console.log("\n--- DATA TRANSFORMATION PIPELINES ---");

// Transform sales data into summary
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

console.log("Sales summary:");
console.log(`  Total sales: $${salesSummary.totalSales}`);
console.log("  Sales by region:", salesSummary.salesByRegion);
console.log("  Sales by product:", salesSummary.salesByProduct);
console.log("  Daily sales:", salesSummary.dailySales);

// ==========================================
// FINANCIAL CALCULATIONS
// ==========================================
console.log("\n=== FINANCIAL CALCULATIONS ===");

// 1. Account Balance
console.log("\n--- ACCOUNT BALANCE ---");
const balance = transactions.reduce((acc, transaction) => {
	return transaction.type === "credit"
		? acc + transaction.amount
		: acc - transaction.amount;
}, 0);

console.log("Final balance:", balance);

// 2. Transaction Summary
console.log("\n--- TRANSACTION SUMMARY ---");
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

console.log("Transaction summary:");
console.log(
	`  Credits: ${transactionSummary.creditCount} transactions, $${transactionSummary.totalCredits}`,
);
console.log(
	`  Debits: ${transactionSummary.debitCount} transactions, $${transactionSummary.totalDebits}`,
);
console.log(
	`  Net: $${transactionSummary.totalCredits - transactionSummary.totalDebits}`,
);
console.log(
	`  Largest transaction: ${transactionSummary.largestTransaction.description} ($${transactionSummary.largestTransaction.amount})`,
);

// ==========================================
// ADVANCED PATTERNS AND TECHNIQUES
// ==========================================
console.log("\n=== ADVANCED PATTERNS AND TECHNIQUES ===");

// 1. Running Totals
console.log("\n--- RUNNING TOTALS ---");
const runningTotals = numbers.reduce((acc, num, index) => {
	const runningTotal = (acc[acc.length - 1] || 0) + num;
	acc.push(runningTotal);
	return acc;
}, []);

console.log("Running totals:", runningTotals);

// 2. Frequency Analysis
console.log("\n--- FREQUENCY ANALYSIS ---");
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

console.log("Word frequency:", wordFrequency);

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

console.log("Department salary analysis:");
Object.entries(deptSalaryAnalysis).forEach(([dept, data]) => {
	const average = data.total / data.count;
	console.log(
		`  ${dept}: $${data.total} total, $${average.toFixed(
			0,
		)} average, ${data.employees.join(", ")}`,
	);
});

// 3. Nested Reductions
console.log("\n--- NESTED REDUCTIONS ---");

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

console.log("Average salary by department:", avgSalaryByDept);

// 4. Conditional Accumulation
console.log("\n--- CONDITIONAL ACCUMULATION ---");

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

console.log("Categorized products:");
console.log(
	`  Expensive (> $100): ${categorizedProducts.expensive
		.map((p) => p.name)
		.join(", ")}`,
);
console.log(
	`  Medium ($25-$100): ${categorizedProducts.medium
		.map((p) => p.name)
		.join(", ")}`,
);
console.log(
	`  Cheap (< $25): ${categorizedProducts.cheap.map((p) => p.name).join(", ")}`,
);
console.log(
	`  Low stock (< 30): ${categorizedProducts.lowStock
		.map((p) => p.name)
		.join(", ")}`,
);

// ==========================================
// PRACTICAL EXAMPLES
// ==========================================
console.log("\n=== PRACTICAL EXAMPLES ===");

// 1. Shopping Cart Total
console.log("\n--- SHOPPING CART TOTAL ---");
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

console.log(`Cart total: $${cartTotal} (${cartItems} items)`);

// 2. Student Grade Analysis
console.log("\n--- STUDENT GRADE ANALYSIS ---");
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
console.log(`  Class average: ${gradeAnalysis.classAverage.toFixed(1)}`);

// 3. Data Validation and Cleaning
console.log("\n--- DATA VALIDATION AND CLEANING ---");
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

console.log("Data cleaning results:");
console.log(`  Valid numbers: ${cleanedData.valid.join(", ")}`);
console.log(`  Sum: ${cleanedData.sum}`);
console.log(
	`  Invalid entries: ${cleanedData.invalid.map((v) => `'${v}'`).join(", ")}`,
);

// ==========================================
// PERFORMANCE CONSIDERATIONS
// ==========================================
console.log("\n=== PERFORMANCE CONSIDERATIONS ===");

// Test performance with large arrays
const largeArray = Array.from({ length: 100000 }, (_, i) => i + 1);

console.time("Reduce sum (100k elements)");
const largeSum = largeArray.reduce((acc, num) => acc + num, 0);
console.timeEnd("Reduce sum (100k elements)");

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

console.log(`Large array sum: ${largeSum}`);
console.log(`Large array average: ${largeAvg.sum / largeAvg.count}`);

// Memory considerations
console.log("\n--- Memory Usage Notes ---");
console.log("• reduce() processes elements one by one (memory efficient)");
console.log("• Avoid creating large intermediate objects in accumulator");
console.log("• Use appropriate initial values to avoid undefined errors");
console.log("• Consider early returns for conditional accumulation");

console.log("\n=== Lesson Complete ===");
console.log("The reduce method is incredibly powerful for data aggregation!");
console.log("Key takeaways:");
console.log(
	"• reduce() transforms arrays into single values or complex objects",
);
console.log("• Use appropriate initial values and accumulator patterns");
console.log("• Combine with other methods for powerful data pipelines");
console.log("• Consider performance implications for large datasets");
