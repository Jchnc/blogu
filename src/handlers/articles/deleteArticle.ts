import { Request, Response } from "express";

export const deleteArticle = async (req: Request, res: Response) => {
	try {
		const prisma = req.prisma;
		const { id } = req.body;

		if (!id) {
			return res.status(400).json({ message: "ID is required" });
		}

		await prisma.post.delete({
			where: { id: Number(id) }
		});

		res.status(204).end();
	} catch (error) {
		console.error("Error deleting article:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
