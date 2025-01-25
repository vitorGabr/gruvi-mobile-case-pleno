import useDebounce from "@/hooks/use-debounce";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";

type SearchInputProps = {
	onSearch?: (value: string) => void;
	defaultValue: string;
};

export function SearchInput({ onSearch, defaultValue }: SearchInputProps) {
	const [value, setValue] = useState("");
	const debouncedValue = useDebounce<string>(value, 1000);

	useEffect(() => {
		if (debouncedValue.length > 0 || debouncedValue !== defaultValue) {
			onSearch?.(debouncedValue);
		}
	}, [debouncedValue]);

	return (
		<TextInput
			testID="search-input"
			className=" bg-foreground p-3 rounded-l2 text:gray-600 dark:text-white placeholder:dark:text-white"
			placeholder="Pesquisar..."
			placeholderClassName="text-white"
			defaultValue={defaultValue}
			onChangeText={(text) => setValue(text)}
		/>
	);
}
