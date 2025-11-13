"use strict";
// type UserRoles = "admin" | "editor" | "viewer";
Object.defineProperty(exports, "__esModule", { value: true });
// enum UserRoles {
// 	Admin = "admin",
// 	Editor = "editor",
// 	Viewer = "viewer",
// }
const UserRoles = {
    Admin: "admin",
    Editor: "editor",
    Viewer: "viewer",
};
// UserRoles.Admin = "superadmin"; //! Error: Cannot assign to 'Admin' because it is a read-only property.
/*

{
    readonly Admin: "admin";
    readonly Editor: "editor";
    readonly Viewer: "viewer";
}
    1. typeof operator gets the type of the object
    2. keyof operator gets the keys of the object as a union type

    const user = {
        id: 1,
        name: "John Doe",
    };

    typeof user; // { id: number; name: string; }
    keyof typeof user; // "id" | "name"

    typeof UserRoles; // { readonly Admin: "admin"; readonly Editor: "editor"; readonly Viewer: "viewer"; }
    keyof typeof UserRoles; // "Admin" | "Editor" | "Viewer"
 */
const canEdit = (role) => {
    return role === UserRoles.Admin || role === UserRoles.Editor;
};
const isEditPermitted = canEdit(UserRoles.Editor); // true
console.log(`Is edit permitted: ${isEditPermitted}`);
//# sourceMappingURL=asConst.js.map