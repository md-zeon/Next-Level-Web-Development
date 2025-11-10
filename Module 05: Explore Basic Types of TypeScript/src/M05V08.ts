// Spread Operator

const friends: string[] = ["Rahim", "Karim", "Jabbar"];

console.log("Original friends array:", friends);

const schoolFriends: string[] = ["Anwar", "Barkat", "Salam"];
console.log("School friends array:", schoolFriends);

const collegeFriends: string[] = ["Kalam", "Rafiq", "Majid"];

console.log("College friends array:", collegeFriends);

friends.push(...schoolFriends);

console.log("Friends after adding school friends:", friends);

friends.push(...collegeFriends);

console.log("Friends after adding college friends:", friends);

const user: { name: string; phoneNo: string } = {
	name: "Zeon",
	phoneNo: "017XXXXXXXX",
};

const otherInfo: { hobby: string; favColor: string } = {
	hobby: "Reading",
	favColor: "Blue",
};

const userInfo: {
	name: string;
	phoneNo: string;
	hobby: string;
	favColor: string;
} = { ...user, ...otherInfo };

console.log("Combined user info:", userInfo);

// rest operator

// rest operator to gather arguments into an array
const sendInvitation = (...friends: string[]): void => {
	friends.forEach((friend) => {
		console.log(`Invitation sent to: ${friend}`);
	});
};

sendInvitation(...friends); // spread operator to pass array elements as individual arguments
