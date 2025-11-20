# 9-9: Exploring ESM & Transforming CommonJS to ESM

## Introduction

While the previous lesson introduced both CommonJS and ES6 modules (ESM), this lesson focuses specifically on mastering ES6 modules and providing practical guidance for migrating from CommonJS to ESM. ESM offers superior static analysis, tree shaking, and performance benefits that make it the modern standard for JavaScript modules. Understanding how to work with ESM and migrate existing code is essential for future-proofing Node.js applications.

This lesson explores ESM in depth and provides step-by-step strategies for converting CommonJS code to ES6 modules.

## Deep Dive into ES6 Modules (ESM)

### Static Analysis and Benefits

#### Compilation-Time Analysis

ESM enables static analysis, allowing tools to understand dependencies without executing code:

```javascript
// Static analysis possible - imports are known at compile time
import { readFile } from "fs/promises";
import express from "express";

const app = express();
```

#### Tree Shaking

Only imported functions are included in the final bundle:

```javascript
// lodash.js (hypothetical large library)
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;
export const divide = (a, b) => a / b;
// ... 100+ more unneeded functions

// app.js
import { add } from "./lodash.js"; // Only 'add' is bundled

console.log(add(1, 2)); // Bundle optimizer removes multiply, divide
```

### ESM Syntax Basics

#### Named Exports - Multiple Ways

```javascript
// Method 1: Inline export
export const PI = 3.14159;
export function add(a, b) {
	return a + b;
}

// Method 2: Export list
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

export { multiply, divide };

// Method 3: Export aliases
export { multiply as times, divide as split };
```

#### Named Imports - Multiple Ways

```javascript
// Import specific items
import { add, PI } from "./math.js";

// Import with aliases to avoid conflicts
import { add as plus, multiply as times } from "./math.js";

// Import all as namespace
import * as Math from "./math.js";
console.log(Math.PI); // Works
console.log(Math.add(1, 2)); // Works
```

#### Default Exports

```javascript
// Any expression can be default exported
export default class ExpressApp {
  constructor() {}
}

// Or with destructure
const App = class { };
export { App as default };
```

#### Default Imports

```javascript
// No braces for default imports
import ExpressApp from "./app.js";
import config from "./config.json" assert { type: "json" };

// Can combine default and named
import config, { helper } from "./module.js";
```

### Advanced ESM Features

#### Dynamic Imports

Async, on-demand module loading:

```javascript
// Lazy load heavy features
async function loadHeavyFeature() {
	try {
		const { heavyFunction } = await import("./heavy-module.js");
		return heavyFunction();
	} catch (error) {
		console.error("Failed to load module:", error);
	}
}

// Conditional imports
async function loadDatabaseModule() {
	if (process.env.DB_TYPE === "postgres") {
		return await import("./postgres.js");
	} else {
		return await import("./mongodb.js");
	}
}
```

#### Import Assertions (Experimental)

```javascript
// JSON modules with type assertion
import config from "./config.json" assert { type: "json" };

// CSS modules
import styles from "./styles.css" assert { type: "css" };

// Custom assertions for rollup/webpack
import data from "./data.csv" assert { type: "csv" };
```

#### Top-Level Await

```javascript
// In ESM, await works at module level
const response = await fetch("https://api.example.com/data");
export const data = await response.json();

// Perfect for initialization
const db = await connectDatabase();
const users = await db.users.findAll();

export { db, users };
```

#### Import Meta

```javascript
// Access module metadata
console.log(import.meta.url); // Current module URL
console.log(import.meta.resolve); // Module resolve function

// Conditional exports based on runtime
if (import.meta.url.endsWith("/index.js")) {
	console.log("This is the main entry point");
}
```

## ESM in Node.js

### Enabling ESM

#### Method 1: Package.json Type Field

```json
{
	"name": "my-app",
	"version": "1.0.0",
	"type": "module",
	"main": "index.js"
}
```

#### Method 2: .mjs Extension

```javascript
// Optional: Use .mjs to force ESM
import { add } from "./math.mjs";

export const sum = add(1, 2);
```

#### Problems with ESM in Node.js

##### **dirname and **filename

```javascript
// CommonJS - not available
// console.log(__dirname);  // ReferenceError

// ESM equivalent
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname); // Works!
console.log(__filename); // Works!
```

##### process.argv Handling

```javascript
// CommonJS style still works, but path handling changes
console.log(process.argv);

// Get script arguments
const args = process.argv.slice(2);
console.log("Arguments:", args);

// In ESM, import.meta.url can help with relative paths
import { join } from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const configPath = join(scriptDir, "config.json");
```

## Transforming CommonJS to ESM

### Step-by-Step Migration Process

#### Step 1: Enable ESM

```json
// package.json - Enable ESM for entire project
{
	"name": "my-app",
	"type": "module"
}
```

#### Step 2: Update File Extensions (.mjs recommended during transition)

```javascript
// Rename .js to .mjs during transition (optional)
// File: math.mjs
export function add(a, b) {
	return a + b;
}
```

#### Step 3: Transform Exports

##### CommonJS → ESM Export Patterns

```javascript
// CommonJS original
const PI = 3.14159;
function add(a, b) {
	return a + b;
}
function subtract(a, b) {
	return a - b;
}

// Single default export
module.exports = { PI, add, subtract };

// ESM equivalent
export const PI = 3.14159;
export function add(a, b) {
	return a + b;
}
export function subtract(a, b) {
	return a - b;
}
```

```javascript
// CommonJS factory pattern
module.exports = function createApp() {
	return {
		/* ... */
	};
};

// ESM equivalent
export default function createApp() {
	return {
		/* ... */
	};
}
```

```javascript
// CommonJS mixed exports
module.exports.sum = (a, b) => a + b;
module.exports.multiply = (a, b) => a * b;
module.exports = { version: "1.0.0" }; // Overrides!

// ESM equivalent (named + default)
export const sum = (a, b) => a + b;
export const multiply = (a, b) => a + b;

const version = "1.0.0";
export default { sum, multiply, version };
```

#### Step 4: Transform Imports

##### CommonJS → ESM Import Patterns

```javascript
// CommonJS original
const fs = require("fs");
const express = require("express");
const { add } = require("./math.js");
const config = require("./config.json");

// ESM equivalent
import fs from "fs"; // Default import for built-ins
import express from "express";
import { add } from "./math.js";
import config from "./config.json" assert { type: "json" };
```

```javascript
// CommonJS destructuring
const { readFileSync, writeFileSync } = require("fs");
const { get } = require("lodash.get");

// ESM equivalent
import { readFileSync, writeFileSync } from "fs";
import get from "lodash.get"; // Assuming default export
```

```javascript
// CommonJS dynamic require
const moduleName = "./" + process.argv[2];
const dynamicModule = require(moduleName);

// ESM equivalent
const modulePath = "./" + process.argv[2];
const dynamicModule = await import(modulePath);
```

### Common Migration Challenges

#### Built-in Modules in ESM

```javascript
// CommonJS - all modules use require
const fs = require("fs"); // Default export
const { readFile } = require("fs/promises"); // Named exports

// ESM - different import patterns
import fs from "fs"; // Namespace default
import { readFile } from "fs/promises"; // Named exports
import path from "path"; // Default import
import { join } from "path"; // Named import
```

#### JSON Modules

```javascript
// CommonJS - automatic parsing
const config = require("./config.json");

// ESM - requires assertion or manual parsing
import config from "./config.json" assert { type: "json" };

// Alternative (read and parse manually)
import fs from "fs";
const config = JSON.parse(await fs.readFile("./config.json", "utf8"));
```

#### Package.json Dependencies

Many npm packages still use CommonJS. Check their documentation or examine package.json exports:

```json
// Package with ESM support
{
	"name": "some-package",
	"main": "index.js", // CommonJS entry
	"module": "index.mjs", // ESM entry
	"exports": {
		"import": "./index.mjs",
		"require": "./index.js"
	}
}
```

### Automated Transformation Tools

#### Basic Find-Replace (Manual)

```bash
# Replace require with import (dangerous - use carefully)
sed 's/require(/import(/g' file.js > temp.js

# Replace module.exports with export
sed 's/module\.exports/export/g' temp.js > output.js
```

#### Build Tools with Transformers

```javascript
// babel.config.js - Use Babel for transformation
module.exports = {
	presets: [
		[
			"@babel/preset-env",
			{
				modules: "auto", // Transform modules based on context
				targets: { node: "current" },
			},
		],
	],
};
```

#### ESLint Rules for Migration

```javascript
// .eslintrc.js - Rules to help migration
module.exports = {
	rules: {
		"no-var": "error", // Prefer let/const
		"prefer-const": "error", // Use const when possible
		"object-shorthand": "error", // Encourage concise syntax

		// Custom rules for CommonJS avoidance
		"no-require": "error", // Flag CommonJS require usage
		"no-export-assign": "error", // Flag module.exports assignments
	},
};
```

### Testing During Migration

#### Dual Module Support

```javascript
// package.json - Support both formats during transition
{
  "name": "my-app",
  "main": "index.cjs",        // CommonJS entry
  "module": "index.mjs",      // ESM entry
  "exports": {
    "import": "./index.mjs",
    "require": "./index.cjs"
  }
}
```

#### Unit Testing

```javascript
// Test both import styles during migration
describe("Module Compatibility", () => {
	it("should work with CommonJS", () => {
		const { add } = require("./math");
		expect(add(1, 2)).toBe(3);
	});

	it("should work with ESM", async () => {
		const { add } = await import("./math.mjs");
		expect(add(1, 2)).toBe(3);
	});
});
```

## Advanced ESM Concepts

### Module Resolution Strategies

#### Node.js Module Resolution

```javascript
// File paths must be explicit
import utils from "./utils.js"; // ✅ Relative path
import config from "/etc/config.js"; // ✅ Absolute path

// Extensions required (usually)
import utils from "./utils"; // ❌ Error
```

#### Custom Resolvers

```javascript
// Experimental features
import babel from "./babel:math.js"; // Custom protocol
// Resolvers not standard yet
```

### Circular Dependencies in ESM

ESM is stricter about circular dependencies:

```javascript
// a.js
import { funcB } from "./b.js";
export function funcA() {
	return funcB() + "A";
}

// b.js
import { funcA } from "./a.js";
export function funcB() {
	return funcA() + "B";
}

// Result: Error - circular dependency
```

#### Avoiding Circular Imports

```javascript
// Refactor to break cycle
// shared.js
export function baseFunc() {
	return "base";
}

// a.js
import { baseFunc } from "./shared.js";
export function funcA() {
	return baseFunc() + "A";
}

// b.js
import { baseFunc } from "./shared.js";
export function funcB() {
	return baseFunc() + "B";
}
```

### ESM Error Handling

#### Static Import Errors

```javascript
try {
	import { unknownExport } from "./module.js"; // ✅ Compile-time error
} catch (error) {
	console.error("Import error:", error);
}
```

#### Dynamic Import Errors

```javascript
try {
	const module = await import("./module.js");
} catch (error) {
	console.error("Failed to load module:", error);
}
```

### Performance Optimization with ESM

#### Bundle Splitting

```javascript
// Code splitting with dynamic imports
async function loadAdminPanel() {
	const { AdminPanel } = await import("./admin.js");
	return new AdminPanel();
}

// Only load when needed
if (user.isAdmin) {
	loadAdminPanel();
}
```

#### Tree Shaking Optimization

```javascript
// Ensure exports are tree-shakable
export const config = {
	apiUrl: "https://api.example.com",
	features: {
		chat: true,
		admin: false,
		analytics: true,
	},
};

// Good for tree shaking
export const API_URL = "https://api.example.com";
export const CHAT_FEATURE = true;
export const ADMIN_FEATURE = false;
```

## Real-World Migration Examples

### Express Application Migration

#### CommonJS Original

```javascript
// app.js
const express = require("express");
const { readFileSync } = require("fs");
const config = require("./config.json");

const app = express();

app.get("/", (req, res) => {
	res.send("Hello World!");
});

module.exports = app;
```

#### ESM Migrated Version

```javascript
// app.mjs (during transition) or app.js (with "type": "module")
import express from "express";
import { readFileSync } from "fs";
import config from "./config.json" assert { type: "json" };
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.get("/", (req, res) => {
	res.send("Hello World!");
});

export default app;
```

### Database Module Migration

#### CommonJS Original

```javascript
// database.js
const mysql = require("mysql2/promise");

function createConnection(config) {
	return mysql.createConnection(config);
}

async function connect() {
	const connection = await createConnection({
		host: "localhost",
		user: "root",
		database: "myapp",
	});

	return connection;
}

module.exports = { createConnection, connect };
```

#### ESM Migrated Version

```javascript
// database.mjs
import mysql from "mysql2/promise";

export function createConnection(config) {
	return mysql.createConnection(config);
}

export async function connect() {
	const connection = await createConnection({
		host: "localhost",
		user: "root",
		database: "myapp",
	});

	return connection;
}

// Default export alternative
const databaseModule = { createConnection, connect };
export default databaseModule;
```

## Common Migration Pitfalls

### Forgot File Extensions

```javascript
// Error-prone in mixed projects
import utils from "./utils"; // ❌ Ambiguous
import utils from "./utils.mjs"; // ❌ File not found

// Correct approaches
import utils from "./utils.js"; // ✅ Explicit
import utils from "./utils/index.js"; // ✅ Clear
```

### Mixed Module Systems

```javascript
// CommonJS can't easily import ESM without dynamic imports
const esmModule = await import("./esm-module.mjs");

// ESM can import CommonJS with default import
import commonModule from "./common-module.js";
```

### Development vs Production

```javascript
// Development - use .mjs for clarity
import utils from "./utils.mjs";

// Production - use regular extensions
// May require build step to ensure compatibility
```

## Tools and Ecosystem

### Build Tools for ESM

#### Rollup

```javascript
// rollup.config.js
export default {
	input: "src/index.js",
	output: {
		file: "dist/bundle.js",
		format: "es", // ESM output
	},
};
```

#### esbuild

```javascript
// build.js - Ultra-fast bundler
import * as esbuild from "esbuild";

await esbuild.build({
	entryPoints: ["src/index.js"],
	bundle: true,
	format: "esm", // ESM output format
	outfile: "dist/bundle.js",
});
```

### Testing with ESM

#### Jest ESM Configuration

```json
{
	"name": "my-app",
	"type": "module",
	"jest": {
		"extensionsToTreatAsEsm": [".ts"],
		"preset": "jest-preset-node/with-ts-esm"
	}
}
```

#### Node.js Test Runner (Experimental)

```javascript
// Built-in Node.js testing with ESM
import { test, ok } from "node:test";

test("ESM module test", () => {
	const result = add(1, 2);
	ok(result === 3);
});
```

## Conclusion

ESM represents the future of JavaScript modules, offering superior performance through static analysis and tree shaking. The transition from CommonJS to ESM requires careful planning but provides significant benefits for modern applications.

Key migration strategies include:

1. Enable ESM with "type": "module" in package.json
2. Update exports/imports incrementally
3. Handle Node.js-specific globals (**dirname, **filename)
4. Use build tools for complex applications
5. Test thoroughly during transition

As Node.js continues to evolve, ESM adoption will become increasingly important. Understanding both systems allows developers to make informed choices about when and how to migrate their applications.

## Key Takeaways

- **ESM Benefits**: Static analysis, tree shaking, modern syntax
- **Migration Process**: Enable `type: "module"`, update syntax, handle globals
- \***\*dirname/**filename\*\*: Use `import.meta.url` and `fileURLToPath`
- **Dynamic Imports**: Use `import()` for conditional loading
- **Mixed Projects**: Support both systems during transition
- **Build Tools**: Essential for complex ESM applications
