const set = new Set();

console.log(set); // Set(0) {}
console.log("Set Size:", set.size); // Set Size: 0

set.add(1);
set.add(2);
set.add(2); // Duplicate, will not be added

console.log(set); // Set(2) { 1, 2 }
console.log("Set Size after additions:", set.size); // Set Size after additions: 2

console.log("Has 1:", set.has(1)); // Has 1: true
console.log("Has 3:", set.has(3)); // Has 3: false

set.delete(1); // Removes 1 from the set and returns true
console.log(set); // Set(1) { 2 }
console.log("Set Size after deletion:", set.size); // Set Size after deletion: 1

set.clear();
console.log(set); // Set(0) {}
console.log("Set Size after clear:", set.size); // Set Size after clear: 0

const zeon = { userName: "Zeon" };
const riaz = { userName: "Riaz" };
const mezba = { userName: "Mezba" };
const mizan = { userName: "Mizan" };
const tonmoy = { userName: "Tonmoy" };

const viewers = new Set();
viewers.add(zeon);
viewers.add(riaz);
viewers.add(mezba);
viewers.add(mizan);
viewers.add(tonmoy);
viewers.add(zeon); // Duplicate, will not be added
viewers.add(riaz); // Duplicate, will not be added

console.log("Viewers Set:", viewers);
// Viewers Set: Set(5) { { userName: 'Zeon' }, { userName: 'Riaz' }, { userName: 'Mezba' }, { userName: 'Mizan' }, { userName: 'Tonmoy' } }

console.log("Total Viewers:", viewers.size); // Total Viewers: 5

const arr = ["apple", "banana", "orange", "apple", "mango"];
const uniqueFruits = new Set(arr);
console.log("Unique Fruits Set:", uniqueFruits);
// Unique Fruits Set: Set(4) { 'apple', 'banana', 'orange', 'mango' }

console.log("Total Unique Fruits:", uniqueFruits.size); // Total Unique Fruits: 4

// Iterating over Set
uniqueFruits.forEach((fruit) => {
	console.log("Fruit:", fruit);
});
// Fruit: apple
// Fruit: banana
// Fruit: orange
// Fruit: mango

for (const fruit of uniqueFruits) {
	console.log("Iterated Fruit:", fruit);
}
// Iterated Fruit: apple
// Iterated Fruit: banana
// Iterated Fruit: orange
// Iterated Fruit: mango

// Converting Set to Array
const fruitsArray = Array.from(uniqueFruits);
console.log("Fruits Array:", fruitsArray); // Fruits Array: [ 'apple', 'banana', 'orange', 'mango' ]

const moreFruitsArray = [...uniqueFruits];
console.log("More Fruits Array:", moreFruitsArray); // More Fruits Array: [ 'apple', 'banana', 'orange', 'mango' ]

moreFruitsArray.map((fruit) => console.log("Mapped Fruit:", fruit.toUpperCase()));
// Mapped Fruit: APPLE
// Mapped Fruit: BANANA
// Mapped Fruit: ORANGE
// Mapped Fruit: MANGO

const removeDuplicateArr = (arr) => {
	const newArr = [];
	for (const item of arr) {
		if (!newArr.includes(item)) {
			newArr.push(item);
		}
	}
	return newArr;
};

const removeDuplicateSet = (arr) => {
	return Array.from(new Set(arr));
};

console.log("Remove Duplicates using Loop:", removeDuplicateArr(arr));
// Remove Duplicates using Loop: [ 'apple', 'banana', 'orange', 'mango' ]
console.log("Remove Duplicates using Set:", removeDuplicateSet(arr));
// Remove Duplicates using Set: [ 'apple', 'banana', 'orange', 'mango' ]
