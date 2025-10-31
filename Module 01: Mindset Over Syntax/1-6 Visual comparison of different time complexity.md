# 1-6 Visual comparison of different time complexity

In this section, we will visually compare different time complexities to understand how they scale with increasing input sizes. Time complexity is a way to describe the efficiency of an algorithm in terms of the time it takes to complete as a function of the length of the input.

## Always Think worst case scenario

When analyzing time complexity, we always focus on the worst-case scenario, which represents the maximum time an algorithm could take to complete for any input of size n. This helps us understand the upper limits of an algorithm's performance.

## How to identify time complexity

To identify the time complexity of an algorithm, we can follow these steps:

1. **Identify the basic operations**: Determine the fundamental operations that contribute to the algorithm's running time (e.g., comparisons, assignments).
2. **Count the operations**: Analyze how many times these operations are executed as a function of the input size n.
3. **Express in Big O notation**: Use Big O notation to express the time complexity, focusing on the dominant term as n grows large.

## How to calculate time complexity

To calculate the time complexity of an algorithm, we can follow these steps:

1. **Identify the input size (n)**: Determine the size of the input for the algorithm (e.g., the number of elements in an array).
2. **Analyze the algorithm**: Break down the algorithm into its basic operations and determine how many times each operation is executed as a function of n.
3. **Find the dominant term**: Identify the term that grows the fastest as n increases, and ignore lower-order terms and constant factors.
4. **Express in Big O notation**: Use Big O notation to express the time complexity, focusing on the dominant term.

## O(1) vs O(n) time complexity

To illustrate the difference between O(1) and O(n) time complexities, consider the following examples:

```javascript
// O(1) - Constant time complexity
function getFirstElement(array) {
	return array[0];
}
// O(n) - Linear time complexity
function findElement(array, target) {
	for (let i = 0; i < array.length; i++) {
		if (array[i] === target) {
			return i;
		}
	}
	return -1;
}
```

In the first function, `getFirstElement`, the time it takes to retrieve the first element of the array does not depend on the size of the array; it always takes the same amount of time, hence O(1).
In the second function, `findElement`, the time it takes to find the target element depends on the size of the array. In the worst case, we may have to check every element in the array, leading to a time complexity of O(n).

## O(log n) vs O(n log n) time complexity

To illustrate the difference between O(log n) and O(n log n) time complexities, consider the following examples:

```javascript
// O(log n) - Logarithmic time complexity
function binarySearch(array, target) {
	let left = 0;
	let right = array.length - 1;
	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		if (array[mid] === target) {
			return mid;
		} else if (array[mid] < target) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}
	return -1;
}
// O(n log n) - Linearithmic time complexity
function mergeSort(array) {
	if (array.length <= 1) {
		return array;
	}
	const mid = Math.floor(array.length / 2);
	const left = mergeSort(array.slice(0, mid));
	const right = mergeSort(array.slice(mid));
	return merge(left, right);
}
function merge(left, right) {
	const result = [];
	let i = 0;
	let j = 0;
	while (i < left.length && j < right.length) {
		if (left[i] < right[j]) {
			result.push(left[i]);
			i++;
		} else {
			result.push(right[j]);
			j++;
		}
	}
	return result.concat(left.slice(i)).concat(right.slice(j));
}
```

In the first function, `binarySearch`, the time it takes to find the target element decreases logarithmically as the size of the array increases, leading to a time complexity of O(log n).
In the second function, `mergeSort`, the time it takes to sort the array involves dividing the array and merging the sorted halves, resulting in a time complexity of O(n log n).

## Examples of common time complexities by array

In javascript, we can visualize different time complexities using arrays. Here are some common time complexities and their visual representations:

```javascript
const arraySizes = [10, 100, 1000, 10000, 100000];
const timeComplexities = {
    O(1): arraySizes.map(size => 1), // Constant time
    O(log n): arraySizes.map(size => Math.log2(size)), // Logarithmic time
    O(n): arraySizes.map(size => size), // Linear time
    O(n log n): arraySizes.map(size => size * Math.log2(size)), // Linearithmic time
    O(n^2): arraySizes.map(size => size * size), // Quadratic time
    O(2^n): arraySizes.map(size => Math.pow(2, size / 10)), // Exponential time (scaled down for visualization)
};
console.log(timeComplexities);
```

Output:

```text
{
  O(1): [1, 1, 1, 1, 1],
  O(log n): [3.321928094887362, 6.643856189774724, 9.965784284662087, 13.287712379549449, 16.609640474436812],
  O(n): [10, 100, 1000, 10000, 100000],
  O(n log n): [33.21928094887362, 664.3856189774724, 9965.784284662087, 132877.12379549449, 1660964.0474436812],
  O(n^2): [100, 10000, 1000000, 100000000, 10000000000],
  O(2^n): [1.024e+03, 1.267e+30, 1.071e+301, Infinity, Infinity]
}
```

## Visual representation

To visualize the different time complexities, we can use a graphing library like Chart.js or D3.js to plot the values. Below is an example using Chart.js:

```html
<canvas
	id="timeComplexityChart"
	width="800"
	height="400"></canvas>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
	const ctx = document.getElementById('timeComplexityChart').getContext('2d);
	const chart = new Chart(ctx, {
	    type: 'line',
	    data: {
	        labels: [10, 100, 1000, 10000, 100000],
	        datasets: [
	            {
	                label: 'O(1)',
	                data: [1, 1, 1, 1, 1],
	                borderColor: 'rgba(75, 192, 192, 1)',
	                fill: false,
	            },
	            {
	                label: 'O(log n)',
	                data: [3.32, 6.64, 9.97, 13.29, 16.61],
	                borderColor: 'rgba(153, 102, 255, 1)',
	                fill: false,
	            },
	            {
	                label: 'O(n)',
	                data: [10, 100, 1000, 10000, 100000],
	                borderColor: 'rgba(255, 159, 64, 1)',
	                fill: false,
	            },
	            {
	                label: 'O(n log n)',
	                data: [33.22, 664.39, 9965.78, 132877.12, 1660964.05],
	                borderColor: 'rgba(255, 99, 132, 1)',
	                fill: false,
	            },
	            {
	                label: 'O(n^2)',
	                data: [100, 10000, 1000000, 100000000, 10000000000],
	                borderColor: 'rgba(54, 162, 235, 1)',
	                fill: false,
	            },
	            {
	                label: 'O(2^n)',
	                data: [1024, 1.267e+30, 1.071e+301, Infinity, Infinity],
	                borderColor: 'rgba(255, 206, 86, 1)',
	                fill: false,
	            },
	        ],
	    },
	    options: {
	        scales: {
	            y: {
	                type: 'logarithmic',
	                title: {
	                    display: true,
	                    text: 'Time Complexity (log scale)',
	                },
	            },
	            x: {
	                title: {
	                    display: true,
	                    text: 'Input Size (n)',
	                },
	            },
	        },
	    },
	});
</script>
```

This code will create a line chart that visually represents the different time complexities as the input size increases. The y-axis is set to a logarithmic scale to better visualize the differences between the complexities, especially for larger input sizes.
