"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user1 = {
    name: "Alice",
    age: 30,
    role: "admin",
};
const user2 = {
    name: "Bob",
    age: 25,
};
const isAdmin = true;
const addNumbers = (a, b) => a + b;
const addNumbersInterface = (a, b) => a + b;
const friends = ["Charlie", "Dave", "Eve"];
const friendsInterface = ["Frank", "Grace", "Heidi"];
// Recommendation: Use interfaces over type aliases for object types when possible, as interfaces are more extensible and can be merged.
// Use type aliases for union types, intersection types, and primitive types.
// However, both can often be used interchangeably for object types.
// Interfaces can be extended and implemented in classes, making them more suitable for defining contracts in OOP.
//# sourceMappingURL=interface.js.map