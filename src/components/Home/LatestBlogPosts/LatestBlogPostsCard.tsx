import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

export default function LatestBlogPostsCard({ index, post }) {
	return (
		<Card key={index} className="overflow-hidden">
			<div className="relative w-full h-40">
				<Image
					src={post.image}
					alt={post.title}
					fill
					className="object-cover"
				/>
			</div>

			<CardHeader className="">
				<CardDescription className="text-sm text-gray-600 dark:text-gray-400">
					{post.user} | {post.date}
				</CardDescription>
			</CardHeader>

			<CardContent>
				<CardTitle className="text-lg">{post.title}</CardTitle>
			</CardContent>
		</Card>
	);
}
