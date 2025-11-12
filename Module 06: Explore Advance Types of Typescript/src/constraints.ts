// Constraints in Generics

type Student = {
	id: number;
	name: string;
};

const addStudentToCourse = <T extends Student>(studentInfo: T) => {
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

const student3 = {
	id: 789,
	name: "Charlie",
	hasWatch: true,
};

console.log(addStudentToCourse(student1));
console.log(addStudentToCourse(student2));
console.log(addStudentToCourse(student3));
