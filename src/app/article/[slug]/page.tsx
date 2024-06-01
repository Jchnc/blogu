import { notFound } from 'next/navigation';

interface ArticleProps {
  params: {
    slug: string;
  };
}

export default async function ArticlePage({ params }: ArticleProps) {
  const { slug } = params;

  try {
    const res = await fetch(`https://665a5388003609eda45da660.mockapi.io/article/1`);
    const article = await res.json();

    if (!article) {
      notFound();
    }

    return (
      <>
        <h1>{article.title}</h1>
        <p>{article.content}</p>
        <p>{article.createdAt}</p>
        <p>{article.createdBy}</p>
      </>
    );
  } catch (error) {
    console.error('Error fetching article:', error);
    return <p>Error fetching article</p>;
  }
}

// Function to generate static paths 
// Usefull for static site generation
export async function generateStaticParams() {
  const res = await fetch('https://665a5388003609eda45da660.mockapi.io/article');
  const articles = await res.json();

  return articles.map((article: { slug: string }) => ({
    slug: article.slug,
  }));
}
