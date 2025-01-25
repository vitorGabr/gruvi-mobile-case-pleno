import { cn } from "@/utils/cn";
import React, { useState } from "react";
import {
	FlatList,
	Modal,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";

type Option = { label: string; value: string };

type SelectProps = {
	label: string;
	options: Option[];
	value?: string;
	onSelectOption: (value: string) => void;
};

export const SelectContent = ({
	label,
	options,
	onSelectOption,
	value,
}: SelectProps) => {
	const [modalVisible, setModalVisible] = useState(false);

	const handleSelectOption = (value: string) => {
		onSelectOption(value);
		setModalVisible(false);
	};

	return (
		<>
			<TouchableOpacity
				testID={`select-content-${label}`}
				className={cn(
					"px-3 py-2 border border-foreground bg-foreground/50 rounded-l2",
					{
						"border-accent bg-accent/20": value,
					},
				)}
				onPress={() => setModalVisible(true)}
			>
				<Text className="text-typography text-sm font-semibold">
					{value
						? options.find((option) => option.value === value)?.label
						: label}
				</Text>
			</TouchableOpacity>

			<Modal
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
				onDismiss={() => setModalVisible(false)}
			>
				<TouchableWithoutFeedback
					testID="select-content-modal"
					onPress={() => setModalVisible(false)}
				>
					<View className="flex-1 justify-center items-center bg-black/50 dark:bg-black/60">
						<View className="bg-background rounded-l3 p-4 w-3/4">
							<FlatList
								data={options}
								renderItem={({ item, index }) => (
									<TouchableOpacity
										testID={`select-content-option-${item.value}`}
										className={cn("py-4 px-3 border-b border-border", {
											"border-b-0": index === options.length - 1,
										})}
										onPress={() => handleSelectOption(item.value)}
									>
										<Text className="text-typography text-sm text-center font-semibold">
											{item.label}
										</Text>
									</TouchableOpacity>
								)}
								keyExtractor={(item) => item.value}
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</>
	);
};
