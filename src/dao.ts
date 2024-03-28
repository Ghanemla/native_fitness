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

  async getUserStats() {
    let stats = { strength: 0, stamina: 0, intelligence: 0 };

    await db.transactionAsync(async tx => {
      const res = await tx.executeSqlAsync(`SELECT user_strength, user_stamina, user_int FROM users WHERE user_id = 1`);
      if (res.rows.length > 0) {
        stats = {
          strength: res.rows[0].user_strength,
          stamina: res.rows[0].user_stamina,
          intelligence: res.rows[0].user_int,
        };
      }
    }, true);

    return stats;
  }
}

export default new SqlDao();