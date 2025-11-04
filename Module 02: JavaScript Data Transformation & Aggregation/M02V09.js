// M02V09.js - Solution for Scenario Based Activity - Denormalizing Data (Client-Side Join)

// Sample Data
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

// Create lookup tables for efficient joins
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
const productLookup = products.reduce(
	(acc, product) => ((acc[product.id] = product), acc),
	{},
);

// Utility Functions
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

function safeGet(obj, path, defaultValue = null) {
	return path
		.split(".")
		.reduce(
			(current, key) =>
				current && current[key] !== undefined ? current[key] : defaultValue,
			obj,
		);
}

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

// Task 1: Basic Product Denormalization
function denormalizeProductCatalog(products) {
	const denormalized = multiJoin(products, [
		{
			lookupTable: categoryLookup,
			joinKey: "categoryId",
			resultKey: "category",
		},
		{ lookupTable: brandLookup, joinKey: "brandId", resultKey: "brand" },
	]);

	return denormalized.reduce((acc, product) => {
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
				const product = productLookup[item.productId];
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

// Task 3: Product Reviews Denormalization
function denormalizeProductReviews(reviews) {
	const grouped = groupBy(reviews, (r) => r.productId);

	return Object.keys(grouped).reduce((acc, productId) => {
		const productReviews = grouped[productId];
		const product = productLookup[productId];

		// Calculate review statistics
		const ratings = productReviews.map((r) => r.rating);
		const averageRating =
			ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
		const ratingDistribution = ratings.reduce((dist, rating) => {
			dist[rating] = (dist[rating] || 0) + 1;
			return dist;
		}, {});
		const recommendedPercentage =
			(ratings.filter((r) => r >= 4).length / ratings.length) * 100;

		// Denormalize individual reviews
		const denormalizedReviews = productReviews.map((review) => {
			const user = userLookup[review.userId];
			return {
				id: review.id,
				rating: review.rating,
				comment: review.comment,
				date: review.date,
				user: user ? { id: user.id, name: user.name } : null,
				helpful: Math.floor(Math.random() * 50), // Simulated helpfulness score
				verified: Math.random() > 0.3, // Simulated verification
			};
		});

		acc[productId] = {
			productId,
			productName: product?.name || "Unknown Product",
			reviewStats: {
				totalReviews: productReviews.length,
				averageRating: Math.round(averageRating * 10) / 10,
				ratingDistribution,
				recommendedPercentage: Math.round(recommendedPercentage),
			},
			reviews: denormalizedReviews,
		};

		return acc;
	}, {});
}

// Task 4: Inventory Management Denormalization
function denormalizeInventoryManagement(inventory) {
	const productInventory = {};
	const warehouseInventory = {};

	// Group inventory by product
	const byProduct = groupBy(inventory, (inv) => inv.productId);

	Object.keys(byProduct).forEach((productId) => {
		const productInv = byProduct[productId];
		const product = productLookup[productId];
		const totalStock = productInv.reduce((sum, inv) => sum + inv.quantity, 0);

		const stockByWarehouse = productInv.reduce((acc, inv) => {
			const warehouse = warehouseLookup[inv.warehouseId];
			acc[inv.warehouseId] = {
				quantity: inv.quantity,
				warehouse: warehouse?.name || "Unknown Warehouse",
			};
			return acc;
		}, {});

		// Determine stock status
		let stockStatus = "In Stock";
		if (totalStock === 0) stockStatus = "Out of Stock";
		else if (totalStock < 50) stockStatus = "Low Stock";

		productInventory[productId] = {
			id: productId,
			name: product?.name || "Unknown Product",
			totalStock,
			stockByWarehouse,
			stockStatus,
			lowStockThreshold: 50,
		};
	});

	// Group inventory by warehouse
	const byWarehouse = groupBy(inventory, (inv) => inv.warehouseId);

	Object.keys(byWarehouse).forEach((warehouseId) => {
		const warehouseInv = byWarehouse[warehouseId];
		const warehouse = warehouseLookup[warehouseId];
		const totalProducts = warehouseInv.length;

		const products = warehouseInv.map((inv) => {
			const product = productLookup[inv.productId];
			const value = (product?.basePrice || 0) * inv.quantity;
			return {
				productId: inv.productId,
				productName: product?.name || "Unknown Product",
				quantity: inv.quantity,
				value: Math.round(value * 100) / 100,
			};
		});

		const totalValue = products.reduce((sum, p) => sum + p.value, 0);

		warehouseInventory[warehouseId] = {
			id: warehouseId,
			name: warehouse?.name || "Unknown Warehouse",
			location: warehouse?.location || "Unknown Location",
			totalProducts,
			totalValue: Math.round(totalValue * 100) / 100,
			products,
		};
	});

	return { products: productInventory, warehouses: warehouseInventory };
}

// Task 5: User Dashboard Denormalization
function denormalizeUserDashboards(users) {
	return users.reduce((acc, user) => {
		// Get user's orders
		const userOrders = orders.filter((order) => order.userId === user.id);
		const completedOrders = userOrders.filter(
			(order) => order.status === "completed",
		);

		// Calculate user metrics
		const totalSpent = completedOrders.reduce(
			(sum, order) => sum + order.total,
			0,
		);
		const totalOrders = completedOrders.length;
		const averageOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;

		// Get user's reviews
		const userReviews = reviews.filter((review) => review.userId === user.id);

		// Determine favorite category
		const categoryCounts = userReviews.reduce((acc, review) => {
			const product = productLookup[review.productId];
			const category = categoryLookup[product?.categoryId];
			if (category) {
				acc[category.name] = (acc[category.name] || 0) + 1;
			}
			return acc;
		}, {});

		const favoriteCategory = Object.keys(categoryCounts).reduce(
			(fav, cat) =>
				categoryCounts[cat] > (categoryCounts[fav] || 0) ? cat : fav,
			"None",
		);

		// Determine loyalty tier
		let loyaltyTier = "Bronze";
		if (totalSpent > 500) loyaltyTier = "Gold";
		else if (totalSpent > 200) loyaltyTier = "Silver";

		// Recent orders (last 5)
		const recentOrders = completedOrders
			.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
			.slice(0, 5)
			.map((order) => ({
				id: order.id,
				date: order.orderDate,
				status: order.status,
				total: order.total,
				itemsCount: orderItems.filter((item) => item.orderId === order.id)
					.length,
			}));

		// User reviews
		const userReviewsDenormalized = userReviews.map((review) => {
			const product = productLookup[review.productId];
			return {
				productId: review.productId,
				productName: product?.name || "Unknown Product",
				rating: review.rating,
				date: review.date,
			};
		});

		// Generate recommendations (simplified)
		const recommendations = [
			{
				productId: "P004",
				name: "Wireless Earbuds",
				reason: "Similar to your purchase",
				score: 0.85,
			},
			{
				productId: "P005",
				name: "Portable Charger",
				reason: "Frequently bought together",
				score: 0.72,
			},
		];

		// Activity timeline
		const activities = [
			...completedOrders.map((order) => ({
				type: "order",
				date: order.orderDate,
				description: `Placed order ${order.id}`,
			})),
			...userReviews.map((review) => ({
				type: "review",
				date: review.date,
				description: `Reviewed ${
					productLookup[review.productId]?.name || "a product"
				}`,
			})),
		].sort((a, b) => new Date(b.date) - new Date(a.date));

		acc[user.id] = {
			id: user.id,
			name: user.name,
			email: user.email,
			memberSince: user.memberSince,
			profile: {
				totalOrders,
				totalSpent: Math.round(totalSpent * 100) / 100,
				averageOrderValue: Math.round(averageOrderValue * 100) / 100,
				favoriteCategory,
				loyaltyTier,
			},
			recentOrders,
			reviews: userReviewsDenormalized,
			recommendations,
			activityTimeline: activities.slice(0, 10), // Last 10 activities
		};

		return acc;
	}, {});
}

// Task 6: Advanced Analytics Denormalization
function createAdvancedAnalytics(orders, orderItems, products, reviews) {
	// Sales analytics by category
	const categoryAnalytics = {};
	const productAnalytics = {};

	// Group orders by category
	const ordersWithItems = orders.map((order) => ({
		...order,
		items: orderItems.filter((item) => item.orderId === order.id),
	}));

	ordersWithItems.forEach((order) => {
		order.items.forEach((item) => {
			const product = productLookup[item.productId];
			const category = categoryLookup[product?.categoryId];

			if (category) {
				if (!categoryAnalytics[category.name]) {
					categoryAnalytics[category.name] = {
						totalRevenue: 0,
						totalOrders: 0,
						totalUnits: 0,
						orderIds: new Set(),
						productIds: new Set(),
					};
				}

				const revenue = item.unitPrice * item.quantity - item.discount;
				categoryAnalytics[category.name].totalRevenue += revenue;
				categoryAnalytics[category.name].totalUnits += item.quantity;
				categoryAnalytics[category.name].orderIds.add(order.id);
				categoryAnalytics[category.name].productIds.add(item.productId);
			}
		});
	});

	// Calculate category metrics
	Object.keys(categoryAnalytics).forEach((categoryName) => {
		const cat = categoryAnalytics[categoryName];
		cat.totalOrders = cat.orderIds.size;
		cat.avgOrderValue = cat.totalRevenue / cat.totalOrders;
		cat.topProducts = Array.from(cat.productIds);

		// Round values
		cat.totalRevenue = Math.round(cat.totalRevenue * 100) / 100;
		cat.avgOrderValue = Math.round(cat.avgOrderValue * 100) / 100;

		delete cat.orderIds;
		delete cat.productIds;
	});

	// Time-based analytics
	const timeAnalytics = {};
	ordersWithItems.forEach((order) => {
		const date = order.orderDate;
		if (!timeAnalytics[date]) {
			timeAnalytics[date] = {
				totalRevenue: 0,
				orderCount: 0,
				items: [],
			};
		}

		timeAnalytics[date].totalRevenue += order.total;
		timeAnalytics[date].orderCount++;
		timeAnalytics[date].items.push(...order.items);
	});

	// Calculate time-based metrics
	Object.keys(timeAnalytics).forEach((date) => {
		const day = timeAnalytics[date];
		day.avgOrderValue = day.totalRevenue / day.orderCount;

		// Find top category for the day
		const categoryRevenue = {};
		day.items.forEach((item) => {
			const product = productLookup[item.productId];
			const category = categoryLookup[product?.categoryId];
			if (category) {
				const revenue = item.unitPrice * item.quantity - item.discount;
				categoryRevenue[category.name] =
					(categoryRevenue[category.name] || 0) + revenue;
			}
		});

		day.topCategory = Object.keys(categoryRevenue).reduce(
			(top, cat) =>
				categoryRevenue[cat] > (categoryRevenue[top] || 0) ? cat : top,
			"None",
		);

		// Round values
		day.totalRevenue = Math.round(day.totalRevenue * 100) / 100;
		day.avgOrderValue = Math.round(day.avgOrderValue * 100) / 100;

		delete day.items;
	});

	// Product performance analytics
	products.forEach((product) => {
		const productReviews = reviews.filter((r) => r.productId === product.id);
		const productOrders = orderItems.filter(
			(item) => item.productId === product.id,
		);
		const totalRevenue = productOrders.reduce(
			(sum, item) => sum + (item.unitPrice * item.quantity - item.discount),
			0,
		);
		const unitsSold = productOrders.reduce(
			(sum, item) => sum + item.quantity,
			0,
		);

		const avgRating =
			productReviews.length > 0
				? productReviews.reduce((sum, r) => sum + r.rating, 0) /
				  productReviews.length
				: 0;

		const stockLevel = inventory
			.filter((inv) => inv.productId === product.id)
			.reduce((sum, inv) => sum + inv.quantity, 0);

		// Calculate performance score (simplified)
		const performanceScore =
			(totalRevenue / 1000) * 0.4 +
			(avgRating / 5) * 0.3 +
			Math.min(stockLevel / 100, 1) * 0.3;

		productAnalytics[product.id] = {
			revenue: Math.round(totalRevenue * 100) / 100,
			unitsSold,
			avgRating: Math.round(avgRating * 10) / 10,
			reviewCount: productReviews.length,
			stockLevel,
			performanceScore: Math.round(performanceScore * 10) / 10,
			trends: {
				salesVelocity:
					unitsSold > 10 ? "High" : unitsSold > 5 ? "Medium" : "Low",
				ratingTrend: "Stable", // Simplified
				stockTrend: stockLevel > 100 ? "Increasing" : "Stable",
			},
		};
	});

	// Customer segmentation
	const customerSegments = {};
	users.forEach((user) => {
		const userOrders = orders.filter(
			(o) => o.userId === user.id && o.status === "completed",
		);
		const lifetimeValue = userOrders.reduce(
			(sum, order) => sum + order.total,
			0,
		);
		const orderFrequency = userOrders.length;

		let segment = "New Customers";
		if (lifetimeValue > 300) segment = "High Value";
		else if (orderFrequency > 2) segment = "Frequent Buyers";

		if (!customerSegments[segment]) {
			customerSegments[segment] = {
				customers: [],
				avgLifetimeValue: 0,
				avgOrderFrequency: 0,
				preferredCategories: {},
				retentionRate: 100, // Simplified
			};
		}

		customerSegments[segment].customers.push(user.id);
		customerSegments[segment].avgLifetimeValue += lifetimeValue;
		customerSegments[segment].avgOrderFrequency += orderFrequency;

		// Track preferred categories
		const userReviews = reviews.filter((r) => r.userId === user.id);
		userReviews.forEach((review) => {
			const product = productLookup[review.productId];
			const category = categoryLookup[product?.categoryId];
			if (category) {
				customerSegments[segment].preferredCategories[category.name] =
					(customerSegments[segment].preferredCategories[category.name] || 0) +
					1;
			}
		});
	});

	// Calculate segment averages
	Object.keys(customerSegments).forEach((segment) => {
		const seg = customerSegments[segment];
		const count = seg.customers.length;
		seg.avgLifetimeValue =
			Math.round((seg.avgLifetimeValue / count) * 100) / 100;
		seg.avgOrderFrequency =
			Math.round((seg.avgOrderFrequency / count) * 10) / 10;

		// Find most preferred category
		const topCategory = Object.keys(seg.preferredCategories).reduce(
			(top, cat) =>
				seg.preferredCategories[cat] > (seg.preferredCategories[top] || 0)
					? cat
					: top,
			"None",
		);
		seg.preferredCategories = [topCategory];
	});

	return {
		salesAnalytics: {
			byCategory: categoryAnalytics,
			byTimePeriod: timeAnalytics,
		},
		productPerformance: productAnalytics,
		customerSegments,
	};
}

// Advanced Challenge 1: Lazy Denormalization
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
		for (const [key] of this.cache) {
			if (key.includes(pattern)) {
				this.cache.delete(key);
			}
		}
	}

	clearCache() {
		this.cache.clear();
	}
}

// Advanced Challenge 2: Circular Reference Handling
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

// Test Functions
function runAllTasks() {
	console.log("=".repeat(60));
	console.log("SCENARIO BASED ACTIVITY: DENORMALIZING DATA");
	console.log("=".repeat(60));

	console.log("\n📦 TASK 1: Basic Product Denormalization");
	console.log(JSON.stringify(denormalizeProductCatalog(products), null, 2));

	console.log("\n📦 TASK 2: Order History Denormalization");
	console.log(JSON.stringify(denormalizeOrderHistory(orders), null, 2));

	console.log("\n📦 TASK 3: Product Reviews Denormalization");
	console.log(JSON.stringify(denormalizeProductReviews(reviews), null, 2));

	console.log("\n📦 TASK 4: Inventory Management Denormalization");
	const inventoryData = denormalizeInventoryManagement(inventory);
	console.log(JSON.stringify(inventoryData, null, 2));

	console.log("\n📦 TASK 5: User Dashboard Denormalization");
	console.log(JSON.stringify(denormalizeUserDashboards(users), null, 2));

	console.log("\n📦 TASK 6: Advanced Analytics Denormalization");
	const analytics = createAdvancedAnalytics(
		orders,
		orderItems,
		products,
		reviews,
	);
	console.log(JSON.stringify(analytics, null, 2));

	console.log("\n🚀 CHALLENGE 1: Lazy Denormalization Demo");
	const lazyDenormalizer = new LazyDenormalizer({
		products,
		categories,
		brands,
	});
	const productCatalog1 = lazyDenormalizer.getDenormalized(
		"productCatalog",
		(data) => denormalizeProductCatalog(data.products),
	);
	console.log(
		"Cached product catalog keys:",
		Array.from(lazyDenormalizer.cache.keys()),
	);

	console.log("\n🚀 CHALLENGE 2: Circular Reference Detection");
	const testObj = { a: { b: {} } };
	testObj.a.b.c = testObj.a; // Create circular reference
	const hasCircular = detectCircularReferences(testObj);
	console.log("Circular reference detected:", hasCircular);
}

// Performance Benchmarking
function benchmarkDenormalization() {
	console.log("\n⚡ PERFORMANCE BENCHMARK");

	// Create larger datasets
	const largeProducts = Array.from({ length: 1000 }, (_, i) => ({
		id: `P${String(i + 1).padStart(4, "0")}`,
		name: `Product ${i + 1}`,
		categoryId: `C${String((i % 3) + 1).padStart(3, "0")}`,
		brandId: `B${String((i % 5) + 1).padStart(3, "0")}`,
		basePrice: Math.floor(Math.random() * 1000) + 10,
	}));

	const largeCategories = Array.from({ length: 10 }, (_, i) => ({
		id: `C${String(i + 1).padStart(3, "0")}`,
		name: `Category ${i + 1}`,
		parentId: null,
		description: `Description for category ${i + 1}`,
	}));

	const largeBrands = Array.from({ length: 20 }, (_, i) => ({
		id: `B${String(i + 1).padStart(3, "0")}`,
		name: `Brand ${i + 1}`,
		country: ["USA", "Canada", "Germany", "Japan"][i % 4],
		founded: 2000 + (i % 20),
	}));

	console.time("Denormalize 1,000 products");
	const largeLookup = {
		categories: largeCategories.reduce(
			(acc, cat) => ((acc[cat.id] = cat), acc),
			{},
		),
		brands: largeBrands.reduce(
			(acc, brand) => ((acc[brand.id] = brand), acc),
			{},
		),
	};
	largeProducts.forEach((product) => {
		const category = largeLookup.categories[product.categoryId];
		const brand = largeLookup.brands[product.brandId];
		// Simulate denormalization work
		const denormalized = {
			...product,
			category,
			brand,
			categoryPath: category?.name || "Uncategorized",
		};
	});
	console.timeEnd("Denormalize 1,000 products");
}

// Validation Functions
function validateTask1() {
	const result = denormalizeProductCatalog(products);
	const expectedKeys = ["P001", "P002", "P003"];

	console.log("\n✅ TASK 1 VALIDATION:");
	console.log("Expected product IDs:", expectedKeys);
	console.log("Actual product IDs:", Object.keys(result));
	console.log(
		"All products present:",
		expectedKeys.every((id) => result[id]) ? "✅" : "❌",
	);
	console.log("P001 has category:", result.P001?.category ? "✅" : "❌");
	console.log("P001 has brand:", result.P001?.brand ? "✅" : "❌");
}

// Main execution
if (require.main === module) {
	runAllTasks();
	benchmarkDenormalization();
	validateTask1();
}

module.exports = {
	products,
	categories,
	brands,
	orders,
	orderItems,
	users,
	reviews,
	inventory,
	warehouses,
	categoryLookup,
	brandLookup,
	userLookup,
	warehouseLookup,
	productLookup,
	leftJoin,
	multiJoin,
	safeGet,
	groupBy,
	denormalizeProductCatalog,
	denormalizeOrderHistory,
	denormalizeProductReviews,
	denormalizeInventoryManagement,
	denormalizeUserDashboards,
	createAdvancedAnalytics,
	LazyDenormalizer,
	detectCircularReferences,
	resolveCircularReferences,
};
