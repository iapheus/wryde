import { Button } from '@/components/ui/button';
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	CarIcon,
	ClipboardListIcon,
	DollarSignIcon,
	ShieldCheckIcon,
} from 'lucide-react';
import Link from 'next/link';

export default function ExploreOrReview() {
	return (
		<section className="flex flex-col md:flex-row justify-between gap-10 px-6 py-16 max-w-screen-xl mx-auto">
			<div className="flex flex-col gap-8 w-full md:w-3/5">
				<Card className="relative bg-white dark:bg-neutral-800 shadow-md rounded-lg">
					<CardHeader>
						<CardTitle className="text-xl font-semibold">
							Are You Looking For a Car?
						</CardTitle>
						<CardDescription className="text-gray-600 dark:text-gray-400">
							Find the perfect vehicle with detailed specs, real pricing, and
							authentic user reviews.
						</CardDescription>
					</CardHeader>
					<div className="absolute bottom-4 right-4 text-green-600 dark:text-green-400">
						<div className="flex items-center gap-2">
							<CarIcon className="w-10 h-10" />
							<DollarSignIcon className="w-10 h-10" />
						</div>
					</div>
					<CardFooter>
						<Button>
							<Link href={'/explore'}>Explore</Link>
						</Button>
					</CardFooter>
				</Card>

				<Card className="relative bg-white dark:bg-neutral-800 shadow-md rounded-lg">
					<CardHeader>
						<CardTitle className="text-xl font-semibold">
							Do You Want to Review a Car?
						</CardTitle>
						<CardDescription className="text-gray-600 dark:text-gray-400">
							Share your honest driving experience and help others make
							confident decisions.
						</CardDescription>
					</CardHeader>
					<div className="absolute bottom-4 right-4 text-blue-600 dark:text-blue-400">
						<ClipboardListIcon className="w-10 h-10 opacity-80" />
					</div>
					<CardFooter>
						<Button>
							<Link href={'/signup'}>Get Started</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>

			<div className="w-full md:w-2/5 flex flex-col justify-center bg-gray-50 dark:bg-neutral-900 p-6 rounded-lg shadow-sm">
				<div className="flex items-center gap-3 mb-4 text-indigo-600 dark:text-indigo-400">
					<ShieldCheckIcon className="w-6 h-6" />
					<h3 className="text-2xl font-semibold">Why Choose Us?</h3>
				</div>
				<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
					We are completely unbiased. All the data you see is based solely on
					real user reviews and experiences. No paid promotions, no hidden
					agendas — just honest insights from drivers like you.
					<br />
					<br />
					Our platform is built on trust, transparency, and community. Whether
					you're buying or reviewing, you're contributing to a smarter, more
					informed automotive world.
				</p>
			</div>
		</section>
	);
}
