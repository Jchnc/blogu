"use client";

import Articles from "@/components/Articles";
import FeaturedArticle from "@/components/FeaturedArticle";
import { Article, PopulatedArticle } from "@/types"; // Adjust the import paths as necessary
import { API_URL } from "@/utils/constants";
import fetchArticle from "@/utils/data"; // Replace with your actual path to fetchArticle
import { useEffect, useState } from "react";

export default function Home() {
	const [articles, setArticles] = useState<PopulatedArticle[]>([]);
	const [featuredArticle, setFeaturedArticle] =
		useState<PopulatedArticle | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchAllData = async () => {
			try {
				// Fetch all articles
				const res = await fetch(`${API_URL}/articles`);
				if (!res.ok) {
					throw new Error("Network response was not ok");
				}
				const data: Article[] = await res.json();

				// Fetch the featured article (assuming the slug is 'featured-article')
				const featuredArticleData = await fetchArticle("featured-article");

				if (featuredArticleData) {
					setFeaturedArticle(featuredArticleData);
				}

				// Populate all articles
				const populatedData: PopulatedArticle[] = data.map(article => ({
					...article,
					id: parseInt(article.id, 10), // Convert id to number
					createdAt: new Date(article.createdAt), // Convert string to Date
					lastEdit: new Date(article.lastEdit), // Convert string to Date
					author: {
						id: article.author.id,
						name: article.author.name
					}
				}));
				setArticles(populatedData);
			} catch (error) {
				setError(error as Error);
			} finally {
				setLoading(false);
			}
		};

		fetchAllData();
	}, []);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<>
			{featuredArticle && <FeaturedArticle article={featuredArticle} />}{" "}
			{/* Conditionally render */}
			<h2 className="my-6 text-2xl font-bold text-txt-secondary">
				Recent Articles
			</h2>
			<Articles articles={articles} />
		</>
	);
}
