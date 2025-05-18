export default async function HomeData() {
	try {
		const response = await fetch(`${process.env.BASE_URL}/seo/home`);
		if (!response.ok) {
			return {};
		}
		const text = await response.text();
		return text ? JSON.parse(text) : {};
	} catch (error) {
		return {};
	}
}
