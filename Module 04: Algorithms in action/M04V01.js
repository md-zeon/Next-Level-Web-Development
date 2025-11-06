// Problem Statement:

// Implement a simple in-memory cache fo an "expensive" function (like a database query or API call)
// The goal is to store the results of a function call so that if the same call is made again,
// the result is returned from the cache instead of running the expensive function again.

const dataCache = new Map();

const expensiveTask = (id) => {
	console.log("Performing an expensive task for id:", id);

	return {
		id: id,
		data: `Data for id ${id}`,
		timestamp: new Date().getTime(),
	};
};

const getData = (id) => {
	if (dataCache.has(id)) {
		console.log("Fetching data from cache for id:", id);
		return dataCache.get(id);
	}

	const data = expensiveTask(id);
	dataCache.set(id, data);
	return data;
};

// Example usage:
console.log(getData(1)); // Performs the expensive task
console.log(getData(2)); // Performs the expensive task
console.log(getData(1)); // Fetches from cache
console.log(getData(2)); // Fetches from cache
console.log(getData(3)); // Performs the expensive task
console.log(getData(3)); // Fetches from cache
