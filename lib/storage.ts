import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getItem<T>(key: string): Promise<T | null> {
	try {
		const value = await AsyncStorage.getItem(key);
		return value ? JSON.parse(value) : null;
	} catch (_) {
		return null;
	}
}

export async function setItem<T>(key: string, value: T): Promise<void> {
	try {
		await AsyncStorage.setItem(key, JSON.stringify(value));
	} catch (_) {}
}

export async function removeItem(key: string): Promise<void> {
	try {
		await AsyncStorage.removeItem(key);
	} catch (_) {}
}
