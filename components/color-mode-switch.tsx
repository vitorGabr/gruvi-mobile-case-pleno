import { useColorMode } from "@/hooks/use-color-mode";
import { Feather } from "@expo/vector-icons";
import { cssInterop } from "nativewind";
import { TouchableOpacity } from "react-native";

cssInterop(Feather, {
	className: {
		target: "style",
	},
});

export function ColorModeSwitch() {
	const { toggleMode, colorScheme } = useColorMode();
	return (
		<TouchableOpacity className="p-2" onPress={toggleMode}>
			<Feather
				name={colorScheme === "light" ? "moon" : "sun"}
				size={26}
				className="text-black dark:text-white"
			/>
		</TouchableOpacity>
	);
}
