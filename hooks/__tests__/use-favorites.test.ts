import { act, renderHook } from "@testing-library/react-hooks";
import { getItem, setItem } from "../../lib/storage";
import { useFavorites } from "../use-favorites";

jest.mock("../../lib/storage", () => ({
	getItem: jest.fn(),
	setItem: jest.fn(),
}));

describe("useFavorites Hook", () => {
	const storageKey = "episodes";

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("deve carregar favoritos do armazenamento ao inicializar", async () => {
		const mockFavorites = ["item1", "item2"];
		(getItem as jest.Mock).mockResolvedValue(mockFavorites);

		const { result, waitForNextUpdate } = renderHook(() =>
			useFavorites(storageKey),
		);

		await waitForNextUpdate();

		expect(getItem).toHaveBeenCalledWith(storageKey);
		expect(result.current.favorites).toEqual(mockFavorites);
	});

	it("deve lidar com favoritos inexistentes no armazenamento", async () => {
		(getItem as jest.Mock).mockResolvedValue(null);

		const { result, waitForNextUpdate } = renderHook(() =>
			useFavorites(storageKey),
		);
		await waitForNextUpdate();

		expect(getItem).toHaveBeenCalledWith(storageKey);
		expect(result.current.favorites).toEqual([]);
	});

	it("deve adicionar um item aos favoritos", async () => {
		const initialFavorites = ["item1"];
		(getItem as jest.Mock).mockResolvedValue(initialFavorites);

		const { result, waitForNextUpdate } = renderHook(() =>
			useFavorites(storageKey),
		);

		await waitForNextUpdate();

		act(() => {
			result.current.toggleFavorite("item2");
		});

		expect(result.current.favorites).toEqual(["item1", "item2"]);
		expect(setItem).toHaveBeenCalledWith(storageKey, ["item1", "item2"]);
	});

	it("deve remover um item dos favoritos", async () => {
		const initialFavorites = ["item1", "item2"];
		(getItem as jest.Mock).mockResolvedValue(initialFavorites);

		const { result, waitForNextUpdate } = renderHook(() =>
			useFavorites(storageKey),
		);

		await waitForNextUpdate();

		act(() => {
			result.current.toggleFavorite("item1");
		});

		expect(result.current.favorites).toEqual(["item2"]);
		expect(setItem).toHaveBeenCalledWith(storageKey, ["item2"]);
	});

	it("deve lidar com erros ao carregar favoritos", async () => {
		const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
		(getItem as jest.Mock).mockRejectedValue(new Error("Erro ao carregar"));

		const { result, waitForNextUpdate } = renderHook(() =>
			useFavorites(storageKey),
		);

		await waitForNextUpdate();

		expect(consoleErrorSpy).toHaveBeenCalledWith(
			"Erro ao carregar favoritos:",
			expect.any(Error),
		);
		expect(result.current.favorites).toEqual([]);
		consoleErrorSpy.mockRestore();
	});
});
