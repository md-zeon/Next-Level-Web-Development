// mapped Types

// map

const arrayOfNumbers: number[] = [1, 2, 3, 4, 5];

const arrayOfStrings: string[] = ["1", "2", "3", "4", "5"];

const arrayOfStringsUsingMap: string[] = arrayOfNumbers.map((num) =>
	num.toString(),
);

console.log(arrayOfStringsUsingMap); // Output: ['1', '2', '3', '4', '5']

const user = {
	id: 112,
};

type AreaOfNum = {
	height: number;
	width: number;
};

type height = AreaOfNum["height"]; // number

// type AreaOfString = {
// 	height: string;
// 	width: string;
// };

type AreaOfString = {
	[key in keyof AreaOfNum]: string;
};

type AreaOfBoolean = {
	[key in keyof AreaOfNum]: boolean;
};

type Area<T> = {
	[key in keyof T]: T[key];
	// key >> height | width >> string | number
};

/**
 * T >> { height: string; width: string }
 *
 * { height: string; width: string  }['height'] >> string
 * { height: string; width: string  }['width'] >> string
 *
 * Final Type >>
 * {
 *  height: string;
 *  width: string;
 * }
 *
 */
const area1: Area<{ height: string; width: string }> = {
	height: "100px",
	width: "200px",
};
