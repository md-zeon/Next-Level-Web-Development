/*
 * 2-4: Array Cross Matching and Array.from()
 * Array intersection, difference, union operations and Array.from() method
 */

// Sample data for demonstrations
const studentsA = ['Alice', 'Bob', 'Charlie', 'Diana'];
const studentsB = ['Bob', 'Diana', 'Eve', 'Frank'];
const studentsC = ['Alice', 'Charlie', 'Grace'];

const numbersA = [1, 2, 3, 4, 5];
const numbersB = [3, 4, 5, 6, 7];
const numbersC = [5, 6, 7, 8, 9];

const productsA = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 75 }
];

const productsB = [
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 75 },
    { id: 4, name: 'Monitor', price: 300 }
];

const productsC = [
    { id: 3, name: 'Keyboard', price: 75 },
    { id: 4, name: 'Monitor', price: 300 },
    { id: 5, name: 'Headphones', price: 150 }
];

console.log('=== Original Data ===');
console.log('Students A:', studentsA);
console.log('Students B:', studentsB);
console.log('Students C:', studentsC);
console.log('Numbers A:', numbersA);
console.log('Numbers B:', numbersB);
console.log('Products A:', productsA.map(p => p.name));
console.log('Products B:', productsB.map(p => p.name));

// ==========================================
// ARRAY CROSS MATCHING TECHNIQUES
// ==========================================
console.log('\n=== ARRAY CROSS MATCHING TECHNIQUES ===');

// 1. Intersection - Elements present in both arrays
console.log('\n--- INTERSECTION ---');

// Simple intersection for primitive values
function intersection(arr1, arr2) {
    return arr1.filter(item => arr2.includes(item));
}

console.log('Students A ∩ B:', intersection(studentsA, studentsB)); // ['Bob', 'Diana']
console.log('Numbers A ∩ B:', intersection(numbersA, numbersB)); // [3, 4, 5]

// Intersection of multiple arrays
function intersectionMultiple(...arrays) {
    if (arrays.length === 0) return [];
    if (arrays.length === 1) return arrays[0];

    return arrays[0].filter(item =>
        arrays.slice(1).every(arr => arr.includes(item))
    );
}

console.log('Students A ∩ B ∩ C:', intersectionMultiple(studentsA, studentsB, studentsC)); // []

// Object intersection by property
function intersectionBy(arr1, arr2, keyFn = item => item) {
    const set2 = new Set(arr2.map(keyFn));
    return arr1.filter(item => set2.has(keyFn(item)));
}

console.log('Products A ∩ B (by id):',
    intersectionBy(productsA, productsB, p => p.id).map(p => p.name)
); // ['Mouse', 'Keyboard']

// 2. Difference - Elements in first array but not in second
console.log('\n--- DIFFERENCE ---');

// Simple difference
function difference(arr1, arr2) {
    return arr1.filter(item => !arr2.includes(item));
}

console.log('Students A - B:', difference(studentsA, studentsB)); // ['Alice', 'Charlie']
console.log('Students B - A:', difference(studentsB, studentsA)); // ['Eve', 'Frank']

// Symmetric difference - Elements in either array but not both
function symmetricDifference(arr1, arr2) {
    const diff1 = difference(arr1, arr2);
    const diff2 = difference(arr2, arr1);
    return [...diff1, ...diff2];
}

console.log('Students A △ B:', symmetricDifference(studentsA, studentsB));
// ['Alice', 'Charlie', 'Eve', 'Frank']

// Object difference by property
function differenceBy(arr1, arr2, keyFn = item => item) {
    const set2 = new Set(arr2.map(keyFn));
    return arr1.filter(item => !set2.has(keyFn(item)));
}

console.log('Products A - B (by id):',
    differenceBy(productsA, productsB, p => p.id).map(p => p.name)
); // ['Laptop']

// 3. Union - All unique elements from both arrays
console.log('\n--- UNION ---');

// Simple union
function union(arr1, arr2) {
    return [...new Set([...arr1, ...arr2])];
}

console.log('Students A ∪ B:', union(studentsA, studentsB));
// ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank']

// Union of multiple arrays
function unionMultiple(...arrays) {
    return [...new Set(arrays.flat())];
}

console.log('Students A ∪ B ∪ C:', unionMultiple(studentsA, studentsB, studentsC));
// ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace']

// Object union by property
function unionBy(arr1, arr2, keyFn = item => item) {
    const map = new Map();

    [...arr1, ...arr2].forEach(item => {
        const key = keyFn(item);
        if (!map.has(key)) {
            map.set(key, item);
        }
    });

    return Array.from(map.values());
}

console.log('Products A ∪ B (by id):',
    unionBy(productsA, productsB, p => p.id).map(p => p.name)
); // ['Laptop', 'Mouse', 'Keyboard', 'Monitor']

// 4. Advanced Set Operations
console.log('\n--- ADVANCED SET OPERATIONS ---');

// Complement (relative to a universe)
function complement(universe, subset) {
    return difference(universe, subset);
}

const allStudents = unionMultiple(studentsA, studentsB, studentsC);
console.log('All students (universe):', allStudents);

console.log('Students in A but not in B∪C:',
    complement(studentsA, union(studentsB, studentsC))
); // ['Alice', 'Charlie']

// Cartesian product
function cartesianProduct(arr1, arr2) {
    return arr1.flatMap(x => arr2.map(y => [x, y]));
}

console.log('Numbers A × B (first 5 pairs):',
    cartesianProduct(numbersA, numbersB).slice(0, 5)
); // [[1,3], [1,4], [1,5], [1,6], [1,7]]

// Power set (all subsets)
function powerSet(arr) {
    const result = [[]];
    for (const item of arr) {
        const newSubsets = result.map(subset => [...subset, item]);
        result.push(...newSubsets);
    }
    return result;
}

console.log('Power set of [1,2] (first 4):', powerSet([1, 2]).slice(0, 4));
// [[], [1], [2], [1,2]]

// ==========================================
// ARRAY.FROM() METHOD
// ==========================================
console.log('\n=== ARRAY.FROM() METHOD ===');

// Syntax: Array.from(arrayLike[, mapFn[, thisArg]])

// 1. Converting Array-like Objects
console.log('\n--- CONVERTING ARRAY-LIKE OBJECTS ---');

// From arguments object
function getArgumentsArray() {
    return Array.from(arguments);
}
console.log('Arguments to array:', getArgumentsArray(1, 2, 3, 4)); // [1, 2, 3, 4]

// From DOM NodeList (simulated)
const nodeList = {
    0: 'div',
    1: 'span',
    2: 'p',
    length: 3
};
console.log('NodeList to array:', Array.from(nodeList)); // ['div', 'span', 'p']

// From HTMLCollection (simulated)
const htmlCollection = {
    0: { tagName: 'DIV' },
    1: { tagName: 'SPAN' },
    2: { tagName: 'P' },
    length: 3,
    item: function(index) { return this[index]; }
};
console.log('HTMLCollection to array:', Array.from(htmlCollection).map(el => el.tagName));

// From Set
const numberSet = new Set([1, 2, 3, 4, 5]);
console.log('Set to array:', Array.from(numberSet)); // [1, 2, 3, 4, 5]

// From Map
const numberMap = new Map([['a', 1], ['b', 2], ['c', 3]]);
console.log('Map keys to array:', Array.from(numberMap.keys())); // ['a', 'b', 'c']
console.log('Map values to array:', Array.from(numberMap.values())); // [1, 2, 3]
console.log('Map entries to array:', Array.from(numberMap.entries())); // [['a',1], ['b',2], ['c',3]]

// 2. Creating Arrays with Mapping
console.log('\n--- CREATING ARRAYS WITH MAPPING ---');

// Generate sequence of numbers
console.log('Numbers 0-9:', Array.from({ length: 10 }, (_, i) => i)); // [0,1,2,3,4,5,6,7,8,9]
console.log('Even numbers 0-18:', Array.from({ length: 10 }, (_, i) => i * 2)); // [0,2,4,6,8,10,12,14,16,18]

// Generate array of objects
const users = Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`
}));
console.log('Generated users:', users);

// Create multiplication table
const multiplicationTable = Array.from({ length: 5 }, (_, row) =>
    Array.from({ length: 5 }, (_, col) => (row + 1) * (col + 1))
);
console.log('5x5 multiplication table:');
multiplicationTable.forEach(row => console.log(row));

// 3. Converting Strings
console.log('\n--- CONVERTING STRINGS ---');

// String to character array
const text = 'Hello World';
console.log('String to chars:', Array.from(text)); // ['H','e','l','l','o',' ','W','o','r','l','d']

// String with emojis
const emojiText = 'Hello 🌍 World 🌟';
console.log('String with emojis:', Array.from(emojiText));
// ['H','e','l','l','o',' ','🌍',' ','W','o','r','l','d','🌟']

// 4. Working with Iterables
console.log('\n--- WORKING WITH ITERABLES ---');

// From custom iterable
const customIterable = {
    *[Symbol.iterator]() {
        yield 'A';
        yield 'B';
        yield 'C';
    }
};
console.log('Custom iterable to array:', Array.from(customIterable)); // ['A', 'B', 'C']

// From generator function
function* numberGenerator() {
    let i = 1;
    while (i <= 5) {
        yield i++;
    }
}
console.log('Generator to array:', Array.from(numberGenerator())); // [1, 2, 3, 4, 5]

// 5. Advanced Array.from() Patterns
console.log('\n--- ADVANCED PATTERNS ---');

// Create range function
function range(start, end, step = 1) {
    const length = Math.ceil((end - start) / step);
    return Array.from({ length }, (_, i) => start + i * step);
}

console.log('Range 1-10:', range(1, 10)); // [1,2,3,4,5,6,7,8,9,10]
console.log('Range 0-20 step 5:', range(0, 20, 5)); // [0,5,10,15,20]

// Create repeating pattern
function repeat(value, times) {
    return Array.from({ length: times }, () => value);
}

console.log('Repeat "Hi" 3 times:', repeat('Hi', 3)); // ['Hi', 'Hi', 'Hi']

// Create unique ID generator
let idCounter = 0;
const generateIds = (count) => Array.from({ length: count }, () => ++idCounter);
console.log('Generated IDs:', generateIds(5)); // [1,2,3,4,5]

// ==========================================
// COMBINING CROSS MATCHING AND ARRAY.FROM()
// ==========================================
console.log('\n=== COMBINING CROSS MATCHING AND ARRAY.FROM() ===');

// 1. Finding common elements with complex conditions
console.log('\n--- COMPLEX CROSS MATCHING ---');

// Find products that exist in multiple arrays with different prices
const allProducts = unionBy(productsA, unionBy(productsB, productsC, p => p.id), p => p.id);
const productOccurrences = allProducts.map(product => ({
    ...product,
    inA: productsA.some(p => p.id === product.id),
    inB: productsB.some(p => p.id === product.id),
    inC: productsC.some(p => p.id === product.id)
}));

console.log('Product occurrences:');
productOccurrences.forEach(p => {
    const locations = [];
    if (p.inA) locations.push('A');
    if (p.inB) locations.push('B');
    if (p.inC) locations.push('C');
    console.log(`  ${p.name}: ${locations.join(', ')}`);
});

// 2. Creating matrices for set operations
console.log('\n--- MATRIX-BASED OPERATIONS ---');

// Create presence matrix
const studentArrays = [studentsA, studentsB, studentsC];
const allUniqueStudents = unionMultiple(...studentArrays);

const presenceMatrix = Array.from({ length: allUniqueStudents.length }, (_, i) =>
    Array.from({ length: studentArrays.length }, (_, j) =>
        studentArrays[j].includes(allUniqueStudents[i]) ? 1 : 0
    )
);

console.log('Student presence matrix:');
console.log('Students:', allUniqueStudents);
presenceMatrix.forEach((row, i) => {
    console.log(`  ${allUniqueStudents[i]}: [${row.join(', ')}]`);
});

// 3. Generating test data for cross matching
console.log('\n--- GENERATED TEST DATA ---');

// Generate test arrays
const testArray1 = Array.from({ length: 10 }, (_, i) => i + 1);
const testArray2 = Array.from({ length: 8 }, (_, i) => i + 3);
const testArray3 = Array.from({ length: 6 }, (_, i) => i + 5);

console.log('Test arrays:');
console.log('Array 1:', testArray1);
console.log('Array 2:', testArray2);
console.log('Array 3:', testArray3);

console.log('Intersections:');
console.log('1 ∩ 2:', intersection(testArray1, testArray2));
console.log('2 ∩ 3:', intersection(testArray2, testArray3));
console.log('1 ∩ 2 ∩ 3:', intersectionMultiple(testArray1, testArray2, testArray3));

// ==========================================
// PRACTICAL EXAMPLES
// ==========================================
console.log('\n=== PRACTICAL EXAMPLES ===');

// 1. User Management System
console.log('\n--- USER MANAGEMENT SYSTEM ---');

const activeUsers = ['alice', 'bob', 'charlie', 'diana'];
const premiumUsers = ['bob', 'diana', 'eve', 'frank'];
const bannedUsers = ['charlie', 'mallory'];

const goodStandingUsers = difference(
    intersection(activeUsers, premiumUsers),
    bannedUsers
);
console.log('Users in good standing:', goodStandingUsers); // ['bob', 'diana']

// Generate user profiles
const userProfiles = Array.from({ length: goodStandingUsers.length }, (_, i) => ({
    username: goodStandingUsers[i],
    id: i + 1,
    status: 'active',
    premium: true,
    joinDate: new Date().toISOString().split('T')[0]
}));
console.log('Generated profiles:', userProfiles);

// 2. Inventory Management
console.log('\n--- INVENTORY MANAGEMENT ---');

const warehouseA = [
    { sku: 'LAP001', qty: 50 },
    { sku: 'MOU001', qty: 100 },
    { sku: 'KEY001', qty: 75 }
];

const warehouseB = [
    { sku: 'MOU001', qty: 80 },
    { sku: 'KEY001', qty: 60 },
    { sku: 'MON001', qty: 25 }
];

// Find products in both warehouses
const commonProducts = intersectionBy(warehouseA, warehouseB, item => item.sku);
console.log('Products in both warehouses:', commonProducts.map(p => p.sku));

// Calculate total inventory per product
const allProductsInventory = unionBy(warehouseA, warehouseB, item => item.sku);
const totalInventory = allProductsInventory.map(product => {
    const inA = warehouseA.find(p => p.sku === product.sku)?.qty || 0;
    const inB = warehouseB.find(p => p.sku === product.sku)?.qty || 0;
    return {
        sku: product.sku,
        totalQty: inA + inB,
        warehouseA: inA,
        warehouseB: inB
    };
});
console.log('Total inventory:');
totalInventory.forEach(item => {
    console.log(`  ${item.sku}: ${item.totalQty} (${item.warehouseA} + ${item.warehouseB})`);
});

// 3. Social Network Analysis
console.log('\n--- SOCIAL NETWORK ANALYSIS ---');

const userFriends = {
    alice: ['bob', 'charlie', 'diana'],
    bob: ['alice', 'charlie', 'eve'],
    charlie: ['alice', 'bob', 'diana'],
    diana: ['alice', 'charlie', 'eve'],
    eve: ['bob', 'diana', 'frank'],
    frank: ['eve']
};

// Find mutual friends
function findMutualFriends(user1, user2) {
    return intersection(userFriends[user1] || [], userFriends[user2] || []);
}

console.log('Mutual friends of Alice and Bob:', findMutualFriends('alice', 'bob')); // ['charlie']

// Find friend suggestions (friends of friends, excluding direct friends)
function suggestFriends(user) {
    const directFriends = new Set(userFriends[user] || []);
    const friendsOfFriends = new Set();

    directFriends.forEach(friend => {
        (userFriends[friend] || []).forEach(foaf => {
            if (foaf !== user && !directFriends.has(foaf)) {
                friendsOfFriends.add(foaf);
            }
        });
    });

    return Array.from(friendsOfFriends);
}

console.log('Friend suggestions for Alice:', suggestFriends('alice')); // ['eve']

// ==========================================
// PERFORMANCE CONSIDERATIONS
// ==========================================
console.log('\n=== PERFORMANCE CONSIDERATIONS ===');

// Test performance of different approaches
const largeArray1 = Array.from({ length: 10000 }, (_, i) => i);
const largeArray2 = Array.from({ length: 8000 }, (_, i) => i + 2000);

console.time('Set-based intersection (10k elements)');
const setResult = intersection(largeArray1, largeArray2);
console.timeEnd('Set-based intersection (10k elements)');

console.time('Array.from() with Set (10k elements)');
const fromResult = Array.from(new Set(largeArray1.filter(x => largeArray2.includes(x))));
console.timeEnd('Array.from() with Set (10k elements)');

console.log('Results match:', setResult.length === fromResult.length);

// Memory usage comparison
console.log('\n--- Memory Usage Notes ---');
console.log('• Array.from() creates new arrays (memory allocation)');
console.log('• Set operations are efficient for large datasets');
console.log('• intersection() with includes() is O(n*m) - avoid for large arrays');
console.log('• Set-based operations are O(n) after initial conversion');
console.log('• Array.from() with mapping is efficient for transformations');

console.log('\n=== Lesson Complete ===');
console.log('Array cross matching and Array.from() are powerful tools for data manipulation!');
console.log('Key takeaways:');
console.log('• Intersection, difference, union for set operations');
console.log('• Array.from() for creating arrays from various sources');
console.log('• Combine techniques for complex data processing');
console.log('• Consider performance implications for large datasets');
