import { useRef } from "react";
import { useSelector } from "react-redux"
import { heroes, items, statColors } from "../data";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, Image, View } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import PButton from "../components/pbutton";

type Props = NativeStackScreenProps<RootStackParamList, "homeMain">

const strImg = require("../assets/stats/strength.png");
const staImg = require("../assets/stats/race.png");
const intImg = require("../assets/stats/brain.png");

export default function ScreenHome({navigation}:Props):React.JSX.Element {
	const user = useSelector(state => state.user);
	const hero = useRef(heroes.filter((h) => h.name === user.heroName)[0]).current
	const usrItems = user.equipped.map(key => {
		return items[items.findIndex(i => i.key === key)]
	});

	function handleInventory() {
		navigation.navigate("inventory");
	}

	function redux() {
		console.log("R:", JSON.stringify(user, null , 4));
	}

	return (
		<View style={{flex: 1, backgroundColor: "#eee"}}>
			<View style={{alignItems: "center", marginHorizontal: 30, marginTop: 20}}>
				<Image source={hero.img} style={styles.icon}/>
				<Text style={{fontWeight: "bold", marginTop: 10}}>{hero.name}</Text>
				<Text>My Swamp</Text>
				<PButton title="Inventory" onPress={handleInventory} style={{marginVertical: 18}}/>
				<PButton title="redux" onPress={redux}/>
				<View style={{flexDirection: "row", width: "100%", justifyContent: "space-evenly"}}>
					{["Primary", "Secondary", "Cloak", "Boots"].map((i, idx) =>
					<View key={i} style={{alignItems: "center"}}>
						<Text>{i}</Text>
						{usrItems[idx] && ( <>
							<LinearGradient style={{width: 40, height: 40, borderRadius: 6, justifyContent: "center"}}
							colors={usrItems[idx].stats.length === 1 ? [0,0].map(() => statColors[usrItems[idx].stats[0]]) : usrItems[idx].stats.map(stat => statColors[stat])}
							start={{x: 0, y: 0.5}}
							end={{x: 1, y: 0.5}}
							>
								<Image source={usrItems[idx].img} style={{width: 30, height: 30, alignSelf: "center"}}/>
							</LinearGradient>
							{usrItems[idx].stats.map((stat:string, idx2:number) => {
								const statP = usrItems[idx].statP[idx2];
								return (
							<Text key={idx2}>
								{`${stat.toUpperCase().substring(0, 3)} ${statP > 0 ? '+' : ''}${statP}`}
							</Text>
							)})}
							</>
						)}
					</View>
					)}
				</View>
			</View>

			<View style={{flex: 1, marginVertical: 30, marginHorizontal: 30}}>
				<Text style={styles.h1}>Today</Text>
				<ScrollView style={{marginTop: 10}}>
					{user.todayQuests.length ? user.todayQuests.map((q, qIdx, qArr) =>
					<View key={q.id} style={{...styles.quest, marginBottom: qArr.length - 1 == qIdx ? 0 : 20}}>
						<Text style={{fontSize: 14, marginBottom: 4}}>{q.task.charAt(0).toUpperCase() + q.task.slice(1)}</Text>
						<View style={{flexDirection: "row", alignItems: "center", columnGap: 10}}>
							{q.stats.map((s, sIdx) =>
							<View key={sIdx} style={{flexDirection: "row", alignItems: "center", columnGap: 5}}>
								<Image source={s == "strength" ? strImg : s == "stamina" ? staImg : intImg} style={{width: 10, height: 10}}/>
								<Text style={{fontSize: 10}}>{`${q.statP[sIdx]} ${s.slice(0,3).toUpperCase()}`}</Text>
							</View>
							)}
						</View>
					</View>
					)
					: <Text>Empty ...</Text>
					}
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	icon: {
		width: 200,
		height: 200,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: "black"
	},
	h1: {
		fontSize: 26,
		fontWeight: "bold"
	},
	h2: {
		fontSize: 16,
		fontWeight: "bold"
	},
	quest: {
		justifyContent: "space-between",
		padding: 10,
		backgroundColor: "#b2f2b2",
		borderRadius: 10
	}
});
