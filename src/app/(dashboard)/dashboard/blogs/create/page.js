"use client";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { uploadToCloudinary } from "../../../../../../utils/uploadToCloudinary";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import TextEditor from "@/components/Dashboard/TextEditor";
import { useRouter } from "next/navigation";

export default function page() {
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [editorContent, setEditorContent] = useState("");
	const router = useRouter();

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(file);
		}
	};

	const handleRemoveImage = () => {
		setImage(null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const form = new FormData(e.target);
		const title = form.get("title");
		const category = form.get("category");

		let uploadedImageUrl = "";

		if (image) {
			uploadedImageUrl = await uploadToCloudinary(image);
		}

		const currentDate = new Date().toISOString();

		try {
			await axios.post(`${process.env.BASE_URL}/post-blogs`, {
				title,
				category,
				description: editorContent,
				image: uploadedImageUrl,
				date: currentDate,
			});
			e.target.reset();
			setImage(null);
			setEditorContent("");
			toast.success("Submitted Successfully!");
		} catch (err) {
			toast.error("Failed to upload");
		} finally {
			router.push("/dashboard/blogs");
			setLoading(false);
		}
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<div className="p-5">
			<form
				onSubmit={handleSubmit}
				className="p-5 bg-white flex flex-col gap-5 border border-gray-200 rounded">
				<div className="grid grid-cols-2 gap-2">
					{!image ? (
						<label className="cursor-pointer active:bg-gray-100 border border-dashed border-gray-300 rounded-lg w-full max-w-44 h-44 flex items-center justify-center">
							<div>
								<p className="block text-center text-gray-600">+</p>
								<p className="block text-xs text-gray-600">Upload Photo</p>
							</div>
							<input
								type="file"
								accept="image/*"
								className="hidden"
								onChange={handleImageChange}
							/>
						</label>
					) : (
						<div className="relative w-full max-w-44 h-44">
							<Image
								src={URL.createObjectURL(image)}
								width={100}
								height={100}
								className="w-full h-full object-cover rounded shadow"
								alt="Services & Skills"
							/>
							<button
								onClick={handleRemoveImage}
								className="absolute top-1 right-1 bg-white border border-red-100 rounded-full p-1 hover:bg-red-100"
								title="Remove">
								<MdClose size={16} className="text-red-500" />
							</button>
						</div>
					)}
				</div>

				

				

                <div className="flex flex-col gap-1">
					<label htmlFor="editor" className="font-medium text-sm text-gray-700">
						Title <span className="text-red-500">*</span>
					</label>
					<input
						name="title"
						className="border border-gray-200 outline-none focus:border-gray-400 rounded p-3"
						placeholder="Title"
						required
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label htmlFor="editor" className="font-medium text-sm text-gray-700">
					Category <span className="text-red-500">*</span>
					</label>
					<input
						name="category"
						className="border border-gray-200 outline-none focus:border-gray-400 rounded p-3"
						placeholder="Category"
						required
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label htmlFor="editor" className="font-medium text-sm text-gray-700">
						Description <span className="text-red-500">*</span>
					</label>
					<TextEditor value={editorContent} onChange={setEditorContent} />
				</div>

				<button
					type="submit"
					className="bg-[#0d9488] py-2 px-5 text-white font-medium rounded">
					Create
				</button>
			</form>
		</div>
	);
}
