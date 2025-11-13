"use strict";
// type UserRoles = "admin" | "editor" | "viewer";
Object.defineProperty(exports, "__esModule", { value: true });
var UserRoles;
(function (UserRoles) {
    UserRoles["Admin"] = "admin";
    UserRoles["Editor"] = "editor";
    UserRoles["Viewer"] = "viewer";
})(UserRoles || (UserRoles = {}));
const canEdit = (role) => {
    return role === UserRoles.Admin || role === UserRoles.Editor;
};
const isEditPermitted = canEdit(UserRoles.Editor); // true
console.log(`Is edit permitted: ${isEditPermitted}`);
//# sourceMappingURL=enum.js.map