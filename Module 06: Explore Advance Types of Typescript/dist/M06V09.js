"use strict";
// Using `as const` instead of enum in TypeScript
// `as const` provides enum-like behavior with better performance and flexibility
Object.defineProperty(exports, "__esModule", { value: true });
// Example 1: Simple String Constants
const Status = {
    Pending: "pending",
    Approved: "approved",
    Rejected: "rejected",
};
function updateStatus(status) {
    console.log(`Status updated to: ${status}`);
}
updateStatus(Status.Approved); // ✅ Valid
console.log("Available statuses:", Object.values(Status)); // ["pending", "approved", "rejected"]
// Example 2: Mixed Types Configuration
const Config = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3,
    enabled: true,
};
// All properties are literal types
const apiUrl = Config.apiUrl;
const timeout = Config.timeout;
console.log("API URL:", apiUrl);
console.log("Timeout:", timeout);
// Example 3: Nested Objects (Theme)
const Theme = {
    colors: {
        primary: "#007bff",
        secondary: "#6c757d",
        success: "#28a745",
        danger: "#dc3545",
    },
    spacing: {
        small: "8px",
        medium: "16px",
        large: "24px",
        xlarge: "32px",
    },
    fonts: {
        size: {
            small: "12px",
            medium: "16px",
            large: "20px",
        },
        family: "Arial, sans-serif",
    },
};
// Deeply nested literal types
const primaryColor = Theme.colors.primary;
const smallSpacing = Theme.spacing.small;
const mediumFontSize = Theme.fonts.size.medium;
console.log("Primary color:", primaryColor);
console.log("Small spacing:", smallSpacing);
console.log("Medium font size:", mediumFontSize);
// Example 4: Array with `as const` (Days of Week)
const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
function isWeekend(day) {
    return day === "Saturday" || day === "Sunday";
}
function getDayNumber(day) {
    return Days.indexOf(day) + 1;
}
console.log("Is Saturday weekend?", isWeekend("Saturday")); // true
console.log("Is Monday weekend?", isWeekend("Monday")); // false
console.log("Day number of Wednesday:", getDayNumber("Wednesday")); // 3
// Example 5: Function Actions (Redux-like)
const createAction = (type, payload) => ({
    type,
    payload,
});
const actions = {
    increment: () => createAction("INCREMENT"),
    decrement: () => createAction("DECREMENT"),
    setValue: (value) => createAction("SET_VALUE", value),
    reset: () => createAction("RESET"),
};
function reducer(state, action) {
    switch (action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        case "SET_VALUE":
            return action.payload;
        case "RESET":
            return 0;
        default:
            return state;
    }
}
let state = 0;
state = reducer(state, actions.increment()); // 1
state = reducer(state, actions.setValue(10)); // 10
state = reducer(state, actions.decrement()); // 9
console.log("Final state:", state); // 9
// Example 6: API Endpoints
const API_ENDPOINTS = {
    users: "/api/users",
    posts: "/api/posts",
    comments: "/api/comments",
    auth: {
        login: "/api/auth/login",
        logout: "/api/auth/logout",
        refresh: "/api/auth/refresh",
        register: "/api/auth/register",
    },
    admin: {
        dashboard: "/api/admin/dashboard",
        users: "/api/admin/users",
    },
};
function fetchData(endpoint) {
    console.log(`Fetching from: ${endpoint}`);
    // return fetch(endpoint);
    return Promise.resolve({ data: "mock data" });
}
// Type-safe API calls
fetchData(API_ENDPOINTS.users); // ✅
fetchData(API_ENDPOINTS.auth.login); // ✅
fetchData(API_ENDPOINTS.admin.dashboard); // ✅
// Example 7: Event Types
const Events = {
    USER_CREATED: "user_created",
    USER_UPDATED: "user_updated",
    USER_DELETED: "user_deleted",
    POST_CREATED: "post_created",
    POST_LIKED: "post_liked",
    POST_COMMENTED: "post_commented",
    COMMENT_LIKED: "comment_liked",
};
function emitEvent(event) {
    console.log(`Event emitted: ${event.type} by user ${event.userId}`);
}
emitEvent({
    type: Events.USER_CREATED,
    payload: { userId: 123, name: "John Doe" },
    timestamp: new Date(),
    userId: 123,
});
emitEvent({
    type: Events.POST_LIKED,
    payload: { postId: 456, userId: 123 },
    timestamp: new Date(),
    userId: 123,
});
// Example 8: HTTP Methods
const HTTP_METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    PATCH: "PATCH",
    HEAD: "HEAD",
    OPTIONS: "OPTIONS",
};
function makeRequest(config) {
    console.log(`${config.method} ${config.url}`);
    // return fetch(config.url, { method: config.method, headers: config.headers, body: config.body });
    return Promise.resolve({ status: 200, data: "success" });
}
makeRequest({
    method: HTTP_METHODS.POST,
    url: "/api/users",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "John" }),
});
makeRequest({
    method: HTTP_METHODS.GET,
    url: "/api/users/123",
});
// Example 9: State Machine (Order Status)
const OrderStatus = {
    Pending: "pending",
    Confirmed: "confirmed",
    Processing: "processing",
    Shipped: "shipped",
    Delivered: "delivered",
    Cancelled: "cancelled",
    Refunded: "refunded",
};
const StatusTransitions = {
    [OrderStatus.Pending]: [OrderStatus.Confirmed, OrderStatus.Cancelled],
    [OrderStatus.Confirmed]: [OrderStatus.Processing, OrderStatus.Cancelled],
    [OrderStatus.Processing]: [OrderStatus.Shipped, OrderStatus.Cancelled],
    [OrderStatus.Shipped]: [OrderStatus.Delivered],
    [OrderStatus.Delivered]: [OrderStatus.Refunded],
    [OrderStatus.Cancelled]: [],
    [OrderStatus.Refunded]: [],
};
function canTransition(from, to) {
    const allowedTransitions = StatusTransitions[from];
    return allowedTransitions.includes(to);
}
function getNextStatuses(currentStatus) {
    return StatusTransitions[currentStatus];
}
console.log("Can transition from Pending to Confirmed?", canTransition(OrderStatus.Pending, OrderStatus.Confirmed)); // true
console.log("Can transition from Delivered to Shipped?", canTransition(OrderStatus.Delivered, OrderStatus.Shipped)); // false
console.log("Next statuses from Processing:", getNextStatuses(OrderStatus.Processing)); // ["shipped", "cancelled"]
// Example 10: Configuration with Validation
const AppConfig = {
    environment: "production",
    version: "1.2.3",
    features: {
        darkMode: true,
        notifications: false,
        analytics: true,
        chat: false,
        search: true,
    },
    limits: {
        maxUsers: 1000,
        maxPosts: 500,
        maxComments: 100,
        maxLikes: 50,
    },
    api: {
        baseUrl: "https://api.example.com",
        timeout: 30000,
        retries: 3,
    },
};
// Type-safe configuration access
function isFeatureEnabled(feature) {
    return AppConfig.features[feature];
}
function getLimit(limit) {
    return AppConfig.limits[limit];
}
function getApiConfig() {
    return AppConfig.api;
}
console.log("Is dark mode enabled?", isFeatureEnabled("darkMode")); // true
console.log("Is chat enabled?", isFeatureEnabled("chat")); // false
console.log("Max posts limit:", getLimit("maxPosts")); // 500
console.log("API config:", getApiConfig());
// Example 11: User Roles and Permissions
const UserRoles = {
    Admin: "admin",
    Moderator: "moderator",
    User: "user",
    Guest: "guest",
};
const Permissions = {
    Read: "read",
    Write: "write",
    Delete: "delete",
    Moderate: "moderate",
    Admin: "admin",
};
const RolePermissions = {
    [UserRoles.Admin]: [Permissions.Read, Permissions.Write, Permissions.Delete, Permissions.Moderate, Permissions.Admin],
    [UserRoles.Moderator]: [Permissions.Read, Permissions.Write, Permissions.Moderate],
    [UserRoles.User]: [Permissions.Read, Permissions.Write],
    [UserRoles.Guest]: [Permissions.Read],
};
function hasPermission(userRole, permission) {
    const userPermissions = RolePermissions[userRole];
    return userPermissions.includes(permission);
}
function getUserPermissions(userRole) {
    return RolePermissions[userRole];
}
console.log("Admin has delete permission?", hasPermission(UserRoles.Admin, Permissions.Delete)); // true
console.log("User has moderate permission?", hasPermission(UserRoles.User, Permissions.Moderate)); // false
console.log("Moderator permissions:", getUserPermissions(UserRoles.Moderator));
// Example 12: Database Schema Types
const TableNames = {
    Users: "users",
    Posts: "posts",
    Comments: "comments",
    Likes: "likes",
};
const ColumnNames = {
    [TableNames.Users]: {
        id: "id",
        name: "name",
        email: "email",
        role: "role",
        createdAt: "created_at",
    },
    [TableNames.Posts]: {
        id: "id",
        title: "title",
        content: "content",
        authorId: "author_id",
        createdAt: "created_at",
    },
};
function getColumnName(table, column) {
    const tableColumns = ColumnNames[table];
    if (tableColumns) {
        return tableColumns[column];
    }
    return undefined;
}
console.log("Users table id column:", getColumnName(TableNames.Users, "id")); // "id"
console.log("Posts table title column:", getColumnName(TableNames.Posts, "title")); // "title"
// Example 13: Error Codes
const ErrorCodes = {
    // Authentication errors
    INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
    TOKEN_EXPIRED: "TOKEN_EXPIRED",
    INSUFFICIENT_PERMISSIONS: "INSUFFICIENT_PERMISSIONS",
    // Validation errors
    REQUIRED_FIELD_MISSING: "REQUIRED_FIELD_MISSING",
    INVALID_FORMAT: "INVALID_FORMAT",
    VALUE_OUT_OF_RANGE: "VALUE_OUT_OF_RANGE",
    // Server errors
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
    DATABASE_ERROR: "DATABASE_ERROR",
    EXTERNAL_SERVICE_ERROR: "EXTERNAL_SERVICE_ERROR",
};
function createError(code, message, details) {
    return { code, message, details };
}
function getErrorMessage(error) {
    return `[${error.code}] ${error.message}`;
}
const authError = createError(ErrorCodes.INVALID_CREDENTIALS, "Invalid username or password");
const validationError = createError(ErrorCodes.REQUIRED_FIELD_MISSING, "Email is required");
console.log("Auth error:", getErrorMessage(authError));
console.log("Validation error:", getErrorMessage(validationError));
// Example 14: File Types and Extensions
const FileTypes = {
    Image: "image",
    Document: "document",
    Video: "video",
    Audio: "audio",
    Archive: "archive",
};
const FileExtensions = {
    [FileTypes.Image]: ["jpg", "jpeg", "png", "gif", "webp", "svg"],
    [FileTypes.Document]: ["pdf", "doc", "docx", "txt", "rtf"],
    [FileTypes.Video]: ["mp4", "avi", "mov", "wmv", "flv"],
    [FileTypes.Audio]: ["mp3", "wav", "flac", "aac", "ogg"],
    [FileTypes.Archive]: ["zip", "rar", "7z", "tar", "gz"],
};
function getFileTypeFromExtension(extension) {
    for (const [fileType, extensions] of Object.entries(FileExtensions)) {
        if (extensions.includes(extension.toLowerCase())) {
            return fileType;
        }
    }
    return null;
}
function isValidExtension(fileType, extension) {
    const extensions = FileExtensions[fileType];
    return extensions.some(ext => ext === extension.toLowerCase());
}
console.log("File type of 'jpg':", getFileTypeFromExtension("jpg")); // "image"
console.log("File type of 'pdf':", getFileTypeFromExtension("pdf")); // "document"
console.log("Is 'mp4' a valid video extension?", isValidExtension(FileTypes.Video, "mp4")); // true
console.log("Is 'exe' a valid document extension?", isValidExtension(FileTypes.Document, "exe")); // false
// Example 15: Comparison with Enum (showing both approaches)
var DirectionEnum;
(function (DirectionEnum) {
    DirectionEnum["Up"] = "UP";
    DirectionEnum["Down"] = "DOWN";
    DirectionEnum["Left"] = "LEFT";
    DirectionEnum["Right"] = "RIGHT";
})(DirectionEnum || (DirectionEnum = {}));
const DirectionConst = {
    Up: "UP",
    Down: "DOWN",
    Left: "LEFT",
    Right: "RIGHT",
};
// Enum approach
function moveWithEnum(direction) {
    return `Moving ${direction}`;
}
// as const approach
function moveWithConst(direction) {
    return `Moving ${direction}`;
}
// Both work similarly, but as const has better performance
console.log("Enum approach:", moveWithEnum(DirectionEnum.Up));
console.log("as const approach:", moveWithConst(DirectionConst.Up));
// End of `as const` examples in TypeScript
// Instructor's examples
// Basic as const usage
const Colors = {
    Red: "red",
    Green: "green",
    Blue: "blue",
};
const favoriteColor = Colors.Red;
console.log("Favorite color:", favoriteColor);
// API endpoints with as const
const Endpoints = {
    users: "/api/users",
    posts: "/api/posts",
    comments: "/api/comments",
};
function apiCall(endpoint) {
    console.log(`Calling ${endpoint}`);
}
apiCall(Endpoints.users);
apiCall(Endpoints.posts);
// Configuration object
const AppSettings = {
    theme: "dark",
    language: "en",
    notifications: true,
};
// Note: With as const, the function is very restrictive
// This demonstrates the trade-off - more type safety but less flexibility
function updateSetting(key, value) {
    console.log(`Updated ${key} to ${value}`);
}
// These would work if we had the exact literal types:
// updateSetting("theme", "dark"); // Would work
// updateSetting("notifications", true); // Would work
// But these don't work because of the literal types:
// updateSetting("theme", "light"); // Error: "light" !== "dark"
// updateSetting("notifications", false); // Error: false !== true
console.log("App settings:", AppSettings);
//# sourceMappingURL=M06V09.js.map