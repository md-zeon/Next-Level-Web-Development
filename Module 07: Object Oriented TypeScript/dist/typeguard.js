"use strict";
// type guard
Object.defineProperty(exports, "__esModule", { value: true });
function add(num1, num2) {
    // return num1 + num2; //! Error: Operator '+' cannot be applied to types 'string | number' and 'string | number'.
    if (typeof num1 === "number" && typeof num2 === "number") {
        return num1 + num2;
    }
    else {
        return num1.toString() + num2.toString();
    }
}
add(5, 10); // 15
add(2, "2"); // "22"
add("5", 10); // "510"
const getUserInfo = (user) => {
    // type guard using 'in' // Time complexity: O(1)
    if ("role" in user) {
        console.log("The User's name is", user.name, "And role is", user.role);
    }
    else {
        console.log("The User's name is", user.name);
    }
};
getUserInfo({ name: "Zeanur Rahaman Zeon", role: "Admin" });
getUserInfo({ name: "Just a Normal User" });
//# sourceMappingURL=typeguard.js.map