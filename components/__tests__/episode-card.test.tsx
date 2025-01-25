import type { Episode } from "@/lib/api/episode";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Button } from "react-native";
import { EpisodeCard } from "../episode-card";
import { FavoriteItem } from "../favorite-item";

jest.mock("../favorite-item", () => ({
	FavoriteItem: jest.fn(() => null),
}));

describe("EpisodeCard", () => {
	const mockToggleFavorite = jest.fn();
	const mockData = {
		episode: "S02E05",
		name: "The Name of the Episode",
	} as Episode;

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("deve renderizar corretamente o episódio e temporada", () => {
		const { getByText } = render(
			<EpisodeCard
				data={mockData}
				favorite={false}
				toggleFavorite={mockToggleFavorite}
			/>,
		);

		expect(getByText("Episódio 05 - Temporada 02")).toBeTruthy();
		expect(getByText("The Name of the Episode")).toBeTruthy();
	});

	it("não deve renderizar nada caso o padrão do episódio seja inválido", () => {
		const invalidData = {
			...mockData,
			episode: "InvalidFormat",
		};

		const { queryByText } = render(
			<EpisodeCard
				data={invalidData}
				favorite={false}
				toggleFavorite={mockToggleFavorite}
			/>,
		);

		expect(queryByText("Episódio")).toBeNull();
	});

	it("deve chamar toggleFavorite ao interagir com o FavoriteItem", () => {
		(FavoriteItem as jest.Mock).mockImplementation(({ toggleFavorite }) => (
			<Button onPress={toggleFavorite} title="Toggle Favorite" />
		));

		const { getByText } = render(
			<EpisodeCard
				data={mockData}
				favorite={false}
				toggleFavorite={mockToggleFavorite}
			/>,
		);

		fireEvent.press(getByText("Toggle Favorite"));

		expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
	});

	it("deve renderizar o estado de favorito corretamente no FavoriteItem", () => {
		const { rerender } = render(
			<EpisodeCard
				data={mockData}
				favorite={false}
				toggleFavorite={mockToggleFavorite}
			/>,
		);

		expect(FavoriteItem).toHaveBeenCalledWith(
			expect.objectContaining({ favorite: false }),
			expect.anything(),
		);

		rerender(
			<EpisodeCard
				data={mockData}
				favorite={true}
				toggleFavorite={mockToggleFavorite}
			/>,
		);

		expect(FavoriteItem).toHaveBeenCalledWith(
			expect.objectContaining({ favorite: true }),
			expect.anything(),
		);
	});
});
