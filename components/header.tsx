import { Feather } from "@expo/vector-icons";
import { cssInterop } from "nativewind";
import { Text, View } from "react-native";
import { ColorModeSwitch } from "./color-mode-switch";

type HeaderProps = {
	title: string;
	onSearch?: (value: string) => void;
};

cssInterop(Feather, {
	className: {
		target: "style",
	},
});

export function Header({ title, onSearch }: HeaderProps) {
	return (
		<View className="flex-row justify-between items-center">
			<Text className="text-typography font-bold text-4xl">{title}</Text>
			<View className="flex-row items-center gap-6">
				<ColorModeSwitch />
			</View>
		</View>
	);
}
