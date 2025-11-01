/*
const obj = {
	nextLevel: { courseId: "Level2" },
	"Programming Hero": { courseId: "Level1" },
};

console.log(obj["Programming Hero"]); // { courseId: 'Level1' }
console.log(obj.nextLevel); // { courseId: 'Level2' }
console.log(obj["nextLevel"]); // { courseId: 'Level2' }
console.log(obj["next" + "Level"]); // { courseId: 'Level2' }

obj[true] = { courseId: "Level3" };
console.log(obj[true]); // { courseId: 'Level3' }
console.log(obj["true"]); // { courseId: 'Level3' }

obj[123] = { courseId: "Level4" };
console.log(obj[123]); // { courseId: 'Level4' }
console.log(obj["123"]); // { courseId: 'Level4' }

obj[null] = { courseId: "Level5" };
console.log(obj[null]); // { courseId: 'Level5' }
console.log(obj["null"]); // { courseId: 'Level5' }

obj[undefined] = { courseId: "Level6" };
console.log(obj[undefined]);
*/

const course1 = { name: "Programming Hero" };
const course2 = { name: "Next Level Web Development" };

/*
const obj2 = {};

obj2[course1] = { courseId: "Level1" };
console.log(obj2);
console.log(obj2[course1]); // { courseId: 'Level1' }
console.log(obj2["[object Object]"]); // { courseId: 'Level1' }
*/

const map = new Map();

map.set(course1, { courseId: "Level1" });
map.set(course2, { courseId: "Level2" });

console.log(map);
// Prints: Map(2) { { name: 'Programming Hero' } => { courseId: 'Level1' }, { name: 'Next Level Web Development' } => { courseId: 'Level2' } }
// Get values by keys
console.log(map.get(course1)); // { courseId: 'Level1' }
console.log(map.get(course2)); // { courseId: 'Level2' }
console.log(map.get({ name: "Programming Hero" })); // undefined
// Map size
console.log(map.size); // 2
// Check key existence
console.log(map.has(course1)); // true
console.log(map.has({ name: "Next Level Web Development" })); // false
// Delete a key-value pair
map.delete(course1);
console.log(map.size); // 1
console.log(map.get(course1)); // undefined

map.set(course1, { courseId: "Level1" });
// Iterate over map entries
for (const [key, value] of map) {
	console.log(key, value);
}

map.forEach((value, key) => (key.name = "Updated " + key.name));
console.log(map);

console.log([...map.keys()]); // [ { name: 'Updated Programming Hero' }, { name: 'Updated Next Level Web Development' } ]
console.log([...map.values()]); // [ { courseId: 'Level1' }, { courseId: 'Level2' } ]

console.log(map.entries());

const courses = [
	["Programming Hero", "Level 1"],
	["Next Level", "Level 2"],
];

const coursesMap = new Map(courses);

console.log(coursesMap);
// Map(2) { 'Programming Hero' => 'Level 1', 'Next Level' => 'Level 2' }
