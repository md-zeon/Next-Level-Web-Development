// Enum in TypeScript
// Enums allow you to define a set of named constants

// Example 1: Basic Numeric Enum
enum Color {
    Red,    // 0
    Green,  // 1
    Blue,   // 2
}

let favoriteColor: Color = Color.Red;
console.log("Favorite color value:", favoriteColor); // 0
console.log("Favorite color name:", Color[favoriteColor]); // "Red"

// Example 2: Custom Numeric Values
enum Status {
    Pending = 1,
    Approved = 2,
    Rejected = 3,
}

let userStatus: Status = Status.Approved;
console.log("User status:", userStatus); // 2

// Example 3: String Enum
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

let move: Direction = Direction.Up;
console.log("Move direction:", move); // "UP"

// Example 4: Reverse Mapping
enum Priority {
    Low = 1,
    Medium = 2,
    High = 3,
}

console.log("Priority.Low:", Priority.Low);     // 1
console.log("Priority[1]:", Priority[1]);      // "Low"
console.log('Priority["Low"]:', Priority["Low"]);  // 1

// Example 5: Enum with Methods
enum HttpStatus {
    OK = 200,
    NotFound = 404,
    InternalServerError = 500,
}

class HttpResponse {
    constructor(private status: HttpStatus) {}

    isSuccess(): boolean {
        return this.status === HttpStatus.OK;
    }

    getMessage(): string {
        switch (this.status) {
            case HttpStatus.OK:
                return "Success";
            case HttpStatus.NotFound:
                return "Not Found";
            case HttpStatus.InternalServerError:
                return "Internal Server Error";
            default:
                return "Unknown Status";
        }
    }
}

let response = new HttpResponse(HttpStatus.OK);
console.log("Is success:", response.isSuccess()); // true
console.log("Status message:", response.getMessage()); // "Success"

// Example 6: Enum as Union Type
enum Shape {
    Circle = "circle",
    Square = "square",
    Triangle = "triangle",
}

function drawShape(shape: Shape): void {
    console.log(`Drawing a ${shape}`);
}

drawShape(Shape.Circle); // "Drawing a circle"

// Example 7: Const Enum (Compile-time Optimization)
const enum ConstDirection {
    Up,
    Down,
    Left,
    Right,
}

// Compiled to direct values, no enum object created
let dir: ConstDirection = ConstDirection.Up;
console.log("Const direction:", dir); // 0

// Example 8: Ambient Enum (Declaration Only)
declare enum ExternalEnum {
    Value1,
    Value2,
}

// Used when enum is defined elsewhere (e.g., in external library)
let value: ExternalEnum = ExternalEnum.Value1;
console.log("External value:", value);

// Example 9: Iterating Over Enum
enum Days {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
}

console.log("Iterating over Days enum:");
for (let day in Days) {
    if (!isNaN(Number(day))) {
        console.log(`Day ${day}: ${Days[day]}`);
    }
}

// Using Object.keys for iteration
console.log("Using Object.keys:");
Object.keys(Days).forEach(key => {
    if (!isNaN(Number(key))) {
        console.log(`${Days[Number(key)]} is day ${key}`);
    }
});

// Example 10: Enum with Computed Values (Bitwise)
enum Permission {
    Read = 1,
    Write = 2,
    Execute = 4,
    Admin = Read | Write | Execute, // 7
}

let userPerm: Permission = Permission.Read | Permission.Write;
console.log("User permissions value:", userPerm); // 3

function hasPermission(userPerms: Permission, requiredPerm: Permission): boolean {
    return (userPerms & requiredPerm) === requiredPerm;
}

console.log("Has read permission:", hasPermission(userPerm, Permission.Read));  // true
console.log("Has execute permission:", hasPermission(userPerm, Permission.Execute)); // false

// Example 11: Heterogeneous Enum
enum MixedEnum {
    No = 0,
    Yes = "YES",
    Maybe = 1,
}

console.log("Mixed enum No:", MixedEnum.No);     // 0
console.log("Mixed enum Yes:", MixedEnum.Yes);   // "YES"
console.log("Mixed enum Maybe:", MixedEnum.Maybe); // 1

// Example 12: Enum in Switch Statement
enum Action {
    Create = "CREATE",
    Update = "UPDATE",
    Delete = "DELETE",
}

function handleAction(action: Action): string {
    switch (action) {
        case Action.Create:
            return "Item created";
        case Action.Update:
            return "Item updated";
        case Action.Delete:
            return "Item deleted";
        default:
            return "Unknown action";
    }
}

console.log("Handle create:", handleAction(Action.Create)); // "Item created"

// Example 13: Enum with Interface
interface User {
    id: number;
    name: string;
    role: UserRole;
}

enum UserRole {
    Admin = "admin",
    User = "user",
    Guest = "guest",
}

let user: User = {
    id: 1,
    name: "John Doe",
    role: UserRole.Admin,
};

console.log("User role:", user.role); // "admin"

// Example 14: Enum as Function Parameter
function setTheme(theme: Theme): void {
    console.log(`Setting theme to ${theme}`);
}

enum Theme {
    Light = "light",
    Dark = "dark",
    Auto = "auto",
}

setTheme(Theme.Dark); // "Setting theme to dark"

// Example 15: Getting All Enum Values
enum Fruit {
    Apple = "apple",
    Banana = "banana",
    Orange = "orange",
}

function getAllFruits(): Fruit[] {
    return Object.values(Fruit) as Fruit[];
}

console.log("All fruits:", getAllFruits()); // ["apple", "banana", "orange"]

// Example 16: Getting All Enum Keys
function getAllFruitKeys(): string[] {
    return Object.keys(Fruit).filter(key => isNaN(Number(key)));
}

console.log("All fruit keys:", getAllFruitKeys()); // ["Apple", "Banana", "Orange"]

// Example 17: Enum Comparison
enum Size {
    Small = "S",
    Medium = "M",
    Large = "L",
}

function compareSizes(size1: Size, size2: Size): string {
    if (size1 === size2) {
        return "Sizes are equal";
    }
    return "Sizes are different";
}

console.log("Compare same sizes:", compareSizes(Size.Medium, Size.Medium)); // "Sizes are equal"
console.log("Compare different sizes:", compareSizes(Size.Small, Size.Large)); // "Sizes are different"

// Example 18: Enum with Default Value
enum LogLevel {
    Error = 0,
    Warn = 1,
    Info = 2,
    Debug = 3,
}

function log(message: string, level: LogLevel = LogLevel.Info): void {
    console.log(`[${LogLevel[level]}] ${message}`);
}

log("This is an info message"); // "[Info] This is an info message"
log("This is an error", LogLevel.Error); // "[Error] This is an error"

// Example 19: Enum in Array
enum TaskPriority {
    Low = 1,
    Normal = 2,
    High = 3,
    Urgent = 4,
}

let tasks: { title: string; priority: TaskPriority }[] = [
    { title: "Fix bug", priority: TaskPriority.Urgent },
    { title: "Write docs", priority: TaskPriority.Normal },
    { title: "Clean code", priority: TaskPriority.Low },
];

function getUrgentTasks(tasks: { title: string; priority: TaskPriority }[]): string[] {
    return tasks
        .filter(task => task.priority === TaskPriority.Urgent)
        .map(task => task.title);
}

console.log("Urgent tasks:", getUrgentTasks(tasks)); // ["Fix bug"]

// Example 20: Advanced Bitwise Operations
enum UserPermissions {
    None = 0,
    Read = 1 << 0,    // 1
    Write = 1 << 1,   // 2
    Delete = 1 << 2,  // 4
    Admin = Read | Write | Delete, // 7
}

class UserPermissionsManager {
    private permissions: UserPermissions;

    constructor(permissions: UserPermissions = UserPermissions.None) {
        this.permissions = permissions;
    }

    hasPermission(permission: UserPermissions): boolean {
        return (this.permissions & permission) === permission;
    }

    addPermission(permission: UserPermissions): void {
        this.permissions |= permission;
    }

    removePermission(permission: UserPermissions): void {
        this.permissions &= ~permission;
    }

    getPermissions(): UserPermissions {
        return this.permissions;
    }
}

let userPerms = new UserPermissionsManager(UserPermissions.Read);
console.log("Has read:", userPerms.hasPermission(UserPermissions.Read)); // true
console.log("Has write:", userPerms.hasPermission(UserPermissions.Write)); // false

userPerms.addPermission(UserPermissions.Write);
console.log("After adding write - has write:", userPerms.hasPermission(UserPermissions.Write)); // true

userPerms.removePermission(UserPermissions.Read);
console.log("After removing read - has read:", userPerms.hasPermission(UserPermissions.Read)); // false

// End of Enum examples in TypeScript

// Instructor's examples

// Basic enum usage
enum Role {
    Admin,
    User,
    Guest,
}

const userRole: Role = Role.Admin;
console.log("User role:", userRole); // 0

// String enum
enum StatusCode {
    Success = "SUCCESS",
    Error = "ERROR",
    Pending = "PENDING",
}

const currentStatus: StatusCode = StatusCode.Success;
console.log("Current status:", currentStatus); // "SUCCESS"

// Enum with custom values
enum HTTPStatus {
    OK = 200,
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
}

function getStatusMessage(status: HTTPStatus): string {
    switch (status) {
        case HTTPStatus.OK:
            return "Request successful";
        case HTTPStatus.BadRequest:
            return "Bad request";
        case HTTPStatus.Unauthorized:
            return "Unauthorized access";
        case HTTPStatus.NotFound:
            return "Resource not found";
        default:
            return "Unknown status";
    }
}

console.log("Status message for 200:", getStatusMessage(HTTPStatus.OK)); // "Request successful"
console.log("Status message for 404:", getStatusMessage(HTTPStatus.NotFound)); // "Resource not found"
