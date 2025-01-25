import { cn } from "@/utils/cn";
import { MaterialIcons } from "@expo/vector-icons";
import { cssInterop } from "nativewind";
import { TouchableOpacity } from "react-native";

type FavoriteItemProps = {
	testID?: string;
	favorite: boolean;
	toggleFavorite: () => void;
};

cssInterop(MaterialIcons, {
	className: {
		target: "style",
	},
});

export function FavoriteItem({
	testID,
	favorite,
	toggleFavorite,
}: FavoriteItemProps) {
	return (
		<TouchableOpacity className="p-2" testID={testID} onPress={toggleFavorite}>
			<MaterialIcons
				testID={`${testID}-icon-${favorite ? "favorite" : "favorite-border"}`}
				name={favorite ? "favorite" : "favorite-border"}
				size={24}
				className={cn("text-black dark:text-white", {
					"text-red-500 dark:text-red-300": favorite,
				})}
			/>
		</TouchableOpacity>
	);
}
