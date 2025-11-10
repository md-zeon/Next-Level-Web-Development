// JS => TS
// string, number, boolean, undefined, null

// TS: never, any, void, unknown

let username: string = "zeanur-rahaman-zeon"; // explicit type annotation
// username = 12345; //! Error: Type 'number' is not assignable to type 'string'.
// username.toFixed(2); //! Error: Property 'toFixed' does not exist on type 'string'.

let isLoggedIn: boolean = false;
isLoggedIn = true;

let age: number = 25;
let hobbies: undefined = undefined;
let country: null = null;

// inference
let course = "TypeScript"; // inferred as string type
// course = 1234; //! Error: Type 'number' is not assignable to type 'string'.

// any type
let x; // inferred as any type
x = 10; // No error because x is of type any
x = "Hello"; // No error because x is of type any
x = true; // No error because x is of type any
