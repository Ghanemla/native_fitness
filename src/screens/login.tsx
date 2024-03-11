import React, {useState} from 'react';
import {Image, Text, TextInput, View, StyleSheet} from 'react-native';
import PButton from "../components/pbutton";

export default function ScreenLogin({navigation}:any) {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	function handleLogin() {
		console.log(email + "\n" + pass);
		navigation.navigate("heroselect")
	}

	return (
		<View style={{flex: 1}}>
			<View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
				<Image source={require("../assets/login.png")} style={{width: "100%", height: "100%"}}/>
			</View>
			<Text style={{fontSize: 36, textAlign: "center", fontWeight: "bold", marginVertical: 25}}>Please log in to start</Text>
			<View style={{flex: 1, marginHorizontal: 50}}>
				<Text>Email:</Text>
				<TextInput
					style={styles.input}
					placeholder="Email"
					onChangeText={x => setEmail(x)}
				/>
				<Text>Password:</Text>
				<TextInput
					style={styles.input}
					placeholder="Password"
					onChangeText={x => setPass(x)}
					secureTextEntry
				/>
				<PButton title="Log in" style={{marginBottom: 10}} onPress={handleLogin}/>
				<PButton title="Create an account" style={{marginBottom: 30}} onPress={handleLogin}/>
				<View style={{flexDirection: "row", alignItems: "center"}}>
					<View style={styles.line}/>
					<Text style={{marginHorizontal: 10}}>OR</Text>
					<View style={styles.line}/>
				</View>
				<View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", margin: 30}}>
					<View style={{backgroundColor: "black", width: 40, height: 40, borderRadius: 25, alignItems: "center", justifyContent: "center", position: "absolute", left: 0}}>
						<Image source={require("../assets/google.png")} style={{width: 28, height: 28}}/>
					</View>
					<Text>Sign in with google</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		height: 40,
		paddingHorizontal: 5,
		backgroundColor: "#eee",
		marginBottom: 16
	},
	line: {
		flex: 1,
		borderWidth: 1,
		borderColor: "#626262",
	}
});
