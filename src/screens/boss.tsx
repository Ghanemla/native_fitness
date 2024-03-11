import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PButton from '../components/pbutton';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "homeMain">

export default function ScreenBoss({navigation}:Props) {
	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<Text style={styles.Text}>The boss is emerging... Prepare Yourself!</Text>
			</View>
			<PButton title="Start Battle!" onPress={() => navigation.navigate("BossBattle")} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'maroon',

	},

	textContainer: {
		alignItems: 'center',
		marginBottom: 20,
		backgroundColor: 'black',
		width: "90%",
		padding: 10,
		borderRadius: 20,
	},

	Text: {
		fontSize: 20,
		marginBottom: 20,
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	}
});
