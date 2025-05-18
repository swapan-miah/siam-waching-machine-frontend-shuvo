"use client";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "react-hot-toast";
import { uploadToCloudinary } from "../../../utils/uploadToCloudinary";
import Loading from "../Loading";
import TextEditor from "../Dashboard/TextEditor";

export default function EditBlog({ data }) {
	const router = useRouter();

	const [image, setImage] = useState(null);
	const [imageRemoved, setImageRemoved] = useState(false);
	const [loading, setLoading] = useState(false);

	const [editorContent, setEditorContent] = useState("");
	const [formData, setFormData] = useState({
		title: "",
		category: "",
	});

	useEffect(() => {
		setFormData({
			title: data?.title || "",
			category: data?.category || "",
		});
		setEditorContent(data?.description || "");
	}, [data]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(file);
			setImageRemoved(false);
		}
	};

	const handleRemoveImage = () => {
		setImage(null);
		setImageRemoved(true);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		let uploadedImageUrl = data.image;

		if (image) {
			uploadedImageUrl = await uploadToCloudinary(image);
		} else if (imageRemoved) {
			uploadedImageUrl = "";
		}

		try {
			await axios.put(`${process.env.BASE_URL}/our-blogs/edit/${data._id}`, {
				title: formData.title,
				category: formData.category,
				description: editorContent,
				image: uploadedImageUrl,
			});

			router.push("/dashboard/blogs");
		} catch (err) {
			toast.error("Failed to update");
		} finally {
			setLoading(false);
			toast.success("Updated Successfully!");
		}
	};

	if (loading) return <Loading />;

	return (
		<div className="p-5">
			<form
				onSubmit={handleSubmit}
				className="p-5 bg-white flex flex-col gap-5 border border-gray-200 rounded">
				<div className="grid grid-cols-2 gap-2">
					{imageRemoved ? (
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
					) : image ? (
						<div className="relative w-full max-w-44 h-44">
							<Image
								src={URL.createObjectURL(image)}
								width={100}
								height={100}
								className="w-full h-full object-cover rounded shadow"
								alt="Selected"
							/>
							<button
								type="button"
								onClick={handleRemoveImage}
								className="absolute top-1 right-1 bg-white border border-red-100 rounded-full p-1 hover:bg-red-100"
								title="Remove">
								<MdClose size={16} className="text-red-500" />
							</button>
						</div>
					) : data?.image ? (
						<div className="relative w-full max-w-44 h-44">
							<Image
								src={data.image}
								width={100}
								height={100}
								className="w-full h-full object-cover rounded shadow"
								alt="Uploaded"
							/>
							<button
								type="button"
								onClick={handleRemoveImage}
								className="absolute top-1 right-1 bg-white border border-red-100 rounded-full p-1 hover:bg-red-100"
								title="Remove">
								<MdClose size={16} className="text-red-500" />
							</button>
						</div>
					) : (
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
					)}
				</div>

				<div className="flex flex-col gap-1">
					<label className="font-medium text-sm text-gray-700">
						Title <span className="text-red-500">*</span>
					</label>
					<input
						name="title"
						className="border border-gray-200 outline-none focus:border-gray-400 rounded p-3"
						placeholder="Title"
						value={formData.title}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label className="font-medium text-sm text-gray-700">
						Category <span className="text-red-500">*</span>
					</label>
					<input
						name="category"
						className="border border-gray-200 outline-none focus:border-gray-400 rounded p-3"
						placeholder="Category"
						value={formData.category}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label className="font-medium text-sm text-gray-700">
						Description <span className="text-red-500">*</span>
					</label>
					<TextEditor value={editorContent} onChange={setEditorContent} />
				</div>

				<button
					type="submit"
					className="bg-[#0d9488] py-2 px-5 text-white font-medium rounded">
					Update
				</button>
			</form>
		</div>
	);
}
