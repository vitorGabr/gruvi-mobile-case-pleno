import { ActivityIndicator, Text, View } from "react-native";

type ContentPlaceholderProps = {
	isLoading: boolean;
	label?: string;
};

export function ContentPlaceholder({
	isLoading,
	label,
}: ContentPlaceholderProps) {
	return (
		<View
			testID="empty-list-message"
			className="h-36 justify-center items-center"
		>
			{isLoading ? (
				<ActivityIndicator size="large" />
			) : (
				<Text className="text-typography text-center text-lg font-semibold">
					{label}
				</Text>
			)}
		</View>
	);
}
