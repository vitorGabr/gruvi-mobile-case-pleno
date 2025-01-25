import type { Character } from "@/lib/services/characters";
import { cn } from "@/utils/cn";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { cssInterop } from "nativewind";
import { memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type CharacterProps = {
	data: Character;
};

cssInterop(Ionicons, {
	className: {
		target: "style",
	},
});

export const CharacterCard = memo(({ data }: CharacterProps) => {
	return (
		<TouchableOpacity
			testID={`character-card-${data.id}`}
			onPress={() => {
				router.push(`/character/${data.id}`);
			}}
			className="flex-1 m-2 gap-2"
		>
			<Image
				className="w-full h-52 bg-foreground rounded-l2"
				source={{ uri: data.image }}
			/>
			<View>
				<Text numberOfLines={1} className="text-typography font-bold text-lg">
					{data.name}
				</Text>
				<View className="flex-row items-center justify-between gap-2">
					<Text className="text-typography text-sm">
						{data.status === "Alive"
							? "VIVO"
							: data.status === "Dead"
								? "MORTO"
								: "DESCONHECIDO"}
					</Text>
					<Ionicons
						size={16}
						className={cn(
							data.gender === "Male" && "text-blue-500 dark:text-blue-300",
							data.gender === "Female" && "text-pink-500 dark:text-pink-300",
						)}
						name={data.gender === "Male" ? "male" : "female"}
					/>
				</View>
			</View>
		</TouchableOpacity>
	);
});
