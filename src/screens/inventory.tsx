import { Items, items, statColors } from "../data/index"
import { useState } from "react";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setEq } from "../redux/app_store"
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import PButton from "../components/pbutton";


export default function ScreenInventory() {
	const equipped = useSelector(state => state.user.equipped);
	const dispatch = useDispatch();
	const [selectedItem, setSelectedItem] = useState<Items|null>(null);

	function showItem(name:string) {
		const item = items.find(item => item.name === name);
		if (item) setSelectedItem(item);
	};

	function equipItem() {
		console.log("EQ:",equipped);
		dispatch(setEq({item: selectedItem!.key, idx: selectedItem!.slot as number}));
	}

	function unequipItem() {
		dispatch(setEq({item: "", idx: selectedItem!.slot as number}));
	}

	const renderItem = ({item}:{item: Items}) => (
		<TouchableOpacity style={{flex: 1}} onPress={() => showItem(item.name)}>
			<LinearGradient
			colors={item.stats.length === 1 ? [0,0].map(() => statColors[item.stats[0]]) : item.stats.map(stat => statColors[stat])}
			start={{x: 0, y: 0.5}}
			end={{x: 1, y: 0.5}}
			style={styles.item}
			>
				<Image source={item.img} style={styles.img} />
				<Text style={{color: "white"}}>{item.name}</Text>
				<Text style={{color: "white"}}>
					{item.stats.map((stat, idx) => `${stat.toUpperCase().substring(0, 3)} ${item.statP[idx] > 0 ? '+' : ''}${item.statP[idx]}`).join(' ')}
				</Text>
			</LinearGradient>
		</TouchableOpacity>
	);

	return (
		<View style={{flex: 1}}>
			<View style={{flex: 5}}>
				<FlatList
					data={items}
					renderItem={renderItem}
					keyExtractor={item => item.name}
					numColumns={2}
				/>
			</View>

			<View style={{flex: 2, ...styles.bottomBar}}>
				{selectedItem ? (<>
					<Text style={styles.h1}>{selectedItem.name}</Text>
					<Text style={{color: "white"}}>{selectedItem.desc}</Text>
					{selectedItem.slot !== false && (
						selectedItem.key !== equipped[selectedItem.slot]
						?	<PButton title="Equip" onPress={equipItem} style={{marginTop: "auto", marginBottom: "auto", width: 150}}/>
						:	<PButton title="Unequip" onPress={unequipItem} style={{marginTop: "auto", marginBottom: "auto", width: 150}}/>
					)}
				</>)
				:	<Text style={styles.h1}>Inventory</Text>
				}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	item: {
		borderRadius: 10,
		flex: 1,
		margin: 10, // use rowgap
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	img: {
		width: 50,
		height: 50,
	},
	bottomBar: {
		backgroundColor: "#222255",
		alignItems: "center",
		borderTopLeftRadius: 8,
		borderTopRightRadius:8,
		marginTop: 10
	},
	h1: {
		color: "white",
		fontSize: 26,
		fontWeight: "bold",
		fontStyle: "italic",
		marginVertical: 10
	},
});
