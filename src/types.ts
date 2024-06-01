export type Article = {
	id: string;
	title: string;
	intro: string;
	content: string;
	image?: string;
	published: boolean;
	author: string;
	authorId: string;
	createdAt: DateTime;
	lastEdit: DateTime;
	slug: string;
};

export type User = {
	id: string;
	email: string;
	name?: string;
	Articles: Article[];
};

export type DateTime = string;

export interface Post {
	id: number;
	title: string;
	content: string;
	published: boolean;
	createdAt: Date;
	lastEdit: Date;
	slug: string;
}
