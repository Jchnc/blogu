// src/handlers/articles/getArticles.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Post } from '@/types.ts';

export const getArticles = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const prisma = (req as any).prisma;
    if (req.query.id) {
      const article: Post | null = await prisma.post.findUnique({
        where: { id: Number(req.query.id) },
      });
      article ? res.status(200).json(article) : res.status(404).json({ message: 'Article not found' });
    } else {
      const articles: Post[] = await prisma.post.findMany({
        where: { published: true },
      });
      res.status(200).json(articles);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};