declare namespace sqlDb {
	interface user {
		user_id: number;
		user_tok: string;
		user_bag: string; // "i,i,i"
		user_equipped: string; // "i,i,i"
		user_hero: string;
		user_int: number;
		user_stamina: number;
		user_strength: number;
	}
	interface quest {
		user_id: number;
		quest_id: number;
		quest_done_count: number;
		quest_active: number; // 0 or 1 (if 0 then done today)
	}
}
