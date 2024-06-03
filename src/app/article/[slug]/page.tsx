import { notFound } from "next/navigation";
import Head from "next/head";

interface ArticleProps {
	params: {
		slug: string;
	};
}

export default async function ArticlePage({ params }: ArticleProps) {
	const { slug } = params;

	try {
		const res = await fetch(`http://localhost:3005/api/articles/?slug=${slug}`);
		const article = await res.json();

		if (!article) {
			notFound();
		}

		return (
			<>
				<Head>
					<title>{article.title} | My Website</title>
					<meta
						name="description"
						content={article.intro || article.content.substring(0, 160)}
					/>
					<meta name="author" content={article.author.name} />
					<meta name="robots" content="index, follow" />
					<link
						rel="canonical"
						href={`https://www.mywebsite.com/article/${slug}`}
					/>
					<meta property="og:title" content={article.title} />
					<meta
						property="og:description"
						content={article.intro || article.content.substring(0, 200)}
					/>
					<meta property="og:type" content="article" />
					<meta
						property="og:url"
						content={`https://www.mywebsite.com/article/${slug}`}
					/>
				</Head>
				<article className="text-white">
					<picture>
						<img
							src="https://placehold.co/1366x600"
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
					<div className="leading-7 text-[#9ca3af]">{article.content}</div>
				</article>
			</>
		);
	} catch (error) {
		console.error("Error fetching article:", error);
		return <p>Error fetching article</p>;
	}
}

// Function to generate static paths
// Useful for static site generation
export async function generateStaticParams() {
	const res = await fetch("http://localhost:3005/api/articles/");
	const articles = await res.json();

	return articles.map((article: { slug: string }) => ({
		slug: article.slug
	}));
}
