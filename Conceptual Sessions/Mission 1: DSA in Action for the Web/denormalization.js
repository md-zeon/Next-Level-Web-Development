// Mission 1: Data Denormalization for E-Commerce Client-Side Joins
// Demonstrates DSA concepts: Data transformation, client-side joins, lookup tables

// Sample normalized data from API (simulating database structure)
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

// Create efficient lookup tables for O(1) access (crucial for performance)
const categoryLookup = categories.reduce((acc, cat) => {
  acc[cat.id] = cat;
  return acc;
}, {});

const brandLookup = brands.reduce((acc, brand) => {
  acc[brand.id] = brand;
  return acc;
}, {});

const userLookup = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});

const productLookup = products.reduce((acc, product) => {
  acc[product.id] = product;
  return acc;
}, {});

// Utility functions for joins
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
        throw new Error(`Required join failed: ${joinKey} not found in ${resultKey}`);
      }

      result[resultKey] = joinedData || null;
    });
    return result;
  });
}

// Task 1: Basic Product Denormalization
function denormalizeProductCatalog(products) {
  const denormalized = multiJoin(products, [
    {
      lookupTable: categoryLookup,
      joinKey: "categoryId",
      resultKey: "category",
    },
    {
      lookupTable: brandLookup,
      joinKey: "brandId",
      resultKey: "brand",
    },
  ]);

  // Transform into object keyed by product ID for efficient lookups
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

    // Join order items with products - O(n*m) where n=orders, m=items per order
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
          subtotal: (item.unitPrice * item.quantity) - item.discount,
        };
      });

    // Calculate totals (could be done server-side, but common client-side requirement)
    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const discount = items.reduce((sum, item) => sum + item.discount, 0);
    const tax = subtotal * 0.08; // 8% tax rate
    const total = subtotal + tax;

    return {
      ...order,
      user: user ? {
        id: user.id,
        name: user.name,
        email: user.email
      } : null,
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
function denormalizeProductReviews() {
  // Group reviews by product - efficient for product detail pages
  const productReviews = {};

  reviews.forEach((review) => {
    const productId = review.productId;
    const product = productLookup[productId];
    const user = userLookup[review.userId];

    if (!productReviews[productId]) {
      productReviews[productId] = {
        productId,
        productName: product?.name || "Unknown Product",
        reviews: [],
        reviewStats: {
          totalReviews: 0,
          averageRating: 0,
          ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        },
      };
    }

    // Add review with joined user data
    productReviews[productId].reviews.push({
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      date: review.date,
      user: user ? {
        id: user.id,
        name: user.name,
      } : null,
    });

    // Update statistics
    const stats = productReviews[productId].reviewStats;
    stats.totalReviews++;
    stats.ratingDistribution[review.rating]++;
  });

  // Calculate averages after all reviews are processed
  Object.values(productReviews).forEach((productData) => {
    const stats = productData.reviewStats;
    const totalScore = Object.entries(stats.ratingDistribution)
      .reduce((sum, [rating, count]) => sum + (parseInt(rating) * count), 0);
    stats.averageRating = stats.totalReviews > 0
      ? Math.round((totalScore / stats.totalReviews) * 10) / 10
      : 0;
  });

  return productReviews;
}

// Task 4: User Dashboard Denormalization
function denormalizeUserDashboard() {
  const dashboards = {};

  users.forEach((user) => {
    const userOrders = orders.filter(order => order.userId === user.id);
    const userReviews = reviews.filter(review => review.userId === user.id);

    // Calculate user metrics
    const totalSpent = userOrders
      .filter(order => order.status === "completed")
      .reduce((sum, order) => sum + order.total, 0);

    const averageOrderValue = userOrders.length > 0
      ? totalSpent / userOrders.length
      : 0;

    // Get recent orders with joined item data
    const recentOrders = userOrders
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
      .slice(0, 5)
      .map(order => {
        const items = orderItems.filter(item => item.orderId === order.id);
        return {
          id: order.id,
          date: order.orderDate,
          status: order.status,
          total: order.total,
          itemsCount: items.length,
        };
      });

    // Get user's reviews with product data
    const userReviewsWithProducts = userReviews.map(review => {
      const product = productLookup[review.productId];
      return {
        productId: review.productId,
        productName: product?.name || "Unknown Product",
        rating: review.rating,
        date: review.date,
      };
    });

    dashboards[user.id] = {
      id: user.id,
      name: user.name,
      email: user.email,
      memberSince: user.memberSince,
      profile: {
        totalOrders: userOrders.length,
        totalSpent: Math.round(totalSpent * 100) / 100,
        averageOrderValue: Math.round(averageOrderValue * 100) / 100,
        favoriteCategory: calculateFavoriteCategory(user),
        loyaltyTier: calculateLoyaltyTier(totalSpent),
      },
      recentOrders,
      reviews: userReviewsWithProducts,
      recommendations: generateUserRecommendations(user),
    };
  });

  return dashboards;
}

// Helper functions for dashboard
function calculateFavoriteCategory(user) {
  const userOrderItems = orderItems.filter(item =>
    orders.some(order =>
      order.id === item.orderId &&
      order.userId === user.id &&
      order.status === "completed"
    )
  );

  const categoryCounts = {};
  userOrderItems.forEach(item => {
    const product = productLookup[item.productId];
    if (product) {
      const category = categoryLookup[product.categoryId];
      if (category) {
        categoryCounts[category.name] = (categoryCounts[category.name] || 0) + item.quantity;
      }
    }
  });

  const favoriteCategory = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)[0];
  return favoriteCategory ? favoriteCategory[0] : "None";
}

function calculateLoyaltyTier(totalSpent) {
  if (totalSpent >= 500) return "Gold";
  if (totalSpent >= 200) return "Silver";
  return "Bronze";
}

function generateUserRecommendations(user) {
  // Simple recommendation based on purchase history
  const purchasedProducts = new Set(
    orders
      .filter(order => order.userId === user.id)
      .flatMap(order =>
        orderItems
          .filter(item => item.orderId === order.id)
          .map(item => item.productId)
      )
  );

  // Recommend products from same categories as purchased items
  const purchasedCategories = new Set(
    Array.from(purchasedProducts)
      .map(productId => productLookup[productId]?.categoryId)
      .filter(Boolean)
  );

  const recommendations = products
    .filter(product =>
      !purchasedProducts.has(product.id) &&
      purchasedCategories.has(product.categoryId)
    )
    .slice(0, 3)
    .map(product => ({
      productId: product.id,
      name: product.name,
      reason: "Similar to your purchases",
      score: 0.85, // Simplified scoring
    }));

  return recommendations;
}

// Performance monitoring utilities
function measurePerformance(fn, label) {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${label}: ${(end - start).toFixed(2)}ms`);
  return result;
}

// Demonstration functions
function runDenormalizationDemo() {
  console.log("=".repeat(60));
  console.log("DSA IN ACTION: DATA DENORMALIZATION DEMO");
  console.log("=".repeat(60));

  // Task 1: Product Catalog
  console.log("\n📦 Task 1: Product Catalog Denormalization");
  const productCatalog = measurePerformance(
    () => denormalizeProductCatalog(products),
    "Product catalog denormalization"
  );
  console.log("Number of products denormalized:", Object.keys(productCatalog).length);
  console.log("Sample product:", JSON.stringify(productCatalog.P001, null, 2));

  // Task 2: Order History
  console.log("\n🛒 Task 2: Order History Denormalization");
  const orderHistory = measurePerformance(
    () => denormalizeOrderHistory(orders),
    "Order history denormalization"
  );
  console.log("Number of orders processed:", orderHistory.length);
  console.log("Sample order:", JSON.stringify(orderHistory[0], null, 2));

  // Task 3: Product Reviews
  console.log("\n⭐ Task 3: Product Reviews Denormalization");
  const productReviews = measurePerformance(
    () => denormalizeProductReviews(),
    "Product reviews denormalization"
  );
  console.log("Products with reviews:", Object.keys(productReviews).length);
  console.log("Sample product reviews:", JSON.stringify(
    Object.values(productReviews)[0], null, 2
  ));

  // Task 4: User Dashboard
  console.log("\n👤 Task 4: User Dashboard Denormalization");
  const userDashboards = measurePerformance(
    () => denormalizeUserDashboard(),
    "User dashboard denormalization"
  );
  console.log("User dashboards created:", Object.keys(userDashboards).length);
  console.log("Sample dashboard:", JSON.stringify(
    Object.values(userDashboards)[0].profile, null, 2
  ));

  console.log("\n⚡ Performance Benefits:");
  console.log("- Lookup tables enable O(1) joins vs O(n*m) nested loops");
  console.log("- Client-side denormalization reduces server requests");
  console.log("- Pre-computed aggregates improve UI responsiveness");
}

// Export functions for external use
module.exports = {
  denormalizeProductCatalog,
  denormalizeOrderHistory,
  denormalizeProductReviews,
  denormalizeUserDashboard,
  leftJoin,
  multiJoin,
};

// Run demo if this file is executed directly
if (require.main === module) {
  runDenormalizationDemo();
}
