import { Request, Response } from "express";
import type { Article } from "@/types";

export const updateArticle = async (req: Request, res: Response) => {
	try {
		const prisma = req.prisma;
		const { id, title, intro, content, published, slug, image, authorId } =
			req.body;

		if (!id || !title || !content || !authorId) {
			return res
				.status(400)
				.json({ message: "ID, title, content, and authorId are required" });
		}

		// Validate authorId
		const user = await prisma.user.findUnique({ where: { id: authorId } });
		if (!user) {
			return res.status(400).json({ message: "Invalid authorId" });
		}

		const article = await prisma.post.update({
			where: { id: Number(id) },
			data: {
				title,
				intro,
				content,
				published: !!published,
				slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
				lastEdit: new Date(),
				image: image || null,
				authorId: authorId // String ID to match Prisma schema
			},
			include: {
				author: true // Include related author
			}
		});

		res.status(200).json(article);
	} catch (error) {
		console.error("Error updating article:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
