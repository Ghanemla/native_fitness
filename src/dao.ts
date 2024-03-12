import { db } from "./screens/splash";

class SqlDao {
	saveEq(eq:string[]) {
		db.transactionAsync(async tx => {
			const res = await tx.executeSqlAsync(`UPDATE users SET user_equipped = ? WHERE user_id = 1`, [eq.join(',')]);
			console.log("saveEq:", res);
		}, false);
	}

	async saveQuest(x:string) {
	}
}

export default new SqlDao();
