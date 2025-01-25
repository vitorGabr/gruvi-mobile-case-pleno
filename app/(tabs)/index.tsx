import { ContentPlaceholder } from "@/components/content-placeholder";
import { EpisodeCard } from "@/components/episode-card";
import { Header } from "@/components/header";
import { SearchInput } from "@/components/search-input";
import { useFavorites } from "@/hooks/use-favorites";
import { type EpisodeFilter, fetchAllEpisodes } from "@/lib/services/episode";
import { getNextPageParam, normalizePages } from "@/utils/infinite-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
	const { top } = useSafeAreaInsets();
	const [filter, setFilter] = useState<EpisodeFilter>({});
	const { favorites, toggleFavorite } = useFavorites("episodes");

	const episodes = useInfiniteQuery({
		queryKey: ["episodes", filter],
		queryFn: ({ pageParam }) => fetchAllEpisodes({ page: pageParam, filter }),
		initialPageParam: 1,
		getNextPageParam,
	});

	return (
		<View style={{ paddingTop: top }} className="h-full bg-background">
			<View className="gap-2 p-4">
				<Header title="Episódios" />
				<SearchInput
					onSearch={(value) => setFilter({ name: value })}
					defaultValue={filter.name ?? ""}
				/>
			</View>
			<FlatList
				testID="episode-list"
				contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
				data={normalizePages(episodes.data?.pages)}
				renderItem={({ item }) => (
					<EpisodeCard
						favorite={favorites.includes(`${item.id}`)}
						toggleFavorite={() => toggleFavorite(`${item.id}`)}
						data={item}
					/>
				)}
				keyExtractor={(item) => String(item.id)}
				onEndReached={() => episodes.fetchNextPage()}
				onEndReachedThreshold={0.5}
				ListEmptyComponent={() => (
					<ContentPlaceholder
						label="Nenhum episódio encontrado"
						isLoading={episodes.isLoading}
					/>
				)}
				ListFooterComponent={() => {
					if (!episodes.isFetchingNextPage) return null;
					return <ActivityIndicator size="large" />;
				}}
			/>
		</View>
	);
}
