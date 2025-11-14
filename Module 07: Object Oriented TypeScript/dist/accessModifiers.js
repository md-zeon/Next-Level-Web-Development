"use strict";
// access >> modify
Object.defineProperty(exports, "__esModule", { value: true });
class BankAccount {
    userId;
    userName;
    userBalance;
    constructor(userId, userName, userBalance) {
        this.userId = userId;
        this.userName = userName;
        this.userBalance = userBalance;
    }
    addBalance(amount) {
        this.userBalance += amount;
    }
    getBalance() {
        return this.userBalance;
    }
}
class StudentBankAccount extends BankAccount {
    constructor(userId, userName, userBalance) {
        super(userId, userName, userBalance);
    }
}
const user1 = new BankAccount(111, "Mezba", 20);
console.log(user1.userId); // 111
console.log(user1.userName); // Mezba
// console.log(user1.userBalance); //! Error: Property 'userBalance' is private and only accessible within class 'BankAccount'.
// user1.userId = 222; //! Error: Cannot assign to 'userId' because it is a read-only property.
console.log(user1.getBalance()); // 20
user1.addBalance(30);
console.log(user1.getBalance()); // 50
//# sourceMappingURL=accessModifiers.js.map