import React, { useRef } from "react";
import { db } from "./splash";
import { heroes } from "../data";
import { useDispatch } from "react-redux"
import { useSelectorRS } from "../redux/app_store"
import { logout } from "../redux/app_store";
import { Text, StyleSheet, View, Image } from "react-native";
import PButton from "../components/pbutton";

export default function ScreenSettings() {
	const dispatch = useDispatch();
	const user = useSelectorRS(state => state.user);
	const hero = useRef(heroes.filter((h) => h.name === user.heroName)[0]).current;

	async function dropDb() {
		console.log("In dropDb");

		db.transaction(tx => {
			tx.executeSql(`SELECT * FROM users;`, undefined,
				(_,res) => { console.log("PRE LOGOUT:", res.rows._array) },
				(_,e) => { console.log("ERR",e); return true }
			);
			tx.executeSql(`DROP TABLE users`, undefined,
				(_,res) => console.log("DB DROPPED:", res),
				(_,e) => { console.log("ERR",e); return true }
			);
		},
		(e) => console.log("E",e),
		() => {
			db.closeSync();
			dispatch(logout());
			console.log("LOGGED OUT");
		});
	}

	return (
		<View style={styles.container}>
			<Text style={styles.h1}>SETTINGS</Text>
			<Text style={styles.heroName}>{hero.name}</Text>
			<Image source={hero.img} style={styles.heroImage} />
			<PButton title="Logout" style={styles.btnStyle} onPress={dropDb}/>
		</View>
	);
}

const styles = StyleSheet.create({
	h1: {
		fontSize: 30,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 30,
		marginBottom: 20,
		color: "#CFD8DC"
	},
	btnStyle: {
		marginTop: "auto",
		marginBottom: 20,
		width: "70%",
		alignSelf: "center",
		justifyContent: "center",
		borderRadius: 10,
		backgroundColor: "#90A4AE",
		padding: 10,
		borderWidth: 1,
		borderColor: "#808B96",
	},

	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: "#2c3e50",
	},
	heroName: {
		fontSize: 24,
		fontWeight: 'bold',
		fontFamily: 'monospace',

	},
	heroImage: {
		width: "70%",
		height: "50%",
		borderRadius: 40,
		margin: 20,
		borderColor: "black",
		borderWidth: 2,
		opacity: 0.8
	},
});
