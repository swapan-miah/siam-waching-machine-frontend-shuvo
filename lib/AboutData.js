export default async function AboutData() {
	try {
		const response = await fetch(`${process.env.BASE_URL}/seo/about`);

		if (!response.ok) {
			return {};
		}

		const text = await response.text();
		return text ? JSON.parse(text) : {};
	} catch (error) {
		return {};
	}
}
