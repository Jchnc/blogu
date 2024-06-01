// src/handlers/articles/createArticle.ts
import type { NextApiRequest, NextApiResponse } from "next";
import type { Post } from "@/types";

export const createArticle = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	try {
		const prisma = (req as any).prisma;
		const { title, content } = req.body;

		if (!title || !content) {
			return res
				.status(400)
				.json({ message: "Title and content are required" });
		}

		const article: Post = await prisma.post.create({
			data: {
				title,
				content,
				published: false,
				createdAt: new Date(),
				lastEdit: new Date(),
				slug: title.toLowerCase().replace(/ /g, "-")
			}
		});

		res.status(201).json(article);
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
};
