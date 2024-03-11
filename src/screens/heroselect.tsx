import { useState, useRef } from 'react';
import { useDispatch } from "react-redux"
import { db } from "./splash";
import { setTok, setHero } from "../redux/app_store"
import { heroes, Heroes } from "../data";
import {StyleSheet, Text, Image, View, FlatList, useWindowDimensions, Animated } from 'react-native';
import PButton from "../components/pbutton";

export default function ScreenHeroSelect() {
	const dispatch = useDispatch();
	const scrollX = useRef(new Animated.Value(0)).current;
	const [listIdx, setScrollIdx] = useState(0);
	const listRef = useRef(null);
	console.log("listIdx", listIdx);
	console.log("scrollX", scrollX);

	function handleSelect() {
		//navigation.navigate("home", {hero: heroes[listIdx]})
		const hero_name = heroes[listIdx].name;
		db.transactionAsync(async tx => {
			//tx.executeSqlAsync(`INSERT INTO prefs(user_id, pref_hero) VALUES(0, ?) ON CONFLICT (pref_id) DO UPDATE SET pref_hero = excluded.pref_hero`, [hero_name]);
			const a = await tx.executeSqlAsync(`INSERT INTO prefs(pref_hero) VALUES(?);`, [hero_name]);
			const b = await tx.executeSqlAsync(`UPDATE users SET user_tok = '123' WHERE (user_id = 1);`, []);
			console.log(a);
			console.log(b);
			
			if (a.rowsAffected == 1 && b.rowsAffected == 1) { // use: (res.rowsAffected > 0)
				dispatch(setHero(hero_name));
				dispatch(setTok("123"));
			}
		}, false).catch(e => console.log("ERR:",e));
	}
	
	return (
		<View style={{flex: 1}}>
			<View style={{flex: 5}}>
				<FlatList data={heroes} keyExtractor={i => i.name} renderItem={({item}) => <RenderHero item={item}/>}
				style={{flex: 1}}
				horizontal showsHorizontalScrollIndicator={false} pagingEnabled bounces={false}
				onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {useNativeDriver: false})}
				onViewableItemsChanged={(info) => setScrollIdx(info.viewableItems[0].index!)}
				ref={listRef}
				/>
				<Paginate data={heroes} scrollX={scrollX}/>
			</View>
			<View style={{flex: 1, justifyContent: "space-evenly", alignItems: "center"}}>
				<PButton title="Select Hero" onPress={handleSelect} style={{width: 200}}/>
				<Text>Note: Training is adapted based on the Hero</Text>
			</View>
		</View>
	);
}

function RenderHero({item}:{item: Heroes}) {
	const width = useWindowDimensions().width;
	console.log("HERROOO:",item)

	return (
		<View style={{flex: 1, width: width}}>
			<Image style={{flex: 1, width: "100%"}} source={item.img}/>
			<View style={{flex: 1, justifyContent: "space-evenly", alignItems: "center"}}>
				<Text style={styles.highlight}>{item.name}</Text>
				<Text>{item.desc}</Text>
			</View>
		</View>
	);
}

function Paginate({data, scrollX}:{data: Heroes[], scrollX: Animated.Value}) {
	const width = useWindowDimensions().width;
	console.log("X:", scrollX);
	return (
		<View style={{flexDirection: "row", height: 60, justifyContent: "center"}}>
			{(() => {
				let x:React.JSX.Element[] = []
				for (let i=0; i<data.length; i++) {
					const inputRange = [(i-1) * width, i * width, (i+1) * width];
					console.log(inputRange);
					const dotW = scrollX.interpolate({
						inputRange,
						outputRange: [10,20,10],
						extrapolate: "clamp",
					});
					const dotA = scrollX.interpolate({
						inputRange,
						outputRange: [0.4,1,0.4],
						extrapolate: "clamp",
					});
					x.push(<Animated.View style={[styles.dot, {width: dotW, opacity: dotA}]}key={i}/>);
				}
				return x;
			})()}
		</View>
	);
}

const styles = StyleSheet.create({
	highlight: {
		fontWeight: "700",
		fontSize: 24
	},
	dot: {
		height: 10,
		borderRadius: 5,
		marginHorizontal: 8,
		backgroundColor: "darkorange"
	}
});
