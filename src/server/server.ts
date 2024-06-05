import express, { Request, Response, NextFunction } from "express";
import cors from "cors"; // Import the cors middleware
import { connectDB } from "@/middleware/prisma"; // Adjust the path as necessary
import { getArticles } from "@/handlers/articles/getArticles";
import { createArticle } from "@/handlers/articles/createArticle";
import { updateArticle } from "@/handlers/articles/updateArticle";
import { deleteArticle } from "@/handlers/articles/deleteArticle";
import { BASE_URL } from "@/utils/constants";

const port = process.env.BACK_PORT || 3006;

const server = express();

// Middleware to enable CORS
server.use(
	cors({
		origin: [BASE_URL, "https://mr1sjb4j-3000.use.devtunnels.ms/"], // Specify the allowed origin
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify allowed methods
		allowedHeaders: ["Content-Type", "Authorization"] // Specify allowed headers
	})
);

// Middleware to parse JSON and URL-encoded bodies
server.use(express.json({ limit: "10mb" }));
server.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Debugging Middleware to log request details
server.use((req: Request, res: Response, next: NextFunction) => {
	console.log(
		`Method: ${req.method}, URL: ${req.url}, Headers: ${JSON.stringify(req.headers)}`
	);
	next();
});

// Middleware to connect to Prisma Client
server.use((req: Request, res: Response, next: NextFunction) => {
	connectDB(req, res, next);
});

// API routes
server.get("/api/articles", getArticles);
server.post("/api/articles", createArticle);
server.put("/api/articles", updateArticle);
server.delete("/api/articles", deleteArticle);

// Default route handler for unhandled routes
server.all("*", (req: Request, res: Response) => {
	res.status(404).json({ error: "Not Found" });
});

// Error handling middleware
server.use((err: any, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack);
	res.status(500).json({ error: "Internal Server Error" });
});

server.listen(port, () => {
	console.log(`> Ready on http://localhost:${port}`);
});
