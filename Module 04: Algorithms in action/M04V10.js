// O(n^2) time complexity
const insertionSort = (arr) => {
	console.log("Before Sorting", arr);
	for (let i = 1; i < arr.length; i++) {
		console.log(`\nIteration ${i}:`);
		let current = arr[i];
		let j = i - 1;
		console.log("Is current < arr[j]?", current < arr[j]);
		while (j >= 0 && arr[j] > current) {
			console.log(`Current element: ${current}`, "i:", i, "j:", j);
			console.log(
				`arr[${j}] (${
					arr[j]
				}) is greater than current (${current}). Shifting arr[${j}] to arr[${
					j + 1
				}]`,
			);
			arr[j + 1] = arr[j];
			j--;
			console.log("Array state during shifting:", arr);
		}
		console.log(`Placing current (${current}) at arr[${j + 1}]`);
		arr[j + 1] = current;
		console.log("Array state:", arr);
	}
	console.log("After Sorting", arr);

	return arr;
};

insertionSort([1, 2, 3, 4, 5, 0]);
