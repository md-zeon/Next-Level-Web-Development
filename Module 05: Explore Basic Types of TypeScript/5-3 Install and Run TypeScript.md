# 5-3 Install and Run TypeScript

## Installing TypeScript

Once you have Node.js installed (using NVM from the previous lesson), you can install TypeScript globally using npm:

```bash
npm install -g typescript
```

This installs the TypeScript compiler (`tsc`) globally on your system.

### Verify Installation

Check if TypeScript is installed correctly:

```bash
tsc --version
```

You should see the version number, for example: `Version 5.2.2`

## Your First TypeScript Program

### Step 1: Create a TypeScript File

Create a new file called `hello.ts`:

```typescript
// hello.ts
function greet(name: string): string {
	return `Hello, ${name}! Welcome to TypeScript!`;
}

const userName: string = "World";
console.log(greet(userName));
```

### Step 2: Compile TypeScript to JavaScript

Use the TypeScript compiler to convert your `.ts` file to `.js`:

```bash
tsc hello.ts
```

This creates a `hello.js` file in the same directory.

### Step 3: Run the JavaScript File

Execute the compiled JavaScript file using Node.js:

```bash
node hello.js
```

You should see the output: `Hello, World! Welcome to TypeScript!`

## Understanding the Compilation Process

TypeScript code (`.ts`) is compiled to JavaScript (`.js`) that can run in any JavaScript environment. The TypeScript compiler:

- Checks for type errors at compile time
- Removes type annotations from the code
- Generates clean, readable JavaScript

## TypeScript Configuration File

For larger projects, create a `tsconfig.json` file to configure TypeScript compilation:

```json
{
	"compilerOptions": {
		"target": "ES2020",
		"module": "commonjs",
		"strict": true,
		"esModuleInterop": true,
		"skipLibCheck": true,
		"forceConsistentCasingInFileNames": true,
		"outDir": "./dist",
		"rootDir": "./src"
	},
	"include": ["src/**/*"],
	"exclude": ["node_modules", "dist"]
}
```

### Key Configuration Options

- `target`: JavaScript version to compile to (ES2020, ES2018, etc.)
- `module`: Module system (commonjs, es2020, etc.)
- `strict`: Enable strict type checking
- `outDir`: Output directory for compiled files
- `rootDir`: Root directory of TypeScript source files

## Compiling with Configuration

When you have a `tsconfig.json` file, you can compile all TypeScript files in your project:

```bash
tsc
```

This will compile all `.ts` files according to your configuration.

## Watch Mode

For development, use watch mode to automatically recompile when files change:

```bash
tsc --watch
```

Or with configuration file:

```bash
tsc --watch --project .
```

## TypeScript in VS Code

Visual Studio Code has excellent TypeScript support built-in:

1. Install the TypeScript extension (usually comes pre-installed)
2. Open a `.ts` file
3. You'll get:
   - IntelliSense for type hints
   - Error highlighting
   - Auto-completion
   - Refactoring tools

## Common TypeScript Compiler Options

| Option               | Description                                |
| -------------------- | ------------------------------------------ |
| `--target`           | ECMAScript target version                  |
| `--module`           | Module code generation                     |
| `--strict`           | Enable all strict type checking options    |
| `--noImplicitAny`    | Disallow implicit 'any' type               |
| `--strictNullChecks` | Enable strict null checks                  |
| `--outDir`           | Redirect output to a directory             |
| `--watch`            | Watch input files and recompile on changes |

## Troubleshooting

### Command Not Found

If `tsc` command is not found, make sure TypeScript is installed globally:

```bash
npm list -g typescript
```

If not installed, reinstall:

```bash
npm install -g typescript
```

### Compilation Errors

TypeScript is strict about types. Common errors:

- **Implicit any**: Add explicit types to variables and functions
- **Null/undefined**: Handle null and undefined values properly
- **Type mismatches**: Ensure assigned values match declared types

### Node.js Version Issues

Make sure you're using a recent version of Node.js (LTS recommended):

```bash
node --version
```

## Next Steps

Now that you can install and run TypeScript, you're ready to explore:

- Basic types (string, number, boolean)
- Arrays and objects
- Functions with type annotations
- Interfaces and classes

## Practice Exercise

1. Create a TypeScript file with a function that takes two numbers and returns their sum
2. Add proper type annotations
3. Compile and run the program
4. Experiment with different types and see how TypeScript helps catch errors

Happy coding with TypeScript! 🚀
