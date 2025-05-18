export default async function SecTitleDescription({name}) {
	const response = await fetch(`${process.env.BASE_URL}/section-heading/${name}`);
	return response.json();
}