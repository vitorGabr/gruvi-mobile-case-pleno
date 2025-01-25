import { setItem } from "@/lib/storage";
import { useColorScheme } from "nativewind";

export const useColorMode = () => {
	const { toggleColorScheme, colorScheme } = useColorScheme();

	const toggleMode = () => {
		toggleColorScheme();
		setItem("colorMode", colorScheme === "dark" ? "light" : "dark");
	};

	return { toggleMode, colorScheme };
};
