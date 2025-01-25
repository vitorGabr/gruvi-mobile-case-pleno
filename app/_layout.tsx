import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import "../global.css";
import { ThemeWrapper } from "@/components/theme-wrapper";
import { useLoadColorMode } from "@/hooks/use-load-color-mode";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

SplashScreen.preventAutoHideAsync();

export const queryClient = new QueryClient();
export default function RootLayout() {
	const colorModeIsloaded = useLoadColorMode();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded && colorModeIsloaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded || !colorModeIsloaded) return null;

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeWrapper>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen name="+not-found" />
				</Stack>
				<StatusBar style={"auto"} />
			</ThemeWrapper>
		</QueryClientProvider>
	);
}
