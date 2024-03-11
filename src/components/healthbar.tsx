import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HealthBar = ({currentHealth, maxHealth, type}) => {
	const healthPercentage = (currentHealth / maxHealth) * 100; // Calculate the health percentage

	return (
		<View style={styles.container}>
			<View style={{ ...styles.healthBar, width: `${healthPercentage}%`, backgroundColor: type === 'hero' ? '#53A62C' : '#F80D0D' }} />
			<Text style={styles.healthText}>{`${currentHealth}/${maxHealth}`}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 21,
		width: '90%',
		backgroundColor: '#ccc',
		borderRadius: 10,
		position: 'relative',
		alignSelf: 'center',
	},
	healthBar: {
		position: 'absolute',
		left: 0,
		top: 0,
		bottom: 0,
		borderRadius: 10,
	},
	healthText: {
		position: 'absolute',
		left: 0,
		right: 0,
		textAlign: 'center',
		color: 'black',
		fontSize: 18,
	},
});

export default HealthBar;
