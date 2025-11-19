// Mission 1: Time Complexity Analysis for Web Development
// Demonstrates DSA concepts: Big O notation, algorithmic complexity, performance analysis

// Sample dataset for complexity analysis
const firstArray = [];
const secondArray = [];

// Create test data with different sizes (300k vs 600k elements)
for (let i = 1; i <= 600000; i++) {
  if (i <= 300000) {
    firstArray.push(i);
  } else {
    secondArray.push(i);
  }
}

// Demonstration: Array Method Complexities
function analyzeArrayMethods() {
  console.log("=".repeat(60));
  console.log("DSA IN ACTION: TIME COMPLEXITY ANALYSIS");
  console.log("=".repeat(60));

  console.log(`\n📊 Test Dataset: ${firstArray.length.toLocaleString()} vs ${secondArray.length.toLocaleString()} elements`);

  // O(n) - Linear time: map, filter, reduce, forEach
  console.log("\n⏱️  O(n) Operations - Linear Time Complexity");
  console.log("Time should roughly double when input size doubles");

  console.time("map (300k)");
  const startMap1 = performance.now();
  const firstUserList = firstArray.map((num) => ({
    id: num,
    userName: `User ${num}`,
    age: Math.floor(Math.random() * 100),
  }));
  const endMap1 = performance.now();
  console.timeEnd("map (300k)");
  const timeMap1 = endMap1 - startMap1;
  console.log(`Performance: ${timeMap1.toFixed(2)}ms`);

  console.time("map (600k)");
  const startMap2 = performance.now();
  const secondUserList = secondArray.map((num) => ({
    id: num,
    userName: `User ${num}`,
    age: Math.floor(Math.random() * 100),
  }));
  const endMap2 = performance.now();
  console.timeEnd("map (600k)");
  const timeMap2 = endMap2 - startMap2;
  console.log(`Performance: ${timeMap2.toFixed(2)}ms`);

  console.log(`Ratio (600k/300k): ${(timeMap2 / timeMap1).toFixed(2)}x - Expected: ~2x`);

  // Analyze filter complexity
  console.log("\n🕵️  Filter Operation (O(n) - visits each element)");
  console.time("filter (even numbers)");
  const startFilter = performance.now();
  const evenNumbers = firstArray.filter(num => num % 2 === 0);
  const endFilter = performance.now();
  console.timeEnd("filter (even numbers)");
  console.log(`Filtered ${evenNumbers.length.toLocaleString()} even numbers from ${firstArray.length.toLocaleString()} elements`);
  console.log(`Performance: ${(endFilter - startFilter).toFixed(2)}ms`);

  // O(n²) - Quadratic time: nested loops or inefficient algorithms
  console.log("\n📈 O(n²) Operations - Quadratic Time Complexity");
  console.log("Time increases dramatically with input size - avoid in production!");

  // Simulate O(n²) with nested loops (careful with large arrays!)
  console.time("nested loops (3k elements)");
  const startNested = performance.now();
  let nestedOperations = 0;
  const smallArray = firstArray.slice(0, 3000); // Use smaller array for demo
  for (let i = 0; i < smallArray.length; i++) {
    for (let j = 0; j < smallArray.length; j++) {
      nestedOperations++;
    }
  }
  const endNested = performance.now();
  console.timeEnd("nested loops (3k elements)");
  const timeNested = endNested - startNested;
  console.log(`Operations: ${nestedOperations.toLocaleString()}`);
  console.log(`Performance: ${timeNested.toFixed(2)}ms`);
  console.log(`Operations per millisecond: ${(nestedOperations / timeNested).toFixed(0)}`);

  // Compare with equivalent O(n) operation
  console.time("single loop (3k elements)");
  const startSingle = performance.now();
  let singleOperations = 0;
  for (let i = 0; i < smallArray.length; i++) {
    singleOperations++;
  }
  const endSingle = performance.now();
  console.timeEnd("single loop (3k elements)");
  const timeSingle = endSingle - startSingle;
  console.log(`O(n) vs O(n²): ${timeSingle.toFixed(2)}ms vs ${timeNested.toFixed(2)}ms`);

  // O(log n) - Binary search example
  console.log("\n🔍 O(log n) Operations - Logarithmic Time Complexity");
  console.log("Binary search - halves the search space each iteration");

  function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let operations = 0;

    while (left <= right) {
      operations++;
      const mid = Math.floor((left + right) / 2);

      if (arr[mid] === target) {
        return { index: mid, operations };
      } else if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return { index: -1, operations };
  }

  console.time("binary search (300k elements)");
  const searchTarget = Math.floor(Math.random() * firstArray.length) + 1;
  const searchResult = binarySearch(firstArray, searchTarget);
  console.timeEnd("binary search (300k elements)");
  console.log(`Searching for ${searchTarget} in ${firstArray.length.toLocaleString()} elements`);
  console.log(`Found at index ${searchResult.index}, took ${searchResult.operations} operations`);
  console.log(`log₂(${firstArray.length}) ≈ ${Math.log2(firstArray.length).toFixed(0)} expected operations`);

  // Compare with O(n) linear search
  console.time("linear search (300k elements)");
  const linearResult = firstArray.findIndex(num => num === searchTarget);
  console.timeEnd("linear search (300k elements)");
  console.log(`Linear search found at index ${linearResult}`);

  // O(1) - Constant time: array access by index
  console.log("\n⚡ O(1) Operations - Constant Time Complexity");
  console.log("Fixed time regardless of input size");

  console.time("array access by index (300k array)");
  const startAccess = performance.now();
  const accessedUser = firstUserList[299999]; // Last element
  const endAccess = performance.now();
  console.timeEnd("array access by index (300k array)");
  console.log(`Performance: ${(endAccess - startAccess).toFixed(4)}ms (microseconds!)`);
  console.log(`Accessed: ${accessedUser ? accessedUser.userName : 'N/A'}`);

  // Common web development scenarios
  console.log("\n🌐 Web Development Examples:");

  console.log("\n1. Rendering a list (O(n)):");
  console.log(`   - Small list (10 items): Fast`);
  console.log(`   - Large list (1000 items): Still acceptable`);
  console.log(`   - Massive list (100k items): Consider pagination/virtualization`);

  console.log("\n2. Nested loops in data processing (O(n²)):");
  console.log(`   - Comparing all users with all products: Dangerous!`);
  console.log(`   - Use hash maps for O(1) lookups instead`);

  console.log("\n3. Searching in sorted data (O(log n)):");
  console.log(`   - Binary search for autocomplete`);
  console.log(`   - Database indexes work the same way`);

  console.log("\n4. Hash table operations (O(1)):");
  console.log(`   - User session storage`);
  console.log(`   - Cache implementations`);
  console.log(`   - Counting occurrences with Map/Set`);

  // Performance implications
  console.log("\n🚀 Performance Implications:");
  console.log("- O(1): Best - predictable performance");
  console.log("- O(log n): Excellent - scales well");
  console.log("- O(n): Good - linear scaling in web apps");
  console.log("- O(n log n): Acceptable - sorting algorithms");
  console.log("- O(n²): Problematic - avoid in production");
  console.log("- O(2^n): Catastrophic - never use!");

  return {
    linearOps: {
      small: timeMap1,
      large: timeMap2,
      ratio: timeMap2 / timeMap1
    },
    constantOps: {
      arrayAccess: endAccess - startAccess
    },
    logarithmicOps: {
      binarySearchOperations: searchResult.operations,
      expectedOperations: Math.log2(firstArray.length)
    }
  };
}

// Utility function to demonstrate complexity classes
function demonstrateComplexityClasses() {
  console.log("\n📚 Complexity Classes Demonstration:");

  const sizes = [100, 1000, 10000];

  sizes.forEach(size => {
    console.log(`\nInput size: ${size}`);

    // O(1) - constant
    console.log(`  O(1): ${1} operations`);

    // O(log n) - logarithmic
    console.log(`  O(log n): ${Math.ceil(Math.log2(size))} operations`);

    // O(n) - linear
    console.log(`  O(n): ${size} operations`);

    // O(n log n) - linearithmic
    console.log(`  O(n log n): ${size * Math.ceil(Math.log2(size))} operations`);

    // O(n²) - quadratic (only for small n!)
    if (size <= 1000) {
      console.log(`  O(n²): ${size * size} operations`);
    } else {
      console.log(`  O(n²): ${(size * size).toLocaleString()} operations (too many!)`);
    }
  });
}

// Time complexity rules and analysis
function timeComplexityRules() {
  console.log("\n📏 Time Complexity Rules:");

  console.log("\n1. Analyzing loops:");
  console.log("   for (i = 0; i < n; i++)        → O(n)");
  console.log("   for (i = 0; i < n; i++)");
  console.log("       for (j = 0; j < n; j++)    → O(n²)");

  console.log("\n2. Consecutive operations:");
  console.log("   O(n) + O(n) = O(n)");
  console.log("   O(n) + O(log n) = O(n)");

  console.log("\n3. Nested operations:");
  console.log("   O(n) * O(log n) = O(n log n)");
  console.log("   O(log n) * O(log n) = O(log² n)");

  console.log("\n4. Common data structure operations:");
  console.log("   Array access: O(1)");
  console.log("   Array search unsorted: O(n)");
  console.log("   Array search sorted: O(log n)");
  console.log("   HashMap get/set: O(1)");
  console.log("   LinkedList traversal: O(n)");
  console.log("   Tree operations: O(log n)");
}

// Export functions for external use
module.exports = {
  analyzeArrayMethods,
  demonstrateComplexityClasses,
  timeComplexityRules,
  binarySearch: (arr, target) => {
    let left = 0;
    let right = arr.length - 1;
    let operations = 0;

    while (left <= right) {
      operations++;
      const mid = Math.floor((left + right) / 2);

      if (arr[mid] === target) {
        return { index: mid, operations };
      } else if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return { index: -1, operations };
  }
};

// Run comprehensive time complexity analysis
if (require.main === module) {
  analyzeArrayMethods();
  demonstrateComplexityClasses();
  timeComplexityRules();
}

// Web developer takeaways
/*
TIME COMPLEXITY FOR WEB DEVELOPERS:

🚨 RED FLAGS (Avoid these patterns):
- Nested for loops processing user data
- Linear searches in large arrays every render
- Recursive functions without memoization
- Inefficient sorting on every state change

✅ GOOD PATTERNS:
- Use Maps/Sets for O(1) lookups
- Debounce search operations
- Cache expensive computations
- Use libraries like Lodash for optimized algorithms
- Implement pagination for large lists
- Consider Web Workers for heavy computations

⚡ PERFORMANCE MINDSET:
- Always consider input size scaling
- Profile before optimizing
- Users notice 100ms delays, optimize for sub-100ms
- Server-side optimization often more important than client-side
*/
