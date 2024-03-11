import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

interface Props {
	title: string;
	onPress: () => any;
	style?: {[k:string]: string|number};
}

// Consider <TouchableHighlight>
export default function PButton({title, onPress, style}:Props) {
	return (
		<Pressable style={({pressed}) => [
			{opacity: pressed ? 0.7 : 1},
			{...styles.button, ...style}
		]}
		onPress={onPress}>
			<Text style={styles.text}>{title}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 11,
		paddingHorizontal: 20,
		borderRadius: 25,
		elevation: 3,
		backgroundColor: "black",
	},
	text: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "white",
	}
});
