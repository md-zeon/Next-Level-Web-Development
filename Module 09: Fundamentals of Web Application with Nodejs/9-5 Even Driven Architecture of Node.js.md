# 9-5: Event-Driven Architecture of Node.js

## Introduction

Node.js is built on an event-driven architecture that fundamentally differs from traditional server-side programming models. Understanding how events, the event loop, and non-blocking I/O work is crucial for writing efficient Node.js applications. This lesson dives deep into Node.js's event-driven architecture and how it enables high-performance, scalable applications.

## What is Event-Driven Programming?

### Definition

Event-driven programming is a programming paradigm where the flow of execution is determined by events such as user actions, sensor outputs, or system changes, rather than by sequential code execution.

### Key Characteristics

- **Reactive**: Code executes in response to events
- **Asynchronous**: Operations don't block program execution
- **Decoupled**: Event producers and consumers can operate independently
- **Composable**: Events can trigger other events in complex chains

## Node.js Event Loop

### Core Concept

The event loop is Node.js's beating heart. It's a single-threaded loop that manages asynchronous operations and executes JavaScript code in response to events.

#### Simple Analogy

Think of the event loop as a restaurant host:

- Takes orders (incoming requests)
- Doesn't wait in the kitchen
- Seats new customers while orders are being prepared
- Serves prepared orders when ready

### Event Loop Phases

#### 1. Timers Phase

Processes scheduled functions like `setTimeout` and `setInterval`:

```javascript
setTimeout(() => console.log("Timer executed"), 1000);
```

#### 2. Pending Callbacks Phase

Executes I/O callbacks deferred from previous cycles (system operations).

#### 3. Idle/Prepare Phase

Internal use only.

#### 4. Poll Phase

Retrieves new I/O events; executes I/O-related callbacks.

#### 5. Check Phase

Processes `setImmediate()` callbacks:

```javascript
setImmediate(() => console.log("Immediate executed"));
```

#### 6. Close Callbacks Phase

Processes close event callbacks (sockets, file handles).

### Visualizing the Event Loop

```
┌───────────────────────────┐
│           timers          │  // setTimeout, setInterval
└─────────────┬─────────────┘
             │
┌─────────────┴─────────────┐
│     pending callbacks     │  // system callbacks
└─────────────┬─────────────┘
             │
┌─────────────┴─────────────┐
│       idle, prepare       │  // internal
└─────────────┬─────────────┘
             │
┌─────────────┴─────────────┐
│           poll            │  // new I/O events
└─────────────┬─────────────┘
             │
┌─────────────┴─────────────┐
│           check           │  // setImmediate
└─────────────┬─────────────┘
             │
┌─────────────┴─────────────┐
│      close callbacks      │  // socket/file close
└───────────────────────────┘
```

## Non-Blocking I/O in Node.js

### Traditional Blocking I/O

```javascript
// Synchronous file reading - BLOCKS the thread
const data = fs.readFileSync("large-file.txt");
// Nothing else can happen until file is read
processData(data);
```

### Node.js Non-Blocking I/O

```javascript
// Asynchronous file reading - NON-BLOCKING
fs.readFile("large-file.txt", (err, data) => {
	// Callback executed only when file is read
	if (err) throw err;
	processData(data);
});
// Code continues executing immediately
console.log("File read initiated, but not yet completed");
```

### Libuv and I/O Operations

Node.js delegates I/O operations to libuv, a C library that provides:

- **Cross-platform I/O**: Windows, Linux, macOS
- **Thread Pool**: Default 4 threads for CPU-intensive operations
- **Async I/O**: Uses epoll (Linux), kqueue (macOS), IOCP (Windows)

## Callbacks: The Foundation

### Callback Pattern

Node.js extensively uses callbacks for handling asynchronous operations:

```javascript
function fetchUserData(userId, callback) {
	database.query(
		"SELECT * FROM users WHERE id = ?",
		[userId],
		(err, result) => {
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, result);
		},
	);
}

// Usage
fetchUserData(123, (err, user) => {
	if (err) {
		console.error("Error:", err);
		return;
	}
	console.log("User:", user);
});
```

### Error-First Callback Convention

- **First Parameter**: Error object (or null if no error)
- **Subsequent Parameters**: Result data

### Callback Hell

Nested callbacks can lead to unreadable code:

```javascript
// Callback Hell example
fetchUserData(userId, (err, user) => {
	if (err) return handleError(err);
	fetchPosts(user.id, (err, posts) => {
		if (err) return handleError(err);
		fetchComments(posts[0].id, (err, comments) => {
			if (err) return handleError(err);
			renderPage(user, posts, comments);
		});
	});
});
```

## Promises: Improving Async Code

### Promise Fundamentals

Promises represent the eventual result of an asynchronous operation:

```javascript
function fetchUserData(userId) {
	return new Promise((resolve, reject) => {
		database.query(
			"SELECT * FROM users WHERE id = ?",
			[userId],
			(err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			},
		);
	});
}

// Usage
fetchUserData(123)
	.then((user) => console.log("User:", user))
	.catch((err) => console.error("Error:", err));
```

### Promise States

- **Pending**: Initial state, neither resolved nor rejected
- **Resolved/Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed

### Chaining for Readability

```javascript
fetchUserData(userId)
	.then((user) => fetchPosts(user.id))
	.then((posts) => fetchComments(posts[0].id))
	.then((comments) => renderPage(user, posts, comments))
	.catch((err) => handleError(err));
```

## Async/Await: Synchronous-Looking Async Code

### ES2017+: Async/Await Syntax

```javascript
async function getUserDashboard(userId) {
	try {
		const user = await fetchUserData(userId);
		const posts = await fetchPosts(user.id);
		const comments = await fetchComments(posts[0].id);
		return renderPage(user, posts, comments);
	} catch (err) {
		handleError(err);
	}
}

// Usage
getUserDashboard(123).then((result) => console.log("Dashboard ready"));
```

### Behind the Scenes

- `async` functions return Promises
- `await` pauses function execution until Promise resolves
- Error handling with `try/catch`

## Event Emitters: Custom Events

### Node.js Event System

Node.js provides an event system using `events` module:

```javascript
const EventEmitter = require("events");

class UserManager extends EventEmitter {
	createUser(userData) {
		// Validate and save user
		const user = saveToDatabase(userData);

		// Emit custom event
		this.emit("userCreated", user);

		return user;
	}
}

const manager = new UserManager();

// Listen for events
manager.on("userCreated", (user) => {
	console.log("Sending welcome email to:", user.email);
});

// Usage
manager.createUser({ name: "John", email: "john@example.com" });
```

### Common EventEmitter Methods

- `.on(event, listener)`: Register event listener
- `.emit(event, ...args)`: Emit event with arguments
- `.once(event, listener)`: One-time listener
- `.removeListener(event, listener)`: Remove listener

## HTTP Server Example

### Basic HTTP Server

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
	// Request event handling
	console.log(`${req.method} ${req.url}`);

	if (req.url === "/api/users") {
		// Simulate async operation
		setTimeout(() => {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ users: [] }));
		}, 1000); // Non-blocking delay
	} else {
		res.writeHead(404);
		res.end("Not Found");
	}
});

server.listen(3000, () => {
	console.log("Server listening on port 3000");
});
```

### Understanding the Flow

1. `http.createServer()` registers a callback for the 'request' event
2. When a client connects, the callback fires with `(req, res)` objects
3. The callback can immediately return control to handle other requests
4. I/O operations (like `setTimeout`) are handled asynchronously

## Streams: Handling Data Flow

### Stream Types

- **Readable**: Data source (files, HTTP requests)
- **Writable**: Data destination (files, HTTP responses)
- **Duplex**: Both readable and writable (TCP sockets)
- **Transform**: Modify data as it passes through

### File Streaming Example

```javascript
const fs = require("fs");

// Non-blocking file streaming
const readableStream = fs.createReadStream("large-file.txt", {
	encoding: "utf8",
});

readableStream.on("data", (chunk) => {
	console.log("Received chunk:", chunk);
});

readableStream.on("end", () => {
	console.log("File reading completed");
});

readableStream.on("error", (err) => {
	console.error("Error reading file:", err);
});
```

### Stream Advantages

- **Memory Efficient**: Process data in chunks, not all at once
- **Compositional**: Easy to pipe streams together
- **Event-Driven**: Emit events at every stage

## Performance Considerations

### Avoiding Blocking Operations

```javascript
// Bad - Blocks event loop
const data = fs.readFileSync("file.txt");

// Good - Non-blocking
fs.readFile("file.txt", (err, data) => {
	// Handle result asynchronously
});
```

### CPU-Intensive Operations

```javascript
// Offload CPU-intensive work to worker threads
const Worker = require("worker_threads");

if (Worker.isMainThread) {
	const worker = new Worker("./cpu-worker.js");
	worker.postMessage({ task: "compute-intensive" });

	worker.on("message", (result) => {
		console.log("Result:", result);
	});
}
```

### Event Loop Monitoring

```javascript
const { performance } = require("perf_hooks");

setInterval(() => {
	const eventLoopDelay = performance.eventLoopDelay();
	console.log("Event loop delay:", eventLoopDelay, "ms");
}, 1000);
```

## Comparison: Event-Driven vs Threaded Models

### Traditional Threaded Server

```java
// Java thread-per-request
public void handleRequest(HttpServletRequest req, HttpServletResponse res) {
  // This thread is occupied until completion
  String data = readFileBlocking("large-file.txt");
  processData(data);
  writeResponse(res, data);
}
```

### Node.js Event-Driven Server

```javascript
app.get("/data", (req, res) => {
	// Thread immediately available for other requests
	fs.readFile("large-file.txt", (err, data) => {
		if (err) return res.status(500).send(err);
		const processed = processData(data);
		res.send(processed);
	});
});
```

### Performance Comparison

| Metric        | Threaded Model             | Event-Driven Model         |
| ------------- | -------------------------- | -------------------------- |
| Memory Usage  | High (per-thread stack)    | Low (single thread)        |
| CPU Switching | Expensive context switches | Minimal overhead           |
| Concurrency   | Limited by threads         | High (10,000+ connections) |
| Complexity    | Synchronization challenges | Callback management        |

## Common Patterns and Anti-Patterns

### Anti-Patterns

#### 1. Blocking the Event Loop

```javascript
// BAD - Burns CPU cycles
app.get("/sync-calc", (req, res) => {
	const result = fibonacci(n); // Long-running synchronous computation
	res.json({ result });
});
```

#### 2. Nested Callbacks (Fixed)

```javascript
// BAD - Callback hell
fs.readFile("file1", (err, data1) => {
	fs.readFile("file2", (err, data2) => {
		fs.readFile("file3", (err, data3) => {
			combineAndProcess(data1, data2, data3);
		});
	});
});

// GOOD - Promise chaining
readFile("file1")
	.then((data1) => readFile("file2").then((data2) => [data1, data2]))
	.then(([data1, data2]) =>
		readFile("file3").then((data3) => combineAndProcess(data1, data2, data3)),
	)
	.catch((err) => console.error(err));
```

### Best Practices

#### 1. Use Promises/Async-Await

```javascript
// Prefer async/await for readability
async function handleRequest(req, res) {
	try {
		const user = await getUser(req.params.id);
		const posts = await getPosts(user.id);
		res.json({ user, posts });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}
```

#### 2. Proper Error Handling

```javascript
process.on("uncaughtException", (err) => {
	console.error("Uncaught Exception:", err);
	process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
	console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
```

#### 3. Memory Leak Prevention

```javascript
// Remove listeners when not needed
const emitter = new MyEmitter();

const callback = () => {
	console.log("Event handled");
};

emitter.on("data", callback);

// Later...
emitter.removeListener("data", callback);
```

## Real-World Applications

### Chat Applications

```javascript
const io = require("socket.io")(server);

io.on("connection", (socket) => {
	console.log("User connected");

	socket.on("chat message", (msg) => {
		io.emit("chat message", msg); // Broadcast to all clients
	});

	socket.on("disconnect", () => {
		console.log("User disconnected");
	});
});
```

### File Upload Processing

```javascript
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
	// File already saved asynchronously
	processImage(req.file.path) // Non-blocking image processing
		.then((result) => res.json(result))
		.catch((err) => res.status(500).json({ error: err.message }));
});
```

## Conclusion

Node.js's event-driven architecture revolutionizes server-side programming by enabling efficient, scalable applications. The event loop, non-blocking I/O, and asynchronous patterns allow Node.js to handle thousands of concurrent connections while maintaining simplicity and performance.

Understanding these concepts is essential for writing high-performance Node.js applications. The paradigm shift from synchronous, blocking operations to asynchronous, event-driven code requires practice but unlocks Node.js's true potential for modern web applications.

## Key Takeaways

- **Event Loop** manages asynchronous operations in a single thread
- **Non-blocking I/O** allows Node.js to handle thousands of concurrent connections
- **Callbacks** are the foundation, but **Promises/async-await** improve code readability
- **Streams** provide efficient data processing without loading everything into memory
- **Avoid blocking operations** to prevent event loop starvation
- **Event emitters** enable custom event-driven architectures

## Next Steps

With a solid understanding of Node.js's event-driven architecture, you're ready for hands-on development. The next lessons will guide you through creating HTTP servers, handling routing, working with databases, and building real-world applications using these event-driven principles.
