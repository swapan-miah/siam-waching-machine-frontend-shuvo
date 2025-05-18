export default async function ServicesData() {
	try {
		const response = await fetch(`${process.env.BASE_URL}/seo/services`);

		if (!response.ok) {
			return [];
		}
		const text = await response.text();
		return text ? JSON.parse(text) : [];
	} catch (error) {
		return [];
	}
}
