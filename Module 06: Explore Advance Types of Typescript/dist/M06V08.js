"use strict";
// Enum in TypeScript
// Enums allow you to define a set of named constants
Object.defineProperty(exports, "__esModule", { value: true });
// Example 1: Basic Numeric Enum
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
let favoriteColor = Color.Red;
console.log("Favorite color value:", favoriteColor); // 0
console.log("Favorite color name:", Color[favoriteColor]); // "Red"
// Example 2: Custom Numeric Values
var Status;
(function (Status) {
    Status[Status["Pending"] = 1] = "Pending";
    Status[Status["Approved"] = 2] = "Approved";
    Status[Status["Rejected"] = 3] = "Rejected";
})(Status || (Status = {}));
let userStatus = Status.Approved;
console.log("User status:", userStatus); // 2
// Example 3: String Enum
var Direction;
(function (Direction) {
    Direction["Up"] = "UP";
    Direction["Down"] = "DOWN";
    Direction["Left"] = "LEFT";
    Direction["Right"] = "RIGHT";
})(Direction || (Direction = {}));
let move = Direction.Up;
console.log("Move direction:", move); // "UP"
// Example 4: Reverse Mapping
var Priority;
(function (Priority) {
    Priority[Priority["Low"] = 1] = "Low";
    Priority[Priority["Medium"] = 2] = "Medium";
    Priority[Priority["High"] = 3] = "High";
})(Priority || (Priority = {}));
console.log("Priority.Low:", Priority.Low); // 1
console.log("Priority[1]:", Priority[1]); // "Low"
console.log('Priority["Low"]:', Priority["Low"]); // 1
// Example 5: Enum with Methods
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["OK"] = 200] = "OK";
    HttpStatus[HttpStatus["NotFound"] = 404] = "NotFound";
    HttpStatus[HttpStatus["InternalServerError"] = 500] = "InternalServerError";
})(HttpStatus || (HttpStatus = {}));
class HttpResponse {
    status;
    constructor(status) {
        this.status = status;
    }
    isSuccess() {
        return this.status === HttpStatus.OK;
    }
    getMessage() {
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
var Shape;
(function (Shape) {
    Shape["Circle"] = "circle";
    Shape["Square"] = "square";
    Shape["Triangle"] = "triangle";
})(Shape || (Shape = {}));
function drawShape(shape) {
    console.log(`Drawing a ${shape}`);
}
drawShape(Shape.Circle); // "Drawing a circle"
// Example 7: Const Enum (Compile-time Optimization)
var ConstDirection;
(function (ConstDirection) {
    ConstDirection[ConstDirection["Up"] = 0] = "Up";
    ConstDirection[ConstDirection["Down"] = 1] = "Down";
    ConstDirection[ConstDirection["Left"] = 2] = "Left";
    ConstDirection[ConstDirection["Right"] = 3] = "Right";
})(ConstDirection || (ConstDirection = {}));
// Compiled to direct values, no enum object created
let dir = ConstDirection.Up;
console.log("Const direction:", dir); // 0
// Used when enum is defined elsewhere (e.g., in external library)
let value = ExternalEnum.Value1;
console.log("External value:", value);
// Example 9: Iterating Over Enum
var Days;
(function (Days) {
    Days[Days["Monday"] = 0] = "Monday";
    Days[Days["Tuesday"] = 1] = "Tuesday";
    Days[Days["Wednesday"] = 2] = "Wednesday";
    Days[Days["Thursday"] = 3] = "Thursday";
    Days[Days["Friday"] = 4] = "Friday";
    Days[Days["Saturday"] = 5] = "Saturday";
    Days[Days["Sunday"] = 6] = "Sunday";
})(Days || (Days = {}));
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
var Permission;
(function (Permission) {
    Permission[Permission["Read"] = 1] = "Read";
    Permission[Permission["Write"] = 2] = "Write";
    Permission[Permission["Execute"] = 4] = "Execute";
    Permission[Permission["Admin"] = 7] = "Admin";
})(Permission || (Permission = {}));
let userPerm = Permission.Read | Permission.Write;
console.log("User permissions value:", userPerm); // 3
function hasPermission(userPerms, requiredPerm) {
    return (userPerms & requiredPerm) === requiredPerm;
}
console.log("Has read permission:", hasPermission(userPerm, Permission.Read)); // true
console.log("Has execute permission:", hasPermission(userPerm, Permission.Execute)); // false
// Example 11: Heterogeneous Enum
var MixedEnum;
(function (MixedEnum) {
    MixedEnum[MixedEnum["No"] = 0] = "No";
    MixedEnum["Yes"] = "YES";
    MixedEnum[MixedEnum["Maybe"] = 1] = "Maybe";
})(MixedEnum || (MixedEnum = {}));
console.log("Mixed enum No:", MixedEnum.No); // 0
console.log("Mixed enum Yes:", MixedEnum.Yes); // "YES"
console.log("Mixed enum Maybe:", MixedEnum.Maybe); // 1
// Example 12: Enum in Switch Statement
var Action;
(function (Action) {
    Action["Create"] = "CREATE";
    Action["Update"] = "UPDATE";
    Action["Delete"] = "DELETE";
})(Action || (Action = {}));
function handleAction(action) {
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
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "admin";
    UserRole["User"] = "user";
    UserRole["Guest"] = "guest";
})(UserRole || (UserRole = {}));
let user = {
    id: 1,
    name: "John Doe",
    role: UserRole.Admin,
};
console.log("User role:", user.role); // "admin"
// Example 14: Enum as Function Parameter
function setTheme(theme) {
    console.log(`Setting theme to ${theme}`);
}
var Theme;
(function (Theme) {
    Theme["Light"] = "light";
    Theme["Dark"] = "dark";
    Theme["Auto"] = "auto";
})(Theme || (Theme = {}));
setTheme(Theme.Dark); // "Setting theme to dark"
// Example 15: Getting All Enum Values
var Fruit;
(function (Fruit) {
    Fruit["Apple"] = "apple";
    Fruit["Banana"] = "banana";
    Fruit["Orange"] = "orange";
})(Fruit || (Fruit = {}));
function getAllFruits() {
    return Object.values(Fruit);
}
console.log("All fruits:", getAllFruits()); // ["apple", "banana", "orange"]
// Example 16: Getting All Enum Keys
function getAllFruitKeys() {
    return Object.keys(Fruit).filter(key => isNaN(Number(key)));
}
console.log("All fruit keys:", getAllFruitKeys()); // ["Apple", "Banana", "Orange"]
// Example 17: Enum Comparison
var Size;
(function (Size) {
    Size["Small"] = "S";
    Size["Medium"] = "M";
    Size["Large"] = "L";
})(Size || (Size = {}));
function compareSizes(size1, size2) {
    if (size1 === size2) {
        return "Sizes are equal";
    }
    return "Sizes are different";
}
console.log("Compare same sizes:", compareSizes(Size.Medium, Size.Medium)); // "Sizes are equal"
console.log("Compare different sizes:", compareSizes(Size.Small, Size.Large)); // "Sizes are different"
// Example 18: Enum with Default Value
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Error"] = 0] = "Error";
    LogLevel[LogLevel["Warn"] = 1] = "Warn";
    LogLevel[LogLevel["Info"] = 2] = "Info";
    LogLevel[LogLevel["Debug"] = 3] = "Debug";
})(LogLevel || (LogLevel = {}));
function log(message, level = LogLevel.Info) {
    console.log(`[${LogLevel[level]}] ${message}`);
}
log("This is an info message"); // "[Info] This is an info message"
log("This is an error", LogLevel.Error); // "[Error] This is an error"
// Example 19: Enum in Array
var TaskPriority;
(function (TaskPriority) {
    TaskPriority[TaskPriority["Low"] = 1] = "Low";
    TaskPriority[TaskPriority["Normal"] = 2] = "Normal";
    TaskPriority[TaskPriority["High"] = 3] = "High";
    TaskPriority[TaskPriority["Urgent"] = 4] = "Urgent";
})(TaskPriority || (TaskPriority = {}));
let tasks = [
    { title: "Fix bug", priority: TaskPriority.Urgent },
    { title: "Write docs", priority: TaskPriority.Normal },
    { title: "Clean code", priority: TaskPriority.Low },
];
function getUrgentTasks(tasks) {
    return tasks
        .filter(task => task.priority === TaskPriority.Urgent)
        .map(task => task.title);
}
console.log("Urgent tasks:", getUrgentTasks(tasks)); // ["Fix bug"]
// Example 20: Advanced Bitwise Operations
var UserPermissions;
(function (UserPermissions) {
    UserPermissions[UserPermissions["None"] = 0] = "None";
    UserPermissions[UserPermissions["Read"] = 1] = "Read";
    UserPermissions[UserPermissions["Write"] = 2] = "Write";
    UserPermissions[UserPermissions["Delete"] = 4] = "Delete";
    UserPermissions[UserPermissions["Admin"] = 7] = "Admin";
})(UserPermissions || (UserPermissions = {}));
class UserPermissionsManager {
    permissions;
    constructor(permissions = UserPermissions.None) {
        this.permissions = permissions;
    }
    hasPermission(permission) {
        return (this.permissions & permission) === permission;
    }
    addPermission(permission) {
        this.permissions |= permission;
    }
    removePermission(permission) {
        this.permissions &= ~permission;
    }
    getPermissions() {
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
var Role;
(function (Role) {
    Role[Role["Admin"] = 0] = "Admin";
    Role[Role["User"] = 1] = "User";
    Role[Role["Guest"] = 2] = "Guest";
})(Role || (Role = {}));
const userRole = Role.Admin;
console.log("User role:", userRole); // 0
// String enum
var StatusCode;
(function (StatusCode) {
    StatusCode["Success"] = "SUCCESS";
    StatusCode["Error"] = "ERROR";
    StatusCode["Pending"] = "PENDING";
})(StatusCode || (StatusCode = {}));
const currentStatus = StatusCode.Success;
console.log("Current status:", currentStatus); // "SUCCESS"
// Enum with custom values
var HTTPStatus;
(function (HTTPStatus) {
    HTTPStatus[HTTPStatus["OK"] = 200] = "OK";
    HTTPStatus[HTTPStatus["BadRequest"] = 400] = "BadRequest";
    HTTPStatus[HTTPStatus["Unauthorized"] = 401] = "Unauthorized";
    HTTPStatus[HTTPStatus["NotFound"] = 404] = "NotFound";
})(HTTPStatus || (HTTPStatus = {}));
function getStatusMessage(status) {
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
//# sourceMappingURL=M06V08.js.map