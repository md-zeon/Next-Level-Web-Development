// OOP : instance of type guard / type narrowing

class Person {
	name: string;

	constructor(name: string) {
		this.name = name;
	}

	getSleep(hours: number) {
		console.log(`${this.name} sleeps for ${hours} hours.`);
	}
}

class Student extends Person {
	constructor(name: string) {
		super(name);
	}

	doStudy(numberOfHours: number) {
		console.log(`${this.name} is studying for ${numberOfHours} hours.`);
	}
}

class Teacher extends Person {
	constructor(name: string) {
		super(name);
	}

	takeClass(numberOfHours: number) {
		console.log(`${this.name} is taking class for ${numberOfHours} hours.`);
	}
}

// function guard using 'instanceof'

const isStudent = (user: Person) => {
	return user instanceof Student; // returns boolean true/false
};

const isTeacher = (user: Person) => {
	return user instanceof Teacher; // returns boolean true/false
};

const getUserInfo = (user: Person) => {
	if (isStudent(user)) {
		user.doStudy(5);
	} else if (isTeacher(user)) {
		user.takeClass(6);
	} else {
		console.log(`${user.name} is neither a Student nor a Teacher.`);
	}
	user.getSleep(8);
};

const student1 = new Student("Mr. Student");
const teacher1 = new Teacher("Mr. Teacher");

getUserInfo(student1);
getUserInfo(teacher1);
