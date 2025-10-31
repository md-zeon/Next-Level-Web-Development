// Method 1: Using performance API

/*
const startTime = performance.now();

for (let i = 0; i < 100000; i++) {
	console.log(i);
}

const endTime = performance.now();

console.log(`Execution time: ${endTime - startTime} milliseconds`);
*/

// Method 2: Using console.time and console.timeEnd

/*
console.time("Loop Execution Time");

for (let i = 0; i < 100000; i++) {
	console.log(i);
}

console.timeEnd("Loop Execution Time");
*/

// Method 3: Using Date object
/*
const startTime = new Date();

for (let i = 0; i < 100000; i++) {
    console.log(i);
}

const endTime = new Date();

console.log(`Execution time: ${endTime - startTime} milliseconds`);
*/

// Example:

const firstArray = [];
const secondArray = [];

for (let i = 1; i <= 600000; i++) {
	if (i <= 300000) {
		firstArray.push(i);
	} else {
		secondArray.push(i);
	}
}

console.log("First Array Length:", firstArray.length);
console.log("Second Array Length:", secondArray.length);

console.time("map1");
const startMap1 = performance.now();
const firstUserList = firstArray.map((num) => {
	return {
		id: num,
		userName: `User ${num}`,
		age: Math.floor(Math.random() * 100),
	};
});
const endMap1 = performance.now();
console.timeEnd("map1");
console.log(`Map1 Execution time: ${endMap1 - startMap1} milliseconds`);

console.time("map2");
const startMap2 = performance.now();
const secondUserList = secondArray.map((num) => {
	return {
		id: num,
		userName: `User ${num}`,
		age: Math.floor(Math.random() * 100),
	};
});
const endMap2 = performance.now();
console.timeEnd("map2");
console.log(`Map2 Execution time: ${endMap2 - startMap2} milliseconds`);

// find method
console.time("find");
const startFind = performance.now();
const foundUser = firstUserList.find((user) => user.id === 299999);
const endFind = performance.now();
console.timeEnd("find");
console.log(`Find Execution time: ${endFind - startFind} milliseconds`);
console.log("Found User:", foundUser);

// access by index
console.time("accessByIndex");
const startAccess = performance.now();
const accessedUser = secondUserList[299999];
const endAccess = performance.now();
console.timeEnd("accessByIndex");
console.log(`Access by Index Execution time: ${endAccess - startAccess} milliseconds`);
console.log("Accessed User:", accessedUser);
