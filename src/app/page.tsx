import Articles from "@/components/Articles";
import FeaturedArticle from "@/components/FeaturedArticle";
import { Article } from "@/types";

const featuredArticle = {
	id: "1",
	title: "Welcome to our blog",
	intro: "This is the intro of the article.",
	content: "This is the content of the article.",
	published: true,
	author: "Jean",
} as Article;

const defaultArticles = [
	{
		id: "1",
		title: "Welcome to our blog",
		intro: "This is the intro of the article.",
		content: "This is the content of the article.",
		published: true,
		author: "Jean",
		createdAt: "2021-10-01",
		slug: "welcome-to-our-blog",
	},
	{
		id: "2",
		title: "10 Tips for Productivity",
		intro: "Are you struggling with productivity?",
		content: "Here are some tips to boost your productivity.",
		published: true,
		author: "Jean",
		createdAt: "2021-10-02",
		slug: "10-tips-for-productivity",
	},
	{
		id: "3",
		title: "The Importance of Exercise",
		intro: "Physical activity is crucial for a healthy lifestyle.",
		content: "Learn why exercise matters and how to incorporate it into your routine.",
		published: false,
		author: "Jean",
		createdAt: "2021-10-03",
		slug: "the-importance-of-exercise",
	},
	{
		id: "4",
		title: "A Guide to Healthy Eating",
		intro: "Discover the benefits of a balanced diet.",
		content: "Learn how to make healthier food choices and improve your well-being.",
		published: false,
		author: "Jean",
		createdAt: "2021-10-04",
		slug: "a-guide-to-healthy-eating",
	},
	{
		id: "5",
		title: "The Power of Positive Thinking",
		intro: "Your mindset can influence your success and happiness.",
		content: "Find out how positive thinking can transform your life.",
		published: false,
		author: "Jean",
		createdAt: "2021-10-05",
		slug: "the-power-of-positive-thinking",
	},
] as Article[];

export default function Home() {
	return (
		<>
			<FeaturedArticle article={featuredArticle} />
			<h2 className="my-6 text-2xl font-bold text-txt-secondary">Recent Articles</h2>
			<Articles articles={defaultArticles} />
		</>
	);
}
