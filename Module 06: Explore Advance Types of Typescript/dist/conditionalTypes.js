"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// example
const checkVehicle = (vehicle) => {
    if (vehicle === "bike" || vehicle === "car" || vehicle === "ship") {
        return true; // Type assertion to satisfy the return type
    }
    return false; // Type assertion to satisfy the return type
};
const myVehicle1 = checkVehicle("bike"); // true
const myVehicle2 = checkVehicle("plane"); // false
console.log(myVehicle1); // Output: true
console.log(myVehicle2); // Output: false
//# sourceMappingURL=conditionalTypes.js.map