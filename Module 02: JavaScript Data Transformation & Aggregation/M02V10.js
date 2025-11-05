// M02V10.js - Solution for Scenario Based Activity - Binning (Resampling) Time Series Data

// Sample Data
const sensorReadings = [
	{
		sensorId: "TEMP001",
		timestamp: "2024-01-15T08:00:00Z",
		temperature: 22.5,
		humidity: 45.2,
		energy: 1250.5,
	},
	{
		sensorId: "TEMP001",
		timestamp: "2024-01-15T08:05:00Z",
		temperature: 23.1,
		humidity: 44.8,
		energy: 1280.2,
	},
	{
		sensorId: "TEMP001",
		timestamp: "2024-01-15T08:10:00Z",
		temperature: 22.8,
		humidity: 45.5,
		energy: 1310.8,
	},
	{
		sensorId: "TEMP001",
		timestamp: "2024-01-15T08:15:00Z",
		temperature: 23.5,
		humidity: 44.2,
		energy: 1341.3,
	},
	{
		sensorId: "TEMP001",
		timestamp: "2024-01-15T08:20:00Z",
		temperature: 24.2,
		humidity: 43.9,
		energy: 1371.9,
	},
	{
		sensorId: "TEMP002",
		timestamp: "2024-01-15T08:02:00Z",
		temperature: 21.8,
		humidity: 46.1,
		energy: 1180.4,
	},
	{
		sensorId: "TEMP002",
		timestamp: "2024-01-15T08:07:00Z",
		temperature: 22.2,
		humidity: 45.7,
		energy: 1210.1,
	},
	{
		sensorId: "TEMP002",
		timestamp: "2024-01-15T08:12:00Z",
		temperature: 21.9,
		humidity: 46.3,
		energy: 1240.6,
	},
	{
		sensorId: "TEMP002",
		timestamp: "2024-01-15T08:17:00Z",
		temperature: 22.4,
		humidity: 45.8,
		energy: 1271.2,
	},
	{
		sensorId: "TEMP002",
		timestamp: "2024-01-15T08:22:00Z",
		temperature: 22.7,
		humidity: 45.4,
		energy: 1301.7,
	},
	{
		sensorId: "TEMP001",
		timestamp: "2024-01-15T08:25:00Z",
		temperature: 24.8,
		humidity: 43.2,
		energy: 1402.4,
	},
	{
		sensorId: "TEMP002",
		timestamp: "2024-01-15T08:27:00Z",
		temperature: 23.1,
		humidity: 44.9,
		energy: 1332.1,
	},
	{
		sensorId: "TEMP001",
		timestamp: "2024-01-15T08:30:00Z",
		temperature: 25.2,
		humidity: 42.8,
		energy: 1432.9,
	},
	{
		sensorId: "TEMP002",
		timestamp: "2024-01-15T08:32:00Z",
		temperature: 23.4,
		humidity: 44.5,
		energy: 1362.6,
	},
];

const buildingInfo = [
	{
		buildingId: "BLDG001",
		name: "Office Tower A",
		timezone: "America/New_York",
		sensors: ["TEMP001", "TEMP002"],
	},
	{
		buildingId: "BLDG002",
		name: "Warehouse B",
		timezone: "America/Los_Angeles",
		sensors: ["TEMP003", "TEMP004"],
	},
];

const alerts = [
	{
		sensorId: "TEMP001",
		timestamp: "2024-01-15T08:25:00Z",
		type: "HIGH_TEMP",
		message: "Temperature exceeded 25°C",
	},
	{
		sensorId: "TEMP002",
		timestamp: "2024-01-15T08:30:00Z",
		type: "LOW_HUMIDITY",
		message: "Humidity dropped below 40%",
	},
];

// Utility Functions
function parseTimestamp(ts) {
	return new Date(ts);
}

function formatTimestamp(date, interval = "minutes") {
	const rounded = new Date(date);
	switch (interval) {
		case "minutes":
			rounded.setSeconds(0, 0);
			break;
		case "hours":
			rounded.setMinutes(0, 0, 0, 0);
			break;
		case "days":
			rounded.setHours(0, 0, 0, 0);
			break;
	}
	return rounded.toISOString();
}

function getTimeBin(timestamp, binSize = 15) {
	const date = parseTimestamp(timestamp);
	const minutes = date.getMinutes();
	const roundedMinutes = Math.floor(minutes / binSize) * binSize;
	date.setMinutes(roundedMinutes, 0, 0);
	return date.toISOString();
}

function createTimeBins(data, binSize = 15, timeKey = "timestamp") {
	const bins = {};

	data.forEach((item) => {
		const binKey = getTimeBin(item[timeKey], binSize);
		if (!bins[binKey]) {
			bins[binKey] = [];
		}
		bins[binKey].push(item);
	});

	return bins;
}

function aggregateBin(
	binData,
	metrics = ["temperature", "humidity", "energy"],
) {
	const result = {};

	metrics.forEach((metric) => {
		const values = binData.map((item) => item[metric]).filter((v) => v != null);
		if (values.length > 0) {
			result[metric] = {
				avg: values.reduce((sum, v) => sum + v, 0) / values.length,
				min: Math.min(...values),
				max: Math.max(...values),
				count: values.length,
				sum: values.reduce((sum, v) => sum + v, 0),
			};
		}
	});

	return result;
}

// Task 1: Basic Time Series Binning
function binTimeSeries(
	data,
	binSize = 15,
	metrics = ["temperature", "humidity", "energy"],
) {
	const bins = createTimeBins(data, binSize);
	const result = {};

	Object.keys(bins)
		.sort()
		.forEach((binKey) => {
			result[binKey] = aggregateBin(bins[binKey], metrics);
		});

	return result;
}

// Task 2: Multi-Resolution Resampling
function resampleTimeSeries(data, targetBinSize = 60, sourceBinSize = 5) {
	const binned = binTimeSeries(data, targetBinSize);
	const result = {};

	Object.keys(binned).forEach((binKey) => {
		result[binKey] = {
			temperature: binned[binKey].temperature?.avg || 0,
			humidity: binned[binKey].humidity?.avg || 0,
			energy: binned[binKey].energy?.sum || 0, // Sum for cumulative metrics
			sampleCount: binned[binKey].temperature?.count || 0,
		};
	});

	return result;
}

function interpolateValue(data, sortedKeys, targetKey, method = "linear") {
	const targetTime = parseTimestamp(targetKey).getTime();

	// Find surrounding data points
	let beforeKey = null;
	let afterKey = null;

	for (const key of sortedKeys) {
		const keyTime = parseTimestamp(key).getTime();
		if (keyTime <= targetTime) {
			beforeKey = key;
		} else if (keyTime > targetTime && !afterKey) {
			afterKey = key;
			break;
		}
	}

	if (!beforeKey && !afterKey) return null;
	if (!beforeKey) return data[afterKey];
	if (!afterKey) return data[beforeKey];

	// Linear interpolation
	const beforeTime = parseTimestamp(beforeKey).getTime();
	const afterTime = parseTimestamp(afterKey).getTime();
	const ratio = (targetTime - beforeTime) / (afterTime - beforeTime);

	const result = {};
	const metrics = ["temperature", "humidity", "energy"];

	metrics.forEach((metric) => {
		const beforeVal = data[beforeKey][metric] || 0;
		const afterVal = data[afterKey][metric] || 0;
		result[metric] = beforeVal + (afterVal - beforeVal) * ratio;
	});

	return result;
}

function upsampleTimeSeries(data, targetInterval = 5) {
	const result = {};
	const sortedKeys = Object.keys(data).sort();

	// Generate all target time points
	const startTime = parseTimestamp(sortedKeys[0]);
	const endTime = parseTimestamp(sortedKeys[sortedKeys.length - 1]);

	for (
		let time = startTime.getTime();
		time <= endTime.getTime();
		time += targetInterval * 60 * 1000
	) {
		const targetKey = formatTimestamp(new Date(time), "minutes");
		if (data[targetKey]) {
			result[targetKey] = data[targetKey];
		} else {
			result[targetKey] = interpolateValue(
				data,
				sortedKeys,
				targetKey,
				"linear",
			);
		}
	}

	return result;
}

// Task 3: Rolling Window Aggregations
function rollingWindow(data, windowSize = 3, metrics = ["temperature"]) {
	const sortedData = Object.keys(data)
		.sort()
		.map((key) => ({
			timestamp: key,
			...data[key],
		}));

	return sortedData.map((item, index) => {
		const windowStart = Math.max(0, index - windowSize + 1);
		const windowData = sortedData.slice(windowStart, index + 1);

		const result = {
			timestamp: item.timestamp,
			...item,
		};

		metrics.forEach((metric) => {
			const values = windowData.map((d) => d[metric]).filter((v) => v != null);

			if (values.length >= windowSize) {
				result[`rollingAvg${windowSize}`] =
					values.reduce((sum, v) => sum + v, 0) / values.length;

				// Calculate standard deviation
				const mean = result[`rollingAvg${windowSize}`];
				const squaredDiffs = values.map((v) => Math.pow(v - mean, 2));
				const variance =
					squaredDiffs.reduce((sum, v) => sum + v, 0) / values.length;
				result[`rollingStd${windowSize}`] = Math.sqrt(variance);
			} else {
				result[`rollingAvg${windowSize}`] = null;
				result[`rollingStd${windowSize}`] = null;
			}
		});

		return result;
	});
}

function exponentialMovingAverage(data, alpha = 0.3) {
	const result = [];
	let ema = null;

	Object.keys(data)
		.sort()
		.forEach((key) => {
			const value = data[key].temperature || data[key]; // Handle both formats

			if (ema === null) {
				ema = value;
			} else {
				ema = alpha * value + (1 - alpha) * ema;
			}

			result.push({
				timestamp: key,
				value: value,
				ema: ema,
			});
		});

	return result;
}

// Task 4: Anomaly Detection with Binning
function detectAnomalies(data, sensorId, windowSize = 10, threshold = 2.5) {
	const sensorData = data.filter((d) => d.sensorId === sensorId);
	const binned = binTimeSeries(sensorData, 15);

	// Calculate baseline statistics
	const allValues = Object.values(binned)
		.map((bin) => bin.temperature?.avg)
		.filter((v) => v);
	const mean = allValues.reduce((sum, v) => sum + v, 0) / allValues.length;
	const std = Math.sqrt(
		allValues.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) /
			allValues.length,
	);

	const anomalies = [];

	Object.entries(binned).forEach(([timestamp, bin]) => {
		const value = bin.temperature?.avg;
		if (value != null) {
			const zScore = Math.abs((value - mean) / std);

			if (zScore > threshold) {
				anomalies.push({
					sensorId,
					timestamp,
					metric: "temperature",
					value,
					expectedRange: { min: mean - std, max: mean + std },
					zScore,
					confidence: Math.min(zScore / 3, 1), // Simplified confidence calculation
					type: zScore > threshold ? "outlier" : "normal",
				});
			}
		}
	});

	return {
		anomalies,
		baselineStats: {
			[sensorId]: {
				mean,
				std,
				threshold,
				totalBins: Object.keys(binned).length,
			},
		},
	};
}

// Task 5: Multi-Sensor Correlation Analysis
function analyzeSensorCorrelations(data, sensorIds) {
	const sensorData = {};
	sensorIds.forEach((sensorId) => {
		sensorData[sensorId] = data.filter((d) => d.sensorId === sensorId);
	});

	const binnedData = {};
	sensorIds.forEach((sensorId) => {
		binnedData[sensorId] = binTimeSeries(sensorData[sensorId], 15);
	});

	const correlationMatrix = {};
	const synchronizedEvents = [];

	// Calculate correlations between sensor pairs
	for (let i = 0; i < sensorIds.length; i++) {
		for (let j = i + 1; j < sensorIds.length; j++) {
			const sensor1 = sensorIds[i];
			const sensor2 = sensorIds[j];

			const pairKey = `${sensor1}_${sensor2}`;
			const correlations = calculateCorrelations(
				binnedData[sensor1],
				binnedData[sensor2],
			);

			correlationMatrix[pairKey] = correlations;
		}
	}

	// Find synchronized events (simplified)
	const timestamps = Object.keys(binnedData[sensorIds[0]]).sort();
	timestamps.forEach((timestamp) => {
		const values = sensorIds
			.map((sensorId) => binnedData[sensorId][timestamp]?.temperature?.avg)
			.filter((v) => v != null);

		if (values.length >= sensorIds.length * 0.8) {
			// At least 80% of sensors have data
			const avgValue = values.reduce((sum, v) => sum + v, 0) / values.length;
			const variance =
				values.reduce((sum, v) => sum + Math.pow(v - avgValue, 2), 0) /
				values.length;

			if (variance < 1.0) {
				// Low variance indicates synchronization
				synchronizedEvents.push({
					timestamp,
					sensors: sensorIds,
					event: "temperature_sync",
					correlation: 1 - Math.sqrt(variance) / avgValue,
					duration: 15, // minutes
				});
			}
		}
	});

	return {
		correlationMatrix,
		synchronizedEvents,
		sensorClusters: groupSensorsByCorrelation(correlationMatrix, sensorIds),
	};
}

function calculateCorrelations(data1, data2) {
	const timestamps = Object.keys(data1).filter((ts) => data2[ts]);

	const correlations = {
		temperature: 0,
		humidity: 0,
		energy: 0,
		lag: 0,
		strength: "none",
	};

	if (timestamps.length < 3) return correlations;

	const metrics = ["temperature", "humidity", "energy"];
	metrics.forEach((metric) => {
		const values1 = timestamps
			.map((ts) => data1[ts][metric]?.avg)
			.filter((v) => v != null);
		const values2 = timestamps
			.map((ts) => data2[ts][metric]?.avg)
			.filter((v) => v != null);

		if (values1.length === values2.length && values1.length > 2) {
			correlations[metric] = calculatePearsonCorrelation(values1, values2);
		}
	});

	// Determine overall strength
	const avgCorrelation =
		(correlations.temperature + correlations.humidity + correlations.energy) /
		3;
	correlations.strength =
		avgCorrelation > 0.7
			? "strong"
			: avgCorrelation > 0.4
			? "moderate"
			: "weak";

	return correlations;
}

function calculatePearsonCorrelation(x, y) {
	const n = x.length;
	const sumX = x.reduce((sum, val) => sum + val, 0);
	const sumY = y.reduce((sum, val) => sum + val, 0);
	const sumXY = x.reduce((sum, val, i) => sum + val * y[i], 0);
	const sumX2 = x.reduce((sum, val) => sum + val * val, 0);
	const sumY2 = y.reduce((sum, val) => sum + val * val, 0);

	const numerator = n * sumXY - sumX * sumY;
	const denominator = Math.sqrt(
		(n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY),
	);

	return denominator === 0 ? 0 : numerator / denominator;
}

function groupSensorsByCorrelation(correlationMatrix, sensorIds) {
	const clusters = {};

	sensorIds.forEach((sensorId) => {
		const correlations = Object.keys(correlationMatrix)
			.filter((key) => key.includes(sensorId))
			.map((key) => correlationMatrix[key]);

		const avgCorrelation =
			correlations.length > 0
				? correlations.reduce((sum, corr) => sum + corr.temperature, 0) /
				  correlations.length
				: 0;

		const clusterType =
			avgCorrelation > 0.6 ? "high_correlation" : "moderate_correlation";
		if (!clusters[clusterType]) {
			clusters[clusterType] = {
				sensors: [],
				avgCorrelation: 0,
				dominantFactor:
					clusterType === "high_correlation"
						? "building_location"
						: "floor_level",
			};
		}

		clusters[clusterType].sensors.push(sensorId);
		clusters[clusterType].avgCorrelation += avgCorrelation;
	});

	// Calculate final averages
	Object.keys(clusters).forEach((clusterType) => {
		const cluster = clusters[clusterType];
		cluster.avgCorrelation = cluster.avgCorrelation / cluster.sensors.length;
	});

	return clusters;
}

// Task 6: Predictive Analytics with Binned Data
function generatePredictiveAnalytics(data, sensorId) {
	const sensorData = data.filter((d) => d.sensorId === sensorId);
	const binned = binTimeSeries(sensorData, 15);

	// Simple trend analysis
	const sortedBins = Object.keys(binned).sort();
	const values = sortedBins
		.map((ts) => binned[ts].temperature?.avg)
		.filter((v) => v != null);

	if (values.length < 3) {
		return { error: "Insufficient data for prediction" };
	}

	// Calculate trend (linear regression slope)
	const n = values.length;
	const sumX = (n * (n - 1)) / 2;
	const sumY = values.reduce((sum, v) => sum + v, 0);
	const sumXY = values.reduce((sum, v, i) => sum + v * i, 0);
	const sumX2 = (n * (n - 1) * (2 * n - 1)) / 6;

	const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
	const intercept = (sumY - slope * sumX) / n;

	// Predict next hour (4 bins of 15 minutes each)
	const nextValue = intercept + slope * n;
	const confidence = Math.max(0.1, 1 - Math.abs(slope) / 2); // Simplified confidence

	// Generate alerts based on predictions
	const alerts = [];
	if (nextValue > 25) {
		alerts.push({
			sensorId,
			type: "energy_spike",
			predictedTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
			severity: "high",
			confidence,
			recommendation: "Reduce HVAC load by 15%",
		});
	}

	// Seasonal patterns (simplified)
	const hourlyPatterns = {};
	sortedBins.forEach((ts) => {
		const hour = parseTimestamp(ts).getUTCHours();
		if (!hourlyPatterns[hour]) hourlyPatterns[hour] = [];
		hourlyPatterns[hour].push(binned[ts].temperature?.avg);
	});

	function average(arr) {
		const validValues = arr.filter((v) => v != null);
		return validValues.reduce((sum, v) => sum + v, 0) / validValues.length || 0;
	}

	const seasonalPatterns = {
		daily: {
			peakHours: Object.keys(hourlyPatterns)
				.filter((hour) => hourlyPatterns[hour].length > 0)
				.sort((a, b) => average(hourlyPatterns[b]) - average(hourlyPatterns[a]))
				.slice(0, 3),
			lowHours: Object.keys(hourlyPatterns)
				.filter((hour) => hourlyPatterns[hour].length > 0)
				.sort((a, b) => average(hourlyPatterns[a]) - average(hourlyPatterns[b]))
				.slice(0, 3),
			avgTemperature: average(values),
			temperatureRange: Math.max(...values) - Math.min(...values),
		},
		weekly: {
			avgByDay: {
				Monday: 23.1,
				Tuesday: 22.8,
				Wednesday: 23.4,
				Thursday: 22.6,
				Friday: 23.2,
				Saturday: 22.3,
				Sunday: 22.1,
			},
		},
	};

	return {
		forecasts: {
			[sensorId]: {
				nextHour: {
					temperature: {
						predicted: Math.round(nextValue * 100) / 100,
						confidence: Math.round(confidence * 100) / 100,
						range: [
							Math.round((nextValue - 1) * 100) / 100,
							Math.round((nextValue + 1) * 100) / 100,
						],
					},
				},
				trend:
					slope > 0.1 ? "increasing" : slope < -0.1 ? "decreasing" : "stable",
				seasonality: "daily_cycle",
				confidence: Math.round(confidence * 100) / 100,
			},
		},
		predictiveAlerts: alerts,
		seasonalPatterns,
	};
}

// Advanced Challenge 1: Real-Time Binning System
class RealTimeBinner {
	constructor(binSize = 15, maxBins = 100) {
		this.binSize = binSize;
		this.maxBins = maxBins;
		this.bins = new Map();
		this.lastCleanup = Date.now();
	}

	addReading(reading) {
		const binKey = getTimeBin(reading.timestamp, this.binSize);

		if (!this.bins.has(binKey)) {
			this.bins.set(binKey, {
				readings: [],
				aggregates: {},
				lastUpdate: Date.now(),
			});
		}

		const bin = this.bins.get(binKey);
		bin.readings.push(reading);
		bin.lastUpdate = Date.now();

		// Update aggregates
		this.updateAggregates(bin);

		// Periodic cleanup
		if (Date.now() - this.lastCleanup > 60000) {
			// Every minute
			this.cleanup();
		}

		return bin.aggregates;
	}

	updateAggregates(bin) {
		const metrics = ["temperature", "humidity", "energy"];
		metrics.forEach((metric) => {
			const values = bin.readings
				.map((r) => r[metric])
				.filter((v) => v != null);
			if (values.length > 0) {
				bin.aggregates[metric] = {
					avg: values.reduce((sum, v) => sum + v, 0) / values.length,
					min: Math.min(...values),
					max: Math.max(...values),
					count: values.length,
				};
			}
		});
	}

	cleanup() {
		const cutoff = Date.now() - this.maxBins * this.binSize * 60 * 1000;
		for (const [key, bin] of this.bins) {
			if (bin.lastUpdate < cutoff) {
				this.bins.delete(key);
			}
		}
		this.lastCleanup = Date.now();
	}

	getAllBins() {
		const result = {};
		for (const [key, bin] of this.bins) {
			result[key] = bin.aggregates;
		}
		return result;
	}
}

// Test Functions
function runAllTasks() {
	console.log("=".repeat(60));
	console.log("SCENARIO BASED ACTIVITY: BINNING TIME SERIES DATA");
	console.log("=".repeat(60));

	console.log("\n📊 TASK 1: Basic Time Series Binning");
	const binned = binTimeSeries(sensorReadings, 15);
	console.log("Number of bins created:", Object.keys(binned).length);
	console.log(
		"Sample bin:",
		JSON.stringify(binned[Object.keys(binned)[0]], null, 2),
	);

	console.log("\n📊 TASK 2: Multi-Resolution Resampling");
	const resampled = resampleTimeSeries(sensorReadings, 60);
	console.log("Resampled to hourly bins:", Object.keys(resampled).length);
	console.log("Sample resampled bin:", resampled[Object.keys(resampled)[0]]);

	console.log("\n📊 TASK 3: Rolling Window Aggregations");
	const rollingData = rollingWindow(binned, 3, ["temperature"]);
	console.log("Rolling window data points:", rollingData.length);
	console.log("Sample rolling data:", rollingData.slice(0, 2));

	console.log("\n📊 TASK 4: Anomaly Detection");
	const anomalies = detectAnomalies(sensorReadings, "TEMP001");
	console.log("Anomalies detected:", anomalies.anomalies.length);
	console.log("Sample anomaly:", anomalies.anomalies[0]);

	console.log("\n📊 TASK 5: Multi-Sensor Correlation Analysis");
	const correlations = analyzeSensorCorrelations(sensorReadings, [
		"TEMP001",
		"TEMP002",
	]);
	console.log(
		"Correlation matrix keys:",
		Object.keys(correlations.correlationMatrix),
	);
	console.log("Synchronized events:", correlations.synchronizedEvents.length);

	console.log("\n📊 TASK 6: Predictive Analytics");
	const predictions = generatePredictiveAnalytics(sensorReadings, "TEMP001");
	console.log(
		"Next hour prediction:",
		predictions.forecasts?.TEMP001?.nextHour,
	);
	console.log("Predictive alerts:", predictions.predictiveAlerts?.length || 0);

	console.log("\n🚀 CHALLENGE 1: Real-Time Binning Demo");
	const realTimeBinner = new RealTimeBinner(15, 10);
	const sampleReadings = sensorReadings.slice(0, 5);
	sampleReadings.forEach((reading) => {
		const result = realTimeBinner.addReading(reading);
		console.log(`Added reading, current bins: ${realTimeBinner.bins.size}`);
	});
}

// Performance Benchmarking
function benchmarkBinning() {
	console.log("\n⚡ PERFORMANCE BENCHMARK");

	// Create larger dataset
	const largeDataSet = Array.from({ length: 10000 }, (_, i) => ({
		sensorId: `TEMP${String((i % 5) + 1).padStart(3, "0")}`,
		timestamp: new Date(Date.now() + i * 5 * 60 * 1000).toISOString(),
		temperature: 20 + Math.random() * 10,
		humidity: 40 + Math.random() * 20,
		energy: 1000 + Math.random() * 500,
	}));

	console.time("Bin 10,000 readings (15-min bins)");
	binTimeSeries(largeDataSet, 15);
	console.timeEnd("Bin 10,000 readings (15-min bins)");

	console.time("Bin 10,000 readings (60-min bins)");
	binTimeSeries(largeDataSet, 60);
	console.timeEnd("Bin 10,000 readings (60-min bins)");
}

// Validation Functions
function validateTask1() {
	const binned = binTimeSeries(sensorReadings, 15);
	const totalReadings = Object.values(binned).reduce((sum, bin) => {
		return sum + (bin.temperature?.count || 0);
	}, 0);

	console.log("\n✅ TASK 1 VALIDATION:");
	console.log("Total readings in original data:", sensorReadings.length);
	console.log("Total readings in binned data:", totalReadings);
	console.log(
		"Binning integrity check:",
		totalReadings === sensorReadings.length ? "✅ PASS" : "❌ FAIL",
	);

	const firstBin = binned[Object.keys(binned).sort()[0]];
	console.log("First bin has temperature data:", !!firstBin.temperature);
	console.log("First bin has humidity data:", !!firstBin.humidity);
	console.log("First bin has energy data:", !!firstBin.energy);
}

// Main execution
if (require.main === module) {
	runAllTasks();
	benchmarkBinning();
	validateTask1();
}

module.exports = {
	sensorReadings,
	buildingInfo,
	alerts,
	parseTimestamp,
	formatTimestamp,
	getTimeBin,
	createTimeBins,
	aggregateBin,
	binTimeSeries,
	resampleTimeSeries,
	interpolateValue,
	upsampleTimeSeries,
	rollingWindow,
	exponentialMovingAverage,
	detectAnomalies,
	analyzeSensorCorrelations,
	calculateCorrelations,
	calculatePearsonCorrelation,
	groupSensorsByCorrelation,
	generatePredictiveAnalytics,
	RealTimeBinner,
};

// * Binning (Resampling) Time Series Data

// Scenario: You have a long list of user click events.
// You need to "bin" these events into 30 minute intervals and count them to see engagement over time.

//? Input
const events = [
	{ timestamp: "2025-10-22T10:01:00Z", type: "click" },
	{ timestamp: "2025-10-22T10:05:00Z", type: "scroll" },
	{ timestamp: "2025-10-22T10:14:00Z", type: "click" },
	{ timestamp: "2025-10-22T10:31:00Z", type: "click" },
	{ timestamp: "2025-10-22T10:45:00Z", type: "scroll" },
	{ timestamp: "2025-10-22T11:02:00Z", type: "click" },
];

const getBinnedTimeStamp = (timestamp, binSize = 30) => {
	const date = new Date(timestamp);
	const minutes = date.getMinutes();
	const roundedMinutes = Math.floor(minutes / binSize) * binSize;
	date.setMinutes(roundedMinutes, 0, 0);
	return date.toISOString();
};

const binnedEvents = events.reduce((acc, event) => {
	const binKey = getBinnedTimeStamp(event.timestamp, 30);
	if (!acc[binKey]) {
		acc[binKey] = { total: 0 };
	}
	acc[binKey].total += 1;
	return acc;
}, {});

console.log("Binned Events:", binnedEvents);

//? Output
// binnedEvents = {
//   "2025-10-22T10:00:00.000Z": { "total": 3 },
//   "2025-10-22T10:30:00.000Z": { "total": 2 },
//   "2025-10-22T11:00:00.000Z": { "total": 1 }
// }
