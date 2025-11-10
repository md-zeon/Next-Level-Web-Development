"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Destructuring in TypeScript
const user = {
    name: {
        firstName: "Zeanur Rahaman",
        lastName: "Zeon",
    },
    gender: "Male",
    age: 24,
    hobbies: ["Reading", "Traveling", "Coding"],
    favoriteColor: "Blue",
};
const { name: { firstName, lastName }, gender, age, hobbies, favoriteColor, } = user;
console.log(`First Name: ${firstName}`);
console.log(`Last Name: ${lastName}`);
console.log(`Gender: ${gender}`);
console.log(`Age: ${age}`);
console.log(`Hobbies: ${hobbies.join(", ")}`);
console.log(`Favorite Color: ${favoriteColor}`);
const friends = ["Alice", "Bob", "Charlie", "David"];
const [firstFriend, secondFriend, ...otherFriends] = friends;
console.log(`First Friend: ${firstFriend}`);
console.log(`Second Friend: ${secondFriend}`);
console.log(`Other Friends: ${otherFriends.join(", ")}`);
//# sourceMappingURL=M05V09.js.map