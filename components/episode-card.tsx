import type { Episode } from "@/lib/services/episode";
import { memo } from "react";
import { Text, View } from "react-native";
import { FavoriteItem } from "./favorite-item";

type EpisodeProps = {
	data: Episode;
	favorite: boolean;
	toggleFavorite: () => void;
};

export const EpisodeCard = memo(
	({ data, favorite, toggleFavorite }: EpisodeProps) => {
		const content = data.episode.match(/S(\d{2})E(\d{2})/);
		if (!content?.length || content.length < 3) {
			return null;
		}

		return (
			<View
				testID={`episode-card-${data.id}`}
				className="flex-1 flex-row py-4 items-center border-b border-border"
			>
				<View className="flex-1">
					<Text className="text-typography font-bold text-lg">{data.name}</Text>
					<Text className="text-typography text-md">
						Episódio {content[2]} - Temporada {content[1]}
					</Text>
				</View>
				<FavoriteItem
					testID={`favorite-button-${data.id}`}
					favorite={favorite}
					toggleFavorite={() => {
						toggleFavorite();
					}}
				/>
			</View>
		);
	},
);
