# 1-7 Our Workhorse: The Array (Time Complexity)

Arrays are one of the most fundamental data structures in programming. They provide a way to store multiple values in a single variable, allowing for efficient access and manipulation of data. In this section, we will explore the time complexity of various operations performed on arrays.

## Array Operations and Their Time Complexities

Here are some common operations performed on arrays along with their time complexities:
| Operation | Time Complexity | Description |
|----------------------|-----------------|--------------------------------------------------|
| Access by Index | O(1) | Directly accessing an element using its index. |
| Search | O(n) | Finding an element by checking each element. |
| Insertion at End | O(1) | Adding an element to the end of the array (amortized). |
| Insertion at Beginning| O(n) | Adding an element at the start, requiring shifting of elements. |
| Deletion by Index | O(n) | Removing an element by index, requiring shifting of elements. |
| Deletion by Value | O(n) | Finding and removing an element by value. |

## Time Complexities in JavaScript array operations

```javascript
let arr = [10, 20, 30, 40, 50];
// Access by Index
console.log(arr[2]); // O(1)
// Search
console.log(arr.indexOf(30)); // O(n)
// Insertion at End
arr.push(60); // O(1) amortized
// Insertion at Beginning
arr.unshift(5); // O(n)
// Deletion at Beginning
arr.shift(); // O(n)
// Deletion by Index
arr.splice(2, 1); // O(n)
// Deletion by Value
let index = arr.indexOf(40);
if (index !== -1) {
	arr.splice(index, 1); // O(n)
}
// Check if value exists
arr.includes(50); // O(n)

// Sorting
arr.sort(); // O(n log n)
```

Understanding these time complexities is crucial for writing efficient code, especially when dealing with large datasets. By choosing the right data structure and operations, you can optimize the performance of your applications.

## Summary

Arrays are versatile and widely used data structures that offer efficient access to elements. However, certain operations like insertion and deletion can be costly in terms of time complexity. By being aware of these complexities, developers can make informed decisions about when and how to use arrays effectively in their code.
