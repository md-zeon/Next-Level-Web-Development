"use strict";
// Generic Function
Object.defineProperty(exports, "__esModule", { value: true });
const createArrayString = (value) => [value];
const createArrayNumber = (value) => [value];
const createArrayBoolean = (value) => [value];
const createArrayWithUserObject = (value) => {
    return [value];
};
console.log(createArrayString("Hello TypeScript"));
console.log(createArrayNumber(42));
console.log(createArrayBoolean(true));
console.log(createArrayWithUserObject({ id: 1, name: "John Doe" }));
// Generic Function with Type Parameter
const createArrayWithUserGeneric = (value) => {
    return [value];
};
console.log(createArrayWithUserGeneric("Hello Generic TypeScript"));
console.log(createArrayWithUserGeneric(42));
console.log(createArrayWithUserGeneric(true));
console.log(createArrayWithUserGeneric({
    id: 2,
    name: "Jane Doe",
}));
console.log(createArrayWithUserGeneric([1, 2, 3, 4, 5]));
// tuple
const createArrayWithTuple = (param1, param2) => {
    return [param1, param2];
};
const createArrayTuplesWithGeneric = (param1, param2) => [
    param1,
    param2,
];
console.log(createArrayWithTuple("TypeScript", 2024));
console.log(createArrayTuplesWithGeneric("Generics", 101));
console.log(createArrayTuplesWithGeneric(true, ["a", "b", "c"]));
const addStudentToCourse = (studentInfo) => {
    return {
        courseName: "Next Level TypeScript",
        ...studentInfo,
    };
};
const student1 = {
    id: 123,
    name: "Alice",
    hasPen: true,
};
const student2 = {
    id: 456,
    name: "Bob",
    hasNotebook: false,
    hasCar: true,
    isMarried: true,
};
console.log(addStudentToCourse(student1));
console.log(addStudentToCourse(student2));
function mergeObjects(obj1, obj2) {
    return { ...obj1, ...obj2 };
}
const merged = mergeObjects({ name: "Alice" }, { age: 30, city: "New York" });
console.log(merged);
//# sourceMappingURL=genericsWithFunction.js.map