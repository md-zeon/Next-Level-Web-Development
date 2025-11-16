// Problem 01:

type formatValueType = string | number | boolean;

const formatValue = (value: formatValueType): formatValueType | undefined => {
	if (typeof value === "string") {
		return value.toUpperCase();
	} else if (typeof value === "number") {
		return value * 10;
	} else if (typeof value === "boolean") {
		return !value;
	}
};

// console.log(formatValue("hello"));
// console.log(formatValue(5));
// console.log(formatValue(true));
