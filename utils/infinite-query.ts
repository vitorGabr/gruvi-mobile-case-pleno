import type { PaginateQuery } from "@/lib/api/types";
import type { GetPreviousPageParamFunction } from "@tanstack/react-query";

const regex = /[\?&]page=(\d+)/;

export function normalizePages<T>(
	pages?: Pick<PaginateQuery<T>, "results">[],
): T[] {
	return pages
		? pages.reduce((prev: T[], current) => [...prev, ...current.results], [])
		: [];
}

export const getNextPageParam: GetPreviousPageParamFunction<
	number,
	Pick<PaginateQuery<unknown>, "info">
> = ({ info: { next } }) => {
	const match = next?.match(regex);
	return match ? Number.parseInt(match[1], 10) : undefined;
};
