import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export const connectDB = async (
	req: NextApiRequest,
	res: NextApiResponse,
	next: () => Promise<void>
) => {
	try {
		(req as any).prisma = prisma;
		await next();
	} finally {
		await prisma.$disconnect();
	}
};
