const { a } = require("./file2");
const { a: x } = require("./file3");
const { add, sub } = require("./utils");

console.log("a =", a, "x =", x);
console.log("a + x =", add(a, x));
console.log("a - x =", sub(a, x));
