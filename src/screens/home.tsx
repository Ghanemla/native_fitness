import { useRef } from "react";
import { useSelector } from "react-redux"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { heroes, items, statColors } from "../data";
import { ScrollView, StatusBar, StyleSheet, Text, Image, useColorScheme, View } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import PButton from "../components/pbutton";

type Props = NativeStackScreenProps<RootStackParamList, "homeMain">

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
		console.log("R:", user.heroName);
		console.log("R:", user.equipped);
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
					{[1,2,3,4,5,6,7,8].map((i) =>
					<View key={i} style={{flexDirection: "row", alignItems: "center", gap: 30, marginBottom: 8}}>
						<View style={{width: 50, height: 50, backgroundColor: "green"}}>
						</View>
						<View>
							<Text style={styles.h2}>Read a book</Text>
							<Text>1.9 hours</Text>
							<Text>+ STR + STA</Text>
						</View>
					</View>
					)}
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
	}
});
