import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin } from 'lucide-react';
import { API_BASE } from '@/lib/constants';

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

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};

async function getPostById(blogId: string): Promise<BlogPost> {
	const res = await fetch(`${API_BASE}/blog/${blogId}`, {
		cache: 'force-cache',
	});
	if (!res.ok) {
		if (res.status === 404) {
			notFound();
		}
		throw new Error(`Failed to fetch blog post: ${res.statusText}`);
	}

	return res.json();
}

export default async function BlogDetailPage({
	params,
}: {
	params: { blogId: string };
}) {
	const { blogId } = await params;

	const post = await getPostById(blogId);

	return (
		<div className="mx-auto my-16 max-w-5xl px-4 sm:px-6 lg:px-8">
			<article className="space-y-12">
				<header className="space-y-6 text-center">
					<div className="flex flex-wrap justify-center gap-2">
						{post.tags.map((tag) => (
							<Badge
								key={tag.id}
								variant="default"
								className="bg-primary/90 hover:bg-primary"
							>
								{tag.name}
							</Badge>
						))}
					</div>

					<h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tighter text-gray-900 dark:text-gray-100">
						{post.title}
					</h1>

					<div className="flex items-center justify-center space-x-4 pt-4 text-gray-600 dark:text-gray-400">
						<div className="flex items-center space-x-2">
							<div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary/50">
								<Image
									src={
										'https://avatar.iran.liara.run/public' ||
										post.author.avatarUrl
									}
									alt={post.author.firstName}
									fill
									className="object-cover"
								/>
							</div>
							<span className="text-base font-medium text-gray-800 dark:text-gray-200">
								{post.author.firstName} {post.author.lastName}
							</span>
						</div>

						<span className="text-lg">·</span>

						<div className="flex items-center space-x-1 text-sm">
							<Clock className="w-4 h-4 text-primary" />
							<span>{formatDate(post.createdAt)}</span>
						</div>

						<span className="text-lg">·</span>

						<div className="flex items-center space-x-1 text-sm">
							<MapPin className="w-4 h-4 text-primary" />
							<span>{post.author.location}</span>
						</div>
					</div>
				</header>

				<div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-2xl">
					<Image
						src={post.coverImage || '/tesla.jpg'}
						alt={`Cover image: ${post.title}`}
						fill
						priority
						className="object-cover"
					/>
				</div>

				<section className="mx-auto max-w-3xl">
					<div className="prose prose-lg prose-indigo max-w-none text-gray-700 dark:prose-invert dark:text-gray-300">
						<div dangerouslySetInnerHTML={{ __html: post.content }} />
					</div>
				</section>
			</article>
		</div>
	);
}
