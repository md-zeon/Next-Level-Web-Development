/*
 * 2-3: Sorting and Flattening Arrays
 * Advanced sorting techniques and array flattening methods
 */

// Sample data for demonstrations
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
const mixedNested = [1, "hello", [2, "world"], [3, [4, "nested"]]];

const matrix = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];

console.log("=== Original Data ===");
console.log("Numbers:", numbers);
console.log("Unsorted Numbers:", unsortedNumbers);
console.log("Products:", products);
console.log("Employees:", employees);
console.log("Nested Array:", nestedArray);
console.log("Deeply Nested:", deeplyNested);
console.log("Matrix:", matrix);

// ==========================================
// ADVANCED SORTING TECHNIQUES
// ==========================================
console.log("\n=== ADVANCED SORTING TECHNIQUES ===");

// 1. Sorting Numbers
console.log("\n--- Number Sorting ---");
const ascending = [...unsortedNumbers].sort((a, b) => a - b);
console.log("Ascending:", ascending);

const descending = [...unsortedNumbers].sort((a, b) => b - a);
console.log("Descending:", descending);

// 2. Sorting Strings
console.log("\n--- String Sorting ---");
const fruits = ["banana", "Apple", "cherry", "Date"];
const caseInsensitive = [...fruits].sort((a, b) =>
	a.toLowerCase().localeCompare(b.toLowerCase()),
);
console.log("Case-insensitive alphabetical:", caseInsensitive);

const byLength = [...fruits].sort((a, b) => a.length - b.length);
console.log("By length:", byLength);

// 3. Sorting Objects by Multiple Criteria
console.log("\n--- Object Sorting ---");

// Sort products by price ascending
const byPrice = [...products].sort((a, b) => a.price - b.price);
console.log(
	"Products by price (low to high):",
	byPrice.map((p) => `${p.name}: $${p.price}`),
);

// Sort products by rating descending
const byRating = [...products].sort((a, b) => b.rating - a.rating);
console.log(
	"Products by rating (high to low):",
	byRating.map((p) => `${p.name}: ${p.rating}⭐`),
);

// Sort employees by department, then by salary within department
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

// 4. Custom Sorting Functions
console.log("\n--- Custom Sorting ---");

// Sort by absolute value
const mixedNumbers = [-5, 3, -8, 1, -2, 7];
const byAbsoluteValue = [...mixedNumbers].sort(
	(a, b) => Math.abs(a) - Math.abs(b),
);
console.log("By absolute value:", byAbsoluteValue);

// Sort by distance from target number (e.g., closest to 50)
const target = 50;
const byDistanceFromTarget = [...unsortedNumbers].sort((a, b) => {
	const distA = Math.abs(a - target);
	const distB = Math.abs(b - target);
	return distA - distB;
});
console.log(`Numbers closest to ${target}:`, byDistanceFromTarget);

// 5. Stable Sort vs Unstable Sort
console.log("\n--- Stable Sort Example ---");
const people = [
	{ name: "Alice", age: 25, priority: 2 },
	{ name: "Bob", age: 30, priority: 1 },
	{ name: "Charlie", age: 25, priority: 3 },
	{ name: "Diana", age: 30, priority: 2 },
];

// Sort by age first (stable), then by priority
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

// ==========================================
// ARRAY FLATTENING METHODS
// ==========================================
console.log("\n=== ARRAY FLATTENING METHODS ===");

// 1. flat() - Flatten nested arrays
console.log("\n--- flat() Method ---");

console.log("Original nested array:", nestedArray);
console.log("Flat (depth 1):", nestedArray.flat());
console.log("Flat (depth 2):", nestedArray.flat(2));
console.log("Flat (depth Infinity):", nestedArray.flat(Infinity));

console.log("Deeply nested:", deeplyNested);
console.log("Flat (depth 1):", deeplyNested.flat());
console.log("Flat (depth 2):", deeplyNested.flat(2));
console.log("Flat (depth 3):", deeplyNested.flat(3));
console.log("Flat (Infinity):", deeplyNested.flat(Infinity));

// 2. flatMap() - Map and then flatten
console.log("\n--- flatMap() Method ---");

// Traditional approach vs flatMap
const traditional = numbers.map((x) => [x, x * 2]);
console.log("Map to arrays:", traditional);

const flattened = numbers.flatMap((x) => [x, x * 2]);
console.log("FlatMap result:", flattened);

// Practical example: Split sentences into words
const sentences = ["Hello world", "How are you", "JavaScript is fun"];
const wordsTraditional = sentences.map((sentence) => sentence.split(" "));
console.log("Words (traditional map):", wordsTraditional);

const wordsFlatMap = sentences.flatMap((sentence) => sentence.split(" "));
console.log("Words (flatMap):", wordsFlatMap);

// Create coordinate pairs
const xCoords = [1, 2, 3];
const yCoords = [4, 5, 6];
const coordinates = xCoords.flatMap((x) => yCoords.map((y) => [x, y]));
console.log("All coordinate pairs:", coordinates);

// 3. Matrix operations
console.log("\n--- Matrix Operations ---");
console.log("Original matrix:", matrix);

// Transpose matrix using flatMap
const transposed = matrix[0].map((_, colIndex) =>
	matrix.map((row) => row[colIndex]),
);
console.log("Transposed matrix:", transposed);

// Flatten entire matrix
const flattenedMatrix = matrix.flat();
console.log("Flattened matrix:", flattenedMatrix);

// Get diagonal elements
const diagonal = matrix.map((row, index) => row[index]);
console.log("Diagonal elements:", diagonal);

// ==========================================
// COMBINING SORTING AND FLATTENING
// ==========================================
console.log("\n=== COMBINING SORTING AND FLATTENING ===");

// 1. Sort nested arrays then flatten
const nestedNumbers = [
	[3, 1, 4],
	[1, 5, 9],
	[2, 6, 5],
];
console.log("Nested numbers:", nestedNumbers);

// Sort each subarray, then flatten
const sortedThenFlattened = nestedNumbers
	.map((arr) => [...arr].sort((a, b) => a - b))
	.flat();
console.log("Each subarray sorted, then flattened:", sortedThenFlattened);

// Flatten first, then sort
const flattenedThenSorted = nestedNumbers.flat().sort((a, b) => a - b);
console.log("Flattened then sorted:", flattenedThenSorted);

// 2. Complex data processing with nested structures
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

console.log("Top 3 earners:");
topEarners.forEach((emp) => console.log(`  ${emp.name}: $${emp.salary}`));

// ==========================================
// PRACTICAL EXAMPLES
// ==========================================
console.log("\n=== PRACTICAL EXAMPLES ===");

// 1. E-commerce: Sort products by multiple criteria
console.log("\n--- E-commerce Product Sorting ---");

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

// Sort by category, then by rating descending
const sortedProducts = sortProducts(products, [
	{ field: "category", direction: "asc" },
	{ field: "rating", direction: "desc" },
]);

console.log("Products sorted by category then rating:");
sortedProducts.forEach((p) =>
	console.log(`  ${p.name} (${p.category}): ${p.rating}⭐`),
);

// 2. Data aggregation with flattening
console.log("\n--- Data Aggregation ---");

const salesByQuarter = [
	[12000, 15000, 18000], // Q1 months
	[14000, 16000, 19000], // Q2 months
	[13000, 17000, 20000], // Q3 months
];

// Calculate total sales across all quarters
const totalSales = salesByQuarter.flat().reduce((sum, sale) => sum + sale, 0);
console.log("Total sales across all quarters:", totalSales);

// Find best performing month in each quarter
const bestMonths = salesByQuarter.map((quarter) => Math.max(...quarter));
console.log("Best month in each quarter:", bestMonths);

// Sort all monthly sales
const allMonthlySales = salesByQuarter.flat().sort((a, b) => b - a);
console.log("All monthly sales (sorted desc):", allMonthlySales);

// 3. Tree structure flattening
console.log("\n--- Tree Structure Flattening ---");

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
console.log("All files in file system:");
allFiles.forEach((file) => console.log(`  ${file.path} (${file.size} bytes)`));

// Sort files by size
const filesBySize = [...allFiles].sort((a, b) => b.size - a.size);
console.log("Files sorted by size (largest first):");
filesBySize.forEach((file) =>
	console.log(`  ${file.name}: ${file.size} bytes`),
);

// ==========================================
// PERFORMANCE CONSIDERATIONS
// ==========================================
console.log("\n=== PERFORMANCE CONSIDERATIONS ===");

// Large array sorting
const largeArray = Array.from({ length: 10000 }, (_, i) =>
	Math.floor(Math.random() * 10000),
);
console.time("Sorting 10,000 elements");
const sortedLargeArray = [...largeArray].sort((a, b) => a - b);
console.timeEnd("Sorting 10,000 elements");

// Deep flattening performance
const veryDeepArray = Array.from({ length: 100 }, () =>
	Array.from({ length: 10 }, () =>
		Array.from({ length: 10 }, () => Math.random()),
	),
);

console.time("Deep flattening (100x10x10)");
const flattenedDeep = veryDeepArray.flat(2);
console.timeEnd("Deep flattening (100x10x10)");

console.log("Flattened deep array length:", flattenedDeep.length);

// Memory considerations
console.log("\n--- Memory Usage Notes ---");
console.log("• sort() modifies original array (memory efficient)");
console.log("• flat() creates new arrays (memory intensive for deep nesting)");
console.log("• flatMap() combines map and flat operations efficiently");
console.log("• Use Infinity depth carefully with very deep structures");

console.log("\n=== Lesson Complete ===");
console.log(
	"Sorting and flattening arrays are powerful tools for data manipulation!",
);
console.log("Key takeaways:");
console.log("• sort() with compare functions for custom ordering");
console.log("• flat() and flatMap() for handling nested structures");
console.log("• Combine methods for complex data transformations");
console.log("• Consider performance implications for large datasets");

// Module video

const numbersArr = [40, 100, 1, 5, 25, 10];

const fruitsArr = ["Banana", "apple", "Orange", "mango"];
// Sorting numbers with a compare function
const sortedNumber = numbersArr.sort((a, b) => a - b); // Ascending order
console.log("Original Numbers:", numbersArr); // Note: numbersArr is now sorted
console.log("Sorted Numbers:", sortedNumber); // [1, 5, 10, 25, 40, 100]

// for strings, default sort is lexicographical
const sortedFruits = fruitsArr.sort();
console.log("Original Fruits:", fruitsArr); // Note: fruitsArr is now sorted
console.log("Sorted Fruits:", sortedFruits); // ["Banana", "Orange", "apple", "mango"]
// So, the sort() method sorts the array in place and also returns the sorted array.
// For numbers, a compare function is necessary to achieve numerical sorting.
// For strings, the default behavior sorts them lexicographically.

console.log(sortedFruits.sort((a, b) => a.localeCompare(b))); // Case-insensitive sort
// Output: ["apple", "Banana", "mango", "Orange"]

// nested array flattening
const nestedArr = [1, 2, [3, 4], [5, [6, 7]], 8];

//const flattenedOnce = nestedArr.flat(); // Default depth is 1
//console.log("Flattened Once:", flattenedOnce); // [1, 2, 3, 4, 5, [6, 7], 8]

//const fullyFlattened = nestedArr.flat(Infinity); // Flatten all levels
// console.log("Fully Flattened:", fullyFlattened); // [1, 2, 3, 4, 5, 6, 7, 8]
// The flat() method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
// Using Infinity as depth flattens all levels of nesting.

const tagsFromPosts = [
	["javascript", "react", "css"],
	["nodejs", "express", "mongodb"],
	["css", "html", "react"],
];

const filterTags = [...new Set(tagsFromPosts.flat())];
console.log("Unique Tags:", filterTags); // ["javascript", "react", "css", "nodejs", "express", "mongodb", "html"]
