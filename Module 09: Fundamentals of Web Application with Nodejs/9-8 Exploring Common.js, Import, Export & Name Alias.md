# 9-8: Exploring CommonJS, Import, Export & Name Alias

## Introduction

Module systems are fundamental to organizing and structuring JavaScript code. They allow developers to break applications into reusable, manageable pieces. Node.js has historically used CommonJS, while modern JavaScript has standardized ES6 modules. Understanding both systems and their import/export patterns is essential for effective Node.js development.

This lesson explores CommonJS modules, ES6 modules, and various import/export patterns including name aliases.

## What is a Module System?

### Module Definition

A module system organizes code into separate, self-contained units that can be imported and used by other parts of an application.

### Benefits of Modules

- **Encapsulation**: Private variables and functions
- **Dependency Management**: Clear dependency relationships
- **Code Organization**: Logical separation of concerns
- **Reusability**: Components can be shared across projects
- **Maintainability**: Easier to test, debug, and modify

### Historical Context

- **Before Modules**: Everything was global (variable pollution)
- **CommonJS**: Standardized by Node.js community
- **ES6 Modules**: Official JavaScript standard (ECMAScript 2015)

## CommonJS: The Node.js Standard

### Core Concepts

CommonJS is the traditional module system used by Node.js, based on synchronous loading through `require()`.

### Basic Exports

#### module.exports (Preferred)

```javascript
// math.js
const PI = 3.14159;

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

// Export multiple functions as object
module.exports = {
	PI,
	add,
	subtract,
};
```

#### Alternative: exports Object

```javascript
// logger.js
exports.info = function (message) {
	console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
};

exports.error = function (message) {
	console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
};
```

### Basic Require

#### Importing Modules

```javascript
// app.js
const math = require("./math.js");

console.log(math.PI); // 3.14159
console.log(math.add(5, 3)); // 8
```

#### Destructuring on Import

```javascript
// app.js
const { add, subtract, PI } = require("./math.js");

console.log(PI); // 3.14159
console.log(add(10, 5)); // 15
```

### Module Resolution

#### Relative Paths

```javascript
const fs = require("fs"); // Built-in module
const express = require("express"); // Node_modules module
const utils = require("./utils.js"); // Local file (relative path)
const config = require("../config.js"); // Parent directory
```

#### Module Loading Algorithm

1. Check if built-in module (`fs`, `http`, etc.)
2. Check if starts with `./`, `../`, or `/` (file system path)
3. Look in `node_modules` for package
4. Throw error if not found

### CommonJS Patterns

#### Default Export Pattern

```javascript
// calculator.js
class Calculator {
	constructor() {
		this.memory = 0;
	}

	add(a, b) {
		return a + b;
	}
	subtract(a, b) {
		return a - b;
	}
}

module.exports = Calculator;

// app.js
const Calculator = require("./calculator.js");
const calc = new Calculator();
```

#### Factory Function Pattern

```javascript
// db.js
function createConnection(config) {
	return {
		connect() {
			/* connection logic */
		},
		disconnect() {
			/* cleanup logic */
		},
		query(sql) {
			/* query logic */
		},
	};
}

module.exports = createConnection;

// app.js
const createConnection = require("./db.js");
const db = createConnection({ host: "localhost" });
```

#### Mixed Export Pattern

```javascript
// helpers.js
const API_VERSION = "1.0.0";

function formatDate(date) {
	/* ... */
}
function validateEmail(email) {
	/* ... */
}

module.exports = {
	version: API_VERSION,
	formatDate,
	validateEmail,
};

// Also expose version directly
module.exports.VERSION = API_VERSION;
```

### CommonJS Limitations

#### Synchronous Loading

- Modules are loaded synchronously
- Blocking operation for file I/O
- Can slow down application startup

#### No Tree Shaking

- Exported dependencies may include unused code
- Bundle size optimization difficult

#### No Static Analysis

- Hard to analyze dependencies at build time
- Dynamic imports: `require('' + variable)`

## ES6 Modules: The Modern Standard

### Core Concepts

ES6 modules (ESM) use `import` and `export` statements with static analysis and asynchronous loading.

### Named Exports

#### Individual Named Exports

```javascript
// utils.js
export function formatName(first, last) {
	return `${first} ${last}`;
}

export function getInitials(name) {
	return name
		.split(" ")
		.map((word) => word[0])
		.join("")
		.toUpperCase();
}

export const VERSION = "2.0.0";
```

#### Named Export List

```javascript
// math.js
function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	if (b === 0) throw new Error("Division by zero");
	return a / b;
}

const PI = Math.PI;

export { multiply, divide, PI };
```

### Named Imports

#### Importing Named Exports

```javascript
// app.js
import { formatName, getInitials, VERSION } from "./utils.js";

console.log(formatName("John", "Doe")); // 'John Doe'
console.log(getInitials("John Doe")); // 'JD'
console.log(VERSION); // '2.0.0'
```

#### Selective Import

```javascript
// Only import what you need
import { multiply } from "./math.js";

// import { multiply, divide } from './math.js'; // Import multiple
```

### Default Exports

#### Default Export Syntax

```javascript
// server.js
const express = require("express"); // Still using CommonJS

const app = express();

app.get("/", (req, res) => {
	res.send("Hello World!");
});

export default app;

// Alternatively: export { app as default };
```

#### Default Import Syntax

```javascript
// app.js
import app from "./server.js";

// Use the default export
console.log(app); // Express application
```

### Mixed Named and Default Exports

```javascript
// api.js
const getUsers = () => {
	/* ... */
};
const createUser = () => {
	/* ... */
};

// Default export (main API)
export default {
	getUsers,
	createUser,
};

// Named exports (individual functions)
export { getUsers, createUser, getUsers as getAllUsers };

// importer.js
import api, { getUsers } from "./api.js";
import { getAllUsers } from "./api.js";
```

### Module Resolution in ESM

#### File Extensions Required

```javascript
// ESM requires explicit file extensions
import utils from "./utils.js"; // ✅ Correct
import utils from "./utils"; // ❌ Error in Node.js ESM

// Can also use .mjs for explicit ESM
import utils from "./utils.mjs";
```

#### Node.js ESM Configuration

```json
// package.json
{
	"name": "my-app",
	"version": "1.0.0",
	"type": "module" // Enables ESM for entire package
}
```

#### Interoperability

```javascript
// CommonJS module
module.exports = { helper: () => {} };

// ESM importing CommonJS
import { helper } from "./commonjs-module.js";

// CommonJS importing ESM (requires dynamic import)
async function loadModule() {
	const { myFunction } = await import("./esm-module.js");
	return myFunction();
}
```

## Name Alias (Renaming)

### CommonJS Aliases

#### Basic Alias

```javascript
// lib.js
exports.originalName = function () {
	/* ... */
};

// app.js
const aliasedFunction = require("./lib.js").originalName;
```

#### Using Destructuring

```javascript
// math.js
exports.add = (a, b) => a + b;
exports.sub = (a, b) => a - b;

// app.js
const { add: plus, sub: minus } = require("./math.js");
console.log(plus(5, 3)); // 8
console.log(minus(5, 3)); // 2
```

### ES6 Module Aliases

#### Import Aliases

```javascript
// utils.js
export const formatDate = () => {
	/* ... */
};
export const validateEmail = () => {
	/* ... */
};

// app.js
import { formatDate as format, validateEmail as validate } from "./utils.js";

// Use aliases
console.log(format(new Date()));
console.log(validate("user@example.com"));
```

#### Export Aliases

```javascript
// api.js
const internalFunction = () => {
	return "internal";
};
const anotherFunction = () => {
	return "another";
};

// Export with different names
export { internalFunction as publicAPI, anotherFunction as anotherAPI };
```

#### Star Import/Alias

```javascript
// helpers.js
export const logInfo = () => console.log("info");
export const logError = () => console.error("error");

// app.js
import * as logger from "./helpers.js";

logger.logInfo(); // Works
logger.logError(); // Works
```

## Advanced Patterns

### Conditional Exports

```javascript
// config.js
const development = { apiUrl: "http://localhost:3000" };
const production = { apiUrl: "https://api.myapp.com" };

const config = process.env.NODE_ENV === "production" ? production : development;

module.exports = config;
```

### Tree Shaking Friendly Exports

```javascript
// functions.js - Tree shaking friendly
export function usedFunction() {
	return "used";
}
export function unusedFunction() {
	return "unused";
}

// Only usedFunction will be included in final bundle
```

### Module Factory Pattern

```javascript
// createLogger.js
function createLogger(prefix) {
	return {
		info: (message) => console.log(`${prefix} [INFO] ${message}`),
		error: (message) => console.log(`${prefix} [ERROR] ${message}`),
	};
}

module.exports = createLogger;

// app.js
const logger = require("./createLogger.js")("[MyApp]");
logger.info("Application started");
```

## Comparison: CommonJS vs ES6 Modules

### Table Comparison

| Feature             | CommonJS                      | ES6 Modules                         |
| ------------------- | ----------------------------- | ----------------------------------- |
| **Syntax**          | `require()`, `module.exports` | `import`, `export`                  |
| **Loading**         | Synchronous                   | Asynchronous (static analysis)      |
| **Execution**       | Runtime evaluation            | Pre-parsed                          |
| **Optimization**    | No tree shaking               | Tree shaking possible               |
| **Browser Support** | Bundlers required             | Native in modern browsers           |
| **Dynamic Imports** | `require(variable)`           | `import(variable)`                  |
| **Top-Level await** | ❌                            | ✅ (in script with `type="module"`) |
| **Strict Mode**     | Optional                      | Automatic                           |

### Performance Implications

#### Bundle Size (Bundlers like Webpack)

- **CommonJS**: May include unused exports
- **ESM**: Dead code elimination (tree shaking)

#### Loading Performance

- **CommonJS**: Sequential loading blocks execution
- **ESM**: Static imports allow parallel loading

#### Runtime Performance

- **CommonJS**: Slightly slower due to dynamic resolution
- **ESM**: Faster due to pre-analysis and optimization

### Migration Strategies

#### Gradual Migration

```javascript
// Start with .mjs extension for ESM files
// Mix CommonJS and ESM in same project
// Use dynamic imports for conditional loading
```

#### Dual Package Export

```json
// package.json
{
	"main": "index.js", // CommonJS entry
	"module": "index.mjs", // ESM entry
	"exports": {
		// Modern exports map
		"import": "./index.mjs",
		"require": "./index.js"
	}
}
```

## Real-World Patterns

### Node.js Application Structure

```
project/
├── lib/
│   ├── database.js     # CommonJS or ESM
│   ├── auth.js
│   └── utils.js
├── routes/
│   ├── userRoutes.js
│   └── apiRoutes.js
├── app.js              # Main entry point
└── package.json
```

### Module Organization

#### Feature-Based Modules

```javascript
// auth/index.js
const login = require("./login.js");
const logout = require("./logout.js");
const register = require("./register.js");

module.exports = { login, logout, register };
```

#### Utility Libraries

```javascript
// utils/array.js
export const unique = (arr) => [...new Set(arr)];
export const flatten = (arr) => arr.flat(Infinity);

// utils/string.js
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
export const slugify = (str) => str.toLowerCase().replace(/\s+/g, "-");

// utils/index.js
export * from "./array.js";
export * from "./string.js";
```

## Module Loading Best Practices

### Circular Dependency Prevention

```javascript
// Bad - Circular dependency
// a.js depends on b.js, b.js depends on a.js

// Good - Restructure to avoid cycles
// Move shared logic to c.js
// Both a.js and b.js import from c.js
```

### Lazy Loading

```javascript
// CommonJS lazy loading
let expensiveModule;
function getExpensiveModule() {
	if (!expensiveModule) {
		expensiveModule = require("./expensive-module.js");
	}
	return expensiveModule;
}

// ESM dynamic import (preferred)
async function loadHeavyFeature() {
	const { heavyFunction } = await import("./heavy-feature.js");
	return heavyFunction();
}
```

### Module Caching

```javascript
// CommonJS modules are cached after first load
const fs = require("fs"); // Loaded once, cached forever

// To reload a changed module (development only)
delete require.cache[require.resolve("./config.js")];
const config = require("./config.js");
```

## Debugging Modules

### Common Issues and Solutions

#### "Module not found" Errors

```javascript
// Check file extensions for ESM
import utils from "./utils.js"; // ✅
import utils from "./utils"; // ❌ Node.js

// Check relative paths
import utils from "./lib/utils.js"; // ✅
import utils from "lib/utils.js"; // ❌ Not relative
```

#### Export/Import Mismatches

```javascript
// StringHelper.js
export const capitalize = () => {}; // Named export

// Wrong import
import capitalize from "./StringHelper.js"; // ❌ Wrong syntax

// Correct imports
import { capitalize } from "./StringHelper.js"; // ✅ Named import
import * as helpers from "./StringHelper.js"; // ✅ Namespace import
```

#### Mixed Module Systems

```javascript
// Create wrapper files for compatibility
// commonjs-wrapper.js
module.exports = require("./esm-module.mjs");

// esm-wrapper.mjs
export { commonjsFunction } from "./commonjs-module.js";
```

## Future of JavaScript Modules

### ES2022 Module Features

- `import()` for dynamic imports
- `import.meta` for module metadata
- Top-level await support

### Tooling and Build Processes

- **Webpack**: Module bundler with advanced features
- **Parcel**: Zero-config bundler
- **ESBuild**: Fast JavaScript bundler
- **Snowpack**: Modern bundler for unbundled development

### Module Resolution Evolution

- **Import Maps**: Browser-native module resolution
- **Package Exports**: Fine-grained control over package structure
- **Conditional Exports**: Environment-specific exports

## Conclusion

Understanding CommonJS and ES6 modules is crucial for modern JavaScript development. CommonJS remains important for Node.js ecosystems, while ES6 modules represent the future with better performance and static analysis capabilities. Name aliases provide flexibility in organizing and renaming imported/exported entities.

The choice between systems depends on project requirements, target environments, and team preferences. Many projects today use CommonJS for server-side code and ESM for client-side bundles, or adopt full ESM with build tools for maximum compatibility.

## Key Takeaways

- **CommonJS**: `require()` and `module.exports`, synchronous loading, Node.js standard
- **ESM**: `import`/`export`, static analysis, asynchronous loading, modern standard
- **Named Exports**: Export multiple items by name, import selectively
- **Default Exports**: Export single main item, import without braces
- **Aliases**: Rename exports/imports using `as` keyword for conflict resolution
- **Migration**: Gradually move from CommonJS to ESM for better performance and tooling
