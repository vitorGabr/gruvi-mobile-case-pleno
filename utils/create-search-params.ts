export function createSearchParams(
	data?: Record<string, unknown>,
): URLSearchParams {
	const searchParams = new URLSearchParams();

	for (const key in data) {
		const value = data[key];

		if (value == null) continue;

		if (Array.isArray(value)) {
			for (const item of value) {
				searchParams.append(key, String(item));
			}
			continue;
		}

		if (typeof value === "object") {
			if (Object.keys(value).length > 0) {
				searchParams.append(key, JSON.stringify(value));
			}
			continue;
		}

		searchParams.append(key, String(value));
	}

	return searchParams;
}
