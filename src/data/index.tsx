export interface Heroes { // make global
	name: string;
	desc: string;
	img: any;
}
export const heroes:Heroes[] = [
	{
		name: "Warrior",
		desc: "Argh Argh Argh!",
		img: require("../assets/hero1.png")
	},
	{
		name: "Wizard",
		desc: "wiz wiz wiz",
		img: require("../assets/hero2.png")
	},
	{
		name: "Blade Master",
		desc: "Fast silent deadly, fshooooo",
		img: require("../assets/hero3.png")
	}
]


export interface Boss {
	name: string;
	level: number;
	img: any;
	health: number;
	attack: number;

}
export const bosses:Boss[] = [
	{
		name: "Goblin",
		level: 1,
		img: require("../assets/bosses/goblin1.png"),
		health: 100,
		attack: 10
	},
	{
		name: "Orc",
		level: 2,
		img: require("../assets/bosses/orc1.png"),
		health: 200,
		attack: 20
	},
	{
		name: "Troll",
		level: 3,
		img: require("../assets/bosses/troll1.png"),
		health: 300,
		attack: 30
	},
	{
		name: "Dragon",
		level: 4,
		img: require("../assets/bosses/dragon1.png"),
		health: 400,
		attack: 40
	},
	{
		name: "Demon",
		level: 5,
		img: require("../assets/bosses/demon1.png"),
		health: 500,
		attack: 50
	}
]


type Stat = "int"|"stamina"|"strength"|"hp";

export const statColors:{[k in Stat]: string} = {
	int: "#2baef7",
	stamina: "#81bd44",
	strength: "#cd7f32",
	hp: "#cc3f2f"
};

export interface Items {
	name: string;
	key: string;
	desc: string;
	img: any;
	stats: Stat[];
	statP: number[];
	slot: number|false;
}
export const items:Items[] = [
	{
		name: "Sword",
		key: "Swd",
		img: require("../assets/stats/sword.png"),
		desc: "A sharp sword",
		stats: ["strength"],
		statP: [1],
		slot: 0
	},
	{
		name: "Shield",
		key: "Shd",
		img: require("../assets/stats/shield.png"),
		desc: "A sturdy shield",
		stats: ["stamina", "strength"],
		statP: [1, -3],
		slot: 1
	},
	{
		name: "Cloak",
		key: "Clk",
		img: require("../assets/stats/hood.png"),
		desc: "A magical staff",
		stats: ["int"],
		statP: [3],
		slot: 2
	},
	{
		name: "Boots",
		key: "Bts",
		img: require("../assets/stats/boot.png"),
		desc: "A pair of boots",
		stats: ["stamina"],
		statP: [2],
		slot: 3
	},
	{
		name: "Heal Potion",
		key: "PotHH",
		img: require("../assets/stats/potion.png"),
		desc: "A healing potion",
		stats: ["hp"],
		statP: [30],
		slot: false
	},
	{
		name: "Greater Heal Potion",
		key: "PotHG",
		img: require("../assets/stats/potion.png"),
		desc: "A healing potion",
		stats: ["hp"],
		statP: [100],
		slot: false
	}
]


interface Quests {
	task: string;
	cat: "easy"|"medium"|"hard"
	stats: Stat[];
	statP: number[];
}

export const quests:Quests[] = [
	{
		task: "read a book for 30 minutes",
		cat: "easy",
		stats: ["int"],
		statP: [10]
	},
	{
		task: "take a 20-minute walk in the park",
		cat: "easy",
		stats: ["stamina"],
		statP: [15]
	},
	{
		task: "have a 30-minute conversation with a friend",
		cat: "easy",
		stats: ["int"],
		statP: [15]
	},
	{
		task: "do a 1-minute plank",
		cat: "easy",
		stats: ["strength"],
		statP: [15]
	},
	{
		task: "do 20 push-ups",
		cat: "medium",
		stats: ["strength"],
		statP: [20]
	},
	{
		task: "swim for 40 minutes",
		cat: "medium",
		stats: ["stamina", "strength"],
		statP: [20, 25]
	},
	{
		task: "complete a 20-minute hiit workout",
		cat: "medium",
		stats: ["stamina", "strength"],
		statP: [25, 20]
	},
	{
		task: "solve 3 sudoku puzzles",
		cat: "medium",
		stats: ["int"],
		statP: [15]
	},
	{
		task: "take a yoga class for 45 minutes",
		cat: "medium",
		stats: ["stamina"],
		statP: [20]
	},
	{
		task: "play a sport with friends for 1 hour",
		cat: "medium",
		stats: ["stamina", "strength"],
		statP: [25, 25]
	},
	{
		task: "learn a new language for 30 minutes",
		cat: "medium",
		stats: ["int"],
		statP: [15]
	},
	{
		task: "complete a 30-minute full-body workout",
		cat: "medium",
		stats: ["stamina", "strength"],
		statP: [30, 30]
	},
	{
		task: "do 75 squats",
		cat: "medium",
		stats: ["strength"],
		statP: [35]
	},
	{
		task: "attend a public speaking event or workshop",
		cat: "medium",
		stats: ["int"],
		statP: [25]
	},
	{
		task: "run for 30 minutes",
		cat: "medium",
		stats: ["stamina"],
		statP: [25]
	},
	{
		task: "do 50 sit-ups",
		cat: "medium",
		stats: ["strength"],
		statP: [30]
	},
	{
		task: "dance for 1 hour",
		cat: "medium",
		stats: ["stamina"],
		statP: [30]
	},
	{
		task: "practice mindfulness meditation for 30 minutes",
		cat: "medium",
		stats: ["int"],
		statP: [25]
	},
	{
		task: "write a short story or poem",
		cat: "medium",
		stats: ["int"],
		statP: [20]
	},
	{
		task: "do 100 jumping jacks",
		cat: "medium",
		stats: ["stamina"],
		statP: [20]
	},
	{
		task: "participate in a chess tournament",
		cat: "medium",
		stats: ["int"],
		statP: [20]
	},
	{
		task: "solve a rubik's cube",
		cat: "hard",
		stats: ["int"],
		statP: [35]
	},
	{
		task: "hike for 2 hours",
		cat: "hard",
		stats: ["stamina"],
		statP: [40]
	},
	{
		task: "complete a 10k run",
		cat: "hard",
		stats: ["stamina", "strength"],
		statP: [40, 35]
	},
	{
		task: "attend a self-defense class for 1 hour",
		cat: "hard",
		stats: ["stamina", "strength"],
		statP: [35, 40]
	},
	{
		task: "complete a 50-mile bike ride",
		cat: "hard",
		stats: ["stamina"],
		statP: [50]
	},
	{
		task: "complete a 5k run",
		cat: "hard",
		stats: ["stamina", "strength"],
		statP: [30, 30]
	},
	{
		task: "complete a 1000-piece jigsaw puzzle",
		cat: "hard",
		stats: ["int"],
		statP: [45]
	},
	{
		task: "complete a 10-mile hike",
		cat: "hard",
		stats: ["stamina"],
		statP: [45]
	},
	{
		task: "swim 1 mile",
		cat: "hard",
		stats: ["stamina", "strength"],
		statP: [45, 45]
	}
];
