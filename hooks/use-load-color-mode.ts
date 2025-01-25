import { getItem } from "@/lib/storage";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";

export const useLoadColorMode = () => {
	const { setColorScheme } = useColorScheme();
	const [isLoaded, setIsLoaded] = useState(false);

	async function loadColorScheme() {
		const mode = await getItem<"light" | "dark">("colorMode");
		if (mode) {
			setColorScheme(mode);
		}
		setIsLoaded(true);
	}

	useEffect(() => {
		loadColorScheme();
	}, []);

	return isLoaded;
};
