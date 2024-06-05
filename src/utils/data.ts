import { API_URL } from "./constants";

export default async function fetchArticle(slug: string) {
	try {
		const res = await fetch(`${API_URL}/articles?slug=${slug}`);
		const article = await res.json();
		return {
			id: parseInt(article.id, 10),
			title: article.title,
			intro: article.intro,
			content: article.content,
			image: article.image,
			published: article.published,
			createdAt: new Date(article.createdAt),
			lastEdit: new Date(article.lastEdit),
			slug: article.slug,
			author: {
				id: article.author.id,
				name: article.author.name
			}
		};
	} catch (error) {
		return null;
	}
}

export async function fetchArticles() {
	try {
		const res = await fetch(`${API_URL}/articles`);
		const articles = await res.json();
		return articles.map((article: any) => ({
			id: parseInt(article.id, 10),
			title: article.title,
			intro: article.intro,
			content: article.content,
			image: article.image,
			published: article.published,
			createdAt: new Date(article.createdAt),
			lastEdit: new Date(article.lastEdit),
			slug: article.slug,
			author: {
				id: article.author.id,
				name: article.author.name
			}
		}));
	} catch (error) {
		return [];
	}
}
