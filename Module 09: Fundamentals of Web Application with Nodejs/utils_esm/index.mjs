// const { add } = require("./add");
// const { sub } = require("./sub");

import { add } from "./add.mjs"; // named import
// import sub from "./sub.mjs"; // default import
import biyog from "./sub.mjs"; // default import with custom name

// console.log("add(5, 3):", add(5, 3)); // 8
// console.log("sub(5, 3):", sub(5, 3)); // 2
// console.log("add(5, 3):", add(5, 3)); // 8
// console.log("biyog(5, 3):", biyog(5, 3)); // 2

export default { add, biyog };
