// const { a } = require("./file2");
import { a } from "./file_es2.mjs";
// const { a: x } = require("./file3");
import { a as x } from "./file_es3.mjs";
// const { add, sub } = require("./utils");
import utils from "./utils_esm/index.mjs";
const { add, biyog: sub } = utils;

console.log("a =", a, "x =", x);
console.log("a + x =", add(a, x)); // 25
console.log("a - x =", sub(a, x)); // -5
