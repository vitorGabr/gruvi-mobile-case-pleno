import { Tabs } from "expo-router";
import { cssInterop } from "nativewind";

type TabLayoutContainerProps = {
	tabBarClassName: {
		backgroundColor: string;
	};
	headerClassName: {
		backgroundColor: string;
		color: string;
	};
};

export function TabLayoutContainer({
	tabBarClassName,
	headerClassName,
	...props
}: TabLayoutContainerProps) {
	return (
		<Tabs
			screenOptions={{
				tabBarStyle: { backgroundColor: tabBarClassName.backgroundColor },
				headerStyle: { backgroundColor: headerClassName.backgroundColor },
				headerTintColor: headerClassName.color,
			}}
			{...props}
		/>
	);
}

cssInterop(TabLayoutContainer, {
	tabBarClassName: {
		target: false,
		nativeStyleToProp: {
			backgroundColor: "tabBarClassName.backgroundColor",
		},
	},
	headerClassName: {
		target: false,
		nativeStyleToProp: {
			backgroundColor: "headerClassName.backgroundColor",
			color: "headerClassName.color",
		},
	},
});
