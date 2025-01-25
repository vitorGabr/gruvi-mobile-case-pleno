import { createSearchParams } from "@/utils/create-search-params";
import { client } from "../common";
import type { PaginateQuery } from "../types";
import type { Episode, EpisodeFilter } from "./types";

type Variables = {
	filter?: EpisodeFilter;
	page?: number;
};

export const fetchAllEpisodes = async ({ page, filter }: Variables) => {
	return client
		.get("episode", { searchParams: createSearchParams({ ...filter, page }) })
		.json<PaginateQuery<Episode>>();
};
