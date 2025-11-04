// M02V08.js - Solution for Scenario Based Activity - Aggregating Data

// Sample Data
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

// Create lookup tables for efficient data access
const portfolioLookup = portfolios.reduce(
	(acc, p) => ((acc[p.id] = p), acc),
	{},
);
const investorLookup = investors.reduce((acc, i) => ((acc[i.id] = i), acc), {});

// Utility Functions
function sum(array, accessor = (x) => x) {
	return array.reduce((total, item) => total + accessor(item), 0);
}

function average(array, accessor = (x) => x) {
	return array.length > 0 ? sum(array, accessor) / array.length : 0;
}

function count(array, predicate = () => true) {
	return array.filter(predicate).length;
}

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

// Task 1: Basic Portfolio Aggregations
function aggregatePortfolioMetrics(transactions) {
	const grouped = groupBy(transactions, (t) => t.portfolioId);
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

		const totalVolume = portfolioTxns.reduce(
			(sum, txn) => sum + txn.quantity,
			0,
		);

		results[portfolioId] = {
			portfolioName: portfolio?.name || "Unknown",
			totalTransactions: portfolioTxns.length,
			totalVolume: totalVolume,
			totalInvested: Math.round(totalInvested * 100) / 100,
			currentValue: Math.round(currentValue * 100) / 100,
			totalReturn: Math.round((currentValue - totalInvested) * 100) / 100,
			returnPercentage:
				totalInvested > 0
					? Math.round(
							((currentValue - totalInvested) / totalInvested) * 10000,
					  ) / 100
					: 0,
		};
	});

	return results;
}

// Task 2: Statistical Stock Performance Analysis
function calculateStockStatistics(transactions) {
	const grouped = groupBy(transactions, (t) => t.symbol);
	const results = {};

	Object.keys(grouped).forEach((symbol) => {
		const symbolTxns = grouped[symbol];
		const prices = symbolTxns.map((t) => t.price);

		const avgPrice = average(prices);
		const medianPrice = median(prices);
		const minPrice = min(prices);
		const maxPrice = max(prices);
		const priceRange = maxPrice - minPrice;
		const volatility = standardDeviation(prices);
		const currentPrice = currentPrices[symbol] || 0;
		const priceChange = currentPrice - avgPrice;

		results[symbol] = {
			transactionCount: symbolTxns.length,
			avgPrice: Math.round(avgPrice * 100) / 100,
			medianPrice: Math.round(medianPrice * 100) / 100,
			minPrice: Math.round(minPrice * 100) / 100,
			maxPrice: Math.round(maxPrice * 100) / 100,
			priceRange: Math.round(priceRange * 100) / 100,
			volatility: Math.round(volatility * 100) / 100,
			currentPrice: Math.round(currentPrice * 100) / 100,
			priceChange: Math.round(priceChange * 100) / 100,
		};
	});

	return results;
}

// Task 3: Time-Series Transaction Aggregations
function analyzeTimeSeriesTransactions(transactions) {
	const grouped = groupBy(transactions, (t) => t.date);

	// Daily metrics
	const dailyMetrics = Object.keys(grouped)
		.sort()
		.map((date) => {
			const dayTxns = grouped[date];
			const totalVolume = sum(dayTxns, (t) => t.quantity);
			const totalValue = sum(dayTxns, (t) => t.quantity * t.price);
			const avgPrice = totalVolume > 0 ? totalValue / totalVolume : 0;

			return {
				date,
				transactionCount: dayTxns.length,
				totalVolume,
				totalValue: Math.round(totalValue * 100) / 100,
				avgPrice: Math.round(avgPrice * 100) / 100,
			};
		});

	// Weekly trends (simplified - assuming dates are consecutive)
	const weeklyTrends = {};
	let currentWeek = 1;
	let weekStart = 0;

	for (let i = 0; i < dailyMetrics.length; i++) {
		if (i > 0 && i % 7 === 0) {
			currentWeek++;
			weekStart = i;
		}

		const weekKey = `week${currentWeek}`;
		if (!weeklyTrends[weekKey]) {
			weeklyTrends[weekKey] = { totalVolume: 0, days: 0 };
		}

		weeklyTrends[weekKey].totalVolume += dailyMetrics[i].totalVolume;
		weeklyTrends[weekKey].days++;
	}

	// Calculate weekly averages and growth rates
	Object.keys(weeklyTrends).forEach((week) => {
		const weekData = weeklyTrends[week];
		weekData.avgDailyVolume =
			Math.round((weekData.totalVolume / weekData.days) * 100) / 100;

		// Calculate growth rate compared to previous week
		const weekNum = parseInt(week.replace("week", ""));
		const prevWeek = `week${weekNum - 1}`;
		if (weeklyTrends[prevWeek]) {
			const prevVolume = weeklyTrends[prevWeek].totalVolume;
			weekData.growthRate =
				prevVolume > 0
					? Math.round(
							((weekData.totalVolume - prevVolume) / prevVolume) * 10000,
					  ) / 100
					: null;
		} else {
			weekData.growthRate = null;
		}
	});

	// Find peak day
	const peakDay = dailyMetrics.reduce((peak, day) =>
		day.totalVolume > peak.totalVolume ? day : peak,
	);

	return {
		dailyMetrics,
		weeklyTrends,
		peakDay: {
			date: peakDay.date,
			volume: peakDay.totalVolume,
			value: peakDay.totalValue,
		},
	};
}

// Task 4: Risk and Performance Analytics
function calculateRiskAndPerformanceMetrics(transactions) {
	const portfolioMetrics = aggregatePortfolioMetrics(transactions);
	const stockStats = calculateStockStatistics(transactions);
	const results = {};

	Object.keys(portfolioMetrics).forEach((portfolioId) => {
		const portfolio = portfolioLookup[portfolioId];
		const metrics = portfolioMetrics[portfolioId];

		// Calculate portfolio holdings for risk analysis
		const portfolioTxns = transactions.filter(
			(t) => t.portfolioId === portfolioId,
		);
		const holdings = portfolioTxns.reduce((acc, txn) => {
			if (!acc[txn.symbol]) acc[txn.symbol] = 0;
			const multiplier = txn.type === "BUY" ? 1 : -1;
			acc[txn.symbol] += txn.quantity * multiplier;
			return acc;
		}, {});

		// Calculate diversification score (inverse of concentration)
		const totalValue = metrics.currentValue;
		const holdingsValues = Object.keys(holdings).map(
			(symbol) => holdings[symbol] * (currentPrices[symbol] || 0),
		);
		const maxHolding = max(holdingsValues);
		const diversificationScore =
			totalValue > 0 ? 1 - maxHolding / totalValue : 0;

		// Find top holding
		const topHolding = Object.keys(holdings).reduce((top, symbol) => {
			const value = holdings[symbol] * (currentPrices[symbol] || 0);
			const topValue = holdings[top] * (currentPrices[top] || 0);
			return value > topValue ? symbol : top;
		});

		// Calculate concentration risk
		let concentrationRisk = "Low";
		if (diversificationScore < 0.5) concentrationRisk = "High";
		else if (diversificationScore < 0.7) concentrationRisk = "Medium";

		// Calculate volatility (simplified - using stock volatilities weighted by holdings)
		const portfolioVolatility = Object.keys(holdings).reduce(
			(total, symbol) => {
				const weight =
					(holdings[symbol] * (currentPrices[symbol] || 0)) / totalValue;
				const stockVol = stockStats[symbol]?.volatility || 0;
				return total + weight * stockVol;
			},
			0,
		);

		// Calculate Sharpe ratio (simplified)
		const riskFreeRate = 0.02; // 2%
		const annualizedReturn = metrics.returnPercentage / 100;
		const sharpeRatio =
			portfolioVolatility > 0
				? (annualizedReturn - riskFreeRate) / portfolioVolatility
				: 0;

		// Calculate max drawdown (simplified - using price changes)
		const priceChanges = portfolioTxns.map((txn) => {
			const current = currentPrices[txn.symbol] || 0;
			return (current - txn.price) / txn.price;
		});
		const maxDrawdown = priceChanges.length > 0 ? min(priceChanges) : 0;

		results[portfolioId] = {
			totalReturn: metrics.totalReturn,
			annualizedReturn: Math.round(metrics.returnPercentage * 100) / 100,
			volatility: Math.round(portfolioVolatility * 100) / 100,
			sharpeRatio: Math.round(sharpeRatio * 1000) / 1000,
			maxDrawdown: Math.round(maxDrawdown * 10000) / 100,
			diversificationScore: Math.round(diversificationScore * 100) / 100,
			topHolding,
			concentrationRisk,
		};
	});

	return results;
}

// Task 5: Investor Segmentation and Analytics
function analyzeInvestorSegments(transactions) {
	const portfolioMetrics = aggregatePortfolioMetrics(transactions);
	const investorPortfolios = {};

	// Group portfolios by investor
	Object.keys(portfolioMetrics).forEach((portfolioId) => {
		const portfolio = portfolioLookup[portfolioId];
		const investorId = portfolio?.investorId;

		if (investorId) {
			if (!investorPortfolios[investorId]) {
				investorPortfolios[investorId] = [];
			}
			investorPortfolios[investorId].push(portfolioId);
		}
	});

	const segments = {};
	const investorMetrics = {};

	Object.keys(investorPortfolios).forEach((investorId) => {
		const investor = investorLookup[investorId];
		const portfolioIds = investorPortfolios[investorId];

		// Aggregate investor-level metrics
		const investorTxns = transactions.filter((txn) =>
			portfolioIds.includes(txn.portfolioId),
		);

		const totalTransactions = investorTxns.length;
		const totalValue = portfolioIds.reduce(
			(sum, pid) => sum + (portfolioMetrics[pid]?.currentValue || 0),
			0,
		);
		const avgTransactionSize =
			totalTransactions > 0
				? sum(investorTxns, (t) => t.quantity * t.price) / totalTransactions
				: 0;

		// Analyze preferred stocks
		const stockCounts = investorTxns.reduce((acc, txn) => {
			acc[txn.symbol] = (acc[txn.symbol] || 0) + 1;
			return acc;
		}, {});
		const preferredStocks = Object.keys(stockCounts)
			.sort((a, b) => stockCounts[b] - stockCounts[a])
			.slice(0, 2);

		// Determine segment and risk profile
		let segment, riskProfile, recommendation;
		const monthlyTxns = totalTransactions / 1; // Assuming 1 month of data

		if (monthlyTxns >= 6) {
			segment = "High Frequency Trader";
			riskProfile = "Active";
			recommendation = "Monitor transaction costs";
		} else {
			segment = "Long Term Investor";
			riskProfile = "Conservative";
			recommendation = "Consider diversification into bonds";
		}

		// Update segments
		if (!segments[segment]) {
			segments[segment] = {
				investors: [],
				avgTransactionsPerMonth: 0,
				avgPortfolioValue: 0,
				riskProfile,
			};
		}
		segments[segment].investors.push(investorId);
		segments[segment].avgTransactionsPerMonth += monthlyTxns;
		segments[segment].avgPortfolioValue += totalValue;

		// Calculate segment averages
		Object.keys(segments).forEach((seg) => {
			const segData = segments[seg];
			const count = segData.investors.length;
			segData.avgTransactionsPerMonth =
				Math.round((segData.avgTransactionsPerMonth / count) * 10) / 10;
			segData.avgPortfolioValue = Math.round(segData.avgPortfolioValue / count);
		});

		investorMetrics[investorId] = {
			segment,
			totalTransactions,
			portfolioValue: Math.round(totalValue),
			avgTransactionSize: Math.round(avgTransactionSize * 100) / 100,
			preferredStocks,
			riskTolerance: portfolioLookup[portfolioIds[0]]?.riskLevel || "Medium",
			recommendation,
		};
	});

	return { segments, investorMetrics };
}

// Task 6: Advanced Market Insights and Forecasting
function generateMarketInsights(transactions) {
	const stockStats = calculateStockStatistics(transactions);
	const timeSeries = analyzeTimeSeriesTransactions(transactions);

	// Calculate market trends
	const trendingStocks = Object.keys(stockStats)
		.filter((symbol) => stockStats[symbol].priceChange > 0)
		.sort((a, b) => stockStats[b].priceChange - stockStats[a].priceChange);

	const decliningStocks = Object.keys(stockStats)
		.filter((symbol) => stockStats[symbol].priceChange < 0)
		.sort((a, b) => stockStats[a].priceChange - stockStats[b].priceChange);

	// Calculate market volatility index
	const volatilities = Object.values(stockStats).map((s) => s.volatility);
	const volatilityIndex = average(volatilities);

	// Determine market sentiment
	let marketSentiment = "Neutral";
	if (trendingStocks.length > decliningStocks.length) {
		marketSentiment = "Bullish";
	} else if (decliningStocks.length > trendingStocks.length) {
		marketSentiment = "Bearish";
	}

	// Generate price predictions (simplified linear trend)
	const predictions = {};
	Object.keys(stockStats).forEach((symbol) => {
		const stats = stockStats[symbol];
		const trend =
			stats.priceChange > 0
				? "Upward"
				: stats.priceChange < 0
				? "Downward"
				: "Sideways";
		const predictedPrice =
			stats.currentPrice * (1 + stats.priceChange / stats.avgPrice);
		const confidence = Math.max(0.5, 1 - stats.volatility / stats.avgPrice);

		let signal = "Hold";
		if (trend === "Upward" && confidence > 0.7) signal = "Buy";
		else if (trend === "Downward" && confidence > 0.7) signal = "Sell";

		predictions[symbol] = {
			predictedPrice: Math.round(predictedPrice * 100) / 100,
			confidence: Math.round(confidence * 100) / 100,
			trend,
			signal,
		};
	});

	// Generate rebalancing recommendations
	const portfolioMetrics = aggregatePortfolioMetrics(transactions);
	const rebalancingRecommendations = {};

	Object.keys(portfolioMetrics).forEach((portfolioId) => {
		const portfolioTxns = transactions.filter(
			(t) => t.portfolioId === portfolioId,
		);
		const holdings = portfolioTxns.reduce((acc, txn) => {
			if (!acc[txn.symbol]) acc[txn.symbol] = 0;
			const multiplier = txn.type === "BUY" ? 1 : -1;
			acc[txn.symbol] += txn.quantity * multiplier;
			return acc;
		}, {});

		const totalValue = portfolioMetrics[portfolioId].currentValue;
		const targetAllocation = 1 / Object.keys(holdings).length; // Equal weighting

		const actions = [];
		Object.keys(holdings).forEach((symbol) => {
			const currentValue = holdings[symbol] * (currentPrices[symbol] || 0);
			const currentAllocation = currentValue / totalValue;
			const deviation = currentAllocation - targetAllocation;

			if (Math.abs(deviation) > 0.1) {
				// 10% deviation threshold
				const adjustmentQuantity = Math.round(
					(deviation * totalValue) / (currentPrices[symbol] || 1),
				);
				if (adjustmentQuantity > 0) {
					actions.push({
						action: "Sell",
						symbol,
						quantity: Math.abs(adjustmentQuantity),
						reason: "Overweight",
					});
				} else if (adjustmentQuantity < 0) {
					actions.push({
						action: "Buy",
						symbol,
						quantity: Math.abs(adjustmentQuantity),
						reason: "Underweight",
					});
				}
			}
		});

		if (actions.length > 0) {
			rebalancingRecommendations[portfolioId] = {
				actions,
				expectedImpact: {
					riskReduction: Math.round(Math.random() * 10 * 100) / 100, // Simulated
					returnImprovement: Math.round(Math.random() * 5 * 100) / 100, // Simulated
				},
			};
		}
	});

	return {
		marketInsights: {
			trendingStocks,
			decliningStocks,
			volatilityIndex: Math.round(volatilityIndex * 100) / 100,
			marketSentiment,
		},
		predictions,
		rebalancingRecommendations,
	};
}

// Advanced Challenge 1: Real-Time Aggregation Engine
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

	reset() {
		this.dataWindow = [];
		this.currentAggregate = null;
	}
}

// Advanced Challenge 2: Custom Aggregation Functions
function calculateSharpeRatio(returns, riskFreeRate = 0.02) {
	const avgReturn = average(returns);
	const volatility = standardDeviation(returns);
	return volatility > 0 ? (avgReturn - riskFreeRate) / volatility : 0;
}

function calculateMaxDrawdown(priceSeries) {
	if (priceSeries.length < 2) return 0;

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

function calculateCustomerLifetimeValue(transactions, discountRate = 0.1) {
	return transactions.reduce((clv, transaction, index) => {
		const timeValue = transaction.amount / Math.pow(1 + discountRate, index);
		return clv + timeValue;
	}, 0);
}

// Test Functions
function runAllTasks() {
	console.log("=".repeat(60));
	console.log("SCENARIO BASED ACTIVITY: AGGREGATING DATA");
	console.log("=".repeat(60));

	console.log("\n📊 TASK 1: Basic Portfolio Aggregations");
	console.log(
		JSON.stringify(aggregatePortfolioMetrics(stockTransactions), null, 2),
	);

	console.log("\n📊 TASK 2: Statistical Stock Performance Analysis");
	console.log(
		JSON.stringify(calculateStockStatistics(stockTransactions), null, 2),
	);

	console.log("\n📊 TASK 3: Time-Series Transaction Aggregations");
	const timeSeries = analyzeTimeSeriesTransactions(stockTransactions);
	console.log(JSON.stringify(timeSeries, null, 2));

	console.log("\n📊 TASK 4: Risk and Performance Analytics");
	console.log(
		JSON.stringify(
			calculateRiskAndPerformanceMetrics(stockTransactions),
			null,
			2,
		),
	);

	console.log("\n📊 TASK 5: Investor Segmentation and Analytics");
	console.log(
		JSON.stringify(analyzeInvestorSegments(stockTransactions), null, 2),
	);

	console.log("\n📊 TASK 6: Advanced Market Insights and Forecasting");
	console.log(
		JSON.stringify(generateMarketInsights(stockTransactions), null, 2),
	);

	console.log("\n🚀 CHALLENGE 1: Real-Time Aggregation Demo");
	const realTimeAgg = new RealTimeAggregator(
		(data) => ({
			count: data.length,
			sum: sum(data, (d) => d.quantity || 1),
			avg: average(data, (d) => d.quantity || 1),
		}),
		5,
	);

	// Simulate real-time data
	const sampleData = stockTransactions.slice(0, 8);
	sampleData.forEach((txn, index) => {
		const result = realTimeAgg.addDataPoint(txn);
		console.log(`After ${index + 1} transactions:`, result);
	});

	console.log("\n🚀 CHALLENGE 2: Custom Financial Metrics");
	const sampleReturns = [0.05, 0.03, 0.08, -0.02, 0.06];
	const sharpe = calculateSharpeRatio(sampleReturns);
	const mdd = calculateMaxDrawdown([100, 105, 102, 108, 95, 110]);
	console.log(`Sharpe Ratio: ${Math.round(sharpe * 1000) / 1000}`);
	console.log(`Max Drawdown: ${Math.round(mdd * 10000) / 100}%`);
}

// Performance Benchmarking
function benchmarkAggregations() {
	console.log("\n⚡ PERFORMANCE BENCHMARK");

	// Create larger dataset
	const largeDataSet = Array.from({ length: 10000 }, (_, i) => ({
		id: `TXN${String(i + 1).padStart(5, "0")}`,
		symbol: ["AAPL", "GOOGL", "MSFT", "TSLA"][i % 4],
		type: i % 3 === 0 ? "SELL" : "BUY",
		quantity: Math.floor(Math.random() * 100) + 1,
		price: Math.floor(Math.random() * 1000) + 100,
		date: `2024-01-${String((i % 28) + 1).padStart(2, "0")}`,
		portfolioId: `P${String((i % 2) + 1).padStart(3, "0")}`,
	}));

	console.time("Portfolio Aggregation (10,000 records)");
	aggregatePortfolioMetrics(largeDataSet);
	console.timeEnd("Portfolio Aggregation (10,000 records)");

	console.time("Stock Statistics (10,000 records)");
	calculateStockStatistics(largeDataSet);
	console.timeEnd("Stock Statistics (10,000 records)");
}

// Validation Functions
function validateTask1() {
	const result = aggregatePortfolioMetrics(stockTransactions);
	const expectedInvestedP001 =
		100 * 150.25 + 50 * 2800.0 - 50 * 155.75 - 25 * 2850.25;
	const expectedInvestedP002 =
		75 * 380.5 + 25 * 245.8 - 25 * 395.75 + 75 * 152.3;

	console.log("\n✅ TASK 1 VALIDATION:");
	console.log(
		"P001 Total Invested - Expected:",
		Math.round(expectedInvestedP001 * 100) / 100,
	);
	console.log("P001 Total Invested - Actual:", result.P001?.totalInvested);
	console.log(
		"Match:",
		Math.abs(
			result.P001?.totalInvested - Math.round(expectedInvestedP001 * 100) / 100,
		) < 0.01
			? "✅"
			: "❌",
	);
}

// Main execution
if (require.main === module) {
	runAllTasks();
	benchmarkAggregations();
	validateTask1();
}

module.exports = {
	stockTransactions,
	currentPrices,
	portfolios,
	investors,
	portfolioLookup,
	investorLookup,
	sum,
	average,
	standardDeviation,
	median,
	groupBy,
	aggregatePortfolioMetrics,
	calculateStockStatistics,
	analyzeTimeSeriesTransactions,
	calculateRiskAndPerformanceMetrics,
	analyzeInvestorSegments,
	generateMarketInsights,
	RealTimeAggregator,
	calculateSharpeRatio,
	calculateMaxDrawdown,
	calculateCustomerLifetimeValue,
};

// Module Video Task

//* Grouping and Aggregating Data

// Scenario: You have a flat array of sales data, and you need to group the sales by category,
// calculating the total revenue and the number of items sold for each.

const sales = [
	{ category: "Electronics", item: "Laptop", price: 1200, quantity: 1 },
	{ category: "Books", item: "JS Basics", price: 30, quantity: 2 },
	{ category: "Electronics", item: "Mouse", price: 25, quantity: 2 },
	{ category: "Home", item: "Chair", price: 150, quantity: 1 },
	{ category: "Books", item: "React Deep Dive", price: 50, quantity: 1 },
	{ category: "Electronics", item: "Keyboard", price: 80, quantity: 1 },
];

const totalSalesByCategory = sales.reduce((table, sale) => {
	// console.log(table, " : ", sale);
	const { category, price, quantity } = sale;

	if (!table[category]) {
		table[category] = {
			totalRevenue: 0,
			itemCount: 0,
		};
	}

	table[category].totalRevenue += price * quantity;
	table[category].itemCount += quantity;

	return table;
}, {});

console.log(totalSalesByCategory);

//? Output
// {
//   Electronics: {
//     totalRevenue: 1330,
//     itemCount: 4,
//   },
//   Books: {
//     totalRevenue: 110,
//     itemCount: 3,
//   },
//   Home: {
//     totalRevenue: 150,
//     itemCount: 1,
//   },
// };
