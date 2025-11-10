"use strict";
// Spread Operator
Object.defineProperty(exports, "__esModule", { value: true });
const friends = ["Rahim", "Karim", "Jabbar"];
console.log("Original friends array:", friends);
const schoolFriends = ["Anwar", "Barkat", "Salam"];
console.log("School friends array:", schoolFriends);
const collegeFriends = ["Kalam", "Rafiq", "Majid"];
console.log("College friends array:", collegeFriends);
friends.push(...schoolFriends);
console.log("Friends after adding school friends:", friends);
friends.push(...collegeFriends);
console.log("Friends after adding college friends:", friends);
const user = {
    name: "Zeon",
    phoneNo: "017XXXXXXXX",
};
const otherInfo = {
    hobby: "Reading",
    favColor: "Blue",
};
const userInfo = { ...user, ...otherInfo };
console.log("Combined user info:", userInfo);
// rest operator
// rest operator to gather arguments into an array
const sendInvitation = (...friends) => {
    friends.forEach((friend) => {
        console.log(`Invitation sent to: ${friend}`);
    });
};
sendInvitation(...friends); // spread operator to pass array elements as individual arguments
//# sourceMappingURL=M05V08.js.map