import type { PaginateQuery } from "@/lib/services/types";
import { getNextPageParam, normalizePages } from "../infinite-query"; // Atualize o caminho do módulo

describe("normalizePages", () => {
	it("deve retornar um array vazio se nenhuma página for fornecida", () => {
		expect(normalizePages()).toEqual([]);
	});

	it("deve achatar a matriz de resultados das páginas fornecidas", () => {
		const pages: Pick<PaginateQuery<{ id: number }>, "results">[] = [
			{ results: [{ id: 1 }, { id: 2 }] },
			{ results: [{ id: 3 }, { id: 4 }] },
		];
		expect(normalizePages(pages)).toEqual([
			{ id: 1 },
			{ id: 2 },
			{ id: 3 },
			{ id: 4 },
		]);
	});

	it("deve retornar uma matriz vazia se as páginas forem fornecidas, mas não contiverem resultados", () => {
		const pages: Pick<PaginateQuery<unknown>, "results">[] = [
			{ results: [] },
			{ results: [] },
		];
		expect(normalizePages(pages)).toEqual([]);
	});
});

describe("getNextPageParam", () => {
	it("deve retornar indefinido se o próximo for indefinido", () => {
		const page: Pick<PaginateQuery<unknown>, "info"> = {
			info: { next: undefined, count: 0, pages: 0, prev: "" },
		};
		expect(getNextPageParam(page, [], 1, [])).toBeUndefined();
	});

	it("deve retornar indefinido se o próximo não contiver um parâmetro de página válido", () => {
		const page: Pick<PaginateQuery<unknown>, "info"> = {
			info: {
				next: "https://api.example.com/items",
				count: 0,
				pages: 0,
				prev: "",
			},
		};
		expect(getNextPageParam(page, [], 1, [])).toBeUndefined();
	});

	it("deve retornar o número de página correto se o próximo contiver um parâmetro de página válido", () => {
		const page: Pick<PaginateQuery<unknown>, "info"> = {
			info: {
				next: "https://api.example.com/items?page=3",
				count: 0,
				pages: 0,
				prev: "",
			},
		};
		expect(getNextPageParam(page, [], 1, [])).toBe(3);
	});

	it("deve manipular URLs com vários parâmetros de consulta e extrair o número de página correto", () => {
		const page: Pick<PaginateQuery<unknown>, "info"> = {
			info: {
				next: "https://api.example.com/items?page=5&sort=asc",
				count: 0,
				pages: 0,
				prev: "",
			},
		};
		expect(getNextPageParam(page, [], 1, [])).toBe(5);
	});
});
