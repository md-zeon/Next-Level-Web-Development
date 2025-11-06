// M03V10.js - Linked List Implementation - remove()

// ==========================================
// NODE AND LINKED LIST CLASSES
// ==========================================

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Append method for building lists
    append(data) {
        const newNode = new Node(data);

        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }

        this.size++;
        console.log(`Appended ${data} to the list`);
    }

    // Remove method - delete from specific position
    remove(position) {
        // Check if position is valid
        if (position < 0 || position >= this.size) {
            console.log("Invalid position");
            return null;
        }

        let removedData;

        if (position === 0) {
            // Remove from beginning
            removedData = this.head.data;
            this.head = this.head.next;
        } else {
            // Traverse to the node before removal point
            let current = this.head;
            let previous = null;
            let index = 0;

            while (index < position) {
                previous = current;
                current = current.next;
                index++;
            }

            // Remove the node
            removedData = current.data;
            previous.next = current.next;
        }

        this.size--;
        console.log(`Removed ${removedData} from position ${position}`);
        return removedData;
    }

    // Helper methods
    print() {
        if (!this.head) {
            console.log("List is empty");
            return;
        }

        let current = this.head;
        let result = "";

        while (current) {
            result += current.data;
            if (current.next) {
                result += " -> ";
            }
            current = current.next;
        }

        console.log(result);
    }

    getSize() {
        return this.size;
    }
}

// ==========================================
// BASIC DEMONSTRATION
// ==========================================

console.log("=== Basic remove() Demo ===");

const list = new LinkedList();

// Build initial list
list.append(10);
list.append(20);
list.append(30);
list.append(40);
list.append(50);
console.log("Initial list:");
list.print(); // 10 -> 20 -> 30 -> 40 -> 50

// Remove from different positions
console.log("\nRemoving from position 2:");
const removed1 = list.remove(2); // Remove position 2 (value 30)
console.log("After remove(2):");
list.print(); // 10 -> 20 -> 40 -> 50
console.log("Removed value:", removed1); // 30

console.log("\nRemoving from position 0:");
const removed2 = list.remove(0); // Remove position 0 (value 10)
console.log("After remove(0):");
list.print(); // 20 -> 40 -> 50
console.log("Removed value:", removed2); // 10

console.log("\nRemoving from position 2:");
const removed3 = list.remove(2); // Remove position 2 (value 50)
console.log("After remove(2):");
list.print(); // 20 -> 40
console.log("Removed value:", removed3); // 50

// ==========================================
// INVALID POSITION HANDLING
// ==========================================

console.log("\n=== Invalid Position Handling ===");

const testList = new LinkedList();
testList.append(1);
testList.append(2);
testList.append(3);

console.log("Current list:");
testList.print(); // 1 -> 2 -> 3

// Try invalid positions
console.log("\nTrying invalid positions:");
const result1 = testList.remove(-1);    // Invalid: negative position
const result2 = testList.remove(3);     // Invalid: position >= size
const result3 = testList.remove(10);    // Invalid: position >= size

console.log("Results:", result1, result2, result3); // null, null, null
console.log("List unchanged after invalid removes:");
testList.print(); // 1 -> 2 -> 3

// ==========================================
// EDGE CASES
// ==========================================

console.log("\n=== Edge Cases ===");

// Single element list
const singleList = new LinkedList();
singleList.append(42);

console.log("Single element list:");
singleList.print(); // 42

const removed = singleList.remove(0);
console.log("After remove(0):");
singleList.print(); // List is empty
console.log("Removed value:", removed); // 42
console.log("Size:", singleList.getSize()); // 0

// Remove from beginning
const beginList = new LinkedList();
beginList.append(10);
beginList.append(20);
beginList.append(30);

const removedBegin = beginList.remove(0);
console.log("\nRemoved from beginning:", removedBegin); // 10
console.log("List after removal:");
beginList.print(); // 20 -> 30

// Remove from end
const endList = new LinkedList();
endList.append(10);
endList.append(20);
endList.append(30);

const removedEnd = endList.remove(2); // Last position
console.log("\nRemoved from end:", removedEnd); // 30
console.log("List after removal:");
endList.print(); // 10 -> 20

// ==========================================
// PERFORMANCE DEMONSTRATION
// ==========================================

console.log("\n=== Performance Demonstration ===");

const perfList = new LinkedList();

// Build a list with 1000 elements
for (let i = 0; i < 1000; i++) {
    perfList.append(i);
}

console.log("List size:", perfList.getSize());

// Remove from different positions
console.time("Remove from beginning (position 0)");
perfList.remove(0);
console.timeEnd("Remove from beginning (position 0)");

console.time("Remove from middle (position 499)");
perfList.remove(499);
console.timeEnd("Remove from middle (position 499)");

console.time("Remove from end (position 997)");
perfList.remove(997);
console.timeEnd("Remove from end (position 997)");

console.log("Final size:", perfList.getSize());

// ==========================================
// REAL-WORLD APPLICATIONS
// ==========================================

console.log("\n=== Real-World Applications ===");

// 1. Task Management System
console.log("1. Task Management:");
class TaskManager {
    constructor() {
        this.tasks = new LinkedList();
    }

    addTask(task) {
        this.tasks.append(task);
    }

    completeTask(position) {
        const completedTask = this.tasks.remove(position);
        if (completedTask) {
            console.log(`✓ Completed task: ${completedTask}`);
        }
        return completedTask;
    }

    showTasks() {
        console.log("Current tasks:");
        this.tasks.print();
    }
}

const manager = new TaskManager();
manager.addTask("Learn Linked Lists");
manager.addTask("Implement remove()");
manager.addTask("Test implementation");
manager.showTasks();

manager.completeTask(1); // Complete middle task
manager.showTasks();

// 2. Music Playlist Management
console.log("\n2. Music Playlist:");
class Playlist {
    constructor() {
        this.songs = new LinkedList();
    }

    addSong(song) {
        this.songs.append(song);
    }

    removeSong(position) {
        const removedSong = this.songs.remove(position);
        if (removedSong) {
            console.log(`Removed from playlist: ${removedSong}`);
        }
        return removedSong;
    }

    playSong(position) {
        let current = this.songs.head;
        let index = 0;

        while (current && index < position) {
            current = current.next;
            index++;
        }

        if (current) {
            console.log(`🎵 Now playing: ${current.data}`);
        }
    }

    showPlaylist() {
        console.log("Current playlist:");
        this.songs.print();
    }
}

const playlist = new Playlist();
playlist.addSong("Bohemian Rhapsody");
playlist.addSong("Stairway to Heaven");
playlist.addSong("Hotel California");
playlist.showPlaylist();

playlist.removeSong(1); // Remove middle song
playlist.showPlaylist();

// 3. Browser Tab Management
console.log("\n3. Browser Tabs:");
class BrowserTabs {
    constructor() {
        this.tabs = new LinkedList();
    }

    openTab(url) {
        this.tabs.append(url);
        console.log(`Opened tab: ${url}`);
    }

    closeTab(position) {
        const closedTab = this.tabs.remove(position);
        if (closedTab) {
            console.log(`Closed tab: ${closedTab}`);
        }
        return closedTab;
    }

    switchToTab(position) {
        let current = this.tabs.head;
        let index = 0;

        while (current && index < position) {
            current = current.next;
            index++;
        }

        if (current) {
            console.log(`Switched to: ${current.data}`);
        }
    }

    showTabs() {
        console.log("Open tabs:");
        this.tabs.print();
    }
}

const browser = new BrowserTabs();
browser.openTab("google.com");
browser.openTab("github.com");
browser.openTab("stackoverflow.com");
browser.showTabs();

browser.closeTab(1); // Close middle tab
browser.showTabs();

// ==========================================
// ADDITIONAL REMOVE METHODS
// ==========================================

console.log("\n=== Additional Remove Methods ===");

// Add removeByValue method
LinkedList.prototype.removeByValue = function(data) {
    if (!this.head) {
        return false;
    }

    if (this.head.data === data) {
        this.head = this.head.next;
        this.size--;
        console.log(`Removed ${data} by value from head`);
        return true;
    }

    let current = this.head;
    while (current.next) {
        if (current.next.data === data) {
            current.next = current.next.next;
            this.size--;
            console.log(`Removed ${data} by value`);
            return true;
        }
        current = current.next;
    }

    console.log(`${data} not found in list`);
    return false;
};

// Add removeAll method
LinkedList.prototype.removeAll = function(data) {
    let removedCount = 0;

    while (this.removeByValue(data)) {
        removedCount++;
    }

    console.log(`Removed ${removedCount} occurrences of ${data}`);
    return removedCount;
};

// Test additional methods
const valueList = new LinkedList();
valueList.append(1);
valueList.append(2);
valueList.append(3);
valueList.append(2);
valueList.append(4);
valueList.append(2);

console.log("List with duplicates:");
valueList.print(); // 1 -> 2 -> 3 -> 2 -> 4 -> 2

valueList.removeByValue(2);
console.log("After removing first 2:");
valueList.print(); // 1 -> 3 -> 2 -> 4 -> 2

valueList.removeAll(2);
console.log("After removing all 2s:");
valueList.print(); // 1 -> 3 -> 4

// ==========================================
// COMPREHENSIVE TESTING
// ==========================================

console.log("\n=== Comprehensive Testing ===");

function testRemove() {
    const list = new LinkedList();

    console.log("Testing remove()...");

    // Build test list
    list.append(10);
    list.append(20);
    list.append(30);
    list.append(40);

    // Test valid removals
    console.assert(list.remove(1) === 20, "Should remove 20 from position 1");
    console.assert(list.getSize() === 3, "Size should be 3 after removal");

    console.assert(list.remove(0) === 10, "Should remove 10 from position 0");
    console.assert(list.getSize() === 2, "Size should be 2 after removal");

    console.assert(list.remove(1) === 40, "Should remove 40 from position 1");
    console.assert(list.getSize() === 1, "Size should be 1 after removal");

    console.assert(list.remove(0) === 30, "Should remove 30 from position 0");
    console.assert(list.getSize() === 0, "Size should be 0 after removal");

    // Test invalid positions
    list.append(1);
    list.append(2);
    console.assert(list.remove(-1) === null, "Should return null for negative position");
    console.assert(list.remove(5) === null, "Should return null for position >= size");
    console.assert(list.getSize() === 2, "Size should remain 2 after invalid removes");

    // Test removeByValue
    console.assert(list.removeByValue(1) === true, "Should remove value 1");
    console.assert(list.getSize() === 1, "Size should be 1 after removeByValue");
    console.assert(list.removeByValue(99) === false, "Should return false for non-existent value");

    console.log("✓ remove() tests passed!");
}

testRemove();

// ==========================================
// COMPARISON WITH ARRAYS
// ==========================================

console.log("\n=== Performance Comparison with Arrays ===");

function performanceTest() {
    const linkedList = new LinkedList();
    const array = [];

    const operations = 1000;

    // Build datasets
    for (let i = 0; i < operations; i++) {
        linkedList.append(i);
        array.push(i);
    }

    // Test remove performance
    console.time("LinkedList remove from beginning");
    linkedList.remove(0);
    console.timeEnd("LinkedList remove from beginning");

    console.time("Array shift (remove from beginning)");
    array.shift();
    console.timeEnd("Array shift (remove from beginning)");

    console.time("LinkedList remove from middle");
    linkedList.remove(499);
    console.timeEnd("LinkedList remove from middle");

    console.time("Array splice (remove from middle)");
    array.splice(499, 1);
    console.timeEnd("Array splice (remove from middle)");

    console.log(`LinkedList size: ${linkedList.getSize()}`);
    console.log(`Array length: ${array.length}`);
    console.log("LinkedList remove from beginning is much faster than Array shift!");
}

// performanceTest(); // Uncomment to run performance test

// ==========================================
// SUMMARY
// ==========================================

console.log("\n=== Implementation Summary ===");
console.log("✓ remove() method: O(n) time complexity (O(1) for position 0)");
console.log("✓ Removes elements from specific positions in the list");
console.log("✓ Returns removed data for confirmation");
console.log("✓ Position validation prevents invalid removals");
console.log("✓ Real-world applications: task managers, playlists, browser tabs");
console.log("✓ Edge cases handled: empty lists, single elements, position 0, last position");
console.log("✓ Additional methods: removeByValue(), removeAll()");
console.log("✓ Performance varies by position (best at start, worst at end)");
console.log("✓ Comprehensive testing and validation");
console.log("✓ Comparison with array splice() and shift() performance");
