"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const add = (a, b) => {
    return a + b;
};
const result = add(5, 10);
console.log(`The sum is: ${result}`);
const addArrow = (x, y) => x + y;
const arrowResult = addArrow(15, 25);
console.log(`The sum using arrow function is: ${arrowResult}`);
// Object method
const poorUser = {
    name: "Zeanur Rahaman Zeon",
    money: 0,
    addBalance(money) {
        return this.money + money; //* 'this' refers to the current object
    },
};
console.log("User before adding balance:", poorUser);
poorUser.addBalance(1000);
console.log("User after adding balance:", poorUser);
// Array method with map
const arr = [1, 2, 3, 4, 5];
console.log(`Original Array: ${arr}`);
const squareArr = arr.map((num) => num * num);
console.log(`Squared Array: ${squareArr}`);
//# sourceMappingURL=M05V07.js.map