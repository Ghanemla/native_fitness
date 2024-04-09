import { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, Button, Alert, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { Boss, bosses, heroes, items, Items, statColors } from '../data';
import HealthBar from '../components/healthbar';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { removeItem } from '../redux/app_store';
import { db } from './splash';

const heroHp = 200

export default function ScreenBossBattle({navigation}: Props): React.JSX.Element {
	const user = useSelector(state => state.user); // Get the user from the store
	const userStats = useSelector(state => state.user);
	const hero = useRef(heroes.filter((h) => h.name === user.heroName)[0]).current // Get the hero from the store
	const [boss, setBoss] = useState<Boss|null>(null); // Create a state to hold the boss
	const [bossHealth, setBossHealth] = useState(1000); // Create a state to hold the boss's health
	const [heroHealth, setHeroHealth] = useState(heroHp); // Create a state to hold the hero's health
	const [userStats2, setUserStats2] = useState<any>();
	const [potions_, setPotions] = useState(items.filter(item => item.name.includes('Potion'))); // Create a state to hold the potions
	const dispatch = useDispatch(); // Get the dispatch function from the store



	

	
	const handlePotionUse = (potion: Items) => {
		if (potion.stats.includes('hp')) { // If the potion has the hp stat
			const healingAmount = potion.statP[potion.stats.indexOf('hp')]; // Get the healing amount from the potion
			
			// Check if the hero's health is already full
			if (heroHealth >= 200) {
				Alert.alert("Your health is already full, you can't use a potion right now."); // Alert the user that their health is full
				return;
			}
			// Calculate the new health after using the potion
			let newHealth = heroHealth + healingAmount; // Add the healing amount to the hero's health
			
			// If the new health is more than the maximum, cap it at the maximum
			if (newHealth > 200) newHealth = 200;
			
			// Set the new health
			setHeroHealth(newHealth); // Set the new health of the hero
			
			// Remove the potion from the inventory and the potions state
			//dispatch(removeItem(potion.name)); // Dispatch the removeItem action to remove the potion from the inventory
			setPotions(potions_.filter(p => p.name !== potion.name)); // Set the new potions state to the potions without the used potion
		}
	};
	
	
	// Select a boss when the component mounts
	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * bosses.length);
		const selectedBoss = bosses[randomIndex];
		setBoss(selectedBoss);
		setBossHealth(selectedBoss.health);
		
	}, []);
	
  useEffect(() => {
	db.transaction(tx => {
		tx.executeSql(`SELECT * FROM users;`, undefined,
		(_, res) => {
			let usr = res.rows._array
			console.log("stats in battle123:", usr,)
			setUserStats2(usr[0]);
		}, (_, e) => { console.log("ERR3:", e); return true } );
	});
}, []);

// useEffect(() => {
//   if (userStats2) {
//     // userStats2 is defined, you can use it here
//     console.log("Updated userStats2:", userStats2);
		
//   }
// }, [userStats2]);

	// Handle the attack button press	
	const handleAttack = () => {
		const heroDiceRoll = Math.floor(Math.random() * 20) + 1; // Roll a 20-sided dice for the hero
		const bossDiceRoll = Math.floor(Math.random() * 20) + 1; // Roll a 20-sided dice for the boss
		const usercombiendStats = userStats2.user_stamina + userStats2.user_strength + userStats2.user_int
		const heroDamage = Math.floor(usercombiendStats * 0.10); // 10% of hero's combined stats rounded down
		const bossDamage = boss.health * 0.05; // 5% of boss's health 
		console.log("TEST:", heroDamage)
		if (heroDiceRoll > bossDiceRoll) { // If the hero's roll is higher than the boss's roll
			const newHealth = bossHealth - heroDamage; // Subtract the damage from the boss's health
			if (newHealth <= 0) {
				Alert.alert(` ${boss.name} has been defeated !`);// If the boss's health is less than or equal to 0, the boss has been defeated
				navigation.navigate('homeMain') // Navigate to the home screen
			} else {
				setBossHealth(newHealth);// Set the new health of the boss
			}
		} else {
			const newHealth = heroHealth - bossDamage; // Subtract the damage from the hero's health
			if (newHealth <= 0) {// If the hero's health is less than or equal to 0, the hero has been defeated
				Alert.alert(`${hero.name} has been defeated !`);// Alert the user that the hero has been defeated
				navigation.navigate('homeMain')
			} else {
				setHeroHealth(newHealth); // Set the new health of the hero
			}
		}
	};

	const handleBlock = () => {
		const heroDiceRoll = Math.floor(Math.random() * 20) + 1; // Roll a 20-sided dice for the hero
		const bossDiceRoll = Math.floor(Math.random() * 20) + 1;// Roll a 20-sided dice for the boss

		if (heroDiceRoll > bossDiceRoll) { // If the hero's roll is higher than the boss's roll

			const newHealth = bossHealth - 2;// Subtract 2 from the boss's health

			if (newHealth <= 0) { // If the boss's health is less than or equal to 0, the boss has been defeated
				Alert.alert(` ${boss.name} has been defeated !`);// If the boss's health is less than or equal to 0, the boss has been defeated
				navigation.navigate('Home') // Navigate to the home screen
			} else {
				setBossHealth(newHealth); //  Set the new health of the boss
			}
		} else {
			const newHealth = heroHealth - 2; // Subtract 2 from the hero's health
			if (newHealth <= 0) { // If the hero's health is less than or equal to 0, the hero has been defeated
				Alert.alert(` ${hero.name} has been defeated !`); // Alert the user that the hero has been defeated
				navigation.navigate('homeMain') // Navigate to the home screen
			} else {
				setHeroHealth(newHealth); //  Set the new health of the hero
			}
		}
	};

	return boss ? (
		<View style={{}}>
			{/* boss stats HP and image */}
			<View style={styles.topBossContainer}>
				<Text style={styles.topBossText}>{boss.name}</Text>
				<HealthBar currentHealth={bossHealth} maxHealth={boss.health} type="boss" />
				<View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
					<Text>
						<Image source={require("../assets/stats/strength.png")} style={styles.statIcon} /> {boss.attack}
					</Text>
					<Text>
						<Image source={require("../assets/stats/brain.png")} style={styles.statIcon} /> {boss.attack}
					</Text>
					<Text>
						<Image source={require("../assets/stats/boot.png")} style={styles.statIcon} /> {boss.attack}
					</Text>
					{/* <Text>
						<Image source={require("../assets/stats/shield.png")} style={styles.statIcon} /> {boss.attack}
					</Text> */}
				</View>
			</View>

			{/* press the boss to attack  */}
			<TouchableOpacity onPress={handleAttack}>
				<Image source={boss.img} style={styles.img} />
			</TouchableOpacity>


			{/* hero statas HP and image */}
			<View style={styles.topHeroContainer}>
				<Text style={styles.topHeroText}>{hero.name}</Text>
				<HealthBar currentHealth={heroHealth} maxHealth={heroHp} type="hero" />
				<View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
					{/* <Text>
						<Image source={require("../assets/stats/sword.png")} style={styles.statIcon} /> { userStats2?.user_strength}
					</Text> */}
					<Text>
						<Image source={require("../assets/stats/strength.png")} style={styles.statIcon} /> {userStats2?.user_strength}
					</Text>
					<Text>
						<Image source={require("../assets/stats/brain.png")} style={styles.statIcon} /> {userStats2?.user_int}
					</Text>
					<Text>
						<Image source={require("../assets/stats/boot.png")} style={styles.statIcon} /> {userStats2?.user_stamina}
					</Text>
				</View>
			</View>

			{/* press the boss to attack but if boss gets higher roll you take 2 damage elese boss takes 2 damgage */}
			<TouchableOpacity onPress={handleBlock}>
				<Image source={hero.img} style={styles.img} />
			</TouchableOpacity>


			<View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 20, borderRadius: 20, }}>
				{potions_.map((potion, index) => ( // Map over the potions and render them
					// When a potion is pressed, call the handlePotionUse function
					<TouchableOpacity key={index} onPress={() => handlePotionUse(potion)}>
						<LinearGradient
							colors={potion.stats.length === 1 ? [statColors[potion.stats[0]], statColors[potion.stats[0]]] : [statColors[potion.stats[0]], statColors[potion.stats[1]]]} // Set the colors of the potion based on the stats
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							style={{
								borderRadius: 20, paddingVertical: 11,
								paddingHorizontal: 20,
								flexDirection: "row",
								justifyContent: "space-between"
							}}
						>
							{/* // Render the potion image */}
							<Image source={potion?.img} style={styles.potBtn} />
							{/* // Render the name of the potion */}
							<Text>{potion?.name}</Text>
						</LinearGradient>
					</TouchableOpacity>

				))}
			</View>

		</View>
	) : <Text>Loading boss</Text>;
}

const styles = StyleSheet.create({
	navIcon: {
		fontSize: 24
	},

	potBtn: {
		width: 30,
		height: 30,
		alignSelf: "center",
		justifyContent: "space-between",

	},
	statIcon: {
		width: 12,
		height: 13,
		alignSelf: "center",
		justifyContent: "space-between",
	},
	img: {
		width: "70%",
		height: 200,
		alignSelf: "center",
		marginBottom: 5,
		borderBottomRightRadius: 20,
		borderBottomLeftRadius: 20,
		shadowColor: 'red',
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},

	topBossContainer: {
		marginTop: 20,
		backgroundColor: "#EAB4B4",
		width: "70%",
		alignSelf: "center",
		alignContent: "center",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	topBossText: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center"
	},

	topHeroContainer: {
		marginTop: 20,
		backgroundColor: "#B3DAC7",
		width: "70%",
		alignSelf: "center",
		alignContent: "center",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},

	topHeroText: {
		fontSize: 20,
		fontWeight: "normal",
		textAlign: "center"
	}

});
