import { PopulatedArticle } from "@/types";
import Link from "next/link";
import { ArrowRight, Calendar, Person } from "akar-icons";

export default function Articles({
	articles
}: {
	articles: PopulatedArticle[];
}) {
	return (
		<section className="grid grid-cols-auto-fit gap-2 w-full">
			{articles.map(post => (
				<Link
					key={self.crypto.randomUUID()}
					href={`/article/${encodeURIComponent(post.slug)}`}
					className="
            bg-bg-primary
            border-[1px]
            border-bg-borders
            rounded-2xl
            transition-transform 
            ease-in-out
            duration-200
            [&_h3]:hover:text-blue-500
            [&_span]:hover:text-blue-500
            [&_span]:hover:gap-3
            [&_span]:hover:z-30
          "
				>
					<article className="p-4 flex flex-col">
						<picture>
							<img
								className="rounded-2xl w-full h-48 object-cover"
								src={post.image || "https://placehold.co/500x500"}
								alt={post.title || "Title Picture"}
								loading="lazy"
							/>
						</picture>
						<p className="text-gray-400 my-4 text-sm flex items-center gap-2">
							<Person size={14} /> {post.author.name}
							<Calendar size={14} />{" "}
							{new Date(post.createdAt).toLocaleDateString()}
						</p>
						<h3 className="text-2xl font-bold mb-4 text-txt-primary">
							{post.title || "Title"}
						</h3>
						<p className="text-gray-400">{post.intro || "Intro"}</p>
						<span className="flex text-gray-400 gap-1 items-center mt-4 transition-all ease-out">
							Read more <ArrowRight size={16} className="inline" />
						</span>
					</article>
				</Link>
			))}
		</section>
	);
}
