# 2-10: Scenario Based Activity - Binning (Resampling) Time Series Data

## Introduction

Welcome to the advanced scenario-based activity for Module 2! This session focuses on **binning and resampling time series data** - the process of grouping temporal data into time intervals (bins) and aggregating values within those bins.

Time series binning is essential for:

- **Data reduction**: Converting high-frequency data to manageable sizes
- **Regularization**: Creating consistent time intervals from irregular data
- **Noise reduction**: Smoothing data through aggregation
- **Visualization**: Preparing data for charts and graphs
- **Analysis**: Enabling time-based pattern recognition and forecasting

## Learning Objectives

By the end of this activity, you will be able to:

- Implement various binning strategies for time series data
- Perform resampling operations (up and down sampling)
- Create rolling/moving window aggregations
- Handle irregular time series data
- Optimize binning operations for performance
- Apply statistical methods to time series bins

## Scenario: IoT Sensor Data Analytics Platform

You work for an IoT analytics company that collects sensor data from thousands of devices worldwide. Your platform receives high-frequency sensor readings (every few seconds) that need to be processed, aggregated, and visualized for different stakeholders. You'll work with temperature, humidity, and energy consumption data from smart buildings.

### Sample Data

```javascript
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
	// ... more readings
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
```

## Activity Tasks

### Task 1: Basic Time Series Binning

**Objective**: Group sensor readings into fixed time intervals (bins) and calculate basic aggregations for each bin.

**Requirements**:

- Bin data into 15-minute intervals
- Calculate average, min, max, and count for each metric per bin
- Handle multiple sensors in the same time bins
- Create regular time series from irregular data

**Expected Output**:

```javascript
{
  "2024-01-15T08:00:00Z": {
    temperature: { avg: 22.8, min: 21.8, max: 23.5, count: 6 },
    humidity: { avg: 45.3, min: 44.2, max: 46.3, count: 6 },
    energy: { avg: 1265.8, min: 1180.4, max: 1341.3, count: 6 }
  },
  "2024-01-15T08:15:00Z": {
    temperature: { avg: 23.3, min: 22.4, max: 24.2, count: 4 },
    humidity: { avg: 44.8, min: 43.9, max: 45.8, count: 4 },
    energy: { avg: 1336.5, min: 1271.2, max: 1371.9, count: 4 }
  }
}
```

### Task 2: Multi-Resolution Resampling

**Objective**: Resample time series data to different time resolutions (downsampling and upsampling).

**Requirements**:

- Downsample 5-minute data to hourly aggregations
- Upsample sparse data by interpolating missing values
- Handle different aggregation methods (mean, last value, sum)
- Preserve data quality during resampling

**Expected Output**:

```javascript
{
  downsampled: {
    "2024-01-15T08:00:00Z": {
      temperature: 23.0,
      humidity: 45.0,
      energy: 7590.0, // Sum for the hour
      sampleCount: 12
    }
  },
  upsampled: {
    "2024-01-15T08:00:00Z": { temperature: 22.5, humidity: 45.2, energy: 1250.5 },
    "2024-01-15T08:05:00Z": { temperature: 23.1, humidity: 44.8, energy: 1280.2 },
    "2024-01-15T08:10:00Z": { temperature: 22.8, humidity: 45.5, energy: 1310.8 }, // Interpolated
    "2024-01-15T08:15:00Z": { temperature: 23.5, humidity: 44.2, energy: 1341.3 }
  }
}
```

### Task 3: Rolling Window Aggregations

**Objective**: Calculate rolling/moving averages and other windowed statistics over time series data.

**Requirements**:

- Implement moving averages with different window sizes
- Calculate rolling standard deviations and percentiles
- Handle edge cases at the beginning and end of series
- Optimize for real-time rolling calculations

**Expected Output**:

```javascript
{
  "TEMP001": [
    {
      timestamp: "2024-01-15T08:00:00Z",
      temperature: 22.5,
      rollingAvg3: null, // Not enough data
      rollingStd3: null,
      rollingAvg5: null
    },
    {
      timestamp: "2024-01-15T08:05:00Z",
      temperature: 23.1,
      rollingAvg3: 22.8,
      rollingStd3: 0.35,
      rollingAvg5: null
    },
    {
      timestamp: "2024-01-15T08:10:00Z",
      temperature: 22.8,
      rollingAvg3: 22.8,
      rollingStd3: 0.35,
      rollingAvg5: null
    },
    // ... more readings with rolling stats
  ]
}
```

### Task 4: Anomaly Detection with Binning

**Objective**: Use binning and statistical methods to detect anomalies in time series data.

**Requirements**:

- Calculate baseline statistics for each time bin
- Identify outliers using z-score and IQR methods
- Detect sudden changes and trends
- Flag anomalies with confidence scores

**Expected Output**:

```javascript
{
  anomalies: [
    {
      sensorId: "TEMP001",
      timestamp: "2024-01-15T08:25:00Z",
      metric: "temperature",
      value: 26.8,
      expectedRange: { min: 22.0, max: 24.5 },
      zScore: 3.2,
      confidence: 0.99,
      type: "outlier"
    },
    {
      sensorId: "TEMP002",
      timestamp: "2024-01-15T09:00:00Z",
      metric: "humidity",
      value: 35.2,
      expectedRange: { min: 40.0, max: 50.0 },
      zScore: -2.8,
      confidence: 0.95,
      type: "sudden_change"
    }
  ],
  baselineStats: {
    "TEMP001": {
      hourlyBins: {
        "08:00": { mean: 23.0, std: 0.8, min: 22.0, max: 24.0 },
        "09:00": { mean: 23.2, std: 0.6, min: 22.5, max: 24.2 }
      }
    }
  }
}
```

### Task 5: Multi-Sensor Correlation Analysis

**Objective**: Analyze correlations between multiple sensors using binned time series data.

**Requirements**:

- Calculate cross-correlations between sensors
- Identify leading/lagging relationships
- Create correlation matrices for sensor groups
- Detect synchronized events across sensors

**Expected Output**:

```javascript
{
  correlationMatrix: {
    "TEMP001_TEMP002": {
      temperature: 0.85,
      humidity: 0.72,
      energy: 0.91,
      lag: 0, // minutes
      strength: "strong"
    },
    "TEMP001_TEMP003": {
      temperature: 0.45,
      humidity: 0.38,
      energy: 0.52,
      lag: -5,
      strength: "moderate"
    }
  },
  synchronizedEvents: [
    {
      timestamp: "2024-01-15T08:15:00Z",
      sensors: ["TEMP001", "TEMP002", "TEMP003"],
      event: "temperature_spike",
      correlation: 0.92,
      duration: 10 // minutes
    }
  ],
  sensorClusters: {
    "high_correlation": {
      sensors: ["TEMP001", "TEMP002"],
      avgCorrelation: 0.87,
      dominantFactor: "building_location"
    },
    "moderate_correlation": {
      sensors: ["TEMP003", "TEMP004"],
      avgCorrelation: 0.65,
      dominantFactor: "floor_level"
    }
  }
}
```

### Task 6: Predictive Analytics with Binned Data

**Objective**: Use binned time series data to generate forecasts and predictive insights.

**Requirements**:

- Implement simple trend analysis and forecasting
- Calculate seasonal patterns and cycles
- Generate predictive alerts and recommendations
- Create confidence intervals for predictions

**Expected Output**:

```javascript
{
  forecasts: {
    "TEMP001": {
      nextHour: {
        temperature: { predicted: 23.8, confidence: 0.85, range: [22.5, 25.1] },
        humidity: { predicted: 44.2, confidence: 0.78, range: [42.0, 46.4] },
        energy: { predicted: 1450.0, confidence: 0.92, range: [1400, 1500] }
      },
      trend: "increasing",
      seasonality: "daily_cycle",
      confidence: 0.82
    }
  },
  predictiveAlerts: [
    {
      sensorId: "TEMP001",
      type: "energy_spike",
      predictedTime: "2024-01-15T10:30:00Z",
      severity: "high",
      confidence: 0.88,
      recommendation: "Reduce HVAC load by 15%"
    },
    {
      sensorId: "TEMP002",
      type: "humidity_drop",
      predictedTime: "2024-01-15T11:00:00Z",
      severity: "medium",
      confidence: 0.76,
      recommendation: "Increase humidifier output"
    }
  ],
  seasonalPatterns: {
    daily: {
      peakHours: ["09:00", "14:00", "18:00"],
      lowHours: ["03:00", "06:00"],
      avgTemperature: 22.5,
      temperatureRange: 3.2
    },
    weekly: {
      peakDays: ["Monday", "Wednesday", "Friday"],
      avgByDay: {
        "Monday": 23.1,
        "Tuesday": 22.8,
        "Wednesday": 23.4,
        "Thursday": 22.6,
        "Friday": 23.2,
        "Saturday": 22.3,
        "Sunday": 22.1
      }
    }
  }
}
```

## Implementation Guide

### Step 1: Set Up Your Environment

Create a new JavaScript file for this activity:

```javascript
// M02-Binning-Activity.js

// Import sample data
const sensorReadings = [
	/* ... */
];
const buildingInfo = [
	/* ... */
];
const alerts = [
	/* ... */
];

// Utility functions for time handling
function parseTimestamp(ts) {
	return new Date(ts);
}

function formatTimestamp(date, interval = "minutes") {
	// Round to nearest interval
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
	// Create bin key for given timestamp
	const date = parseTimestamp(timestamp);
	const minutes = date.getMinutes();
	const roundedMinutes = Math.floor(minutes / binSize) * binSize;
	date.setMinutes(roundedMinutes, 0, 0);
	return date.toISOString();
}
```

### Step 2: Implement Basic Binning Functions

Create reusable binning functions:

```javascript
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
```

### Step 3: Create Resampling Functions

Implement resampling operations:

```javascript
function downsample(data, targetInterval = 60, sourceInterval = 5) {
	// Combine multiple bins into larger intervals
	const ratio = targetInterval / sourceInterval;
	const result = {};

	Object.keys(data)
		.sort()
		.forEach((binKey, index) => {
			const groupIndex = Math.floor(index / ratio);
			const groupKey = `${binKey.split("T")[0]}T${String(
				groupIndex * targetInterval,
			).padStart(2, "0")}:00:00Z`;

			if (!result[groupKey]) {
				result[groupKey] = { bins: [], count: 0 };
			}

			result[groupKey].bins.push(data[binKey]);
			result[groupKey].count++;
		});

	// Aggregate each group
	Object.keys(result).forEach((key) => {
		const group = result[key];
		const aggregated = {};

		// Combine all metrics from all bins in the group
		Object.keys(group.bins[0]).forEach((metric) => {
			const allValues = group.bins.flatMap((bin) =>
				bin[metric] ? [bin[metric].avg || bin[metric]] : [],
			);

			if (allValues.length > 0) {
				aggregated[metric] =
					allValues.reduce((sum, v) => sum + v, 0) / allValues.length;
			}
		});

		result[key] = aggregated;
	});

	return result;
}

function upsample(data, targetInterval = 5, method = "linear") {
	// Interpolate values for missing time points
	const result = {};
	const sortedKeys = Object.keys(data).sort();
	const targetKeys = [];

	// Generate all target time points
	const startTime = parseTimestamp(sortedKeys[0]);
	const endTime = parseTimestamp(sortedKeys[sortedKeys.length - 1]);

	for (
		let time = startTime.getTime();
		time <= endTime.getTime();
		time += targetInterval * 60 * 1000
	) {
		targetKeys.push(formatTimestamp(new Date(time), "minutes"));
	}

	targetKeys.forEach((targetKey, index) => {
		if (data[targetKey]) {
			result[targetKey] = data[targetKey];
		} else {
			// Interpolate
			result[targetKey] = interpolateValue(data, sortedKeys, targetKey, method);
		}
	});

	return result;
}
```

### Step 4: Implement Rolling Window Functions

Create rolling/moving aggregations:

```javascript
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
```

### Step 5: Implement Each Task

Work through each task systematically, applying the binning and resampling patterns you've learned.

### Step 6: Test and Validate

Create comprehensive test functions:

```javascript
function validateBinning() {
	const binned = binTimeSeries(sensorReadings, 15);

	console.log(
		"Binned data sample:",
		Object.keys(binned).length,
		"bins created",
	);
	console.log("First bin:", binned[Object.keys(binned)[0]]);

	// Validate binning logic
	const totalReadings = Object.values(binned).reduce(
		(sum, bin) => sum + (bin.temperature?.count || 0),
		0,
	);

	console.log("Total readings in bins:", totalReadings);
	console.log("Original readings:", sensorReadings.length);
	console.log(
		"Binning validation:",
		totalReadings === sensorReadings.length ? "PASS" : "FAIL",
	);
}
```

## Advanced Challenges

### Challenge 1: Real-Time Binning System

Create a real-time binning system that can handle streaming sensor data:

```javascript
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
```

### Challenge 2: Adaptive Binning

Implement adaptive binning that adjusts bin sizes based on data density:

```javascript
function adaptiveBinning(
	data,
	minBinSize = 5,
	maxBinSize = 60,
	targetDensity = 10,
) {
	const sortedData = data.sort(
		(a, b) => parseTimestamp(a.timestamp) - parseTimestamp(b.timestamp),
	);
	const result = {};

	let currentBin = null;
	let binData = [];

	sortedData.forEach((reading, index) => {
		const timestamp = parseTimestamp(reading.timestamp);

		if (!currentBin) {
			currentBin = {
				start: timestamp,
				end: new Date(timestamp.getTime() + maxBinSize * 60 * 1000),
				data: [],
			};
		}

		if (timestamp <= currentBin.end) {
			currentBin.data.push(reading);
		} else {
			// Process current bin
			if (currentBin.data.length > 0) {
				const binKey = formatTimestamp(currentBin.start);
				result[binKey] = aggregateBin(currentBin.data);
			}

			// Start new bin
			currentBin = {
				start: timestamp,
				end: new Date(timestamp.getTime() + maxBinSize * 60 * 1000),
				data: [reading],
			};
		}
	});

	// Process last bin
	if (currentBin && currentBin.data.length > 0) {
		const binKey = formatTimestamp(currentBin.start);
		result[binKey] = aggregateBin(currentBin.data);
	}

	return result;
}
```

### Challenge 3: Statistical Process Control

Implement statistical process control for quality monitoring:

```javascript
function statisticalProcessControl(data, windowSize = 20, controlLimits = 3) {
	const result = [];
	const values = data.map((d) => d.temperature || d.value);

	values.forEach((value, index) => {
		if (index < windowSize - 1) {
			result.push({
				value,
				control: "insufficient_data",
				ucl: null,
				lcl: null,
				mean: null,
			});
			return;
		}

		const window = values.slice(index - windowSize + 1, index + 1);
		const mean = window.reduce((sum, v) => sum + v, 0) / window.length;
		const std = Math.sqrt(
			window.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / window.length,
		);

		const ucl = mean + controlLimits * std;
		const lcl = mean - controlLimits * std;

		let control = "in_control";
		if (value > ucl) control = "above_ucl";
		else if (value < lcl) control = "below_lcl";

		result.push({
			value,
			control,
			ucl,
			lcl,
			mean,
			std,
		});
	});

	return result;
}
```

## Time Series Binning Strategies

### 1. Fixed-Width Binning

**Use when:**

- Data arrives at regular intervals
- You need predictable bin sizes
- Performance is critical

**Implementation:**

```javascript
function fixedWidthBinning(data, binWidth = 15) {
	// Round timestamps to nearest bin boundary
	return data.reduce((bins, item) => {
		const binKey = getTimeBin(item.timestamp, binWidth);
		(bins[binKey] || (bins[binKey] = [])).push(item);
		return bins;
	}, {});
}
```

### 2. Adaptive Binning

**Use when:**

- Data density varies significantly
- You want to maintain consistent statistical power
- Memory usage needs optimization

**Implementation:**

```javascript
function adaptiveBinning(data, minPoints = 5, maxPoints = 50) {
	// Adjust bin sizes to maintain point density
	const sorted = data.sort((a, b) => a.timestamp - b.timestamp);
	const bins = [];

	let currentBin = [sorted[0]];

	for (let i = 1; i < sorted.length; i++) {
		currentBin.push(sorted[i]);

		if (currentBin.length >= maxPoints) {
			bins.push(currentBin);
			currentBin = [];
		}
	}

	if (currentBin.length > 0) {
		bins.push(currentBin);
	}

	return bins;
}
```

### 3. Event-Based Binning

**Use when:**

- You need bins aligned with business events
- Data is event-driven rather than time-driven
- You want semantically meaningful bins

**Implementation:**

```javascript
function eventBasedBinning(data, events) {
	// Create bins based on event timestamps
	const eventBins = events.reduce((bins, event) => {
		bins[event.timestamp] = {
			event: event,
			data: [],
		};
		return bins;
	}, {});

	return data.reduce((bins, item) => {
		// Find the closest event bin
		const closestEvent = findClosestEvent(item.timestamp, Object.keys(bins));
		if (closestEvent) {
			bins[closestEvent].data.push(item);
		}
		return bins;
	}, eventBins);
}
```

## Best Practices for Time Series Binning

### 1. Choose Appropriate Bin Sizes

- **Small bins**: Preserve detail, increase storage/computation
- **Large bins**: Reduce noise, lose granularity
- **Adaptive bins**: Balance detail and efficiency

### 2. Handle Time Zones and Daylight Saving

- Always work in UTC internally
- Convert to local time for display only
- Account for DST transitions in bin calculations

### 3. Manage Memory and Performance

- Implement bin cleanup for real-time systems
- Use streaming algorithms for large datasets
- Cache frequently accessed binned data

### 4. Ensure Data Quality

- Validate timestamps before binning
- Handle missing data appropriately
- Preserve data lineage and metadata

## Solution Template

```javascript
// M02-Binning-Activity.js

// Setup
const sensorReadings = [
	/* ... */
];
const buildingInfo = [
	/* ... */
];
const alerts = [
	/* ... */
];

// Utility functions
function parseTimestamp(ts) {
	return new Date(ts);
}

function getTimeBin(timestamp, binSize = 15) {
	const date = parseTimestamp(timestamp);
	const minutes = date.getMinutes();
	const roundedMinutes = Math.floor(minutes / binSize) * binSize;
	date.setMinutes(roundedMinutes, 0, 0);
	return date.toISOString();
}

function createTimeBins(data, binSize = 15) {
	return data.reduce((bins, item) => {
		const binKey = getTimeBin(item.timestamp, binSize);
		(bins[binKey] || (bins[binKey] = [])).push(item);
		return bins;
	}, {});
}

function aggregateBin(binData) {
	const metrics = ["temperature", "humidity", "energy"];
	const result = {};

	metrics.forEach((metric) => {
		const values = binData.map((item) => item[metric]).filter((v) => v != null);
		if (values.length > 0) {
			result[metric] = {
				avg: values.reduce((sum, v) => sum + v, 0) / values.length,
				min: Math.min(...values),
				max: Math.max(...values),
				count: values.length,
			};
		}
	});

	return result;
}

// Task 1: Basic Time Series Binning
function binTimeSeries(data, binSize = 15) {
	const bins = createTimeBins(data, binSize);
	const result = {};

	Object.keys(bins)
		.sort()
		.forEach((binKey) => {
			result[binKey] = aggregateBin(bins[binKey]);
		});

	return result;
}

// Task 2: Multi-Resolution Resampling
function resampleTimeSeries(data, targetBinSize = 60) {
	// Downsample to larger bins
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

// Add implementations for other tasks...

// Test functions
function runAllTasks() {
	console.log("=".repeat(60));
	console.log("SCENARIO BASED ACTIVITY: BINNING TIME SERIES DATA");
	console.log("=".repeat(60));

	console.log("\n📊 TASK 1: Basic Time Series Binning");
	const binned = binTimeSeries(sensorReadings, 15);
	console.log("Number of bins created:", Object.keys(binned).length);
	console.log("Sample bin:", binned[Object.keys(binned)[0]]);

	console.log("\n📊 TASK 2: Multi-Resolution Resampling");
	const resampled = resampleTimeSeries(sensorReadings, 60);
	console.log("Resampled to hourly bins:", Object.keys(resampled).length);
	console.log("Sample resampled bin:", resampled[Object.keys(resampled)[0]]);

	// Add tests for other tasks
}

// Run the activity
runAllTasks();
```

## Expected Learning Outcomes

After completing this activity, you should be able to:

1. **Implement time series binning** with various bin sizes and aggregation methods
2. **Perform resampling operations** to change data frequency and resolution
3. **Create rolling window aggregations** for trend analysis and smoothing
4. **Detect anomalies** using statistical methods on binned data
5. **Analyze correlations** between multiple time series
6. **Generate forecasts** using historical patterns in binned data
7. **Optimize binning performance** for real-time and large-scale applications

## Next Steps

- Apply binning techniques to your own time series data
- Explore advanced time series analysis (ARIMA, Fourier transforms)
- Learn about time series databases (InfluxDB, TimescaleDB)
- Study real-time analytics frameworks (Apache Kafka, Apache Flink)

This activity demonstrates the power of binning and resampling for time series data analysis. Mastering these patterns will enable you to efficiently process and analyze temporal data at any scale.

Happy coding! 📈
