export default async function UserData() {
	const response = await fetch(`${process.env.BASE_URL}/users`);
	return response.json();
}