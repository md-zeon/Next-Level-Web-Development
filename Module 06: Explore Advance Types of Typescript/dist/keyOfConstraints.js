"use strict";
// keyof : type operator
Object.defineProperty(exports, "__esModule", { value: true });
const vehicle1 = "bike";
const vehicle2 = "car";
const user = {
    id: 1,
    name: "John Doe",
    address: {
        city: "New York",
    },
};
const product = {
    id: 1,
    brand: "HP",
    name: "Laptop",
    price: 1000,
    stock: 5,
};
// const myId = user.id;
const myId = user["id"];
const myName = user["name"];
const myAddress = user["address"];
const myCity = user["address"]["city"];
console.log({ myId, myName, myAddress, myCity });
const getPropertyFromObj = (obj, key) => {
    return obj[key];
};
const result = getPropertyFromObj(user, "name");
console.log({ result });
const result2 = getPropertyFromObj(product, "price");
console.log({ result2 });
const result3 = getPropertyFromObj(product, "brand");
console.log({ result3 });
//# sourceMappingURL=keyOfConstraints.js.map