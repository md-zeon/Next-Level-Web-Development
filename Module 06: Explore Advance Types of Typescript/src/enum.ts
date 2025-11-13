// type UserRoles = "admin" | "editor" | "viewer";

enum UserRoles {
	Admin = "admin",
	Editor = "editor",
	Viewer = "viewer",
}

const canEdit = (role: UserRoles): boolean => {
	return role === UserRoles.Admin || role === UserRoles.Editor;
};

const isEditPermitted = canEdit(UserRoles.Editor); // true
console.log(`Is edit permitted: ${isEditPermitted}`);
