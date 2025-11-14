"use strict";
// setter getter
Object.defineProperty(exports, "__esModule", { value: true });
class BankAccount {
    userId;
    userName;
    _userBalance;
    constructor(userId, userName, userBalance) {
        this.userId = userId;
        this.userName = userName;
        this._userBalance = userBalance;
    }
    // functional way
    // addBalance(amount: number): void {
    // 	this._userBalance += amount;
    // }
    // getBalance(): number {
    // 	return this._userBalance;
    // }
    // with getter and setter
    set addBalance(amount) {
        this._userBalance = this._userBalance + amount;
    }
    get getBalance() {
        // this._userBalance; //! Error: A 'get' accessor must return a value;
        return this._userBalance;
    }
}
const user1 = new BankAccount(111, "Zeon", 20);
console.log(user1); // BankAccount { userId: 111, userName: 'Zeon', _userBalance: 20 }
user1.addBalance = 200; // using setter: Increment balance by 200
// user1.addBalance(200); // functional way
// console.log(user1.getBalance()); // functional way
console.log(user1); // BankAccount { userId: 111, userName: 'Zeon', _userBalance: 220 }
console.log(user1.getBalance); // 220
//# sourceMappingURL=gettersetter.js.map