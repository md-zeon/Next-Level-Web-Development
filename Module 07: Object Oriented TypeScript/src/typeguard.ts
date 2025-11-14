// type guard

// in, typeof

type AlphaNumeric = string | number;

function add(num1: AlphaNumeric, num2: AlphaNumeric): AlphaNumeric {
	// return num1 + num2; //! Error: Operator '+' cannot be applied to types 'string | number' and 'string | number'.
	if (typeof num1 === "number" && typeof num2 === "number") {
		return num1 + num2;
	} else {
		return num1.toString() + num2.toString();
	}
}

add(5, 10); // 15

add(2, "2"); // "22"
add("5", 10); // "510"

type NormalUser = {
	name: string;
};

type AdminUser = {
	name: string;
	role: "Admin";
};

const getUserInfo = (user: NormalUser | AdminUser) => {
	// type guard using 'in' // Time complexity: O(1)
	if ("role" in user) {
		console.log("The User's name is", user.name, "And role is", user.role);
	} else {
		console.log("The User's name is", user.name);
	}
};

getUserInfo({ name: "Zeanur Rahaman Zeon", role: "Admin" });
getUserInfo({ name: "Just a Normal User" });
