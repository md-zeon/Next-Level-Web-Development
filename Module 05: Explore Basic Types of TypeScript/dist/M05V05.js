"use strict";
// array
Object.defineProperty(exports, "__esModule", { value: true });
let bazarList = ["eggs", "milk", "sugar"];
bazarList.push("bread"); // Valid
// bazarList.push(true); //! Error: Argument of type 'boolean' is not assignable to parameter of type 'string'.
let mixedArray = [];
mixedArray.push("hello"); // Valid
mixedArray.push(42); // Valid
mixedArray.push(true); // Valid
// tuple
let coordinates = [10, 20];
// coordinates = [10, "20"]; //! Error: Type 'string' is not assignable to type 'number'.
let couple = ["Husband", "Wife"];
let ZeonNameAndId;
ZeonNameAndId = ["Zeon", 41230301652]; // Valid
// ZeonNameAndId = [101, "Zeon"]; //! Error: Type 'number' is not assignable to type 'string'.
let destination; // tuple with rest elements
destination = ["Bangladesh", "India", "Canada", "Australia"]; // Valid
//# sourceMappingURL=M05V05.js.map