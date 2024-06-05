export type Article = {
	id: string; // Updated from string to number
	title: string;
	intro: string;
	content: string;
	image?: string | null;
	published: boolean;
	author: {
		id: string;
		name: string | null;
	};
	createdAt: string;
	lastEdit: string;
	slug: string;
};
export interface User {
	id: string;
	email: string;
	name?: string | null; // Allow name to be null
	Articles?: Article[]; // Articles authored by this user
}

export type DateTime = Date; // Use Date for date-time values

export interface Post {
	id: number; // Numeric ID to match Prisma schema
	title: string;
	content: string;
	published: boolean;
	createdAt: Date;
	lastEdit: Date;
	slug: string;
	image?: string | null; // Optional image
	authorId: string; // String ID to match Prisma schema
}

// New type to use for articles with populated author
export type PopulatedArticle = {
	id: number;
	title: string;
	intro: string;
	content: string;
	image?: string | null;
	published: boolean;
	author: {
		id: string;
		name: string | null;
	};
	createdAt: Date;
	lastEdit: Date;
	slug: string;
};
