export default async function SettingsData() {
	try {
		const response = await fetch(`${process.env.BASE_URL}/settings`);
		if (!response.ok) {
			return {};
		}
		const text = await response.text();
		return text ? JSON.parse(text) : {};
	} catch (error) {
		return {};
	}
}
