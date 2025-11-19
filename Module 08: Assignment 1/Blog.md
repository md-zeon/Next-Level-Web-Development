# TypeScript এর গভীর কনসেপ্টস: Interfaces, Types, keyof, এবং আরও অনেক কিছু

আসসালামু আলাইকুম! আজকের এই ব্লগ পোস্টে আমি TypeScript এর কিছু অত্যন্ত গুরুত্বপূর্ণ এবং প্রায়শই interview এর প্রশ্ন হওয়া topics নিয়ে বিস্তারিত আলোচনা করব। TypeScript হলো JavaScript এর একটি superset যা statically typed language এর সুফল পেতে সাহায্য করে। এটি compilation এর সময়ে error ধরে এবং code এর maintainability বাড়ায়। আজকে আমরা দেখব interfaces এবং types এর পার্থক্য, keyof keyword এর ব্যবহার, any, unknown এবং never types এর মধ্যে পার্থক্য, enums এর ব্যবহার, এবং union/intersection types এর উদাহরণ। প্রতিটি টপিকের সাথে practical code examples এবং বাস্তব জীবনের উদাহরণ থাকবে যাতে আপনি লেখাটি আরও ভালোভাবে বুঝতে পারেন।

প্রথমে আমি এই টপিকগুলোকে একটা সংক্ষিপ্ত overview দিচ্ছি:

- Interfaces vs Types: Object shape define করতে কোনটা ব্যবহার করবেন?
- keyof: Dynamic property access এর জন্য
- any, unknown, never: TypeScript এর "special" types
- Enums: Constant values define করার জন্য
- Union & Intersection: Types থেকে নতুন types তৈরি করা

এখন চলুন প্রতিটি টপিক বিস্তারিতভাবে দেখি।

## 1. Interfaces এবং Types এর মধ্যে কী কী পার্থক্য আছে?

TypeScript এ আসার পর যখন একটা JavaScript একটা project কে type safe করতে চাই, তখন প্রথম যে challenges এর সাথে পড়তে হয় তা হলো কীভাবে data structures define করবেন। এখানে interfaces এবং types দুটোই সাহায্য করে, কিন্তু তাদের মধ্যে রয়েছে গুরুত্বপূর্ণ পার্থক্য।

### Interfaces এর প্রধান বৈশিষ্ট্য:

- **Principle purpose**: Interfaces মূলত object এর shape (যেমন: property names এবং তাদের types) define করা যায়। এটি class এর implementation force করে না, কেবল contract define করে।
- **Extendable**: Interfaces কে extend করে নতুন interfaces তৈরি করা যায়। উদাহরণস্বরূপ:

  ```ts
  interface Animal {
    name: string;
    age: number;
  }

  interface Pet extends Animal {
    owner: string;
  }
  ```

- **Declaration merging**: একই name এর interface একাধিকবার define করলে তারা merge হয়ে যায়। এটি library এর types extend করার জন্য 유ার।

  ```ts
  interface Car {
    brand: string;
  }

  interface Car {
    model: string;
    year: number;
  }

  // এখন Car এর shape: { brand: string; model: string; year: number }
  ```

### Types এর প্রধান বৈশিষ্ট্য:

- **More flexible**: Types শুধু object না, primitives, unions, tuples, ইত্যাদি সব represent করতে পারে।
- **Can be computed**: Types এ map, conditional types ইত্যাদি মাধ্যমে computed হতে পারে, যা interfaces পারে না।
- **Not extendable in the same way**: Types কে extends keyword দিয়ে extend করা যায় না, কিন্তু intersection (&) দিয়ে combine করা যায়।
- **Type alias**: Types প্রায়শই complex type expressions এর জন্য alias হিসেবে ব্যবহার হয়।

  ```ts
  type Point = { x: number; y: number };
  type ID = string | number;
  type Status = 'loading' | 'success' | 'error';
  ```

### কখন কোনটা ব্যবহার করবেন?

- **Interfaces ব্যবহার করুন যখন:**
  - Object shapes define করছেন যা later extend হতে পারে।
  - Library types extend করার জন্য (declaration merging এর জন্য)।
  - Public API contracts define করার জন্য।

- **Types ব্যবহার করুন যখন:**
  - Primitive types অথবা complex expressions এর জন্য।
  - Union/intersection types তৈরি করার জন্য।
  - Mapped/conditional types এর জন্য।

আরও একটা দারুণ ব্যাপার হলো, একটা interface কে type হিসেবে ব্যবহার করা যায়, কিন্তু উল্টোটা নয়। যেমন:

```ts
interface Config {
  apiUrl: string;
}

type MyConfig = Config;  // এটা ঠিক আছে
// interface MyConfig2 implements Config  // এটাও ঠিক, কিন্তু reverse নয়
```

## 2. `keyof` Keyword এর ব্যবহার কী? বিস্তারিত উদাহরণ দিন।

`keyof` হলো TypeScript এর একটি built-in type operator যা একটি object type এর সকল property names কে একটি union type হিসেবে extract করে। এটি generic programming এর জন্য অত্যন্ত powerful, যেমন creating utility functions যা dynamically objects থেকে data access করতে পারে।

### Syntax:
```ts
type Keys = keyof Type;
```

### উদাহরণ ১: Basic Usage

```ts
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

type UserKeys = keyof User;
// UserKeys এখন = 'id' | 'name' | 'email' | 'isActive'
```

এখানে `keyof User` সকল property names কে string literals এর union হিসেবে দেয়।

### উদাহরণ ২: Generic Function with keyof

ধরুন আপনি একটা generic function তৈরি করতে চান যা object এবং তার property name নেয় এবং property value return করে। এটি Conventionally একটা indexer function।

```ts
function getProperty<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = {
  id: 1,
  name: 'Rakib',
  email: 'rakib@example.com',
  isActive: true
};

const name = getProperty(user, 'name');  // 'Rakib' (type: string)
const id = getProperty(user, 'id');     // 1 (type: number)
```

কনস্ট্রেইন্ট `K extends keyof T` নিশ্চিত করে যে `key` parameter এর value সত্যিই object এর একটা property name হবে। এর ফলে compile time এ error ধরা যায় এবং IntelliSense better হয়।

### উদাহরণ ৩: Readonly Properties এর সাথে
`keyof` animals কে readonly properties এবং মিউটেবল properties distinguish করার জন্য ব্যবহার করে। যেমন:

```ts
type MutableKeys<T> = {
  readonly [K in keyof T]: T[K] extends readonly any[] ? never : K
}[keyof T];
```

এটা complex উদাহরণ, কিন্তু এটা দেখায় keyof কতটা powerful।

### Real-world Use Case:
এই function টা ব্যবহার করে API responses থেকে data extract করা যায়, অথবা form validation এ। উদাহরণস্বরূপ:

```ts
function updateUser(userId: number, fieldName: UserKeys, value: any) {
  // API call to update user
  return { userId, fieldName, value };
}

updateUser(1, 'name', 'New Name');  // OK
updateUser(1, 'invalidField', 'value');  // Error: Type '"invalidField"' is not assignable to type 'UserKeys'
```

`keyof` JavaScript এর `Object.keys()` এর মতো কাজ করে কিন্তু compile time এ, যা bug প্রোগ্রামিংয়ের সময়কেই ধরে ফেলে।

## 3. `any`, `unknown`, এবং `never` Types এর মধ্যে পার্থক্য কী?

এই তিনটি types হলো TypeScript এর "special" types যা normal typing paradigm থেকে একটু আলাদা। এরা handle করে exceptional cases যেমন unknown values অথবা impossible cases।

### `any` Type:

- **What it is**: "প্রত্যেক কিছু অ্যালাউ করা" type. এটা JavaScript এর dynamic typing এর মতো।
- **Pros**: যেকোনো ক্রিয়া perform করতে পারে without type checking.
- **Cons**: Unsafe! Type errors mask করে, এবং IntelliSense lost হয়।
- **When to use**: Legacy code migrate করার সময় temporarily, অথবা third-party libraries যাদের types নাই।
- **Avoid as much as possible**. `any` ব্যবহার মানে হলো TypeScript profissional এর আপনার "surrender" করানো।

```ts
let anything: any = 42;
anything = "string";  // OK
anything.prop = "value"; // OK সত্ত্বেও এটা runtime error হতে পারে
```

### `unknown` Type:

- **What it is**: Type-safe `any` এর alternative.
- **Behavior**: Unknown values এর উপর কোনো operation করার আগে type check করতে বাধ্য করে।
- **Saves from mistakes**: `any` এর চেয়ে অনেক safer।
- **Common pattern**: Type guards ব্যবহার করে verify করা।

```ts
let unknownValue: unknown = getDataFromAPI();  // কোনো unknown source থেকে

if (typeof unknownValue === 'string') {
  console.log(unknownValue.toUpperCase());  // OK, কারণ type verified
} else if (typeof unknownValue === 'number') {
  console.log(unknownValue.toFixed(2));  // OK
} else {
  // Handle other cases অথবা nothing do
}
```

এটা particularly useful JSON 파র্সিং এর সময়:

```ts
const parsed: unknown = JSON.parse('{"name": "John"}');
if (parsed && typeof parsed === 'object' && 'name' in parsed) {
  console.log((parsed as {name: string}).name);
}
```

### `never` Type:

- **What it is**: Value যা never থাকতে পারে না। অসম্ভব conditions এর জন্য।
- **Use cases**:
  - Functions যা never return করে (infinite loop বা always throw).
  - Discriminated unions এ যখন all cases covered হয়।
- **Type narrowing**: Switch statements এ exhaustive checking force করে।

```ts
function neverReturns(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    // Never stops
  }
}
```

Union types এর সাথে:

```ts
type Shape = 'circle' | 'square' | 'triangle';

function getArea(shape: Shape, radius?: number, side?: number): number {
  switch (shape) {
    case 'circle':
      if (radius) return Math.PI * radius ** 2;
      break;
    case 'square':
      if (side) return side ** 2;
      break;
    case 'triangle':
      // Handle triangle
      break;
    default:
      const _exhaustiveCheck: never = shape;  // Error যদি all cases covered না হয়
      throw new Error(`Unexpected shape: ${shape}`);
  }
}
```

`never` helps prevent bugs যখন আপনার switch statement এ new options add করেন কিন্তু replace করেননি אותা case handle করেননি।

### Summary of Differences:
- **any**: তারতমর্যে বহূদূর: No restrictions, unsafe.
- **unknown**: Safe `any`: Type-script error avoid করে type checks force করে।
- **never**: Impossibility represent করে: Functions যা return করে না, incomplete switch cases detect করে।

যোগাযোগের দায়িত্বে ভাল করে এই types বুঝলে আপনার code এর robustness অনেক বাড়বে।

## 4. `Enums` TypeScript এর কী ব্যবহার? Numeric এবং String Enums এর Statement উদাহরণ দিন।

Enums (Enumerations) ব্যবহার করে constant values এর একটা set define করা যায়, যাতে code আরও readable হয় এবং magic numbers/strings avoid হয়। এটা particularly useful এখন যখন predefined options থাকে, যেমন weekdays, status codes, ইত্যাদি।

### Numeric Enums:

- Default value 0 থাকে এবং যোগ করে যায়।
- Reverse mapping support করে (enum value থেকে name পাওয়া যায়)।
- JavaScript এ এটা একটা object হিসে যায় প্রিETDEWEB, এবং reverse keys add করে।

```ts
enum Direction {
  Up = 1,    // Manually set start
  Down,      // 2
  Left,      // 3
  Right      // 4
}

console.log(Direction.Up);      // 1
console.log(Direction[1]);      // 'Up' (reverse mapping)
console.log(Object.values(Direction));  // Array of all values

// Usage in function
function move(direction: Direction) {
  // Implementation
}
move(Direction.Up);  // Valid
// move(5);  // Invalid: not in enum range
```

### String Enums:

- আত্তশ properties এ specific string values assign করা হয়।
- No reverse mapping (JavaScript এ रिजरवर्ड উপস্থিতি না।
- More explicit এবং less error-prone, কারণ values যথাযথ দেখানো থাকে।

```ts
enum HttpStatus {
  Ok = "200",
  BadRequest = "400",
  Forbidden = "403",
  NotFound = "404",
  InternalServerError = "500"
}

console.log(HttpStatus.Ok);         // "200"
console.log(Object.keys(HttpStatus));   // Array of keys
console.log(Object.values(HttpStatus)); // Array of values

// Function এ ব্যবহার
function handleResponse(status: HttpStatus) {
  switch (status) {
    case HttpStatus.Ok:
      console.log("Request successful");
      break;
    case HttpStatus.NotFound:
      console.log("Resource not found");
      break;
    // Other cases
  }
}
```

### Real-world Usage:

1. **Status codes**: API responses এর জন্য।
2. **User roles**: 'admin', 'user', 'moderator'।
3. **Days of week**: 'Monday' থেকে 'Sunday'।
4. **Theme modes**: 'light', 'dark'।

Enums ব্যবহার করে code এর maintainability বাড়ে কারণ আপনি centrally define করেন কোন values accepted হবে। যদি একটা value 제거 বা rename করেন, সব জায়গায় update হয়ে যাবে।

## 5. **Union** এবং **Intersection** Types TypeScript এর উদাহরণ দিন।

ই আলোচনা করা হয়েছে যে Types TypeScript এর একটি advanced feature যা types থেকে নতুন types তৈরি করা যায়। Union এবং Intersection types এর মাধ্যমে complex type expressions তৈরি করা যায়।

### Union Types (`|`):

- **Meaning**: "এটা অথবা ওটা" - multiple types এর থেকে যেকোনো একটাrelative হতে পারে।
- **Use cases**: Variables যা multiple types accept করতে পারে, API responses যা different shapes হতে পারে।
- **Type narrowing**: Runtime এ typeof অথবা type guards ব্যবহার করে specific type check করতে হয়।

```ts
// Basic Union
type StringOrNumber = string | number;

// Function parameter
function printValue(value: string | number | boolean) {
  if (typeof value === 'string') {
    console.log(`String: ${value.toUpperCase()}`);
  } else if (typeof value === 'number') {
    console.log(`Number: ${value.toFixed(2)}`);
  } else {
    console.log(`Boolean: ${value}`);
  }
}

printValue("hello");   // String: HELLO
printValue(42);        // Number: 42.00
printValue(true);      // Boolean: true

// Real-world: API Response Union
type ApiResponse = SuccessResponse | ErrorResponse;

interface SuccessResponse {
  status: 'success';
  data: any;
}

interface ErrorResponse {
  status: 'error';
  message: string;
}

function handleApiResponse(response: ApiResponse) {
  if (response.status === 'success') {
    // Handle success
    console.log(response.data);
  } else {
    // Handle error
    console.log(response.message);
  }
}
```

### Intersection Types (`&`):

- **Meaning**: "ই এবং ওটা উভয়ই" - multiple types এর all properties এবং methods combine করে।
- **Result**: এখন প্রিন্টেড যায। মূল types এর all fields required হয়।
- **Use cases**: Object composition, mixin patterns, combining separate concerns।

```ts
// Basic Intersection
type Name = { name: string };
type Age = { age: number };
type Person = Name & Age;  // { name: string; age: number }

// Usage
const person: Person = {
  name: "Alice",
  age: 25
};

// Real-world: Mixins
interface CanWalk {
  walk(): void;
}

interface CanFly {
  fly(): void;
}

type Bird = CanWalk & CanFly;  // Has both walk and fly methods

class Eagle implements Bird {
  walk() {
    console.log("Walking on ground");
  }

  fly() {
    console.log("Flying in sky");
  }
}

// API objects combine করা
interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

interface UserData {
  id: number;
  name: string;
}

type UserWithTimestamps = UserData & Timestamped;
// { id: number; name: string; createdAt: Date; updatedAt: Date }

function logUser(user: UserWithTimestamps) {
  console.log(`User ${user.name} created on ${user.createdAt}`);
}
```

### Differences Summary:

| Union | Intersection |
|-------|--------------|
| `\|` | `&` |
| "or" relationship | "and" relationship |
| Multiple types থেকে যেকোনো একটা | All types থেকে combined properties |
| Narrowing দরকার হয় | Direct access to all properties |
| Discriminated unions এ useful | Object composition এ useful |

### Advanced Example: Combining Both

```ts
type NumberOrString = string | number;
type AgeObject = { age: NumberOrString };
type NameObject = { name: string };

type PersonComplex = AgeObject & NameObject;
// Result: { age: string | number; name: string }

const p: PersonComplex = { name: "John", age: 30 };
const p2: PersonComplex = { name: "Jane", age: "25" };
```

এই types ব্যবহার করে highly flexible data structures তৈরি করা যায়, যা complex real-world scenarios model করতে help করে।

---

আপনি যদি এই টপিকগুলো প্র্যাকটিস করেন এবং real projects এ apply করেন, তাহলে TypeScript এর প্রভাবশালী ক্ষমতা আপনি ভালোভাবে বুঝতে পারবেন। এই ব্লগ পোস্টে আমি শুধু scratch saw touching করেছি; ঐর্ন requirements এবং complex usage patterns আরও আছে যা further study করার জন্য অনুমান করা যায়। যদি কোনো প্রশ্ন থাকে বা এই কনসেপ্টস সম্পর্কে আরও আলোচনা করতে চান, তাহলে comment সেকশনে জানান!

ধন্যবাদ আপনাকে এই ব্লগ পড়ার জন্য। Happy coding!
