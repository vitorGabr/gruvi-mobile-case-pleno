import { themes } from "@/utils/color-theme";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import { View } from "react-native";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
	const { colorScheme } = useColorScheme();
	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<View style={themes[colorScheme ?? "light"]} className="flex-1">
				{children}
			</View>
		</ThemeProvider>
	);
}
