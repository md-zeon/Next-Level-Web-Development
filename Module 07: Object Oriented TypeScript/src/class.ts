// oop - class >> object

// class Animal {
// 	name: string;
// 	species: string;
// 	sound: string;

// 	constructor(name: string, species: string, sound: string) {
// 		this.name = name;
// 		this.species = species;
// 		this.sound = sound;
// 	}

// 	// method
// 	makeSound(): string {
// 		return `${this.name} the ${this.species} says ${this.sound}`;
// 	}
// }

// parameter properties
class Animal {
	constructor(
		public name: string,
		public species: string,
		public sound: string,
	) {} // This automatically creates and initializes the properties

	// method
	makeSound(): string {
		return `${this.name} the ${this.species} says ${this.sound}`;
	}
}

const dog = new Animal("German Shepherd", "Dog", "Bark");
const cat = new Animal("Persian", "Cat", "Meow");

console.log(dog); // Animal {name: 'German Shepherd', species: 'Dog', sound: 'Bark'}
console.log("Dog sound:", dog.sound); // Dog sound: Bark
console.log(cat); // Animal {name: 'Persian', species: 'Cat', sound: 'Meow'}
console.log("Cat sound:", cat.sound); // Cat sound: Meow
console.log(dog.makeSound()); // German Shepherd the Dog says Bark
console.log(cat.makeSound()); // Persian the Cat says Meow
