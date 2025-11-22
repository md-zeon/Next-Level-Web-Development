const args = process.argv;

// process.argv is an array that contains command-line arguments passed when the Node.js process was launched.
// process.args[0] = 'node' (the executable) path
// process.args[1] = path to the script file
// process.args[2...] = additional command-line arguments

const name = args[2] || "Guest";
const time = new Date().getHours();

let greeting;

if (time < 12) {
	greeting = "Good Morning";
} else if (time < 18) {
	greeting = "Good Afternoon";
} else {
	greeting = "Good Evening";
}

console.log(`${greeting}, ${name}!`);
