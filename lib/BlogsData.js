export default async function BlogsData() {
	try {
		const response = await fetch(`${process.env.BASE_URL}/seo/blogs`);

		if (!response.ok) {
			return [];
		}

		const text = await response.text();
		return text ? JSON.parse(text) : [];
	} catch (error) {
		return [];
	}
}
