//Problem Statement

//A palindrome is a word, phrase, or sequence of characters that reads the same backward as it does forward.

//Your task is to write a JavaScript function, isPalindrome(str), that takes a string str
//and returns true if the string is a palindrome, and false otherwise.

//The function must work for complex phrases, not just single words. To do this, your function must:
//   Be case-insensitive (i.e., 'R' is treated the same as 'r').
//   Ignore all non-alphanumeric characters (i.e., spaces, punctuation like commas, colons, periods, etc.).

//? Input and Output
// "A man, a plan, a canal: Panama" -> true
// "Level" -> true
// "car" -> false

const isNonAlphaNumeric = (ch) => {
	return !/[a-zA-Z0-9]/.test(ch);
};

const isPalindrome = (str) => {
	let i = 0;
	let j = str.length - 1;

	while (i < j) {
		if (isNonAlphaNumeric(str[i])) {
			i++;
			continue;
		}
		if (isNonAlphaNumeric(str[j])) {
			j--;
			continue;
		}
		if (str[i].toLowerCase() !== str[j].toLowerCase()) {
			return false;
		}
		i++;
		j--;
	}
	return true;
};

//Test Cases
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("Level")); // true
console.log(isPalindrome("car")); // false
console.log(isPalindrome("No 'x' in Nixon")); // true
console.log(isPalindrome("Was it a car or a cat I saw?")); // true
console.log(isPalindrome("12321")); // true
console.log(isPalindrome("12345")); // false
