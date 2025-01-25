import { cn } from "@/utils/cn";
import type { ComponentProps } from "react";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

export function SafeAreaView({
	className,
	...props
}: ComponentProps<typeof RNSafeAreaView>) {
	return (
		<RNSafeAreaView
			className={cn("flex-1 bg-white dark:bg-black", className)}
			{...props}
		/>
	);
}
