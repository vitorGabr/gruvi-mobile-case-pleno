import { createSearchParams } from "../create-search-params";

describe("createSearchParams", () => {
	it("deve retornar um URLSearchParams vazio quando nenhum dado for fornecido", () => {
		const params = createSearchParams();
		expect(params.toString()).toBe("");
	});

	it("deve adicionar parâmetros corretamente", () => {
		const data = {
			name: "John Doe",
			age: 30,
			city: "New York",
		};
		const params = createSearchParams(data);
		expect(params.toString()).toBe("name=John+Doe&age=30&city=New+York");
	});

	it("deve lidar com valores nulos e indefinidos", () => {
		const data = {
			name: "John Doe",
			age: null,
			city: undefined,
			country: "USA",
		};
		const params = createSearchParams(data);
		expect(params.toString()).toBe("name=John+Doe&country=USA");
	});

	it("deve lidar com arrays", () => {
		const data = {
			names: ["John", "Jane"],
			ages: [20, 30],
		};
		const params = createSearchParams(data);
		expect(params.toString()).toBe("names=John&names=Jane&ages=20&ages=30");
	});

	it("deve lidar com objetos", () => {
		const data = {
			user: { name: "John", age: 30 },
		};
		const params = createSearchParams(data);
		expect(decodeURI(params.toString())).toBe(
			'user={"name"%3A"John"%2C"age"%3A30}',
		);
	});

	it("deve lidar com booleanos", () => {
		const data = {
			isActive: true,
			isDeleted: false,
		};
		const params = createSearchParams(data);
		expect(params.toString()).toBe("isActive=true&isDeleted=false");
	});

	it("deve lidar com números", () => {
		const data = {
			page: 1,
			limit: 10,
		};
		const params = createSearchParams(data);
		expect(params.toString()).toBe("page=1&limit=10");
	});

	it("deve lidar com caracteres especiais", () => {
		const data = {
			q: "search query with spaces and &?",
		};

		const params = createSearchParams(data);
		expect(decodeURIComponent(params.toString())).toBe(
			"q=search+query+with+spaces+and+&?",
		);
	});

	it("deve lidar com arrays vazios", () => {
		const data = {
			emptyArray: [],
		};
		const params = createSearchParams(data);
		expect(params.toString()).toBe("");
	});

	it("deve lidar com objetos vazios", () => {
		const data = {
			emptyObject: {},
		};
		const params = createSearchParams(data);
		expect(params.toString()).toBe(new URLSearchParams().toString());
	});
});
