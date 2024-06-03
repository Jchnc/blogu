import { Request, Response } from "express";
import type { Article } from "@/types";

export const createArticle = async (req: Request, res: Response) => {
	try {
		const prisma = req.prisma;
		const { title, intro, content, image, authorId } = req.body;

		if (!title || !content || !authorId) {
			return res
				.status(400)
				.json({ message: "Title, content, and authorId are required" });
		}

		// Validate authorId
		const user = await prisma.user.findUnique({ where: { id: authorId } });
		if (!user) {
			return res.status(400).json({ message: "Invalid authorId" });
		}

		const article = await prisma.post.create({
			data: {
				title,
				intro,
				content: JSON.stringify(content), // Serialize content to JSON string
				image: image || null,
				published: true,
				createdAt: new Date(),
				lastEdit: new Date(),
				slug: title.toLowerCase().replace(/\s+/g, "-"),
				authorId: authorId
			},
			include: {
				author: true
			}
		});

		res.status(201).json(article);
	} catch (error) {
		console.error("Error creating article:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
