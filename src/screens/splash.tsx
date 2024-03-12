import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loaded, setEq, setHero, setTok } from "../redux/app_store";
import * as SQLite from "expo-sqlite";
import { Text, StyleSheet, View } from "react-native";

export let db:SQLite.SQLiteDatabase

export default function ScreenSplash() {
	db = SQLite.openDatabase("app.db");
	const dispatch = useDispatch();
	let usr: sqlDb.user[], quests: sqlDb.quest[];

	useEffect(() => {
		db.exec([{sql: 'PRAGMA foreign_keys = ON;', args: []}], false, () => console.log("fk on"));
		db.transaction(tx => {
			tx.executeSql(`CREATE TABLE IF NOT EXISTS users(
				user_id INTEGER PRIMARY KEY,
				user_tok TEXT,
				user_bag TEXT,
				user_equipped TEXT NOT NULL DEFAULT '',
				user_hero TEXT,
				user_int INTEGER NOT NULL DEFAULT 5,
				user_stamina INTEGER NOT NULL DEFAULT 5,
				user_strength INTEGER NOT NULL DEFAULT 5);`,
			undefined, undefined, (_, e) => {
				console.log("ERR0:",e); return true
			});
			tx.executeSql(`CREATE TABLE IF NOT EXISTS quests(
				user_id INTEGER NOT NULL,
				quest_id INTEGER PRIMARY KEY,
				quest_done_count INTEGER NOT NULL DEFAULT 0,
				quest_active INTEGER NOT NULL DEFAULT 0,
				FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE);`,
			undefined, undefined, (_, e) => {
				console.log("ERR1:",e); return true
			});

			tx.executeSql(`INSERT INTO users(user_id) SELECT 1 WHERE NOT EXISTS (SELECT 1 FROM users WHERE user_id = 1);`, undefined,
			(_, res) => { console.log("Make user:", res) },
			(_, e) => { console.log("ERR2:",e); return true; } );

			tx.executeSql(`SELECT * FROM users;`, undefined,
			(_, res) => {
				usr = res.rows._array
			}, (_, e) => { console.log("ERR3:", e); return true } );

			tx.executeSql(`SELECT * FROM quests;`, undefined,
			(_, res) => {
				quests = res.rows._array
				console.log("USERS:", usr, "\n", "QUESTS:", quests);
			},
			(_, e) => {console.log("ERR4:",e); return true} );

		},
		(e) => console.log("ERR5:",e),
		() => {
			if (usr.length == 0) {
				console.log("NO USER");
			}else {
				dispatch(setHero(usr[0].user_hero));
				dispatch(setTok(usr[0].user_tok));
				dispatch(setEq(usr[0].user_equipped));
			}
			dispatch(loaded());
		});
	}, []);

	return (
		<View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
			<Text style={styles.h1}>App loading...</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	h1: {
		fontSize: 22,
		fontWeight: "bold",
	}
});
