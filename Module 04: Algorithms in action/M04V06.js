// Binary Search
// [2, 3, 4, 10, 40, 50, 60, 70, 80, 90, 100]
// target = 10

const binarySearch = (arr, target) => {
	let left = 0;
	let right = arr.length - 1;
	while (left <= right) {
		let mid = Math.floor((left + right) / 2);

		if (arr[mid] === target) {
			return mid;
		} else if (arr[mid] > target) {
			right = mid - 1;
		} else {
			left = mid + 1;
		}
	}

	return -1;
};

const numberArray = [2, 3, 4, 10, 40, 50, 60, 70, 80, 90, 100];
const targetNumber = 100;
const result = binarySearch(numberArray, targetNumber);
console.log("Element found at index:", result); // Output: Element found at index: 10

const numberArray2 = [2, 3, 4, 10, 10, 10, 50, 60, 70, 80, 90, 100];
const targetNumber2 = 0;
const result2 = binarySearch(numberArray2, targetNumber2);
console.log("Element found at index:", result2); // Output: Element found at index: -1
