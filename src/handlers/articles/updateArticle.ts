// src/handlers/articles/updateArticle.ts
import type { NextApiRequest, NextApiResponse } from "next";
import type { Post } from "@/types";

export const updateArticle = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	try {
		const prisma = (req as any).prisma;
		const { id, title, content, published, slug } = req.body;

		if (!id || !title || !content) {
			return res
				.status(400)
				.json({ message: "ID, title, and content are required" });
		}

		const article: Post = await prisma.post.update({
			where: { id: Number(id) },
			data: {
				title,
				content,
				published: published ?? false,
				slug: slug ?? title.toLowerCase().replace(/ /g, "-"),
				lastEdit: new Date()
			}
		});

		res.status(200).json(article);
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
};
