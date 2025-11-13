// 6-11: Explore Mapped Types in TypeScript

// Mapped types allow you to create new types based on existing types
// by transforming the properties of the original type.

// Example 1: Basic Mapped Type - Making all properties optional
type Person = {
  name: string;
  age: number;
  email: string;
};

// Using Partial<T> - a built-in mapped type that makes all properties optional
type PartialPerson = Partial<Person>;

// Custom mapped type to make all properties optional
type Optional<T> = {
  [P in keyof T]?: T[P];
};

type OptionalPerson = Optional<Person>;

// Example 2: Making all properties readonly
type ReadonlyPerson = Readonly<Person>;

// Custom readonly mapped type
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

type MyReadonlyPerson = MyReadonly<Person>;

// Example 3: Transforming property types
type Stringify<T> = {
  [P in keyof T]: string;
};

type StringPerson = Stringify<Person>;

// Example 4: Record utility type - creates an object type
type StringRecord = Record<string, string>;
type NumberRecord = Record<'a' | 'b' | 'c', number>;

// Example 5: Pick and Omit utility types
type PickedPerson = Pick<Person, 'name' | 'age'>;
type OmittedPerson = Omit<Person, 'email'>;

// Example 6: Advanced mapped type with conditional logic
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type NullablePerson = Nullable<Person>;

// Example 7: Mapped type with template literal types (TypeScript 4.1+)
type EventHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}Change`]: (value: T[K]) => void;
};

type PersonEventHandlers = EventHandlers<Person>;

// Example 8: Filtering properties with mapped types
type NonNullableKeys<T> = {
  [P in keyof T]-?: T[P] extends null | undefined ? never : P;
}[keyof T];

type RequiredKeys = NonNullableKeys<OptionalPerson>;

// Example 9: Real-world example - API response transformation
interface ApiUser {
  id: number;
  first_name: string;
  last_name: string;
  email_address: string;
  created_at: string;
}

// Transform API response to internal model
type InternalUser = {
  [K in keyof ApiUser as K extends 'first_name' | 'last_name'
    ? 'name'
    : K extends 'email_address'
    ? 'email'
    : K]: K extends 'first_name' | 'last_name'
    ? string
    : K extends 'created_at'
    ? Date
    : ApiUser[K];
};

// Example 10: Utility type for extracting function return types
type FunctionProperties<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : never;
};

interface UserService {
  getUser(id: number): Person;
  createUser(data: Omit<Person, 'id'>): Person;
  updateUser(id: number, data: Partial<Person>): Person;
  deleteUser(id: number): void;
}

type UserServiceMethods = FunctionProperties<UserService>;

// Usage examples
const person: Person = {
  name: 'John Doe',
  age: 30,
  email: 'john@example.com'
};

const partialPerson: PartialPerson = {
  name: 'Jane Doe'
};

const readonlyPerson: ReadonlyPerson = {
  name: 'Alice',
  age: 25,
  email: 'alice@example.com'
};

// readonlyPerson.age = 26; // Error: Cannot assign to 'age' because it is a read-only property

const stringPerson: StringPerson = {
  name: 'Bob',
  age: '30',
  email: 'bob@example.com'
};

const record: StringRecord = {
  key1: 'value1',
  key2: 'value2'
};

const numberRecord: NumberRecord = {
  a: 1,
  b: 2,
  c: 3
};

console.log('Mapped types exploration complete!');
