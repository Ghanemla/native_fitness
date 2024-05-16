import { Quest } from "../data";

declare global {
	declare namespace sqlDb {
		interface user {
			user_id: number;
			user_tok: string;
			user_bag: string; // "i,i,..." (unlocked items)
			user_equipped: string; // "i,i,i,i"
			user_hero: string;
			user_int: number;
			user_stamina: number;
			user_strength: number;
		}
		interface quest {
			user_id: number;
			quest_id: number;
			quest_done_count: number;
			quest_active: 0|1; // 0=done today
		}
	}

	interface UserState {
		isLoading: boolean;
		tok: string;
		heroName: string;
		bag: string[];
		equipped: [string?, string?, string?, string?];
		todayQuests: Quest[];
	}
}
