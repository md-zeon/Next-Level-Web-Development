// Mission 1: Binning Time Series Data for IoT Sensor Analytics
// Demonstrates DSA concepts: Time series processing, binning, resampling, aggregation

// Sample data for IoT sensor readings
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
];

// Utility functions for timestamp handling
function parseTimestamp(ts) {
  return new Date(ts);
}

function getTimeBin(timestamp, binSizeMinutes = 15) {
  const date = parseTimestamp(timestamp);
  const minutes = date.getMinutes();
  const roundedMinutes = Math.floor(minutes / binSizeMinutes) * binSizeMinutes;
  date.setMinutes(roundedMinutes, 0, 0);
  return date.toISOString();
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

// Task 1: Basic Time Series Binning
function createTimeBins(data, binSize = 15) {
  const bins = {};

  data.forEach((item) => {
    const binKey = getTimeBin(item.timestamp, binSize);
    if (!bins[binKey]) {
      bins[binKey] = [];
    }
    bins[binKey].push(item);
  });

  return bins;
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
        sum: values.reduce((sum, v) => sum + v, 0),
      };
    }
  });

  return result;
}

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

// Task 2: Multi-Resolution Resampling (Downsampling)
function resampleToHourly(data) {
  const binned = binTimeSeries(data, 60); // 60 minutes = 1 hour
  const result = {};

  Object.keys(binned).forEach((binKey) => {
    result[binKey] = {
      temperature: binned[binKey].temperature?.avg || 0,
      humidity: binned[binKey].humidity?.avg || 0,
      energy: binned[binKey].energy?.sum || 0, // Sum for cumulative metrics like energy
      sampleCount: binned[binKey].temperature?.count || 0,
    };
  });

  return result;
}

// Task 3: Rolling Window Aggregations
function calculateRollingAverage(data, windowSize = 3) {
  if (data.length < windowSize) return null;

  const values = data.slice(-windowSize); // Take last 'windowSize' elements
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

function rollingWindowMetrics(temperatureReadings, windowSize = 3) {
  const result = [];

  for (let i = 0; i < temperatureReadings.length; i++) {
    const windowStart = Math.max(0, i - windowSize + 1);
    const windowData = temperatureReadings.slice(windowStart, i + 1);

    if (windowData.length >= windowSize) {
      const avg = windowData.reduce((sum, val) => sum + val, 0) / windowData.length;
      const std = Math.sqrt(
        windowData.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / windowData.length
      );

      result.push({
        index: i,
        value: temperatureReadings[i],
        rollingAvg: Math.round(avg * 100) / 100,
        rollingStd: Math.round(std * 100) / 100,
      });
    } else {
      result.push({
        index: i,
        value: temperatureReadings[i],
        rollingAvg: null,
        rollingStd: null,
      });
    }
  }

  return result;
}

// Demonstration functions
function runBinningDemo() {
  console.log("=".repeat(50));
  console.log("DSA IN ACTION: TIME SERIES BINNING DEMO");
  console.log("=".repeat(50));

  // Task 1: 15-minute bins
  console.log("\n🕐 Task 1: 15-Minute Binning");
  const binnedData = binTimeSeries(sensorReadings, 15);
  console.log("Number of bins created:", Object.keys(binnedData).length);
  console.log("Sample bin:");
  console.log(JSON.stringify(binnedData[Object.keys(binnedData)[0]], null, 2));

  // Task 2: Hourly resampling
  console.log("\n📊 Task 2: Hourly Resampling");
  const hourlyData = resampleToHourly(sensorReadings);
  console.log("Hourly bins created:", Object.keys(hourlyData).length);
  console.log("Sample hourly bin:");
  console.log(JSON.stringify(hourlyData[Object.keys(hourlyData)[0]], null, 2));

  // Task 3: Rolling averages
  console.log("\n📈 Task 3: Rolling Window Analysis");
  const tempReadings = sensorReadings.map(r => r.temperature);
  const rollingMetrics = rollingWindowMetrics(tempReadings, 3);
  console.log("Rolling metrics for last 5 readings:");
  console.log(JSON.stringify(rollingMetrics.slice(-5), null, 2));

  console.log("\n⚡ Performance Analysis:");
  console.log("- Binning reduces data points for efficient processing");
  console.log("- Rolling averages smooth noisy sensor data");
  console.log("- Resampling enables multi-resolution analysis");
}

// Export functions for external use
module.exports = {
  binTimeSeries,
  resampleToHourly,
  rollingWindowMetrics,
  parseTimestamp,
  getTimeBin,
};

// Run demo if this file is executed directly
if (require.main === module) {
  runBinningDemo();
}
