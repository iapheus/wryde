import { Button } from '@/components/ui/button';
import LatestBlogPostsCard from './LatestBlogPostsCard';

const blogPosts = [
	{
		title: '5 Things to Know Before Buying an Electric Car',
		image: '/tesla.jpg',
		user: 'johndoe',
		date: 'Nov 5, 2025',
	},
	{
		title: 'Why SUVs Dominate the Market in 2025',
		image: '/bmw.webp',
		user: 'carlover88',
		date: 'Nov 3, 2025',
	},
	{
		title: 'Manual vs Automatic: Which One Is Right for You?',
		image: '/toyota.webp',
		user: 'drivewise',
		date: 'Oct 30, 2025',
	},
];

export default function LatestBlogPosts() {
	return (
		<section className="px-6 py-16 max-w-screen-xl mx-auto">
			<div className="flex items-center justify-between mb-8">
				<h2 className="text-3xl font-semibold">Latest Blog Posts</h2>
				<Button variant="outline">More Posts</Button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
				{blogPosts.map((post, index) => (
					<LatestBlogPostsCard key={index} post={post} index={index} />
				))}
			</div>
		</section>
	);
}
