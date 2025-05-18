import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsApp from "@/components/WhatsApp";
import MobileActions from "@/components/MobileActions";
import ClearLocalStorageOnReload from "@/components/ClearLocalStorageOnReload";
import HomeData from "../../../lib/HomeData";
import SettingsData from "../../../lib/SettingsData";

export default async function RootLayout({ children }) {
	const [data, sData] = await Promise.all([SettingsData(), HomeData()]);

	const faqSchema = {
		"@context": "https://schema.org",
		"@type": "Washing Machine Repair in Qatar",
		mainEntity: sData?.schema?.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer,
			},
		})),
	};

	return (
		<html lang="en">
			<head />
			<body>
				<Navbar data={data} />
				{children}
				<Footer data={data} />
				<WhatsApp data={data} />
				<MobileActions data={data} />
				<ClearLocalStorageOnReload />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
				/>
			</body>
		</html>
	);
}
