# 2-1: Objects Limitations and Map Introduction

## Objects Limitations

In JavaScript, objects are versatile data structures that can store key-value pairs. However, they have some limitations when it comes to key types.

### Key Conversion to Strings

When you use non-string values as keys in objects, JavaScript automatically converts them to strings:

```javascript
const obj = {
	nextLevel: { courseId: "Level2" },
	"Programming Hero": { courseId: "Level1" },
};

console.log(obj["Programming Hero"]); // { courseId: 'Level1' }
console.log(obj.nextLevel); // { courseId: 'Level2' }
console.log(obj["nextLevel"]); // { courseId: 'Level2' }
console.log(obj["next" + "Level"]); // { courseId: 'Level2' }

// All of these get converted to strings
obj[true] = { courseId: "Level3" };
console.log(obj[true]); // { courseId: 'Level3' }
console.log(obj["true"]); // { courseId: 'Level3' }

obj[123] = { courseId: "Level4" };
console.log(obj[123]); // { courseId: 'Level4' }
console.log(obj["123"]); // { courseId: 'Level4' }

obj[null] = { courseId: "Level5" };
console.log(obj[null]); // { courseId: 'Level5' }
console.log(obj["null"]); // { courseId: 'Level5' }
```

### The Big Problem: Objects as Keys

The major limitation occurs when you try to use objects as keys:

```javascript
const course1 = { name: "Programming Hero" };
const course2 = { name: "Next Level Web Development" };

const obj2 = {};
obj2[course1] = { courseId: "Level1" };

console.log(obj2); // { '[object Object]': { courseId: 'Level1' } }
console.log(obj2[course1]); // { courseId: 'Level1' }
console.log(obj2["[object Object]"]); // { courseId: 'Level1' }
```

**Problem**: All objects get converted to the string `"[object Object]"`, so you can't distinguish between different objects used as keys!

## Introduction to Map

The `Map` data structure was introduced in ES6 to solve these limitations. Maps allow you to use any data type as keys, including objects.

### Creating a Map

```javascript
const map = new Map();
```

### Setting Values

```javascript
const course1 = { name: "Programming Hero" };
const course2 = { name: "Next Level Web Development" };

map.set(course1, { courseId: "Level1" });
map.set(course2, { courseId: "Level2" });

console.log(map);
// Map(2) {
//   { name: 'Programming Hero' } => { courseId: 'Level1' },
//   { name: 'Next Level Web Development' } => { courseId: 'Level2' }
// }
```

### Getting Values

```javascript
console.log(map.get(course1)); // { courseId: 'Level1' }
console.log(map.get(course2)); // { courseId: 'Level2' }
console.log(map.get({ name: "Programming Hero" })); // undefined (different object reference)
```

### Map Properties and Methods

#### Size

```javascript
console.log(map.size); // 2
```

#### Checking Key Existence

```javascript
console.log(map.has(course1)); // true
console.log(map.has({ name: "Next Level Web Development" })); // false (different reference)
```

#### Deleting Entries

```javascript
map.delete(course1);
console.log(map.size); // 1
console.log(map.get(course1)); // undefined
```

### Iterating Over Maps

#### Using for...of

```javascript
map.set(course1, { courseId: "Level1" }); // Adding back

for (const [key, value] of map) {
	console.log(key, value);
}
// { name: 'Next Level Web Development' } { courseId: 'Level2' }
// { name: 'Programming Hero' } { courseId: 'Level1' }
```

#### Using forEach

```javascript
map.forEach((value, key) => {
	key.name = "Updated " + key.name;
});

console.log(map);
// Map(2) {
//   { name: 'Updated Next Level Web Development' } => { courseId: 'Level2' },
//   { name: 'Updated Programming Hero' } => { courseId: 'Level1' }
// }
```

### Converting Maps to Arrays

```javascript
console.log([...map.keys()]);
// [ { name: 'Updated Programming Hero' }, { name: 'Updated Next Level Web Development' } ]

console.log([...map.values()]);
// [ { courseId: 'Level1' }, { courseId: 'Level2' } ]

console.log([...map.entries()]);
// [
//   [ { name: 'Updated Programming Hero' }, { courseId: 'Level1' } ],
//   [ { name: 'Updated Next Level Web Development' }, { courseId: 'Level2' } ]
// ]
```

### Creating Maps from Arrays

```javascript
const courses = [
	["Programming Hero", "Level 1"],
	["Next Level", "Level 2"],
];

const coursesMap = new Map(courses);
console.log(coursesMap);
// Map(2) { 'Programming Hero' => 'Level 1', 'Next Level' => 'Level 2' }
```

## When to Use Map vs Object

### Use Objects when:

- You need JSON serialization
- You want simple key-value storage with string keys
- You're working with static data
- Memory efficiency is important

### Use Maps when:

- Keys are not strings (objects, functions, etc.)
- You need to maintain insertion order
- You need frequent additions/deletions
- You need to know the size quickly
- Keys might be unknown at runtime

## Key Differences

| Feature     | Object                        | Map                            |
| ----------- | ----------------------------- | ------------------------------ |
| Key Types   | Strings/Symbols               | Any type                       |
| Order       | Not guaranteed                | Insertion order maintained     |
| Size        | Manual counting               | `.size` property               |
| Iteration   | `for...in` or `Object.keys()` | `for...of`, `.forEach()`       |
| Performance | Fast for small datasets       | Better for frequent operations |
| JSON        | Native support                | Requires conversion            |

## Summary

- Objects have limitations with non-string keys (they get converted to strings)
- Objects as keys become `"[object Object]"` making them indistinguishable
- Maps solve these problems by allowing any data type as keys
- Maps maintain insertion order and provide better performance for frequent operations
- Choose the right data structure based on your specific use case
