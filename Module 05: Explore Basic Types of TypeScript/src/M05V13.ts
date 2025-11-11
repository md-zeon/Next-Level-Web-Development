// nullabble types

const getUser = (input: string | null) => {
	if (input) {
		console.log("User found from DB: ", input);
	} else {
		console.log("From DB: all users");
	}
};

getUser("John");

getUser(null);

// unknown type

const discountCalculator = (input: unknown) => {
	if (typeof input === "number") {
		console.log("Discount calculated: ", input * 0.1);
	} else if (typeof input === "string") {
		const [discountedPrice] = input.split(" ");
		const discount = Number(discountedPrice) * 0.1;
		console.log("Discount calculated: ", discount);
	} else {
		console.log("Invalid input");
	}
};

discountCalculator(100);
discountCalculator("100 TK");
discountCalculator(null);

// void

const logMessage = (message: string): void => {
	console.log("Log message: ", message);
};

logMessage("This is a log message");

const throwError = (msg: string): never => {
	throw new Error(msg);
};

throwError("This is an error message");
