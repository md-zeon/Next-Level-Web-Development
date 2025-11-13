// type UserRoles = "admin" | "editor" | "viewer";
var UserRoles;
(function (UserRoles) {
    UserRoles["Admin"] = "admin";
    UserRoles["Editor"] = "editor";
    UserRoles["Viewer"] = "viewer";
})(UserRoles || (UserRoles = {}));
var canEdit = function (role) {
    return role === UserRoles.Admin || role === UserRoles.Editor;
};
var isEditPermitted = canEdit(UserRoles.Editor); // true
console.log("Is edit permitted: ".concat(isEditPermitted));
