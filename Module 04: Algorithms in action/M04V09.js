const selectionSort = (arr) => {
	for (let i = 0; i < arr.length - 1; i++) {
		console.log("State of arr: ", arr);
		let minIndex = i;
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[j] < arr[minIndex]) {
				minIndex = j;
			}
			// console.log("Min Value:", arr[minIndex], "Min Index:", minIndex);
		}
		if (minIndex != i) {
			let temp = arr[i];
			arr[i] = arr[minIndex];
			arr[minIndex] = temp;
		}
		console.log(`After pass ${i + 1}`, arr);
	}
};

selectionSort([5, 3, 2, 9, 1, 8]);
