// 6-12: Explore Utility Types in TypeScript

// Utility types are built-in types that help with common type transformations
// They are essential for type-safe TypeScript development

// Example 1: Partial<T> - Makes all properties optional
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type PartialUser = Partial<User>;

// Example 2: Required<T> - Makes all properties required (opposite of Partial)
type RequiredUser = Required<PartialUser>;

// Example 3: Readonly<T> - Makes all properties readonly
type ReadonlyUser = Readonly<User>;

// Example 4: Record<K, T> - Creates an object type with specified key and value types
type UserRoles = Record<string, 'admin' | 'user' | 'moderator'>;
type StringDictionary = Record<string, string>;
type NumberRecord = Record<'a' | 'b' | 'c', number>;

// Example 5: Pick<T, K> - Picks specific properties from a type
type UserBasicInfo = Pick<User, 'name' | 'email'>;
type UserId = Pick<User, 'id'>;

// Example 6: Omit<T, K> - Omits specific properties from a type
type UserWithoutId = Omit<User, 'id'>;
type UserWithoutEmail = Omit<User, 'email'>;

// Example 7: Exclude<T, U> - Excludes types from a union
type Status = 'active' | 'inactive' | 'pending' | 'suspended';
type ActiveStatus = Exclude<Status, 'inactive' | 'suspended'>;

// Example 8: Extract<T, U> - Extracts types from a union (opposite of Exclude)
type InactiveStatus = Extract<Status, 'inactive' | 'suspended'>;

// Example 9: NonNullable<T> - Removes null and undefined from a type
type MaybeString = string | null | undefined;
type DefinitelyString = NonNullable<MaybeString>;

// Example 10: Parameters<T> - Extracts parameter types from a function
function createUser(name: string, email: string, age?: number): User {
  return { id: Math.random(), name, email, age: age || 18 };
}

type CreateUserParams = Parameters<typeof createUser>;

// Example 11: ReturnType<T> - Extracts return type from a function
type CreateUserReturn = ReturnType<typeof createUser>;

// Example 12: InstanceType<T> - Extracts instance type from a class constructor
class UserService {
  constructor(private users: User[] = []) {}

  findById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  create(userData: Omit<User, 'id'>): User {
    const user: User = { ...userData, id: Math.random() };
    this.users.push(user);
    return user;
  }
}

type UserServiceInstance = InstanceType<typeof UserService>;

// Example 13: ConstructorParameters<T> - Extracts constructor parameter types
type UserServiceConstructorParams = ConstructorParameters<typeof UserService>;

// Example 14: ThisParameterType<T> - Extracts 'this' parameter type
function logUser(this: User, message: string) {
  console.log(`${this.name}: ${message}`);
}

type LogUserThis = ThisParameterType<typeof logUser>;

// Example 15: OmitThisParameter<T> - Removes 'this' parameter from function type
type LogUserWithoutThis = OmitThisParameter<typeof logUser>;

// Example 16: ThisType<T> - Marks context type for object literals
interface EventHandlers {
  onclick: (this: HTMLElement, event: Event) => void;
  onsubmit: (this: HTMLFormElement, event: Event) => void;
}

const handlers: EventHandlers & ThisType<HTMLElement | HTMLFormElement> = {
  onclick(event) {
    // 'this' is HTMLElement
    this.style.backgroundColor = 'red';
  },
  onsubmit(event) {
    // 'this' is HTMLFormElement
    event.preventDefault();
  }
};

// Example 17: Uppercase<T>, Lowercase<T>, Capitalize<T>, Uncapitalize<T> (TypeScript 4.1+)
type UppercaseString = Uppercase<'hello world'>; // "HELLO WORLD"
type LowercaseString = Lowercase<'HELLO WORLD'>; // "hello world"
type CapitalizeString = Capitalize<'hello world'>; // "Hello world"
type UncapitalizeString = Uncapitalize<'Hello World'>; // "hello World"

// Example 18: Awaited<T> (TypeScript 4.5+) - Unwraps Promise types
type PromiseUser = Promise<User>;
type AwaitedUser = Awaited<PromiseUser>;

async function fetchUser(): Promise<User> {
  return { id: 1, name: 'John', email: 'john@example.com', age: 30 };
}

type FetchUserReturn = Awaited<ReturnType<typeof fetchUser>>;

// Example 19: Combining utility types for complex transformations
type ApiUser = {
  user_id: number;
  user_name: string;
  user_email: string;
  created_at: string;
  updated_at: string;
};

// Transform API user to internal user model
type InternalUser = Omit<
  {
    [K in keyof ApiUser as K extends `user_${string}`
      ? K extends 'user_id' ? 'id'
        : K extends 'user_name' ? 'name'
        : K extends 'user_email' ? 'email'
        : K
      : K]: K extends 'created_at' | 'updated_at'
        ? Date
        : ApiUser[K];
  },
  'updated_at'
>;

// Example 20: Utility types for form handling
type FormField<T> = {
  value: T;
  error?: string;
  touched: boolean;
};

type UserForm = {
  [K in keyof Omit<User, 'id'>]: FormField<User[K]>;
};

// Usage examples
const partialUser: PartialUser = {
  name: 'John Doe',
  email: 'john@example.com'
};

const readonlyUser: ReadonlyUser = {
  id: 1,
  name: 'Jane Doe',
  email: 'jane@example.com',
  age: 25
};

// readonlyUser.age = 26; // Error: Cannot assign to 'age' because it is a read-only property

const userBasicInfo: UserBasicInfo = {
  name: 'Alice',
  email: 'alice@example.com'
};

const userWithoutId: UserWithoutId = {
  name: 'Bob',
  email: 'bob@example.com',
  age: 30
};

const activeStatuses: ActiveStatus[] = ['active', 'pending'];

const stringDict: StringDictionary = {
  key1: 'value1',
  key2: 'value2'
};

const numberRec: NumberRecord = {
  a: 1,
  b: 2,
  c: 3
};

// Function parameter extraction
function validateUser(name: string, email: string, age: number): boolean {
  return name.length > 0 && email.includes('@') && age >= 18;
}

type ValidateParams = Parameters<typeof validateUser>;
type ValidateReturn = ReturnType<typeof validateUser>;

// Class instance type
const userService = new UserService();
type ServiceType = typeof userService; // InstanceType<typeof UserService>

// Form example
const userForm: UserForm = {
  name: { value: 'John', touched: false },
  email: { value: 'john@example.com', touched: true, error: 'Invalid email' },
  age: { value: 30, touched: true }
};

console.log('Utility types exploration complete!');
