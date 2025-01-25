import { cn } from "@/utils/cn";
import { Text as RNText, type TextProps } from "react-native";

export type ThemedTextProps = {
	className?: string;
} & TextProps;

export function Text({ className, ...props }: ThemedTextProps) {
	return (
		<RNText
			className={cn("text-black dark:text-white", className)}
			{...props}
		/>
	);
}
