import fetchArticle, { fetchArticles } from "@/utils/data";
import { notFound } from "next/navigation";
import { BASE_URL } from "@/utils/constants";

export async function generateMetadata({
	params
}: {
	params: { slug: string };
}) {
	try {
		const response = await fetchArticle(params?.slug);

		if (!response) {
			return notFound();
		}

		return {
			title: response?.title,
			description: response?.intro || response?.content.substring(0, 200),
			opengraph: {
				url: `${BASE_URL}/article/${params.slug}`,
				type: "article",
				images: [
					{
						url: response.image || "https://placehold.co/1366x600",
						alt: `${response.title} Picture`
					}
				]
			}
		};
	} catch (error) {
		console.error("Error fetching article:", error);
		return notFound();
	}
}

export async function generateStaticParams() {
	try {
		const response = await fetchArticles();
		if (!response) {
			throw new Error(`Error fetching articles: ${response}`);
		}
		const result = response.map((article: { slug: string }) => ({
			params: {
				slug: article.slug
			}
		}));
		return result;
	} catch (error) {
		console.error("Error fetching articles:", error);
	}
}

export default async function ArticlePage({
	params
}: {
	params: { slug: string };
}) {
	const { slug } = params;

	const article = await fetchArticle(slug);

	if (!article) {
		return notFound();
	}

	return (
		<>
			<article className="text-white">
				<picture>
					<img
						src={article.image || "https://placehold.co/1366x600"}
						alt={`${article.title} Picture`}
						loading="lazy"
						className="rounded-2xl w-full object-cover my-4"
					/>
				</picture>
				<div className="text-center my-6">
					<h1 className="text-2xl font-bold text-txt-primary mt-6">
						{article.title}
					</h1>
					<div className="flex gap-2 items-center justify-center text-sm text-txt-secondary">
						<p>{new Date(article.createdAt).toLocaleDateString()}</p>•
						<p>{article.author.name}</p>
					</div>
				</div>
				<div
					dangerouslySetInnerHTML={{ __html: article.content }}
					className="leading-7 text-[#9ca3af]"
				></div>
			</article>
		</>
	);
}
