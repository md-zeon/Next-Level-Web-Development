"use strict";
// generics : dynamically generalize
Object.defineProperty(exports, "__esModule", { value: true });
// const friends: string[] = ["Alice", "Bob", "Charlie"];
// const friends: Array<string> = ["Alice", "Bob", "Charlie"];
const friends = ["Alice", "Bob", "Charlie"];
// const rollNumbers: number[] = [4, 12, 3];
// const rollNumbers: Array<number> = [4, 12, 3];
const rollNumbers = [4, 12, 3];
// const isEligibleList: boolean[] = [true, false, true];
// const isEligibleList: Array<boolean> = [true, false, true];
const isEligibleList = [true, false, true];
// generic function
function getArray(items) {
    return new Array().concat(items);
}
const numArray = getArray([1, 2, 3, 4]);
const strArray = getArray(["Alice", "Bob", "Charlie"]);
const coordinates1 = [10, 20];
const coordinates2 = ["30", "40"];
const userList = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 },
];
//# sourceMappingURL=generics.js.map