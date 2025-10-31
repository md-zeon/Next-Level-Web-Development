// data setup

function generateSimData(size) {
	const itemPool = [
		"Apple",
		"Banana",
		"Orange",
		"Strawberry",
		"Cherry",
		"Date",
		"Elderberry",
		"Fig",
		"Grape",
		"Honeydew",
		"Kiwi",
		"Lemon",
	];
	const generatedData = [];

	for (let i = 0; i < size; i++) {
		const randomIndex = Math.floor(Math.random() * itemPool.length);
		generatedData.push(itemPool[randomIndex]);
	}

	return generatedData;
}

const hugeDataSet = generateSimData(500000);

console.log("Data set of size", hugeDataSet.length, "generated.");

// brute force O(n^2) approach

const arrStartTime = performance.now();

const removeDuplicateArr = (arr) => {
	const uniqueArr = [];
	arr.forEach((item) => {
		if (!uniqueArr.includes(item)) {
			uniqueArr.push(item);
		}
	});

	return uniqueArr;
};

console.log("Brute force O(n^2) approach result:", removeDuplicateArr(hugeDataSet));

const arrEndTime = performance.now();

console.log("Brute force O(n^2) approach time:", arrEndTime - arrStartTime, "ms");

// optimized O(n) approach

const setStartTime = performance.now();

const removeDuplicateSet = (arr) => {
	const uniqueSet = new Set(arr);
	return Array.from(uniqueSet);
};
console.log("Optimized O(n) approach result:", removeDuplicateSet(hugeDataSet));

const setEndTime = performance.now();

console.log("Optimized O(n) approach time:", setEndTime - setStartTime, "ms");
