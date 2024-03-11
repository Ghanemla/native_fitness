import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux"
import { Image } from "react-native";
import ScreenHome from "../screens/home";
import ScreenLogin from "../screens/login";
import ScreenHeroSelect from "../screens/heroselect";
import ScreenInventory from "../screens/inventory";
import ScreenSettings from "../screens/settings";
import ScreenSplash from "../screens/splash";
import ScreenQuests from "../screens/quests";
import ScreenBoss from "../screens/boss";
import ScreenBossBattle from "../screens/boss_battle";

declare global {
	type RootStackParamList = {
		home: undefined;
		login: undefined;
		heroselect: undefined;
		inventory: undefined;
		homeMain: undefined;
		settings: undefined;
		quests: undefined;
		boss: undefined;
		BossBattle: undefined;
	}
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

function HomeTabs() {
	return(
		<Tab.Navigator screenOptions={({route}) => ({
			tabBarIcon: ({focused}) => {
				let icon;
				if (route.name === "homeMain")
					icon = focused ? require("../assets/navicons/home.png") : require("../assets/navicons/home1.png");
				else if (route.name === "quests")
					icon = focused ? require("../assets/navicons/book.png") : require("../assets/navicons/book1.png");
				else if (route.name === "boss")
					icon = focused ? require("../assets/navicons/sword.png") : require("../assets/navicons/sword1.png");
				else if (route.name === "settings")
					icon = focused ? require("../assets/navicons/settings.png") : require("../assets/navicons/settings1.png");

				return <Image source={icon} style={{width: 30, height: 30}}/>;
			},
			tabBarActiveTintColor: "tomato",
			tabBarInactiveTintColor: "gray",
			headerShown: false,
			tabBarShowLabel: false
		})}>
			<Tab.Screen name="homeMain" component={ScreenHome}/>
			<Tab.Screen name="quests" component={ScreenQuests}/>
			<Tab.Screen name="boss" component={ScreenBoss} />
			<Tab.Screen name="settings" component={ScreenSettings}/>
		</Tab.Navigator>
	)
}

export default function Navigation() {
	const {isLoading, tok} = useSelector(state => state.user);
	if (isLoading) return <ScreenSplash/>;

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="login" screenOptions={{headerShown: false}}>
				{tok ? (<>
					<Stack.Screen name="home" component={HomeTabs}/>
					<Stack.Screen name="inventory" component={ScreenInventory} options={{headerShown: true}}/>
					<Stack.Screen name="BossBattle" component={ScreenBossBattle} options={{headerShown: true}}/>
				</>) : (<>
					<Stack.Screen name="login" component={ScreenLogin}/>
					<Stack.Screen name="heroselect" component={ScreenHeroSelect}/>
				</>)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
