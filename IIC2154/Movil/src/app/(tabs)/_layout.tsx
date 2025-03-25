import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'

export default function TabLayout() {
	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: 'black' }}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Inicio',
					headerShown: false,
					tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: 'Buscar',
					headerShown: false,
					tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Perfil',
					tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
				}}
			/>
		</Tabs>
	)
}
