export type Character = {
	id: number;
	name: string;
	status: "Alive" | "Dead" | "unknown";
	species: "Human" | "Alien";
	type: string;
	gender: string;
	origin: {
		name: string;
		url: string;
	};
	location: {
		name: string;
		url: string;
	};
	image: string;
	episode: string[];
	url: string;
	created: string;
};

export type CharacterFilter = {
	name?: string;
	status?: string;
	species?: string;
	type?: string;
	gender?: string;
};
