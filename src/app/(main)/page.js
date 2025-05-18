import CustomerTestimonials from "@/components/CustomerTestimonials";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import HeroBanner from "@/components/HeroBanner";
import Map from "@/components/Map";
import ProfessionalServiceSection from "@/components/ProfessionalServiceSection";
import WhatWeDo from "@/components/WhatWeDo";
import WhyChooseUs from "@/components/WhyChooseUs";
import BlogPage from "./blogs/page";
import WashingMachineRepair from "@/components/WashingMachineRepair";
import Contact from "@/components/Contact";
import GoogleTagManager from "@/components/GoogleTagManager";
import HomeData from "../../../lib/HomeData";
import SettingsData from "../../../lib/SettingsData";

export async function generateMetadata() {
	const [data, sData] = await Promise.all([HomeData(), SettingsData()]);

	return {
		title: data?.title,
		description: data?.description,
		keywords: data?.keywords || "default, keywords",
		robots: data?.index !== "index" ? "index, follow" : "noindex, nofollow",
		openGraph: {
			title: data?.title,
			description: data?.description,
		},
	};
}

export default async function Home() {
	const [data, sData] = await Promise.all([HomeData(), SettingsData()]);

	return (
		<>
			<GoogleAnalytics />
			<GoogleTagManager sData={sData} />
			<main>
				<HeroBanner sData={sData} />
				<WhatWeDo />
				<ProfessionalServiceSection />
				<WhyChooseUs />
				<WashingMachineRepair />
				<CustomerTestimonials />
				<BlogPage />
				<Contact />
				<Map />
			</main>
		</>
	);
}
