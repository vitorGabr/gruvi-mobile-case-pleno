import type { ReactNode } from "react";
import { Text, View } from "react-native";

type CharacterLabelProps = {
	label: string;
	value: ReactNode;
};

export function CharacterLabel({ label, value }: CharacterLabelProps) {
	return (
		<View className="flex flex-row justify-between items-center border-b border-border py-4">
			<View className="rounded-l2 px-3 py-2 bg-foreground">
				<Text className="text-typography text-sm font-bold">{label}</Text>
			</View>
			<Text className="text-typography">{value}</Text>
		</View>
	);
}
