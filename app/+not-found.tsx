import { Link, Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<View className="flex-1 items-center justify-center p-4 bg-white dark:bg-black">
				<Text className="text-typography">
					Esta página não existe ou foi removida.
				</Text>
				<Link href="/" className="link">
					<Text className="text-typography">Voltar para a página inicial</Text>
				</Link>
			</View>
		</>
	);
}
