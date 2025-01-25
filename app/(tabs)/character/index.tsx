import { ActivityIndicator, FlatList, View } from "react-native";

import { CharacterCard } from "@/components/character-card";
import { ContentPlaceholder } from "@/components/content-placeholder";
import { Header } from "@/components/header";
import { SearchInput } from "@/components/search-input";
import { SelectContent } from "@/components/select-content";
import { type CharacterFilter, fetchAllCharacters } from "@/lib/api/characters";
import { getNextPageParam, normalizePages } from "@/utils/infinite-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CharacterScreen() {
	const { top } = useSafeAreaInsets();
	const [filter, setFilter] = useState<CharacterFilter>({});

	const { data, isLoading, isFetchingNextPage, fetchNextPage } =
		useInfiniteQuery({
			queryKey: ["characters", filter],
			queryFn: ({ pageParam }) =>
				fetchAllCharacters({ page: pageParam, filter }),
			initialPageParam: 1,
			getNextPageParam,
		});

	return (
		<View style={{ paddingTop: top }} className="flex-1 bg-background">
			<View className="gap-2 p-4">
				<Header title="Personagens" />
				<SearchInput
					onSearch={(value) => setFilter({ name: value })}
					defaultValue={filter?.name ?? ""}
				/>
				<View className="flex-row gap-2">
					<SelectContent
						label="Espécie"
						value={filter?.species || ""}
						onSelectOption={(value) => setFilter({ ...filter, species: value })}
						options={[
							{ label: "Todos", value: "" },
							{ label: "Humano", value: "Human" },
							{ label: "Alien", value: "Alien" },
							{ label: "Robô", value: "Robot" },
						]}
					/>
					<SelectContent
						label="Status"
						value={filter?.status || ""}
						onSelectOption={(value) => setFilter({ ...filter, status: value })}
						options={[
							{ label: "Todos", value: "" },
							{ label: "Vivo", value: "Alive" },
							{ label: "Morto", value: "Dead" },
							{ label: "Desconhecido", value: "unknown" },
						]}
					/>
					<SelectContent
						label="Gênero"
						value={filter?.gender || ""}
						onSelectOption={(value) => setFilter({ ...filter, gender: value })}
						options={[
							{ label: "Todos", value: "" },
							{ label: "Homens", value: "Male" },
							{ label: "Mulheres", value: "Female" },
							{ label: "Desconhecido", value: "unknown" },
						]}
					/>
				</View>
			</View>
			<FlatList
				initialNumToRender={10}
				testID="character-list"
				contentContainerStyle={{ paddingHorizontal: 16 }}
				numColumns={2}
				data={normalizePages(data?.pages)}
				renderItem={({ item }) => <CharacterCard data={item} />}
				keyExtractor={(item) => String(item.id)}
				onEndReached={() => fetchNextPage()}
				onEndReachedThreshold={0.5}
				ListEmptyComponent={() => (
					<ContentPlaceholder
						label="Nenhum personagem encontrado"
						isLoading={isLoading}
					/>
				)}
				ListFooterComponent={() => {
					if (!isFetchingNextPage) return null;
					return <ActivityIndicator size="large" />;
				}}
			/>
		</View>
	);
}
