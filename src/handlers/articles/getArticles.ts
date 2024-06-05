import type { PopulatedArticle } from "@/types"; // Ensure you import the correct type
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import sanitizeHtml from "sanitize-html";

const cleanAndSanitize = (html: string) => {
	const clean = html.replace(/\\"/g, '"').slice(1, -1);
	const sanitized = sanitizeHtml(clean);
	return sanitized;
};

export const getArticles = async (req: Request, res: Response) => {
	const prisma = new PrismaClient(); // Assuming prisma client is initialized here

	try {
		if (req.query.id) {
			const article: PopulatedArticle | null = await prisma.post.findUnique({
				where: { id: Number(req.query.id) },
				include: { author: true } // Include related author
			});
			if (article) {
				res.status(200).json({
					...article,
					content: cleanAndSanitize(article.content) // Clear HTML tags
				});
			} else {
				res.status(404).json({ message: "Article not found" });
			}
		} else if (req.query.slug) {
			const article: PopulatedArticle | null = await prisma.post.findUnique({
				where: { slug: String(req.query.slug) },
				include: { author: true } // Include related author
			});
			if (article) {
				res.status(200).json({
					...article,
					content: cleanAndSanitize(article.content) // Clear HTML tags
				});
			} else {
				res.status(404).json({ message: "Article not found" });
			}
		} else {
			const articles: PopulatedArticle[] = await prisma.post.findMany({
				where: { published: true },
				include: { author: true } // Include related author
			});
			res.status(200).json(articles);
		}
	} catch (error) {
		console.error("Error fetching articles:", error);
		res.status(500).json({ message: "Internal server error" });
	} finally {
		await prisma.$disconnect(); // Always ensure to properly close the Prisma client
	}
};
