"use strict";
// static
Object.defineProperty(exports, "__esModule", { value: true });
class Counter {
    count = 0; // Initializing count property
    increment() {
        this.count++;
    }
    decrement() {
        this.count--;
    }
}
const instance1 = new Counter();
instance1.increment();
instance1.increment();
console.log(instance1.count); // Output: 2
const instance2 = new Counter();
instance2.decrement();
console.log(instance2.count); // Output: -1
// Static property and method
class StaticCounter {
    static count = 0; // Static property
    static increment() {
        StaticCounter.count++;
    }
    static decrement() {
        StaticCounter.count--;
    }
}
StaticCounter.increment();
console.log(StaticCounter.count); // Output: 1
StaticCounter.decrement();
console.log(StaticCounter.count); // Output: 0
const staticInstance = new StaticCounter();
// staticInstance.increment(); //! Error: increment is not a function on instance
// staticInstance.count; //! Error: count is not a property on instance
// Static members are accessed directly via the class, not instances
//# sourceMappingURL=static.js.map