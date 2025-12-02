import BlogCard from '@/components/Blog/BlogCard';
import BlogHero from '@/components/Blog/BlogHero';
import { API_BASE } from '@/lib/constants';
import { notFound } from 'next/navigation';

interface BlogPost {
	id: string;
	title: string;
	summary: string;
	content: string;
	coverImage: string;
	tags: { id: string; name: string }[];
	author: {
		firstName: string;
		lastName: string;
		avatarUrl: string;
		location: string;
	};
	createdAt: string;
}

export default async function index() {
	const res = await fetch(`${API_BASE}/blog`, {
		cache: 'no-store',
	});

	if (!res.ok) {
		if (res.status === 404) notFound();
		throw new Error('Blog verileri alınamadı');
	}

	const posts: BlogPost[] = await res.json();

	return (
		<div className="mx-auto space-y-12 pb-16">
			<BlogHero
				title="Chauffeur's Blog"
				description="Stories and insights from life behind the wheel."
			/>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 hover:transition hover:delay-150 hover:duration-300 hover:ease-in-out">
				{posts.map((post) => (
					<BlogCard key={post.id} post={post} />
				))}
			</div>
		</div>
	);
}
