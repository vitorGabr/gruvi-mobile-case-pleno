import { client } from "../common";
import type { Character } from "./types";

export async function fetchCharacterById(id: string) {
	return client.get(`character/${id}`).json<Character>();
}
