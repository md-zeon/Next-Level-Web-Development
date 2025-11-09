# 4-7 Let us talk about O(log n)

O(log n) represents logarithmic time complexity in Big O notation, indicating that the algorithm's runtime grows logarithmically with the input size n. This is highly efficient, as the number of operations increases slowly even for large inputs.

## Key Characteristics

- **Growth Rate**: For n = 1000, operations ≈ 10; for n = 1,000,000, operations ≈ 20.
- **Common in Divide-and-Conquer**: Algorithms that repeatedly reduce the problem size by a constant factor (e.g., half) often achieve O(log n).
- **Base of Logarithm**: Typically base 2 in computer science, but the base is ignored in Big O since log₂n = (ln n) / (ln 2), and constants are dropped.

## Examples of O(log n) Algorithms

1. **Binary Search**: Searches a sorted array by halving the search space each iteration. Time: O(log n).
2. **Finding an Element in a Balanced Binary Search Tree**: Each comparison reduces the subtree size.
3. **Exponentiation by Squaring**: Computes x^n efficiently by squaring exponents.

## Why It's Efficient

- Much faster than O(n) (linear) or O(n²) (quadratic).
- For n = 1 billion, O(log n) ≈ 30 operations, while O(n) would be 1 billion.
- Common in real-world applications like database indexing, search engines, and sorting algorithms.

## Comparison with Other Complexities

- O(1): Constant time (e.g., array access by index).
- O(log n): Logarithmic (e.g., binary search).
- O(n): Linear (e.g., linear search).
- O(n log n): Linearithmic (e.g., merge sort, quick sort).
- O(n²): Quadratic (e.g., bubble sort).

O(log n) is ideal for problems requiring fast lookups or reductions in large datasets.

## Binary Search Simulation

Let's simulate binary search on a sorted array to visualize O(log n) in action.

Consider the sorted array: `[1, 3, 5, 7, 9, 11, 13, 15, 17, 19]` (n = 10)

Searching for target = 13:

1. Initial: left = 0, right = 9, mid = 4 (value = 9)

   - 9 < 13, so left = 5

2. Now: left = 5, right = 9, mid = 7 (value = 15)

   - 15 > 13, so right = 6

3. Now: left = 5, right = 6, mid = 5 (value = 11)

   - 11 < 13, so left = 6

4. Now: left = 6, right = 6, mid = 6 (value = 13)
   - Found! Return index 6

The search took 4 steps for n = 10. In general, it takes log₂(n) + 1 steps in the worst case.

## Calculating Time Complexity

To calculate O(log n), consider how many times we can divide n by 2 until we reach 1:

- Start with n
- After 1 division: n/2
- After 2 divisions: n/4
- ...
- After k divisions: n/2^k

We stop when n/2^k ≈ 1, so 2^k ≈ n, thus k ≈ log₂(n)

Each division is one operation, so time complexity is O(log n).

For large n:

- n = 1,000: log₂(1000) ≈ 10
- n = 1,000,000: log₂(1,000,000) ≈ 20
- n = 1,000,000,000: log₂(1e9) ≈ 30

This shows why O(log n) algorithms scale so well with input size.
