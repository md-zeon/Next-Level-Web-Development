"use strict";
// mapped Types
Object.defineProperty(exports, "__esModule", { value: true });
// map
const arrayOfNumbers = [1, 2, 3, 4, 5];
const arrayOfStrings = ["1", "2", "3", "4", "5"];
const arrayOfStringsUsingMap = arrayOfNumbers.map((num) => num.toString());
console.log(arrayOfStringsUsingMap); // Output: ['1', '2', '3', '4', '5']
const user = {
    id: 112,
};
/**
 * T >> { height: string; width: string }
 *
 * { height: string; width: string  }['height'] >> string
 * { height: string; width: string  }['width'] >> string
 *
 * Final Type >>
 * {
 *  height: string;
 *  width: string;
 * }
 *
 */
const area1 = {
    height: "100px",
    width: "200px",
};
//# sourceMappingURL=mapped.js.map