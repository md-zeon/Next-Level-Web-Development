interface Developer<T, X = null> {
	name: string;
	salary: number;
	device: {
		brand: string;
		model: string;
		releaseYear: number;
	};
	smartWatch: T;
	bike?: X;
}

interface BasicSmartWatch {
	heartRate: string;
	stopWatch: boolean;
}

const poorDeveloper: Developer<BasicSmartWatch> = {
	name: "John Doe",
	salary: 50,
	device: {
		brand: "Lenovo",
		model: "ThinkPad X1 Carbon",
		releaseYear: 2019,
	},
	smartWatch: {
		heartRate: "72 bpm",
		stopWatch: true,
	},
};

interface AdvancedSmartWatch {
	heartRate: string;
	callSupport: boolean;
	calculator: boolean;
	AIFeature: boolean;
}

const richDeveloper: Developer<
	AdvancedSmartWatch,
	{
		brand: string;
		model: string;
		cc: number;
	}
> = {
	name: "Jane Smith",
	salary: 150,
	device: {
		brand: "Apple",
		model: "MacBook Pro",
		releaseYear: 2021,
	},
	smartWatch: {
		heartRate: "68 bpm",
		callSupport: true,
		calculator: true,
		AIFeature: true,
	},
	bike: {
		brand: "Ducati",
		model: "Panigale V4",
		cc: 1103,
	},
};
