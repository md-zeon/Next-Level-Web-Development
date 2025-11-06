// M03V06.js - Linked List Implementation - Basic Concept of Node

// ==========================================
// NODE CLASS IMPLEMENTATION
// ==========================================

class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

// ==========================================
// BASIC NODE OPERATIONS
// ==========================================

// Create individual nodes
console.log("=== Creating Individual Nodes ===");

const node1 = new Node(10);
console.log("Node 1:", node1);
console.log("Node 1 data:", node1.data);
console.log("Node 1 next:", node1.next);

const node2 = new Node(20);
console.log("\nNode 2:", node2);

const node3 = new Node(30);
console.log("Node 3:", node3);

// ==========================================
// NODE LINKING
// ==========================================

console.log("\n=== Linking Nodes ===");

// Link node1 to node2
node1.next = node2;
console.log("After linking node1 -> node2:");
console.log("node1.next:", node1.next);
console.log("node1.next.data:", node1.next.data);

// Link node2 to node3
node2.next = node3;
console.log("\nAfter linking node2 -> node3:");
console.log("node2.next:", node2.next);
console.log("node2.next.data:", node2.next.data);

// node3.next remains null
console.log("node3.next:", node3.next);

// ==========================================
// VISUAL REPRESENTATION
// ==========================================

function visualizeNodes(head) {
	if (!head) return "Empty";

	let result = "";
	let current = head;
	let count = 1;

	while (current) {
		result += `Node ${count}: [Data: ${current.data} | Next: ${
			current.next ? "*" : "null"
		}]`;
		if (current.next) {
			result += " --> ";
		}
		current = current.next;
		count++;
	}

	return result;
}

console.log("\n=== Visual Representation ===");
console.log(visualizeNodes(node1));

// ==========================================
// NODE TRAVERSAL
// ==========================================

console.log("\n=== Node Traversal ===");

function traverseAndPrint(head) {
	let current = head;
	let position = 1;

	console.log("Traversing the linked nodes:");
	while (current) {
		console.log(`Position ${position}: ${current.data}`);
		current = current.next;
		position++;
	}
}

traverseAndPrint(node1);

// ==========================================
// ADVANCED NODE CONCEPTS
// ==========================================

console.log("\n=== Advanced Node Concepts ===");

// Doubly Linked List Node
class DoublyNode {
	constructor(data) {
		this.data = data;
		this.next = null;
		this.prev = null;
	}
}

console.log("Doubly Node Example:");
const doublyNode = new DoublyNode(100);
console.log("Doubly Node:", doublyNode);

// ==========================================
// NODE HELPER FUNCTIONS
// ==========================================

console.log("\n=== Node Helper Functions ===");

// Node creation helper
function createNode(data) {
	return new Node(data);
}

const helperNode = createNode(999);
console.log("Created node with helper:", helperNode);

// Node printing helper
function printNode(node) {
	if (!node) {
		return "null";
	}
	return `[${node.data} | ${node.next ? "*" : "null"}]`;
}

console.log("Node 1 printed:", printNode(node1));
console.log("Node 2 printed:", printNode(node2));
console.log("Node 3 printed:", printNode(node3));

// Node comparison helper
function nodesEqual(node1, node2) {
	if (!node1 && !node2) return true;
	if (!node1 || !node2) return false;
	return node1.data === node2.data;
}

const testNode1 = new Node(42);
const testNode2 = new Node(42);
const testNode3 = new Node(43);

console.log("node(42) equals node(42):", nodesEqual(testNode1, testNode2));
console.log("node(42) equals node(43):", nodesEqual(testNode1, testNode3));

// ==========================================
// NODE VALIDATION
// ==========================================

console.log("\n=== Node Validation ===");

function isValidNode(node) {
	// Check if it's an object
	if (typeof node !== "object" || node === null) {
		return false;
	}

	// Check if it has required properties
	if (!node.hasOwnProperty("data") || !node.hasOwnProperty("next")) {
		return false;
	}

	// Check if next is either null or a valid node
	if (node.next !== null && typeof node.next !== "object") {
		return false;
	}

	return true;
}

console.log("Valid node check:");
console.log("node1 is valid:", isValidNode(node1));
console.log("doublyNode is valid:", isValidNode(doublyNode));
console.log("null is valid:", isValidNode(null));
console.log("string is valid:", isValidNode("not a node"));

// ==========================================
// PRACTICAL EXAMPLES
// ==========================================

console.log("\n=== Practical Examples ===");

// Example 1: Simple Node Chain
console.log("Example 1: Simple Node Chain");
const head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);

console.log("Chain:", visualizeNodes(head));
traverseAndPrint(head);

// Example 2: Node with Complex Data
console.log("\nExample 2: Node with Complex Data");
const personNode = new Node({
	name: "Alice",
	age: 30,
	occupation: "Engineer",
});

console.log("Person node data:", personNode.data);
console.log("Person name:", personNode.data.name);

// Example 3: Node Counter
console.log("\nExample 3: Node Counter");

function countNodes(head) {
	let count = 0;
	let current = head;

	while (current) {
		count++;
		current = current.next;
	}

	return count;
}

console.log("Number of nodes in chain:", countNodes(head));
console.log("Number of nodes from node1:", countNodes(node1));

// ==========================================
// DEMONSTRATING COMMON MISTAKES
// ==========================================

console.log("\n=== Common Mistakes (Don't Do This!) ===");

// Mistake 1: Forgetting to initialize next
console.log("Mistake 1: Bad Node Class");
class BadNode {
	constructor(data) {
		this.data = data;
		// Forgot to initialize next!
	}
}

const badNode = new BadNode(123);
console.log("Bad node:", badNode);
console.log("Bad node next:", badNode.next); // undefined - dangerous!

// Mistake 2: Not checking for null (commented out to avoid errors)
// console.log("Mistake 2: Unsafe traversal");
// function unsafeTraverse(node) {
//     console.log(node.data); // Error if node is null
//     unsafeTraverse(node.next); // Infinite recursion if circular
// }

// ==========================================
// MEMORY MANAGEMENT DEMO
// ==========================================

console.log("\n=== Memory Management Demo ===");

console.log("Creating many nodes...");
const nodes = [];
for (let i = 0; i < 5; i++) {
	nodes.push(new Node(i * 10));
}

// Link them
for (let i = 0; i < nodes.length - 1; i++) {
	nodes[i].next = nodes[i + 1];
}

console.log("Created chain:", visualizeNodes(nodes[0]));

// Simulate removing references (garbage collection)
console.log("Removing references...");
nodes.length = 0; // Clear array
// In a real scenario, nodes would be eligible for garbage collection
console.log("Nodes array cleared - memory can be reclaimed");

// ==========================================
// SUMMARY
// ==========================================

console.log("\n=== Node Implementation Summary ===");
console.log("✓ Node class with data and next properties");
console.log("✓ Node creation and linking process");
console.log("✓ Visual representation of node chains");
console.log("✓ Traversal and helper functions");
console.log("✓ Node validation and best practices");
console.log("✓ Practical examples with complex data");
console.log("✓ Common mistakes to avoid");
console.log("✓ Memory management concepts");

// Module practice

const Head = new Node(10);

Head.next = new Node(20);
Head.next.next = new Node(30);

console.log("Linked List Head:", Head);

let temp = Head;

while (temp) {
	console.log("Node Data:", temp.data);
	temp = temp.next;
}
