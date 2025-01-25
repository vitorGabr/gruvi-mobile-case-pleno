import { CharacterLabel } from "@/components/character-label";
import { FavoriteItem } from "@/components/favorite-item";
import { useFavorites } from "@/hooks/use-favorites";
import { fetchCharacterById } from "@/lib/services/characters/fetch-by-id";
import { cn } from "@/utils/cn";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Stack, useGlobalSearchParams } from "expo-router";
import {
	ActivityIndicator,
	Image,
	SafeAreaView,
	ScrollView,
	Text,
	View,
} from "react-native";

export default function CharacterIdScreen() {
	const { id } = useGlobalSearchParams<{ id: string }>();
	const { favorites, toggleFavorite } = useFavorites("characters");
	const { data, isLoading } = useQuery({
		queryKey: ["character", id],
		queryFn: () => fetchCharacterById(id),
	});

	if (isLoading) {
		return (
			<SafeAreaView className="flex-1 bg-background">
				<Stack.Screen
					options={{
						title: "",
					}}
				/>
				<View className="flex-1 justify-center items-center">
					<ActivityIndicator size="large" />
				</View>
			</SafeAreaView>
		);
	}
	return (
		<View className="bg-background flex-1">
			<Stack.Screen
				options={{
					title: "",
					headerRight: () =>{
						return (
							<FavoriteItem
								testID="favorite-header-favorite"
								favorite={favorites.includes(id)}
								toggleFavorite={() => {
									toggleFavorite(id);
								}}
							/>
						);
					},
				}}
			/>
			<ScrollView>
				<View className="flex-1 items-center gap-6">
					<Image
						className={cn("rounded-l2 border-4 w-60 h-60 mt-6", {
							"border-green-500 dark:border-green-300":
								data?.status === "Alive",
							"border-red-500 dark:border-red-300": data?.status === "Dead",
						})}
						source={{ uri: data?.image }}
					/>
					<Text className="text-typography font-bold text-3xl">
						{data?.name}
					</Text>
					<View className="flex w-full px-4">
						<Text className="text-typography font-bold text-sm">
							Propridades do personagem
						</Text>
						<CharacterLabel
							label="Gênero"
							value={data?.gender === "Male" ? "Masculino" : "Feminino"}
						/>
						<CharacterLabel
							label="Status"
							value={data?.status === "Alive" ? "Vivo" : "Morto"}
						/>
						<CharacterLabel
							label="Espécie"
							value={data?.species === "Human" ? "Humano" : "Alien"}
						/>
					</View>
					<View className="flex w-full px-4">
						<Text className="text-typography font-bold text-sm">
							Origem e localização
						</Text>
						<CharacterLabel
							label="Origem"
							value={
								data?.origin.name === "unknown"
									? "Desconhecida"
									: data?.origin.name
							}
						/>
						<CharacterLabel
							label="Localização"
							value={
								data?.location.name === "unknown"
									? "Desconhecida"
									: data?.location.name
							}
						/>
					</View>
					<View className="flex w-full px-4">
						<Text className="text-typography font-bold text-sm">
							Outras informações sobre o personagem
						</Text>
						<CharacterLabel
							label="Data de criação"
							value={dayjs(data?.created).format("DD/MM/YYYY")}
						/>
						<CharacterLabel
							label="Episódios em que aparece"
							value={data?.episode.length.toString()}
						/>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}
