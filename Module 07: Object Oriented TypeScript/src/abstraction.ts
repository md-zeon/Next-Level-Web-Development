// oop - abstraction

// idea
// abstraction means hiding unnecessary details and showing only essential features of an object
// helps to reduce complexity and increase efficiency
// focus on what an object does instead of how it does it

/**
 * 1. interface
 * 2. abstract class
 */

// 1. interface
// interface MediaPlayer {
// 	play(): void;
// 	pause(): void;
// 	stop(): void;
// }

// class AudioPlayer implements MediaPlayer {
// 	play(): void {
// 		console.log("Playing audio...");
// 	}
// 	pause(): void {
// 		console.log("Pausing audio...");
// 	}
// 	stop(): void {
// 		console.log("Stopping audio...");
// 	}
// }

// 2. abstract class

abstract class MediaPlayer {
	abstract play(): void;
	abstract pause(): void;
	abstract stop(): void;
}

class AudioPlayer extends MediaPlayer {
	play(): void {
		console.log("Playing audio...");
	}
	pause(): void {
		console.log("Pausing audio...");
	}
	stop(): void {
		console.log("Stopping audio...");
	}
}
// Note: Abstract classes cannot be instantiated directly, they must be extended by other classes.

// now we cannot create instance of abstract class
// const player = new MediaPlayer(); //! Error: Cannot create an instance of an abstract class
const myPlayer = new AudioPlayer();
myPlayer.play();
myPlayer.pause();
myPlayer.stop();
