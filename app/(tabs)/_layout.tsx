import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Episódios",
					tabBarIcon: ({ color }) => (
						<Feather size={22} name="tv" color={color} />
					),
					tabBarButtonTestID: "index-tab",
				}}
			/>
			<Tabs.Screen
				name="character"
				options={{
					title: "Personagens",
					tabBarIcon: ({ color }) => (
						<Feather size={22} name="users" color={color} />
					),
					tabBarButtonTestID: "character-tab",
				}}
			/>
		</Tabs>
	);
}
