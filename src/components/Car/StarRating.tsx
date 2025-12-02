import { Star } from 'lucide-react';

export default function StarRating({ rating }: { rating: number }) {
	return (
		<div className="flex items-center text-yellow-500">
			{[...Array(5)].map((_, i) => (
				<Star
					key={i}
					className={`w-4 h-4 ${
						i < rating ? 'fill-yellow-500' : 'fill-gray-300 dark:fill-gray-600'
					}`}
				/>
			))}
		</div>
	);
}
