// src/handlers/articles/deleteArticle.ts
import type { NextApiRequest, NextApiResponse } from "next";
import type { Post } from "@/types";

export const deleteArticle = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	try {
		const prisma = (req as any).prisma;
		const { id } = req.body;

		if (!id) {
			return res.status(400).json({ message: "ID is required" });
		}

		await prisma.post.delete({
			where: { id: Number(id) }
		});

		res.status(204).end();
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
};
