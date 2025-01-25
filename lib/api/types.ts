export type PaginateQuery<T> = {
	results: T[];
	info: {
		count: number;
		pages: number;
		next?: string | null;
		prev?: string | null;
	};
};
