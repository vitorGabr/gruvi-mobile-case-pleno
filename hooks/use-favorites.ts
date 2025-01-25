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
			if (Array.isArray(storedFavorites)) {
				setFavorites(storedFavorites);
				return;
			}
			setFavorites([]);
		} catch (error) {
			setFavorites([]);
			console.error("Erro ao carregar favoritos:", error);
		}
	};

	const toggleFavorite = useCallback(
		async (itemId: string) => {
			try {
				let updatedFavorites = [];
				if (favorites.includes(itemId)) {
					updatedFavorites = favorites.filter((fav) => fav !== itemId);
				} else {
					updatedFavorites = [...favorites, itemId];
				}
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
