// M10V01.js - Reading Files with the fs Module

const fs = require('fs');
const path = require('path');

// Example 1: Asynchronous file reading using callback
console.log('Example 1: Reading file asynchronously with callback');
fs.readFile('text instructions.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content (first 200 characters):');
  console.log(data.substring(0, 200) + '...\n');
});

// Example 2: Asynchronous file reading with promises
async function readFileWithPromises() {
  console.log('Example 2: Reading file with promises');

  try {
    const data = await fs.promises.readFile('text instructions.txt', 'utf8');
    console.log('File content length:', data.length, 'characters\n');
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

// Example 3: Creating a sample file and reading it synchronously
function syncReadExample() {
  console.log('Example 3: Creating and reading file synchronously');

  // Create a sample text file
  const sampleContent = `Hello, this is a sample file!
This file demonstrates synchronous file reading.
Created at: ${new Date().toISOString()}
Node.js version: ${process.version}`;

  try {
    // Write file synchronously
    fs.writeFileSync('sample.txt', sampleContent, 'utf8');

    // Read file synchronously
    const data = fs.readFileSync('sample.txt', 'utf8');

    console.log('Sample file content:');
    console.log(data);

    // Clean up: delete the sample file
    fs.unlinkSync('sample.txt');
    console.log('Sample file cleaned up.');
  } catch (err) {
    console.error('Error in synchronous operations:', err);
  }
  console.log('');
}

// Example 4: Reading file as Buffer (no encoding)
function bufferReadExample() {
  console.log('Example 4: Reading file as Buffer');

  fs.readFile('text instructions.txt', (err, buffer) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    console.log('Buffer type:', typeof buffer);
    console.log('First 50 bytes as hex:', buffer.slice(0, 50).toString('hex'));
    console.log('Same bytes as UTF-8:', buffer.slice(0, 50).toString('utf8'));
    console.log('');
  });
}

// Example 5: Using streams for large files
function streamReadExample() {
  console.log('Example 5: Reading file using streams');

  const readStream = fs.createReadStream('text instructions.txt', {
    encoding: 'utf8',
    highWaterMark: 1024 // 1KB chunks
  });

  let chunkCount = 0;
  let totalSize = 0;

  readStream.on('data', (chunk) => {
    chunkCount++;
    totalSize += Buffer.byteLength(chunk, 'utf8');
    console.log(`Chunk ${chunkCount} received: ${chunk.length} characters`);
  });

  readStream.on('end', () => {
    console.log(`Stream reading completed. Total chunks: ${chunkCount}, Total size: ${totalSize} characters\n`);
  });

  readStream.on('error', (err) => {
    console.error('Error in stream reading:', err);
  });
}

// Execute examples
setTimeout(readFileWithPromises, 100); // Delay to show sequential execution
setTimeout(syncReadExample, 200);
setTimeout(bufferReadExample, 300);
setTimeout(streamReadExample, 400);

console.log('Examples are being executed asynchronously...\n');
