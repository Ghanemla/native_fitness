import { useEffect, useState } from "react";
import SqlDao from "../dao";
import { quests, Quest } from "../data";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Image, Alert } from "react-native";

const strImg = require("../assets/stats/strength.png");
const staImg = require("../assets/stats/race.png");
const intImg = require("../assets/stats/brain.png");

export default function ScreenQuests() {
	const [cat, setCat] = useState("medium");
	const [doneQuests, setDoneQuests] = useState<number[]>([]);

	function handleQuest(q:Quest) {
		Alert.alert(`Quest "${q.task}" completed`)

		doneQuests.push(q.id);
		setDoneQuests([...doneQuests]);

		let int = 0, sta = 0, str = 0;
		q.stats.forEach((stat, idx) => {
			if (stat == "int") int = q.statP[idx];
			else if (stat == "stamina") sta = q.statP[idx];
			else if (stat == "strength") str = q.statP[idx];
		});
		SqlDao.saveQuest(q.id, int, sta, str);
	}

	useEffect(() => {
		SqlDao.getQuestId().then(x => setDoneQuests(x));
	}, []);

	return (
		<View style={{flex: 1, paddingHorizontal: 30, alignItems: "center"}}>
			<View style={{marginTop: "20%", marginBottom: "10%"}}>
				<Text style={styles.h1}>Choose your</Text>
				<Text style={{...styles.h1, fontWeight: "bold"}}>Quest</Text>
			</View>
			<View style={{flexDirection: "row", columnGap: 20}}>
				{["easy", "medium", "hard"].map(i =>
				<TouchableOpacity key={i} style={ i == cat ? styles.lvlActive : undefined }>
					<Text style={{fontSize: 20, color: i == cat ? "black" : "gray"}}
					onPress={() => setCat(i)}
					>
						{i == "easy" ? "Easy" : i == "medium" ? "Moderate" : "Intensive"}
					</Text>
				</TouchableOpacity>
				)}
			</View>
			<View style={{flex: 1, width: "100%"}}>
			<ScrollView style={{flex: 1, marginVertical: 20}}>
				{quests.filter(i => i.cat == cat && !doneQuests.includes(i.id)).map((q, qId, qArr) =>
					<TouchableOpacity key={qId} style={{...styles.quest, marginBottom: qArr.length - 1 == qId ? 0 : 20}}
					onPress={() => handleQuest(q)}
					>
						<Text style={{fontSize: 14, marginBottom: 4}}>{q.task.charAt(0).toUpperCase() + q.task.slice(1)}</Text>
						<View style={{flexDirection: "row", alignItems: "center", columnGap: 10}}>
							{q.stats.map((s, sId) =>
							<View key={sId} style={{flexDirection: "row", alignItems: "center", columnGap: 5}}>
								<Image source={s == "strength" ? strImg : s == "stamina" ? staImg : intImg} style={{width: 10, height: 10}}/>
								<Text style={{fontSize: 10}}>{`${q.statP[sId]} ${s.slice(0,3).toUpperCase()}`}</Text>
							</View>
							)}
						</View>
					</TouchableOpacity>
				)}
			</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	h1: {
		fontSize: 50,
	},
	lvlActive: {
		borderBottomWidth: 2,
		borderColor: "black"
	},
	quest: {
		justifyContent: "space-between",
		padding: 10,
		backgroundColor: "#e2e2e2",
		borderRadius: 10
	}
});
