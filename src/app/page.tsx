"use client";

import React, { useEffect, useState } from "react";
import Articles from "@/components/Articles";
import FeaturedArticle from "@/components/FeaturedArticle";
import { Article, PopulatedArticle } from "@/types"; // Adjust the import paths as necessary
import { featuredArticle } from "@/utils/data"; // Adjust the import paths as necessary

export default function Home() {
	const [articles, setArticles] = useState<PopulatedArticle[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const res = await fetch("http://localhost:3005/api/articles");
				if (!res.ok) {
					throw new Error("Network response was not ok");
				}
				const data: Article[] = await res.json();

				// Convert fetched articles to PopulatedArticle by transforming `id` and `author`
				const populatedData: PopulatedArticle[] = data.map(article => ({
					...article,
					id: parseInt(article.id, 10), // Convert id from string to number
					createdAt: new Date(article.createdAt), // Convert createdAt to Date
					lastEdit: new Date(article.lastEdit), // Convert lastEdit to Date
					author: {
						id: article.authorId, // Use the authorId as id
						name: article.author // Use the author string as the name
					}
				}));

				setArticles(populatedData);
			} catch (error) {
				setError(error as Error);
			} finally {
				setLoading(false);
			}
		};

		fetchArticles();
	}, []);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<>
			<FeaturedArticle article={featuredArticle} />
			<h2 className="my-6 text-2xl font-bold text-txt-secondary">
				Recent Articles
			</h2>
			<Articles articles={articles} />
		</>
	);
}
