"use strict";
// reference type: object type
Object.defineProperty(exports, "__esModule", { value: true });
const user = {
    name: {
        firstName: "Zeanur Rahaman",
        lastName: "Zeon",
    },
    age: 22,
    organization: "Programming Hero",
};
console.log(user);
const person = {
    id: 1,
    name: "Alice",
    age: 30,
};
console.log(person);
// person.id = 2; //! Error: Cannot assign to 'id' because it is a read-only property.
person.name = "Bob"; // Allowed
console.log(person);
/*
 * readonly vs literal type
 * A 'readonly' property can be assigned a value once and cannot be changed afterwards.
 * A 'literal type' restricts a variable to have a specific value or set of values.
 */
//# sourceMappingURL=M05V06.js.map