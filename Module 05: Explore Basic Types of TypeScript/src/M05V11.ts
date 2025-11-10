// Union Types

type UserRole = "admin" | "guest" | "user";

const getDashboard = (role: UserRole) => {
	if (role === "admin") {
		return "Access to admin dashboard";
	} else if (role === "user") {
		return "Access to user dashboard";
	} else {
		return "Access to guest dashboard";
	}
};

console.log(getDashboard("admin")); // Access to admin dashboard
console.log(getDashboard("guest")); // Access to guest dashboard
console.log(getDashboard("user")); // Access to user dashboard

// Intersection Types &

type Employee = {
	id: string;
	name: string;
	phoneNo: string;
};

type Manager = {
	designation: string;
	teamSize: number;
};

type ManagementEmployee = Employee & Manager;

const emp1: ManagementEmployee = {
	id: "E001",
	name: "Alice Johnson",
	phoneNo: "123-456-7890",
	designation: "Project Manager",
	teamSize: 10,
};

console.log(emp1);
// {
//   id: 'E001',
//   name: 'Alice Johnson',
//   phoneNo: '123-456-7890',
//   designation: 'Project Manager',
//   teamSize: 10
// }
