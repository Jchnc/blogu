import { Article } from "@/types";
import Link from "next/link";
import { ArrowRight, Calendar, Person } from "akar-icons";

export default function FeaturedArticle({ article }: { article?: Article }) {
	const title = article?.title || "Title";
	const intro = article?.intro || "Intro";
	const author = article?.author || "@Author";
	const createdAt = article?.createdAt
		? new Date(article.createdAt).toLocaleDateString()
		: "xxxx-xx-xx";
	const image = article?.image || "https://placehold.co/1366x600";

	return (
		<article className="flex flex-col my-10">
			<Link href="">
				<picture>
					<img
						src={image}
						alt={title}
						loading="lazy"
						className="rounded-2xl w-full object-cover"
					/>
				</picture>
				<p className="text-gray-400 my-4 text-sm flex items-center gap-2">
					<Person size={14} /> {String(author)}
					<Calendar size={14} /> {createdAt}
				</p>
				<h3 className="my-4 text-4xl font-bold text-txt-primary">{title}</h3>
				<p className="text-txt-secondary">{intro}</p>
			</Link>
		</article>
	);
}
