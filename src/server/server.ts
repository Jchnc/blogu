// server.ts
import next from "next";
import express, { Request, Response, NextFunction } from "express";
import { connectDB } from "@/middleware/prisma";
import { getArticles } from "@/handlers/articles/getArticles";
import { createArticle } from "@/handlers/articles/createArticle";
import { updateArticle } from "@/handlers/articles/updateArticle";
import { deleteArticle } from "@/handlers/articles/deleteArticle";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();

server.use(express.json()); // Middleware to parse JSON bodies

// Middleware to connect to Prisma Client
server.use(async (req: Request, res: Response, next: NextFunction) => {
	await connectDB(req, res, next);
});

// API routes
server.get("/api/articles", getArticles);
server.post("/api/articles", createArticle);
server.put("/api/articles", updateArticle);
server.delete("/api/articles", deleteArticle);

// Fallback to Next.js request handler for all other routes
server.all("*", (req, res) => {
	return handle(req, res);
});

app.prepare().then(() => {
	server.listen(3000, (err?: Error) => {
		if (err) throw err;
		console.log("> Ready on http://localhost:3000");
	});
});
