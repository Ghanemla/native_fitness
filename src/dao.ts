import { db } from "./screens/splash";

class SqlDao {
	saveEq(eq:string[]) {
		db.transactionAsync(async tx => {
			const res = await tx.executeSqlAsync(`UPDATE users SET user_equipped = ? WHERE user_id = 1`, [eq.join(',')]);
			console.log("saveEq:", res);
		}, false);
	}

	saveQuest(qId:number, int:number, sta:number, str:number) {
		db.transactionAsync(async tx => {
			const res = await tx.executeSqlAsync(`INSERT OR IGNORE INTO quests(quest_id, user_id) VALUES(?, 1);`, [qId]);
			if (res.rowsAffected == 0) { // Row exists
				tx.executeSqlAsync(`UPDATE quests SET quest_done_count = quest_done_count + 1 WHERE quest_id = ?;`, [qId]);
			}
			tx.executeSqlAsync(`UPDATE users SET user_int = user_int + ?, user_stamina = user_stamina + ?, user_strength = user_strength + ? WHERE user_id = 1`, [int, sta, str]);
		}, false);
	}

	async getQuestId() {
		type QIds = {quest_id: number}[];
		let qIds:QIds = [];

		await db.transactionAsync(async tx => {
			const res = await tx.executeSqlAsync(`SELECT quest_id FROM quests;`);
			qIds = res.rows as QIds;
		}, true);

		return qIds.map(q => q.quest_id);
	}
}

export default new SqlDao();
