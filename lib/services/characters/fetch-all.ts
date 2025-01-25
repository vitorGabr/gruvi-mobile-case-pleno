import { createSearchParams } from "@/utils/create-search-params";
import { client } from "../common";
import type { PaginateQuery } from "../types";
import type { Character, CharacterFilter } from "./types";

type Variables = {
	filter?: CharacterFilter;
	page?: number;
};

export const fetchAllCharacters = async ({ page, filter }: Variables) => {
	return client
		.get("character", { searchParams: createSearchParams({ page, ...filter }) })
		.json<PaginateQuery<Character>>();
};
