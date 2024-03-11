import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loaded, setHero, setTok } from "../redux/app_store";
import * as SQLite from "expo-sqlite";
import { Text, StyleSheet, View } from "react-native";

export let db:SQLite.SQLiteDatabase

export default function ScreenSplash() {
	db = SQLite.openDatabase("app.db");
	const dispatch = useDispatch();
	let usr, prefs;

	useEffect(() => {
		db.exec([{sql: 'PRAGMA foreign_keys = ON;', args: []}], false, () => console.log("fk on"));
		db.transaction(tx => {
			tx.executeSql(`CREATE TABLE IF NOT EXISTS users(
				user_id INTEGER PRIMARY KEY,
				user_tok TEXT DEFAULT NULL);`,
			undefined, undefined, (_, e) => {
				console.log("ERR0:",e); return true
			});
			tx.executeSql(`CREATE TABLE IF NOT EXISTS prefs(
				user_id INTEGER PRIMARY KEY,
				pref_hero TEXT NOT NULL,
				FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE);`,
			undefined, undefined, (_, e) => {
				console.log("ERR1:",e); return true
			});


			tx.executeSql(`INSERT INTO users(user_id) SELECT 1 WHERE NOT EXISTS (SELECT 1 FROM users WHERE user_id = 1);`, undefined,
			(_, res) => console.log("Make user:", res),
			(_, e) => { console.log("ERR2:",e); return true; } );

			tx.executeSql(`SELECT * FROM users WHERE (user_id = 1);`, undefined,
			(_, res) => {
				usr = res.rows._array
			}, (_, e) => { console.log("ERR3:", e); return true } );

			tx.executeSql(`SELECT * FROM prefs;`, undefined,
			(_, res) => {
				prefs = res.rows._array
				console.log("USERS:", usr, "\n", "PREFS:", prefs);
			},
			(_, e) => {console.log("ERR4:",e); return true} );

		},
		(e) => console.log("ERR5:",e),
		() => {
			if (usr.length == 0) {
				console.log("NO USER");
			}else {
				console.log("HAVE USER");
				console.log("updating redux: ", prefs[0]?.pref_hero);
				dispatch(setHero(prefs[0]?.pref_hero));
				dispatch(setTok(usr[0]?.user_tok));
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
