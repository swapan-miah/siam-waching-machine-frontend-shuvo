"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineDateRange } from "react-icons/md";
import { TbTag } from "react-icons/tb";
import { BiRightArrowAlt } from "react-icons/bi";

export default function Blogs() {
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [secData, setSecData] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [secData, result] = await Promise.all([
					fetch(`${process.env.BASE_URL}/section-heading/blogs`),
					fetch(`${process.env.BASE_URL}/our-blogs`),
				]);

				if (!secData.ok || !result.ok) {
					throw new Error("Failed to fetch data");
				}

				const titleDescription = await secData.json();
				const blogs = await result.json();

				setSecData(titleDescription);
				setBlogs(blogs);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const getFirstTagText = (htmlString) => {
		if (!htmlString) return "";
		const parser = new DOMParser();
		const doc = parser.parseFromString(htmlString, "text/html");
		const firstElement = doc.body.firstElementChild;
		return firstElement?.textContent?.trim() || "";
	};

	if (loading) {
		return (
			<section className="py-14 bg-white relative overflow-x-hidden border-t border-gray-200">
				<div className="container mx-auto text-center">
					<h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-8 page-title">
						<span className="relative">
							Washing Machine Troubleshooting Blogs
						</span>
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{Array.from({ length: 6 }).map((_, idx) => (
							<div
								key={idx}
								className="animate-pulse flex flex-col items-center rounded-md">
								<div className="z-[0] w-full h-[200px] bg-gray-300 rounded-tl-md rounded-tr-md" />

								<div className="z-20 mx-auto mt-[-50px] px-5 py-6 w-[96%] bg-white border rounded-md">

									<div className="grid grid-cols-2 gap-5 mb-8">
										<div className="w-full h-5 bg-gray-300 rounded" />
										<div className="w-full h-5 bg-gray-300 rounded" />
									</div>

									<div className="mb-5 w-full h-5 bg-gray-300 rounded" />

									<div className="space-y-2 mb-4">
										<div className="w-full h-4 bg-gray-300 rounded" />
										<div className="w-3/4 h-4 bg-gray-300 rounded" />
									</div>

									<div className="w-[25%] h-10 bg-[#0d9488] rounded" />
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}

	return (
		<div className="bg-gray-50 overflow-x-hidden border-t border-gray-200">
			<div className="container mx-auto py-14 overflow-x-hidden text-center">
				<h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-8 page-title">
					<span className="relative">
						{secData?.title}
					</span>
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{blogs.slice(0, 9).map((blog, i) => (
						<div key={i} className="cursor-pointer text-left rounded-lg group">
							<div className="relative w-full h-auto overflow-hidden rounded-t-md mb-3">
								<Image
									src={blog.image}
									alt={blog.title}
									width={400}
									height={300}
									className="object-cover w-full h-[220px] group-hover:scale-110 transition-transform duration-300"
								/>
							</div>
							<div className="w-[96%] mx-auto -mt-[50px] bg-white p-5 border rounded-lg z-10 relative transition-all duration-300 ease-in-out group-hover:border-[#0d9488]">
								<div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
									<p className="flex items-center gap-1">
										<MdOutlineDateRange className="size-5 text-[#0d9488]" />
										<span>{new Date(blog.date).toLocaleDateString("en-US", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}</span>
									</p>
									<span className="h-5 w-px bg-gray-400" />
									<p className="flex items-center gap-1">
										<TbTag className="size-5 text-[#0d9488]" />
										<span className="transition-all duration-300 ease-in-out hover:text-[#0d9488]">{blog.category}</span>
									</p>
								</div>
								<h2 className="text-xl line-clamp-1 font-semibold text-gray-900 transition-all duration-300 ease-in-out mb-3 hover:text-[#0d9488]">
									{blog.title}
								</h2>
								<p className="line-clamp-2 text-gray-700 leading-relaxed mb-4">
								{getFirstTagText(blog.description)}
								</p>
								<Link href={`/blogs/${blog._id}`}>
									<button className="bg-[#0d9488] font-medium text-white py-2 px-4 rounded flex items-center gap-0 hover:gap-1  transition-all duration-300 ease-in-out">
										Read More <BiRightArrowAlt className="size-[21px]" />
									</button>
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
