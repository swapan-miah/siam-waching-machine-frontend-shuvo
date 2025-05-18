import { Toaster } from "react-hot-toast";
import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar";
import SettingsData from "../../../lib/SettingsData";
import ProtectedRoute from "@/components/ProtectedRoute";

export default async function DashboardLayout({ children }) {
	const data = await SettingsData();
	return (
		<ProtectedRoute>
			<div className="overflow-visible">
				<Toaster
					position="top-center"
					reverseOrder={false}
					containerStyle={{
						top: 80,
					}}
				/>
				<Header data={data} />
				<main className="ps-3 flex bg-white">
					<Sidebar />
					<div className="flex-1 bg-gray-50">{children}</div>
				</main>
			</div>
		</ProtectedRoute>
	);
}
