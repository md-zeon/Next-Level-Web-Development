/*
 * 2-2: The Core Transformation Toolkit (map, filter, sort, slice)
 * Demonstrating array transformation methods
 */

// Sample data for demonstrations
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

console.log("=== Original Arrays ===");
console.log("Numbers:", numbers);
console.log("Products:", products);
console.log("Students:", students);

// ==========================================
// MAP METHOD
// ==========================================
console.log("\n=== MAP METHOD ===");

// Double each number
const doubled = numbers.map((num) => num * 2);
console.log("Doubled numbers:", doubled);

// Extract product names
const productNames = products.map((product) => product.name);
console.log("Product names:", productNames);

// Create price labels
const priceLabels = products.map(
	(product) => `${product.name}: $${product.price}`,
);
console.log("Price labels:", priceLabels);

// Transform student objects to include percentage
const studentsWithPercentage = students.map((student) => ({
	...student,
	percentage: `${student.score}%`,
}));
console.log("Students with percentage:", studentsWithPercentage);

// ==========================================
// FILTER METHOD
// ==========================================
console.log("\n=== FILTER METHOD ===");

// Get even numbers
const evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log("Even numbers:", evenNumbers);

// Get expensive products (> $100)
const expensiveProducts = products.filter((product) => product.price > 100);
console.log("Expensive products:", expensiveProducts);

// Get electronics only
const electronics = products.filter(
	(product) => product.category === "Electronics",
);
console.log("Electronics:", electronics);

// Get students with A grade
const aGradeStudents = students.filter((student) => student.grade === "A");
console.log("A grade students:", aGradeStudents);

// Get numbers greater than 5
const greaterThanFive = numbers.filter((num) => num > 5);
console.log("Numbers > 5:", greaterThanFive);

// ==========================================
// SORT METHOD
// ==========================================
console.log("\n=== SORT METHOD ===");

// Sort numbers ascending (default)
const sortedNumbersAsc = [...numbers].sort((a, b) => a - b);
console.log("Numbers sorted ascending:", sortedNumbersAsc);

// Sort numbers descending
const sortedNumbersDesc = [...numbers].sort((a, b) => b - a);
console.log("Numbers sorted descending:", sortedNumbersDesc);

// Sort products by price (ascending)
const productsByPrice = [...products].sort((a, b) => a.price - b.price);
console.log(
	"Products by price (low to high):",
	productsByPrice.map((p) => `${p.name}: $${p.price}`),
);

// Sort products by price (descending)
const productsByPriceDesc = [...products].sort((a, b) => b.price - a.price);
console.log(
	"Products by price (high to low):",
	productsByPriceDesc.map((p) => `${p.name}: $${p.price}`),
);

// Sort students by score (descending)
const studentsByScore = [...students].sort((a, b) => b.score - a.score);
console.log(
	"Students by score (high to low):",
	studentsByScore.map((s) => `${s.name}: ${s.score}`),
);

// Sort strings alphabetically
const fruits = ["banana", "Apple", "cherry", "Date"];
const sortedFruits = [...fruits].sort((a, b) =>
	a.toLowerCase().localeCompare(b.toLowerCase()),
);
console.log("Fruits sorted alphabetically:", sortedFruits);

// ==========================================
// SLICE METHOD
// ==========================================
console.log("\n=== SLICE METHOD ===");

// Get first 3 numbers
const firstThree = numbers.slice(0, 3);
console.log("First 3 numbers:", firstThree);

// Get last 3 numbers
const lastThree = numbers.slice(-3);
console.log("Last 3 numbers:", lastThree);

// Get middle elements (index 2 to 7)
const middle = numbers.slice(2, 8);
console.log("Middle elements (index 2-7):", middle);

// Get all elements from index 5 onwards
const fromFifth = numbers.slice(5);
console.log("From index 5 onwards:", fromFifth);

// Shallow copy of entire array
const numbersCopy = numbers.slice();
console.log("Shallow copy:", numbersCopy);

// ==========================================
// CHAINING METHODS
// ==========================================
console.log("\n=== CHAINING METHODS ===");

// Get expensive electronics, sort by price descending, format names
const expensiveElectronics = products
	.filter(
		(product) => product.category === "Electronics" && product.price > 100,
	)
	.sort((a, b) => b.price - a.price)
	.map((product) => `${product.name} ($${product.price})`);

console.log(
	"Expensive electronics (sorted by price desc):",
	expensiveElectronics,
);

// Get students with score > 80, sort by score desc, get top 3 names
const topStudents = students
	.filter((student) => student.score > 80)
	.sort((a, b) => b.score - a.score)
	.slice(0, 3)
	.map((student) => student.name);

console.log("Top 3 students by score:", topStudents);

// Transform numbers: filter even, double them, sort descending
const transformedNumbers = numbers
	.filter((num) => num % 2 === 0)
	.map((num) => num * 2)
	.sort((a, b) => b - a);

console.log("Even numbers doubled and sorted desc:", transformedNumbers);

// ==========================================
// PRACTICAL EXAMPLES
// ==========================================
console.log("\n=== PRACTICAL EXAMPLES ===");

// Data processing pipeline
const salesData = [
	{ product: "Widget A", sales: 150, region: "North" },
	{ product: "Widget B", sales: 200, region: "South" },
	{ product: "Widget A", sales: 120, region: "East" },
	{ product: "Widget C", sales: 80, region: "West" },
	{ product: "Widget B", sales: 180, region: "North" },
];

// Calculate total sales by region
const salesByRegion = salesData
	.filter((item) => item.sales > 100) // Only high-performing sales
	.map((item) => ({ region: item.region, sales: item.sales }))
	.sort((a, b) => b.sales - a.sales);

console.log("High-performing sales by region:", salesByRegion);

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
	"Products with 10% discount (sorted by savings):",
	productsWithDiscount.map(
		(p) =>
			`${p.name}: $${p.discountPrice.toFixed(2)} (save $${p.savings.toFixed(
				2,
			)})`,
	),
);

// ==========================================
// PERFORMANCE CONSIDERATIONS
// ==========================================
console.log("\n=== PERFORMANCE NOTES ===");

// Note: These methods create new arrays (except sort which mutates)
// For large datasets, consider performance implications

// Example of avoiding unnecessary operations
const largeArray = Array.from({ length: 100000 }, (_, i) => i + 1);

// Bad: Multiple iterations
// const result1 = largeArray.filter(x => x > 50000).map(x => x * 2);

// Good: Single iteration with reduce if possible
const result2 = largeArray.reduce((acc, num) => {
	if (num > 50000) {
		acc.push(num * 2);
	}
	return acc;
}, []);

console.log(
	"Large array processing example completed (result length):",
	result2.length,
);

// Video code

const rawApiData = [
	{
		id: "p-001",
		productName: "Quantum Laptop",
		category: "Electronics",
		price: 1200,
		rating: 4.8,
		stock: 15,
	},
	{
		id: "p-002",
		productName: "The Art of Code",
		category: "Books",
		price: 45,
		rating: 4.5,
		stock: 100,
	},
	{
		id: "p-003",
		productName: "Cyber Hoodie",
		category: "Clothing",
		price: 80,
		rating: 4.7,
		stock: 50,
	},
	{
		id: "p-004",
		productName: "4K Drone",
		category: "Electronics",
		price: 650,
		rating: 4.3,
		stock: 20,
	},
	{
		id: "p-005",
		productName: "Basic JavaScript",
		category: "Books",
		price: 25,
		rating: 3.8,
		stock: 200,
	},
	{
		id: "p-006",
		productName: "Smart Watch",
		category: "Electronics",
		price: 250,
		rating: 4.7,
		stock: 70,
	},
	{
		id: "p-007",
		productName: "Classic T-Shirt",
		category: "Clothing",
		price: 30,
		rating: 4.2,
		stock: 300,
	},
	{
		id: "p-008",
		productName: "Design Patterns",
		category: "Books",
		price: 55,
		rating: 4.9,
		stock: 80,
	},
	{
		id: "p-009",
		productName: "VR Headset",
		category: "Electronics",
		price: 400,
		rating: 4.6,
		stock: 30,
	},
	{
		id: "p-010",
		productName: "USB-C Cable",
		category: "Electronics",
		price: 15,
		rating: 4.0,
		stock: 500,
	},
	{
		id: "p-011",
		productName: "Noise-Cancelling Headphones",
		category: "Electronics",
		price: 300,
		rating: 4.7,
		stock: 40,
	},
	{
		id: "p-012",
		productName: "Algorithms Explained",
		category: "Books",
		price: 50,
		rating: 4.5,
		stock: 60,
	},
];

// output => [{ name: "Phone" }, { name: "Smart Watch"}]

//TODO: Process
//TODO: Filter => Electronics
//TODO: Sort by => Rating
//TODO: Slice => top 3
//TODO: Map => transform object shape to { name: "Name"}

const filteredApiData = rawApiData
	.filter((data) => data.category === "Electronics")
	.sort((a, b) => b.rating - a.rating)
	.slice(0, 3)
	.map((data) => {
		return { name: data.productName };
	});

console.log(filteredApiData);
