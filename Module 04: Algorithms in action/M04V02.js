// Problem Statement:

// You are given two large arrays, listA and listB, each array contains user objects.
// A user object is generated to have a unique id property (a string) along with other properties like name, email, etc.

// Your task is to write an efficient function that takes both lists as input
// and returns the total count of users that are present in both lists.

//! do not change anything in data setup part

// --------------------- Data Setup ---------------------//
const USER_COUNT = 50000;
let usersA = [];
let usersB = [];

const createUser = (id) => ({
	id: `user_${id}`,
	name: `User ${id}`,
	email: `user_${id}@example.com`,
});

for (let i = 0; i < USER_COUNT; i++) {
	usersA.push(createUser(i));
	usersB.push(createUser(i + 25000)); // Overlapping users from 25000 to 49999
}

// users 25000 to 49999 are common in both lists (total 25000 common users)
// --------------------- Data Setup End ---------------------//

// --------------------- Your Code Here ---------------------//

// --------------------- Algorithm Implementation ---------------------//

// O(n^2) time complexity
const commonFriendsSlow = (usersA, usersB) => {
	const startTime = performance.now();
	const commonFriends = [];

	usersA.forEach((userA) => {
		usersB.forEach((userB) => {
			if (userA.id === userB.id) {
				commonFriends.push(userA);
				// Exit inner loop once a match is found
				return;
			}
		});
	});
	const endTime = performance.now();
	console.log(`Slow common friends found: ${commonFriends.length}`);
	console.log(`Slow algorithm execution time: ${endTime - startTime} ms`);

	return { count: commonFriends.length, timeTaken: endTime - startTime };
};

console.log(commonFriendsSlow(usersA, usersB));

// O(n) time complexity
const commonFriendsFast = (usersA, usersB) => {
	const startTime = performance.now();
	const commonFriends = [];

	// O(n) time complexity to create the set
	const idListA = new Set(usersA.map((user) => user.id));

	// O(n) time complexity
	usersB.forEach((userB) => {
		// O(1) lookup time
		if (idListA.has(userB.id)) {
			commonFriends.push(userB);
		}
	});

	const endTime = performance.now();
	console.log(`Fast common friends found: ${commonFriends.length}`);
	console.log(`Fast algorithm execution time: ${endTime - startTime} ms`);

	return { count: commonFriends.length, timeTaken: endTime - startTime };
};

console.log(commonFriendsFast(usersA, usersB));
