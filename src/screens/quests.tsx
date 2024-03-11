import { useState } from "react";
import { quests } from "../data";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Image, Alert } from "react-native";

const strImg = require("../assets/stats/strength.png");
const staImg = require("../assets/stats/race.png");
const intImg = require("../assets/stats/brain.png");

export default function ScreenQuests() {
	const [cat, setCat] = useState("medium");

	function handleQuest(q:String) {
		Alert.alert(`Quest "${q}" completed`)
	}

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
				{quests.filter(i => i.cat == cat).map((q, qId, qArr) =>
					<TouchableOpacity key={qId} style={{...styles.quest, marginBottom: qArr.length - 1 == qId ? 0 : 20}}
					onPress={() => handleQuest(q.task)}
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
