# 2-8: Scenario Based Activity - Aggregating Data

## Introduction

Welcome to the advanced scenario-based activity for Module 2! Building on the grouping concepts from the previous activity, this session focuses on **data aggregation** - the process of combining multiple data points into meaningful summary statistics and metrics.

Aggregation is the cornerstone of data analysis, enabling you to:

- Calculate summary statistics (totals, averages, counts)
- Perform statistical analysis (min, max, median, standard deviation)
- Generate KPIs and business metrics
- Create time-series analytics and trends
- Build complex calculated fields and derived metrics

## Learning Objectives

By the end of this activity, you will be able to:

- Implement complex aggregation functions using `reduce()`
- Calculate statistical measures and business metrics
- Handle conditional and multi-dimensional aggregations
- Create reusable aggregation pipelines
- Optimize aggregation performance for large datasets
- Apply advanced mathematical operations in data processing

## Scenario: Financial Analytics Dashboard

You work for a fintech company that provides investment analytics. Your task is to build a comprehensive financial dashboard that aggregates transaction data, calculates portfolio performance metrics, and generates investment insights. You'll work with stock transactions, market data, and portfolio information.

### Sample Data

```javascript
const stockTransactions = [
	{
		id: "TXN001",
		symbol: "AAPL",
		type: "BUY",
		quantity: 100,
		price: 150.25,
		date: "2024-01-15",
		portfolioId: "P001",
	},
	{
		id: "TXN002",
		symbol: "GOOGL",
		type: "BUY",
		quantity: 50,
		price: 2800.0,
		date: "2024-01-16",
		portfolioId: "P001",
	},
	{
		id: "TXN003",
		symbol: "AAPL",
		type: "SELL",
		quantity: 50,
		price: 155.75,
		date: "2024-01-20",
		portfolioId: "P001",
	},
	{
		id: "TXN004",
		symbol: "MSFT",
		type: "BUY",
		quantity: 75,
		price: 380.5,
		date: "2024-01-18",
		portfolioId: "P002",
	},
	{
		id: "TXN005",
		symbol: "TSLA",
		type: "BUY",
		quantity: 25,
		price: 245.8,
		date: "2024-01-19",
		portfolioId: "P002",
	},
	{
		id: "TXN006",
		symbol: "GOOGL",
		type: "SELL",
		quantity: 25,
		price: 2850.25,
		date: "2024-01-22",
		portfolioId: "P001",
	},
	{
		id: "TXN007",
		symbol: "AAPL",
		type: "BUY",
		quantity: 75,
		price: 152.3,
		date: "2024-01-25",
		portfolioId: "P002",
	},
	{
		id: "TXN008",
		symbol: "MSFT",
		type: "SELL",
		quantity: 25,
		price: 395.75,
		date: "2024-01-28",
		portfolioId: "P002",
	},
];

const currentPrices = {
	AAPL: 158.5,
	GOOGL: 2875.0,
	MSFT: 392.25,
	TSLA: 252.4,
};

const portfolios = [
	{
		id: "P001",
		name: "Growth Portfolio",
		investorId: "I001",
		riskLevel: "High",
	},
	{
		id: "P002",
		name: "Balanced Portfolio",
		investorId: "I002",
		riskLevel: "Medium",
	},
];

const investors = [
	{
		id: "I001",
		name: "Alice Chen",
		email: "alice@example.com",
		accountType: "Premium",
	},
	{
		id: "I002",
		name: "Bob Wilson",
		email: "bob@example.com",
		accountType: "Standard",
	},
];
```

## Activity Tasks

### Task 1: Basic Portfolio Aggregations

**Objective**: Calculate basic portfolio performance metrics including total value, transaction counts, and volume.

**Requirements**:

- Calculate total portfolio value (current holdings × current prices)
- Aggregate transaction counts and volumes by portfolio
- Compute total investment amounts and current values
- Include portfolio metadata in results

**Expected Output**:

```javascript
{
  "P001": {
    portfolioName: "Growth Portfolio",
    totalTransactions: 4,
    totalVolume: 225,
    totalInvested: 431275.00,
    currentValue: 434250.00,
    totalReturn: 2975.00,
    returnPercentage: 0.69
  },
  "P002": {
    portfolioName: "Balanced Portfolio",
    totalTransactions: 4,
    totalVolume: 175,
    totalInvested: 141057.50,
    currentValue: 142875.00,
    totalReturn: 1817.50,
    returnPercentage: 1.29
  }
}
```

### Task 2: Statistical Stock Performance Analysis

**Objective**: Calculate statistical measures for stock performance including volatility, best/worst performers, and risk metrics.

**Requirements**:

- Calculate average, median, min, and max prices for each stock
- Compute price volatility (standard deviation)
- Identify best and worst performing stocks
- Calculate price ranges and percentiles

**Expected Output**:

```javascript
{
  "AAPL": {
    transactionCount: 3,
    avgPrice: 152.77,
    medianPrice: 152.30,
    minPrice: 150.25,
    maxPrice: 155.75,
    priceRange: 5.50,
    volatility: 2.75,
    currentPrice: 158.50,
    priceChange: 5.73
  },
  "GOOGL": {
    transactionCount: 2,
    avgPrice: 2825.13,
    medianPrice: 2825.13,
    minPrice: 2800.00,
    maxPrice: 2850.25,
    priceRange: 50.25,
    volatility: 25.13,
    currentPrice: 2875.00,
    priceChange: 49.87
  },
  // ... other stocks
}
```

### Task 3: Time-Series Transaction Aggregations

**Objective**: Analyze transaction patterns over time, including daily volumes, weekly trends, and period-over-period comparisons.

**Requirements**:

- Group transactions by date and calculate daily metrics
- Compute 7-day moving averages for transaction volumes
- Calculate period-over-period growth rates
- Identify peak trading days and trends

**Expected Output**:

```javascript
{
  dailyMetrics: [
    {
      date: "2024-01-15",
      transactionCount: 1,
      totalVolume: 100,
      totalValue: 15025.00,
      avgPrice: 150.25
    },
    // ... other dates
  ],
  weeklyTrends: {
    week1: { totalVolume: 325, avgDailyVolume: 65.00, growthRate: null },
    week2: { totalVolume: 150, avgDailyVolume: 75.00, growthRate: 15.38 },
    // ... other weeks
  },
  peakDay: {
    date: "2024-01-25",
    volume: 75,
    value: 11422.50
  }
}
```

### Task 4: Risk and Performance Analytics

**Objective**: Calculate advanced risk metrics and performance indicators for portfolios.

**Requirements**:

- Compute Sharpe ratio (return vs. volatility)
- Calculate maximum drawdown
- Assess portfolio diversification (concentration risk)
- Generate risk-adjusted return metrics

**Expected Output**:

```javascript
{
  "P001": {
    totalReturn: 2975.00,
    annualizedReturn: 0.69,
    volatility: 15.23,
    sharpeRatio: 0.045,
    maxDrawdown: -2.15,
    diversificationScore: 0.75,
    topHolding: "GOOGL",
    concentrationRisk: "Medium"
  },
  "P002": {
    totalReturn: 1817.50,
    annualizedReturn: 1.29,
    volatility: 12.87,
    sharpeRatio: 0.100,
    maxDrawdown: -1.85,
    diversificationScore: 0.82,
    topHolding: "MSFT",
    concentrationRisk: "Low"
  }
}
```

### Task 5: Investor Segmentation and Analytics

**Objective**: Segment investors based on their trading behavior and portfolio performance.

**Requirements**:

- Categorize investors by trading frequency and volume
- Calculate investor lifetime value and engagement metrics
- Analyze portfolio performance by investor segments
- Generate personalized insights and recommendations

**Expected Output**:

```javascript
{
  segments: {
    "High Frequency Trader": {
      investors: ["I002"],
      avgTransactionsPerMonth: 8.0,
      avgPortfolioValue: 142875.00,
      riskProfile: "Active"
    },
    "Long Term Investor": {
      investors: ["I001"],
      avgTransactionsPerMonth: 4.0,
      avgPortfolioValue: 434250.00,
      riskProfile: "Conservative"
    }
  },
  investorMetrics: {
    "I001": {
      segment: "Long Term Investor",
      totalTransactions: 4,
      portfolioValue: 434250.00,
      avgTransactionSize: 107818.75,
      preferredStocks: ["AAPL", "GOOGL"],
      riskTolerance: "High",
      recommendation: "Consider diversification into bonds"
    },
    "I002": {
      segment: "High Frequency Trader",
      totalTransactions: 4,
      portfolioValue: 142875.00,
      avgTransactionSize: 35264.38,
      preferredStocks: ["MSFT", "TSLA"],
      riskTolerance: "Medium",
      recommendation: "Monitor transaction costs"
    }
  }
}
```

### Task 6: Advanced Market Insights and Forecasting

**Objective**: Generate predictive analytics and market insights using historical patterns.

**Requirements**:

- Calculate momentum indicators and trend analysis
- Predict future price movements based on historical data
- Generate buy/sell signals using technical indicators
- Create portfolio rebalancing recommendations

**Expected Output**:

```javascript
{
  marketInsights: {
    trendingStocks: ["GOOGL", "TSLA"],
    decliningStocks: ["AAPL"],
    volatilityIndex: 18.45,
    marketSentiment: "Bullish"
  },
  predictions: {
    "AAPL": {
      predictedPrice: 162.35,
      confidence: 0.78,
      trend: "Sideways",
      signal: "Hold"
    },
    "GOOGL": {
      predictedPrice: 2950.00,
      confidence: 0.85,
      trend: "Upward",
      signal: "Buy"
    },
    // ... other predictions
  },
  rebalancingRecommendations: {
    "P001": {
      actions: [
        { action: "Sell", symbol: "GOOGL", quantity: 10, reason: "Overweight" },
        { action: "Buy", symbol: "MSFT", quantity: 15, reason: "Underweight" }
      ],
      expectedImpact: {
        riskReduction: 5.2,
        returnImprovement: 2.8
      }
    }
  }
}
```

## Implementation Guide

### Step 1: Set Up Your Environment

Create a new JavaScript file for this activity:

```javascript
// M02-Aggregation-Activity.js

// Import sample data
const stockTransactions = [
	/* ... */
];
const currentPrices = {
	/* ... */
};
const portfolios = [
	/* ... */
];
const investors = [
	/* ... */
];

// Create lookup tables
const portfolioLookup = portfolios.reduce(
	(acc, p) => ((acc[p.id] = p), acc),
	{},
);
const investorLookup = investors.reduce((acc, i) => ((acc[i.id] = i), acc), {});
```

### Step 2: Implement Core Aggregation Functions

Create reusable aggregation functions:

```javascript
// Basic aggregations
function sum(array, accessor = (x) => x) {
	return array.reduce((total, item) => total + accessor(item), 0);
}

function average(array, accessor = (x) => x) {
	return array.length > 0 ? sum(array, accessor) / array.length : 0;
}

function count(array, predicate = () => true) {
	return array.filter(predicate).length;
}

// Statistical aggregations
function min(array, accessor = (x) => x) {
	return array.length > 0 ? Math.min(...array.map(accessor)) : null;
}

function max(array, accessor = (x) => x) {
	return array.length > 0 ? Math.max(...array.map(accessor)) : null;
}

function median(array, accessor = (x) => x) {
	if (array.length === 0) return null;
	const sorted = [...array].map(accessor).sort((a, b) => a - b);
	const mid = Math.floor(sorted.length / 2);
	return sorted.length % 2 === 0
		? (sorted[mid - 1] + sorted[mid]) / 2
		: sorted[mid];
}

function standardDeviation(array, accessor = (x) => x) {
	if (array.length < 2) return 0;
	const values = array.map(accessor);
	const avg = average(values);
	const squaredDiffs = values.map((value) => Math.pow(value - avg, 2));
	return Math.sqrt(sum(squaredDiffs) / (values.length - 1));
}
```

### Step 3: Create Advanced Aggregation Pipelines

Build complex aggregation pipelines:

```javascript
function createAggregationPipeline(steps) {
	return function (data) {
		return steps.reduce((result, step) => step(result), data);
	};
}

// Usage example
const portfolioAggregationPipeline = createAggregationPipeline([
	groupByPortfolio,
	calculateBasicMetrics,
	calculateAdvancedMetrics,
	calculateRiskMetrics,
]);
```

### Step 4: Implement Each Task

Work through each task systematically, applying the aggregation patterns you've learned.

### Step 5: Test and Validate

Create comprehensive test functions:

```javascript
function validateAggregations() {
	const results = {};

	// Test Task 1
	results.portfolioMetrics = aggregatePortfolioMetrics(stockTransactions);

	// Test Task 2
	results.stockStats = calculateStockStatistics(stockTransactions);

	// Validate results
	console.log("Validation Results:", validateResults(results));

	return results;
}
```

## Advanced Challenges

### Challenge 1: Real-Time Aggregation Engine

Create a real-time aggregation system that can handle streaming financial data:

```javascript
class RealTimeAggregator {
	constructor(aggregationFn, windowSize = 1000) {
		this.aggregationFn = aggregationFn;
		this.windowSize = windowSize;
		this.dataWindow = [];
		this.currentAggregate = null;
	}

	addDataPoint(dataPoint) {
		this.dataWindow.push(dataPoint);

		// Maintain window size
		if (this.dataWindow.length > this.windowSize) {
			this.dataWindow.shift();
		}

		// Update aggregate
		this.currentAggregate = this.aggregationFn(this.dataWindow);

		return this.currentAggregate;
	}

	getCurrentAggregate() {
		return this.currentAggregate;
	}
}
```

### Challenge 2: Custom Aggregation Functions

Implement domain-specific aggregation functions:

```javascript
// Financial aggregations
function calculateSharpeRatio(returns, riskFreeRate = 0.02) {
	const avgReturn = average(returns);
	const volatility = standardDeviation(returns);
	return volatility > 0 ? (avgReturn - riskFreeRate) / volatility : 0;
}

function calculateMaxDrawdown(priceSeries) {
	let maxDrawdown = 0;
	let peak = priceSeries[0];

	for (let i = 1; i < priceSeries.length; i++) {
		if (priceSeries[i] > peak) {
			peak = priceSeries[i];
		}
		const drawdown = (peak - priceSeries[i]) / peak;
		maxDrawdown = Math.max(maxDrawdown, drawdown);
	}

	return maxDrawdown;
}

// Business aggregations
function calculateCustomerLifetimeValue(transactions, discountRate = 0.1) {
	return transactions.reduce((clv, transaction, index) => {
		const timeValue = transaction.amount / Math.pow(1 + discountRate, index);
		return clv + timeValue;
	}, 0);
}
```

### Challenge 3: Parallel Aggregation Processing

Implement parallel processing for large-scale aggregations:

```javascript
function parallelAggregate(data, aggregationFn, chunkSize = 1000) {
	const chunks = [];
	for (let i = 0; i < data.length; i += chunkSize) {
		chunks.push(data.slice(i, i + chunkSize));
	}

	// Process chunks in parallel (simulated)
	const promises = chunks.map(
		(chunk) =>
			new Promise((resolve) => {
				// Simulate async processing
				setTimeout(() => resolve(aggregationFn(chunk)), Math.random() * 100);
			}),
	);

	return Promise.all(promises).then((chunkResults) => {
		// Combine results
		return chunkResults.reduce((combined, chunkResult) => {
			// Merge aggregation results
			return mergeAggregations(combined, chunkResult);
		}, {});
	});
}
```

## Mathematical Foundations

### Statistical Measures

#### Mean (Average)

```
μ = Σxᵢ / n
```

Where xᵢ are individual values and n is the sample size.

#### Standard Deviation

```
σ = √[Σ(xᵢ - μ)² / (n - 1)]
```

Measures the spread of data around the mean.

#### Sharpe Ratio

```
SR = (Rₚ - R_f) / σₚ
```

Where Rₚ is portfolio return, R_f is risk-free rate, and σₚ is portfolio volatility.

### Financial Metrics

#### Return Percentage

```
Return % = ((Current Value - Invested Amount) / Invested Amount) × 100
```

#### Maximum Drawdown

```
MDD = Max((Peak - Trough) / Peak) for all periods
```

## Best Practices for Data Aggregation

### 1. Choose Appropriate Data Types

- Use `number` for financial calculations
- Handle `null`/`undefined` values gracefully
- Consider precision for monetary calculations

### 2. Optimize for Performance

- Pre-compute expensive calculations when possible
- Use appropriate algorithms for large datasets
- Cache frequently accessed aggregations

### 3. Ensure Data Integrity

- Validate input data before aggregation
- Handle edge cases (empty arrays, division by zero)
- Round results appropriately for display

### 4. Create Reusable Components

- Build generic aggregation functions
- Create aggregation pipelines
- Separate business logic from calculation logic

## Solution Template

```javascript
// M02-Aggregation-Activity.js

// Setup
const stockTransactions = [
	/* ... data ... */
];
const currentPrices = {
	/* ... */
};
const portfolios = [
	/* ... */
];
const investors = [
	/* ... */
];

// Lookup tables
const portfolioLookup = portfolios.reduce(
	(acc, p) => ((acc[p.id] = p), acc),
	{},
);
const investorLookup = investors.reduce((acc, i) => ((acc[i.id] = i), acc), {});

// Utility functions
function sum(array, accessor = (x) => x) {
	return array.reduce((total, item) => total + accessor(item), 0);
}

function average(array, accessor = (x) => x) {
	return array.length > 0 ? sum(array, accessor) / array.length : 0;
}

function standardDeviation(array, accessor = (x) => x) {
	if (array.length < 2) return 0;
	const values = array.map(accessor);
	const avg = average(values);
	const squaredDiffs = values.map((value) => Math.pow(value - avg, 2));
	return Math.sqrt(sum(squaredDiffs) / (values.length - 1));
}

// Task 1: Basic Portfolio Aggregations
function aggregatePortfolioMetrics(transactions) {
	const grouped = transactions.reduce((acc, txn) => {
		if (!acc[txn.portfolioId]) {
			acc[txn.portfolioId] = [];
		}
		acc[txn.portfolioId].push(txn);
		return acc;
	}, {});

	const results = {};

	Object.keys(grouped).forEach((portfolioId) => {
		const portfolioTxns = grouped[portfolioId];
		const portfolio = portfolioLookup[portfolioId];

		// Calculate current holdings
		const holdings = portfolioTxns.reduce((acc, txn) => {
			if (!acc[txn.symbol]) acc[txn.symbol] = 0;
			const multiplier = txn.type === "BUY" ? 1 : -1;
			acc[txn.symbol] += txn.quantity * multiplier;
			return acc;
		}, {});

		// Calculate values
		const currentValue = Object.keys(holdings).reduce((total, symbol) => {
			return total + holdings[symbol] * (currentPrices[symbol] || 0);
		}, 0);

		const totalInvested = portfolioTxns.reduce((total, txn) => {
			const amount = txn.quantity * txn.price;
			return total + (txn.type === "BUY" ? amount : -amount);
		}, 0);

		results[portfolioId] = {
			portfolioName: portfolio?.name || "Unknown",
			totalTransactions: portfolioTxns.length,
			totalVolume: portfolioTxns.reduce((sum, txn) => sum + txn.quantity, 0),
			totalInvested: Math.round(totalInvested * 100) / 100,
			currentValue: Math.round(currentValue * 100) / 100,
			totalReturn: Math.round((currentValue - totalInvested) * 100) / 100,
			returnPercentage:
				Math.round(((currentValue - totalInvested) / totalInvested) * 10000) /
				100,
		};
	});

	return results;
}

// Add implementations for other tasks...

// Test functions
function runAllTasks() {
	console.log("=".repeat(60));
	console.log("SCENARIO BASED ACTIVITY: AGGREGATING DATA");
	console.log("=".repeat(60));

	console.log("\n📊 TASK 1: Basic Portfolio Aggregations");
	console.log(
		JSON.stringify(aggregatePortfolioMetrics(stockTransactions), null, 2),
	);

	// Add tests for other tasks
}

// Run the activity
runAllTasks();
```

## Expected Learning Outcomes

After completing this activity, you should be able to:

1. **Implement complex aggregation functions** using advanced `reduce()` patterns
2. **Calculate statistical measures** including mean, median, standard deviation
3. **Build financial and business metrics** for real-world applications
4. **Create reusable aggregation pipelines** for data processing workflows
5. **Handle time-series data** with moving averages and trend analysis
6. **Optimize aggregation performance** for large-scale data processing
7. **Apply mathematical concepts** in practical JavaScript programming

## Next Steps

- Apply these aggregation techniques to your own financial or business data
- Explore more advanced statistical methods (correlation, regression)
- Learn about database aggregation functions (SQL aggregate functions)
- Study big data aggregation frameworks (Apache Spark, Hadoop)

This activity demonstrates the power of JavaScript's `reduce()` method for complex data aggregation and analysis. Mastering these patterns will enable you to build sophisticated analytics dashboards and data processing pipelines.

Happy coding! 📈
