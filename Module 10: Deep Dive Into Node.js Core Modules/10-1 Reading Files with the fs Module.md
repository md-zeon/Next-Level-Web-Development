# 10-1 Reading Files with the fs Module

The `fs` (File System) module is one of Node.js's core modules that provides functionality to interact with the file system. It allows you to read, write, modify, and delete files on your system.

## Synchronous vs Asynchronous Operations

The `fs` module provides both synchronous and asynchronous methods for file operations:

- **Asynchronous methods** (recommended): Operations run in the background without blocking the event loop. They use callbacks, promises, or async/await.
- **Synchronous methods**: These block the execution until the operation completes.

> **Note**: Avoid using synchronous methods in production applications as they can severely impact performance by blocking the event loop.

## Reading Files Asynchronously

The primary asynchronous methods for reading files are:

### `fs.readFile(path, options, callback)`

```javascript
const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content:', data);
});
```

### Reading with Promises (fs.promises)

```javascript
const fs = require('fs').promises;

async function readFileAsync() {
  try {
    const data = await fs.readFile('example.txt', 'utf8');
    console.log('File content:', data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

readFileAsync();
```

## Reading Files Synchronously

### `fs.readFileSync(path, options)`

```javascript
const fs = require('fs');

try {
  const data = fs.readFileSync('example.txt', 'utf8');
  console.log('File content:', data);
} catch (err) {
  console.error('Error reading file:', err);
}
```

## Options

The `options` parameter can be:

- A string specifying the encoding (e.g., `'utf8'`, `'binary'`, etc.)
- An object with properties like:
  - `encoding`: encoding to use (default: `null` - returns Buffer)
  - `flag`: flags to use when opening the file (default: `'r'`)

## Streams for Large Files

For large files, it's better to use streams to avoid loading the entire file into memory:

```javascript
const fs = require('fs');

const readStream = fs.createReadStream('large-file.txt', 'utf8');

readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.length, 'characters');
});

readStream.on('end', () => {
  console.log('File reading completed');
});

readStream.on('error', (err) => {
  console.error('Error reading file:', err);
});
```

## Key Concepts

1. **Buffering**: Without encoding, `fs.readFile()` returns a Buffer object containing binary data.
2. **Encoding**: Specifying `'utf8'` encoding converts the buffer to a string.
3. **Error Handling**: Always handle potential errors that can occur during file operations.
4. **Performance**: Use asynchronous methods and streams for better performance in production.

The `fs` module is essential for any Node.js application that needs to interact with the file system, whether reading configuration files, processing data, or handling file uploads.
