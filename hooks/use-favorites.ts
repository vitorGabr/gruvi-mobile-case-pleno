import { getItem, setItem } from "@/lib/storage";
import { useCallback, useEffect, useState } from "react";

export const useFavorites = (storageKey: "episodes" | "characters") => {
	const [favorites, setFavorites] = useState<string[]>([]);

	useEffect(() => {
		loadFavorites();
	}, []);

	const loadFavorites = async () => {
		try {
			const storedFavorites = await getItem<string[]>(storageKey);
			const content = Array.isArray(storedFavorites) ? storedFavorites : [];
			setFavorites(content);
		} catch (error) {
			setFavorites([]);
			console.error("Erro ao carregar favoritos:", error);
		}
	};

	const toggleFavorite = useCallback(
		async (itemId: string) => {
			try {
				const updatedFavorites = favorites.includes(itemId)
					? favorites.filter((id) => id !== itemId)
					: [...favorites, itemId];
				setFavorites(updatedFavorites);
				await setItem(storageKey, updatedFavorites);
			} catch (error) {
				console.error("Erro ao salvar favoritos:", error);
			}
		},
		[favorites, storageKey],
	);

	return {
		favorites,
		toggleFavorite,
	};
};
