import { fetchArticles } from "@/utils/data";
import { BASE_URL } from "@/utils/constants";

export default async function sitemap() {
	const articles = await fetchArticles();

	const paths = articles?.map(
		(article: { slug: string; lastEdit: string }) => ({
			url: `${BASE_URL}/article/${article.slug}`,
			lastModified: article.lastEdit,
			changeFrequency: "monthly"
		})
	);

	return [
		{
			url: `${BASE_URL}`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1
		},
		{
			url: `${BASE_URL}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8
		}
	].concat(paths);
}
