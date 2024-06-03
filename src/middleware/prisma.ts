import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

// Extend Express Request type to include Prisma client
declare global {
	namespace Express {
		interface Request {
			prisma: PrismaClient;
		}
	}
}

export const connectDB = (req: Request, res: Response, next: NextFunction) => {
	try {
		req.prisma = prisma;
		next();
	} catch (error) {
		console.error("Failed to connect to the database:", error);
		res.status(500).json({ error: "Failed to connect to the database" });
	}
};
